const express = require('express');
const app = express();

// Render จะกำหนด PORT ให้ผ่าน env
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('🌤️ Blue Sky Bot Web Service is online!');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
