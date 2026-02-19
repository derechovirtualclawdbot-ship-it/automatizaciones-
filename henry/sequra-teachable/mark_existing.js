const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const SEQURA_TOKEN = process.env.SEQURA_TOKEN;
const SEQURA_MCP_URL = 'https://simba.sequra.com/mcp';
const PROCESSED_FILE = path.join(__dirname, 'processed_orders.json');

async function markAllExisting() {
  // Get all recent orders from Sequra
  const response = await fetch(SEQURA_MCP_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SEQURA_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: { name: 'search_orders_tool', arguments: { limit: 100 } }
    })
  });
  
  const data = await response.json();
  const ordersText = data.result.content[0].text;
  
  // Parse order references
  const orderLines = ordersText.split('\n').filter(line => line.match(/^\d+\./));
  const processed = {};
  
  for (const line of orderLines) {
    const match = line.match(/(\d+)\. (\d+) - /);
    if (match) {
      const orderRef = match[2];
      processed[orderRef] = {
        markedAsProcessed: true,
        reason: 'existing_order_before_automation',
        date: new Date().toISOString()
      };
    }
  }
  
  fs.writeFileSync(PROCESSED_FILE, JSON.stringify(processed, null, 2));
  console.log(`✅ Marked ${Object.keys(processed).length} existing orders as processed`);
}

markAllExisting().catch(console.error);
