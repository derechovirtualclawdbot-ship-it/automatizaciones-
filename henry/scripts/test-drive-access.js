#!/usr/bin/env node
/**
 * Test Google Drive access with Service Account
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(process.env.HOME, '.openclaw/credentials/google-service-account.json');
const FOLDER_ID = '1o_wM4Ai99JR2YQ1MHzM8JLeHWeV97bCQ'; // Carpeta de sincronización

async function main() {
  console.log('🔑 Loading credentials...');
  
  const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf8'));
  
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive']
  });
  
  const drive = google.drive({ version: 'v3', auth });
  
  console.log('📂 Testing access to folder...\n');
  
  try {
    // Test 1: List files in folder
    const list = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType)',
      pageSize: 20
    });
    
    console.log('✅ READ ACCESS OK - Files in folder:');
    if (list.data.files.length === 0) {
      console.log('   (carpeta vacía)');
    } else {
      list.data.files.forEach(f => {
        const icon = f.mimeType.includes('folder') ? '📁' : '📄';
        console.log(`   ${icon} ${f.name}`);
      });
    }
    
    // Test 2: Create a test file
    console.log('\n📝 Testing write access...');
    const testFile = await drive.files.create({
      requestBody: {
        name: 'TEST_WRITE_ACCESS.txt',
        parents: [FOLDER_ID]
      },
      media: {
        mimeType: 'text/plain',
        body: `Test file created by OpenClaw bot at ${new Date().toISOString()}`
      },
      fields: 'id, name'
    });
    
    console.log(`✅ WRITE ACCESS OK - Created: ${testFile.data.name} (${testFile.data.id})`);
    
    // Test 3: Delete the test file
    console.log('\n🗑️  Cleaning up test file...');
    await drive.files.delete({ fileId: testFile.data.id });
    console.log('✅ DELETE ACCESS OK');
    
    console.log('\n🎉 ALL TESTS PASSED - Full access confirmed!');
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.message.includes('not found') || error.message.includes('404')) {
      console.error('\n⚠️  La carpeta no está compartida con la cuenta de servicio.');
      console.error('   Comparte la carpeta con: openclaw@rosy-listener-486405-a9.iam.gserviceaccount.com');
    }
    process.exit(1);
  }
}

main();
