#!/usr/bin/env node
/**
 * MailerLite Campaign Scheduler
 * 
 * Usage:
 *   node schedule-campaign.js --campaign-id <id> --date YYYY-MM-DD --time HH:MM [--timezone <id>]
 * 
 * Example:
 *   node schedule-campaign.js --campaign-id 123456 --date 2026-02-14 --time 10:00 --timezone 344
 */

const fs = require('fs');
const path = require('path');

// Load API key from .env.mailerlite
const envPath = path.join(__dirname, '../../../.env.mailerlite');
let API_KEY;

try {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/MAILERLITE_API_KEY=(.+)/);
  if (match) {
    API_KEY = match[1].trim();
  }
} catch (e) {
  console.error('Error: Could not read .env.mailerlite file');
  console.error('Create it with: MAILERLITE_API_KEY=your_api_key');
  process.exit(1);
}

if (!API_KEY) {
  console.error('Error: MAILERLITE_API_KEY not found in .env.mailerlite');
  process.exit(1);
}

const BASE_URL = 'https://connect.mailerlite.com/api';

// Parse arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {
    campaignId: null,
    date: null,
    time: null,
    timezone: '344' // Default: Europe/Madrid
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--campaign-id':
        result.campaignId = args[++i];
        break;
      case '--date':
        result.date = args[++i];
        break;
      case '--time':
        result.time = args[++i];
        break;
      case '--timezone':
        result.timezone = args[++i];
        break;
    }
  }

  return result;
}

// API request helper
async function apiRequest(method, endpoint, body = null) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const text = await response.text();
  
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { raw: text };
  }

  return { status: response.status, ok: response.ok, data };
}

// Get campaign status
async function getCampaignStatus(campaignId) {
  const result = await apiRequest('GET', `/campaigns/${campaignId}`);
  if (!result.ok) {
    throw new Error(`Failed to get campaign: ${JSON.stringify(result.data)}`);
  }
  return result.data.data;
}

// Cancel campaign (if scheduled)
async function cancelCampaign(campaignId) {
  console.log(`Cancelling campaign ${campaignId}...`);
  const result = await apiRequest('POST', `/campaigns/${campaignId}/cancel`);
  if (!result.ok) {
    throw new Error(`Failed to cancel campaign: ${JSON.stringify(result.data)}`);
  }
  console.log('Campaign cancelled successfully');
  return result.data;
}

// Schedule campaign
async function scheduleCampaign(campaignId, date, time, timezone) {
  const delivery = 'scheduled';
  const scheduledFor = `${date} ${time}`;
  
  console.log(`Scheduling campaign ${campaignId} for ${scheduledFor} (timezone: ${timezone})...`);
  
  const body = {
    delivery,
    schedule: {
      date: scheduledFor,
      timezone_id: parseInt(timezone, 10)
    }
  };

  const result = await apiRequest('POST', `/campaigns/${campaignId}/schedule`, body);
  
  if (!result.ok) {
    throw new Error(`Failed to schedule campaign: ${JSON.stringify(result.data)}`);
  }
  
  console.log('Campaign scheduled successfully!');
  return result.data;
}

// Main execution
async function main() {
  const args = parseArgs();

  if (!args.campaignId || !args.date || !args.time) {
    console.error('Usage: node schedule-campaign.js --campaign-id <id> --date YYYY-MM-DD --time HH:MM [--timezone <id>]');
    console.error('\nRequired parameters:');
    console.error('  --campaign-id  MailerLite campaign ID');
    console.error('  --date         Date in YYYY-MM-DD format');
    console.error('  --time         Time in HH:MM format');
    console.error('\nOptional parameters:');
    console.error('  --timezone     Timezone ID (default: 344 = Europe/Madrid)');
    process.exit(1);
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(args.date)) {
    console.error('Error: Date must be in YYYY-MM-DD format');
    process.exit(1);
  }

  // Validate time format
  if (!/^\d{2}:\d{2}$/.test(args.time)) {
    console.error('Error: Time must be in HH:MM format');
    process.exit(1);
  }

  try {
    // Get current campaign status
    console.log(`Checking campaign ${args.campaignId} status...`);
    const campaign = await getCampaignStatus(args.campaignId);
    console.log(`Campaign "${campaign.name}" is currently in "${campaign.status}" status`);

    // If not draft, cancel first
    if (campaign.status !== 'draft') {
      if (campaign.status === 'sent') {
        console.error('Error: Cannot reschedule a campaign that has already been sent');
        process.exit(1);
      }
      await cancelCampaign(args.campaignId);
      // Wait a bit for the API to process
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Schedule the campaign
    const result = await scheduleCampaign(args.campaignId, args.date, args.time, args.timezone);
    console.log('\nScheduled campaign details:');
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
