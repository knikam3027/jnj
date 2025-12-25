// Test OpenAI integration directly
require('dotenv').config();
const OpenAI = require('openai');

async function testOpenAI() {
  console.log('🧪 Testing OpenAI API...\n');
  
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ No OPENAI_API_KEY found in environment');
    process.exit(1);
  }
  
  console.log('✅ API Key found:', apiKey.substring(0, 20) + '...');
  console.log('🔧 Model:', process.env.OPENAI_MODEL || 'gpt-4-turbo-preview');
  console.log('🌡️  Temperature:', process.env.AI_TEMPERATURE || '0.7');
  console.log('\n📤 Sending test message to OpenAI...\n');
  
  try {
    const openai = new OpenAI({ apiKey });
    
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4-turbo-preview',
      messages: [
        { 
          role: 'system', 
          content: 'You are OLI, a helpful AI assistant.' 
        },
        { 
          role: 'user', 
          content: 'Say hi in a friendly way!' 
        }
      ],
      temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
      max_tokens: 100
    });
    
    const response = completion.choices[0].message.content;
    
    console.log('✅ OPENAI RESPONSE RECEIVED:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(response);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('🎉 OpenAI integration is working!\n');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ OpenAI API Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

testOpenAI();
