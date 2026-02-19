#!/usr/bin/env node
/**
 * Sequra → Teachable Auto-Enrollment
 * 
 * Revisa ventas nuevas en Sequra y enrolla automáticamente en Teachable
 * Horario: 9am - 9pm España (8am - 8pm UTC en invierno)
 */

const fs = require('fs');
const path = require('path');

// Load env
require('dotenv').config({ path: path.join(__dirname, '.env') });

// Check if within operating hours (9am-9pm Spain = 8am-8pm UTC in winter, 7am-7pm UTC in summer)
function isWithinOperatingHours() {
  const now = new Date();
  const utcHour = now.getUTCHours();
  // Spain is UTC+1 in winter, UTC+2 in summer
  // 9am-9pm Spain = roughly 7am-8pm UTC (being generous)
  return utcHour >= 7 && utcHour < 21;
}

const SEQURA_TOKEN = process.env.SEQURA_TOKEN;
const TEACHABLE_API_KEY = process.env.TEACHABLE_API_KEY;
const SEQURA_MCP_URL = process.env.SEQURA_MCP_URL || 'https://simba.sequra.com/mcp';
const TEACHABLE_API_URL = process.env.TEACHABLE_API_URL || 'https://developers.teachable.com/v1';

// Product mapping: Sequra product name → Teachable course ID
const PRODUCT_MAPPING = {
  'gestión procesal': 1994647,
  'gestion procesal': 1994647,
  'tramitación procesal': 1994647,
  'tramitacion procesal': 1994647,
  'auxilio judicial': 1994647,
  'oposiciones de justicia': 1994647,
  'oposiciones justicia': 1994647,
  'instituciones penitenciarias': 2637836,
  'iipp': 2637836,
  'legal prime': 2854170,
};

const PROCESSED_FILE = path.join(__dirname, 'processed_orders.json');
const LAST_SYNC_FILE = path.join(__dirname, 'last_sync.json');

// WhatsApp UltraMsg config
const ULTRAMSG_INSTANCE = 'instance125981';
const ULTRAMSG_TOKEN = 'y4ffepibt3l9y5ql';
const WHATSAPP_GROUP_ID = '120363402820307448@g.us'; // Avisos Calendly DV Verdadero

