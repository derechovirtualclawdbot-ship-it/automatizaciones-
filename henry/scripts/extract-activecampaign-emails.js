const https = require('https');
const fs = require('fs');

const API_URL = 'derechovirtual66039.api-us1.com';
const API_KEY = 'af4c1e746f7485e75cee7b53f77d8e9a1627b1167e69383dc49a7113ffc23385550a4045';

function apiRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_URL,
      path: `/api/3${path}`,
      method: 'GET',
      headers: {
        'Api-Token': API_KEY,
        'Accept': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Parse error: ${data.substring(0, 200)}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error('Timeout')); });
    req.end();
  });
}

async function getAllCampaigns() {
  const allCampaigns = [];
  let offset = 0;
  const limit = 100;
  
  console.log('Fetching campaigns...');
  
  while (true) {
    const result = await apiRequest(`/campaigns?limit=${limit}&offset=${offset}`);
    if (!result.campaigns || result.campaigns.length === 0) break;
    
    // Only include sent campaigns (status=5)
    const sentCampaigns = result.campaigns.filter(c => c.status === "5" && parseInt(c.send_amt) > 100);
    allCampaigns.push(...sentCampaigns);
    
    console.log(`Fetched ${offset + result.campaigns.length} campaigns, ${allCampaigns.length} sent with >100 recipients`);
    
    offset += limit;
    if (result.campaigns.length < limit) break;
    
    // Rate limit
    await new Promise(r => setTimeout(r, 200));
  }
  
  return allCampaigns;
}

function calculateMetrics(campaign) {
  const sent = parseInt(campaign.send_amt) || 0;
  const uniqueOpens = parseInt(campaign.uniqueopens) || 0;
  const uniqueClicks = parseInt(campaign.uniquelinkclicks) || 0;
  
  const openRate = sent > 0 ? (uniqueOpens / sent * 100) : 0;
  const clickRate = sent > 0 ? (uniqueClicks / sent * 100) : 0;
  // Combined score: weighted average favoring open rate
  const score = openRate * 0.6 + clickRate * 0.4 + (clickRate > 0 ? 5 : 0);
  
  return {
    id: campaign.id,
    name: campaign.name,
    messageId: campaign.message_id,
    sent,
    uniqueOpens,
    uniqueClicks,
    openRate: openRate.toFixed(2),
    clickRate: clickRate.toFixed(2),
    score: score.toFixed(2),
    date: campaign.sdate,
    screenshot: campaign.screenshot
  };
}

async function getMessageContent(messageId) {
  try {
    const result = await apiRequest(`/messages/${messageId}`);
    if (result.message) {
      return {
        subject: result.message.subject || '',
        html: result.message.html || '',
        text: result.message.text || '',
        preheader: result.message.preheader_text || ''
      };
    }
  } catch (e) {
    console.log(`Error fetching message ${messageId}: ${e.message}`);
  }
  return null;
}

async function main() {
  try {
    // Get all campaigns
    const campaigns = await getAllCampaigns();
    console.log(`\nTotal sent campaigns with >100 recipients: ${campaigns.length}`);
    
    // Calculate metrics and sort
    const withMetrics = campaigns.map(calculateMetrics);
    withMetrics.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
    
    // Get top 1000 (or all if less)
    const top = withMetrics.slice(0, 1000);
    console.log(`\nTop ${top.length} campaigns by performance:`);
    
    // Fetch message content for top campaigns
    const results = [];
    for (let i = 0; i < top.length; i++) {
      const campaign = top[i];
      console.log(`[${i+1}/${top.length}] Fetching: ${campaign.name} (Open: ${campaign.openRate}%, Click: ${campaign.clickRate}%)`);
      
      const content = await getMessageContent(campaign.messageId);
      if (content) {
        results.push({
          ...campaign,
          subject: content.subject,
          preheader: content.preheader,
          // Store truncated HTML for analysis
          htmlPreview: content.html.substring(0, 2000),
          textPreview: content.text.substring(0, 1000)
        });
      }
      
      // Rate limit
      await new Promise(r => setTimeout(r, 150));
    }
    
    // Save results
    const outputPath = '/home/node/openclaw/output/activecampaign-top-emails.json';
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`\nSaved ${results.length} emails to ${outputPath}`);
    
    // Print summary
    console.log('\n=== TOP 20 PERFORMING EMAILS ===\n');
    results.slice(0, 20).forEach((r, i) => {
      console.log(`${i+1}. [Score: ${r.score}] Open: ${r.openRate}% | Click: ${r.clickRate}%`);
      console.log(`   Subject: ${r.subject}`);
      console.log(`   Campaign: ${r.name}`);
      console.log(`   Date: ${r.date}\n`);
    });
    
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

main();
