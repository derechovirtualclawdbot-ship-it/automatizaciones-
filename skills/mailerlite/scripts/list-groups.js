#!/usr/bin/env node
/**
 * MailerLite Group Lister
 * 
 * Usage:
 *   node list-groups.js [--limit <n>] [--page <n>]
 * 
 * Example:
 *   node list-groups.js --limit 50
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
    limit: 25,
    page: 1
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--limit':
        result.limit = parseInt(args[++i], 10);
        break;
      case '--page':
        result.page = parseInt(args[++i], 10);
        break;
    }
  }

  return result;
}

// API request helper
async function apiRequest(method, endpoint) {
  const url = `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    }
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return { status: response.status, ok: response.ok, data };
}

// List groups
async function listGroups(limit, page) {
  const endpoint = `/groups?limit=${limit}&page=${page}`;
  const result = await apiRequest('GET', endpoint);
  
  if (!result.ok) {
    throw new Error(`Failed to list groups: ${JSON.stringify(result.data)}`);
  }
  
  return result.data;
}

// Main execution
async function main() {
  const args = parseArgs();

  try {
    console.log('Fetching MailerLite groups...\n');
    const response = await listGroups(args.limit, args.page);
    
    const groups = response.data || [];
    
    if (groups.length === 0) {
      console.log('No groups found.');
      return;
    }

    // Sort by active subscribers descending for easier reading
    groups.sort((a, b) => (b.active_count || 0) - (a.active_count || 0));
    
    console.log('Groups (sorted by active subscribers):');
    console.log('─'.repeat(70));
    console.log(String('ID').padEnd(15) + String('Active').padStart(10) + '  ' + 'Name');
    console.log('─'.repeat(70));
    
    let totalActive = 0;
    for (const group of groups) {
      const activeCount = group.active_count || 0;
      totalActive += activeCount;
      console.log(
        String(group.id).padEnd(15) + 
        String(activeCount.toLocaleString()).padStart(10) + 
        '  ' + 
        group.name
      );
    }
    
    console.log('─'.repeat(70));
    console.log(`${'TOTAL'.padEnd(15)}${totalActive.toLocaleString().padStart(10)}  (${groups.length} groups)`);
    
    // Pagination info
    if (response.meta) {
      console.log(`Page ${response.meta.current_page} of ${response.meta.last_page}`);
      console.log(`Total groups: ${response.meta.total}`);
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