// Send WhatsApp notification
async function sendWhatsAppNotification(customerName, productName, email) {
  const message = `🛒 *VENTA POR SEQURA*

Se ha inscrito al estudiante:
👤 *${customerName}*

📚 Curso: *${productName.toUpperCase()}*
📧 Contacto: ${email}

✅ Enrollment automático completado en Teachable`;
  
  const params = new URLSearchParams();
  params.append('token', ULTRAMSG_TOKEN);
  params.append('to', WHATSAPP_GROUP_ID);
  params.append('body', message);
  
  const response = await fetch(`https://api.ultramsg.com/${ULTRAMSG_INSTANCE}/messages/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  
  const result = await response.json();
  if (result.sent === 'true') {
    console.log(`  📱 WhatsApp notification sent`);
    return true;
  } else {
    console.log(`  ⚠️ WhatsApp failed: ${JSON.stringify(result)}`);
    return false;
  }
}

// Load processed orders
function loadProcessedOrders() {
  try {
    return JSON.parse(fs.readFileSync(PROCESSED_FILE, 'utf8'));
  } catch {
    return {};
  }
}

// Save processed orders
function saveProcessedOrders(orders) {
  fs.writeFileSync(PROCESSED_FILE, JSON.stringify(orders, null, 2));
}

// Save last sync info
function saveLastSync(info) {
  fs.writeFileSync(LAST_SYNC_FILE, JSON.stringify({
    ...info,
    timestamp: new Date().toISOString()
  }, null, 2));
}

// Call Sequra MCP
async function sequraCall(method, args = {}) {
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
      params: { name: method, arguments: args }
    })
  });
  
  const data = await response.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

// Get order details from Sequra
async function getOrderDetails(primaryReference) {
  const result = await sequraCall('show_order_tool', { primary_reference: primaryReference });
  const text = result.content[0].text;
  return JSON.parse(text).order;
}

// Search recent orders in Sequra
async function searchRecentOrders() {
  const result = await sequraCall('search_orders_tool', { 
    limit: 50,
    status: 'shipped'  // Only shipped orders
  });
  return result.content[0].text;
}

// Find course ID for product name
function findCourseId(productName) {
  const normalized = productName.toLowerCase().trim();
  for (const [key, courseId] of Object.entries(PRODUCT_MAPPING)) {
    if (normalized.includes(key)) {
      return courseId;
    }
  }
  return null;
}

// Enroll user in Teachable
async function enrollInTeachable(email, courseId, name = null) {
  // First, try to find or create user
  let userId;
  
  // Search for existing user
  const searchResponse = await fetch(`${TEACHABLE_API_URL}/users?email=${encodeURIComponent(email)}`, {
    headers: { 'apiKey': TEACHABLE_API_KEY }
  });
  const searchData = await searchResponse.json();
  
  if (searchData.users && searchData.users.length > 0) {
    userId = searchData.users[0].id;
    console.log(`  Found existing user: ${userId}`);
  } else {
    // Create new user
    const createResponse = await fetch(`${TEACHABLE_API_URL}/users`, {
      method: 'POST',
      headers: {
        'apiKey': TEACHABLE_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        name: name || email.split('@')[0]
      })
    });
    const createData = await createResponse.json();
    
    if (createData.id) {
      userId = createData.id;
      console.log(`  Created new user: ${userId}`);
    } else if (createData.user && createData.user.id) {
      userId = createData.user.id;
      console.log(`  Created new user: ${userId}`);
    } else {
      throw new Error(`Failed to create user: ${JSON.stringify(createData)}`);
    }
  }
  
  // Enroll in course (correct endpoint: /v1/enroll)
  const enrollResponse = await fetch(`${TEACHABLE_API_URL}/enroll`, {
    method: 'POST',
    headers: {
      'apiKey': TEACHABLE_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: userId, course_id: courseId })
  });
  
  const enrollData = await enrollResponse.json();
  
  if (enrollResponse.ok || enrollData.enrolled || enrollData.message?.includes('already')) {
    console.log(`  ✅ Enrolled in course ${courseId}`);
    return { success: true, userId, courseId };
  } else {
    console.log(`  ⚠️ Enrollment response: ${JSON.stringify(enrollData)}`);
    return { success: true, userId, courseId, note: 'may already be enrolled' };
  }
}

// Main sync function
async function sync() {
  // Check operating hours
  if (!isWithinOperatingHours()) {
    // Silent exit outside operating hours
    process.exit(0);
  }
  
  const processed = loadProcessedOrders();
  const results = { checked: 0, enrolled: 0, skipped: 0, errors: [] };
  
  try {
    // Get recent orders text
    const ordersText = await searchRecentOrders();
    
    // Parse order references from text
    const orderLines = ordersText.split('\n').filter(line => line.match(/^\d+\./));
    
    for (const line of orderLines) {
      // Parse: "1. 077140736884 - 747.0 EUR (2026-02-18) [shipped] - derechovirtual"
      const match = line.match(/(\d+)\. (\d+) - ([\d.]+) EUR \((\d{4}-\d{2}-\d{2})\) \[(\w+)\]/);
      if (!match) continue;
      
      const [, , orderRef, amount, date, status] = match;
      results.checked++;
      
      // Skip if already processed
      if (processed[orderRef]) {
        console.log(`⏭️ ${orderRef} - already processed`);
        results.skipped++;
        continue;
      }
      
      try {
        // Get full order details
        console.log(`\n📦 Processing ${orderRef}...`);
        const order = await getOrderDetails(orderRef);
        
        if (!order.cart_items || order.cart_items.length === 0) {
          console.log(`  ❌ No cart items found`);
          continue;
        }
        
        const productName = order.cart_items[0].name;
        const customerEmail = order.customer?.email;
        const customerName = order.customer?.name;
        
        console.log(`  Product: ${productName}`);
        console.log(`  Customer: ${customerName} <${customerEmail}>`);
        
        // Find matching course
        const courseId = findCourseId(productName);
        
        if (!courseId) {
          console.log(`  ⏭️ Product not mapped, skipping`);
          processed[orderRef] = { skipped: true, reason: 'not_mapped', product: productName, date: new Date().toISOString() };
          results.skipped++;
          continue;
        }
        
        if (!customerEmail) {
          console.log(`  ❌ No customer email`);
          results.errors.push({ orderRef, error: 'no_email' });
          continue;
        }
        
        // Enroll in Teachable
        const enrollResult = await enrollInTeachable(customerEmail, courseId, customerName);
        
        // Send WhatsApp notification
        await sendWhatsAppNotification(customerName, productName, customerEmail);
        
        processed[orderRef] = {
          enrolled: true,
          product: productName,
          courseId: courseId,
          email: customerEmail,
          name: customerName,
          whatsappSent: true,
          date: new Date().toISOString()
        };
        
        results.enrolled++;
        
      } catch (err) {
        console.log(`  ❌ Error: ${err.message}`);
        results.errors.push({ orderRef, error: err.message });
      }
    }
    
  } catch (err) {
    console.error('❌ Sync error:', err.message);
    results.errors.push({ error: err.message });
  }
  
  // Save state
  saveProcessedOrders(processed);
  saveLastSync(results);
  
  // Only output if there were enrollments (for cron notification)
  if (results.enrolled > 0) {
    console.log(`\n✅ Sequra sync: ${results.enrolled} nuevos estudiantes enrollados`);
  }
  // Silent if no enrollments
  
  return results;
}

// Run
sync().catch(console.error);
