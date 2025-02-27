const sharp = require('sharp');

sharp('PRL-2001-TOP.webp')
    .resize(1920)
    .webp({ quality: 70 })
    .toFile('PRL-2001-resized.webp')
    .then(() => console.log('Success!'))
    .catch((err) => console.error('Error:', err));