const crypto = require('crypto');

// Generate a secure random secret
const secret = crypto.randomBytes(32).toString('base64');

console.log('\n==============================================');
console.log('🔐 AUTH SECRET GENERADO');
console.log('==============================================\n');
console.log('Agrega esta línea a tu archivo .env:\n');
console.log(`AUTH_SECRET="${secret}"`);
console.log('\n==============================================\n');

