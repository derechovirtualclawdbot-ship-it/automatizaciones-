#!/usr/bin/env node
/**
 * Create a MailerLite campaign from plain text content
 * Generates professional HTML email format
 */

const fs = require('fs');
const path = require('path');

function loadApiKey() {
  const envPath = path.join(__dirname, '../../../.env.mailerlite');
  if (!fs.existsSync(envPath)) {
    throw new Error(`API key file not found: ${envPath}`);
  }
  const content = fs.readFileSync(envPath, 'utf8');
  const match = content.match(/MAILERLITE_API_KEY=(.+)/);
  if (!match) {
    throw new Error('MAILERLITE_API_KEY not found in .env.mailerlite');
  }
  return match[1].trim();
}

function parseArgs() {
  const args = process.argv.slice(2);
  const params = {};
  
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace(/^--/, '').replace(/-/g, '_');
    const value = args[i + 1];
    params[key] = value;
  }
  
  const required = ['name', 'subject', 'from_name', 'from_email', 'content', 'group'];
  for (const field of required) {
    if (!params[field]) {
      throw new Error(`Missing required parameter: --${field.replace(/_/g, '-')}`);
    }
  }
  
  return params;
}

// Format inline elements (bold)
function formatInline(text) {
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

// Paragraph style
const pStyle = 'margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #333333;';

// Convert plain text to HTML blocks
function textToHtmlBlocks(text) {
  const blocks = text.split(/\n\s*\n/);
  const htmlBlocks = [];
  
  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;
    
    const lines = trimmed.split('\n').map(l => l.trim());
    
    // Check if numbered list (1. 2. 3.)
    const isNumberedList = lines.every(line => 
      line === '' || /^\d+\.\s/.test(line)
    );
    
    // Check if bullet list
    const bulletRegex = /^[•\-\*](?!\*)(\s|$)/;
    const isBulletList = lines.every(line => 
      line === '' || bulletRegex.test(line)
    );
    
    if (isNumberedList && lines.some(l => /^\d+\.\s/.test(l))) {
      // Numbered list as table (like the example)
      const items = lines
        .filter(l => /^\d+\.\s/.test(l))
        .map(l => {
          const match = l.match(/^(\d+)\.\s*(.+)$/);
          return { num: match[1], text: match[2] };
        });
      
      let listHtml = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 24px 0;">\n';
      for (const item of items) {
        listHtml += `  <tr>
    <td style="padding: 0 0 16px 20px; font-size: 16px; line-height: 1.6; color: #333333; vertical-align: top;" width="30">${item.num}.</td>
    <td style="padding: 0 0 16px 8px; font-size: 16px; line-height: 1.6; color: #333333; vertical-align: top;">${formatInline(item.text)}</td>
  </tr>\n`;
      }
      listHtml += '</table>';
      htmlBlocks.push(listHtml);
      
    } else if (isBulletList && lines.some(l => bulletRegex.test(l))) {
      // Bullet list as table
      const items = lines
        .filter(l => bulletRegex.test(l))
        .map(l => l.replace(/^[•\-\*]\s*/, ''));
      
      let listHtml = '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 24px 0;">\n';
      for (const item of items) {
        listHtml += `  <tr>
    <td style="padding: 0 0 16px 20px; font-size: 16px; line-height: 1.6; color: #333333; vertical-align: top;" width="30">•</td>
    <td style="padding: 0 0 16px 8px; font-size: 16px; line-height: 1.6; color: #333333; vertical-align: top;">${formatInline(item)}</td>
  </tr>\n`;
      }
      listHtml += '</table>';
      htmlBlocks.push(listHtml);
      
    } else {
      // Regular paragraph
      const paragraphText = lines.map(l => formatInline(l)).join('<br>\n');
      htmlBlocks.push(`<p style="${pStyle}">${paragraphText}</p>`);
    }
  }
  
  return htmlBlocks.join('\n\n');
}

// Wrap in professional email template
function wrapHtml(content) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f4f4;">
    <tr>
      <td align="center" style="padding: 30px 10px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 4px; max-width: 600px;">
          <tr>
            <td style="padding: 40px 40px 36px 40px;">
${content}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

async function createCampaign(apiKey, params) {
  const contentPath = params.content;
  if (!fs.existsSync(contentPath)) {
    throw new Error(`Content file not found: ${contentPath}`);
  }
  
  const plainText = fs.readFileSync(contentPath, 'utf8');
  const htmlBody = textToHtmlBlocks(plainText);
  
  // Indent content for template
  const indentedContent = htmlBody.split('\n').map(l => '              ' + l).join('\n');
  const htmlContent = wrapHtml(indentedContent);
  
  if (process.env.DEBUG) {
    console.error('\n=== Generated HTML ===');
    console.error(htmlContent);
    console.error('======================\n');
  }
  
  const payload = {
    name: params.name,
    type: 'regular',
    emails: [{
      subject: params.subject,
      from_name: params.from_name,
      from: params.from_email,
      content: htmlContent
    }],
    groups: [params.group]
  };
  
  const response = await fetch('https://connect.mailerlite.com/api/campaigns', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(`API error: ${JSON.stringify(data)}`);
  }
  
  return data;
}

async function main() {
  try {
    const apiKey = loadApiKey();
    const params = parseArgs();
    
    console.error('Creating campaign...');
    console.error(`  Name: ${params.name}`);
    console.error(`  Subject: ${params.subject}`);
    console.error(`  From: ${params.from_name} <${params.from_email}>`);
    console.error(`  Content: ${params.content}`);
    console.error(`  Group: ${params.group}`);
    
    const result = await createCampaign(apiKey, params);
    
    console.error('\nCampaign created successfully!');
    console.log(result.data.id);
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

main();
