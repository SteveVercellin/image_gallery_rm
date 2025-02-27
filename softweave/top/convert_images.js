const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function convertToWebpAndResize(inputPath, outputPath) {
  try {
    let image = sharp(inputPath);
    let quality = 80;
    let webpBuffer = await image.webp({ quality }).toBuffer();

    while (webpBuffer.length > 2 * 1024 * 1024 && quality > 10) {
      quality -= 10;
      webpBuffer = await sharp(inputPath).webp({ quality }).toBuffer();
    }

    await fs.writeFile(outputPath, webpBuffer);
    console.log(`Converted and resized: ${outputPath}`);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

async function processImagesInDirectory(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.stat(filePath);

      if (stats.isFile() && /\.(jpe?g|png|gif|tiff?)$/i.test(file)) {
        const outputPath = path.join(directoryPath, file.replace(/\.(jpe?g|png|gif|tiff?)$/i, '.webp')); // Corrected line
        await convertToWebpAndResize(filePath, outputPath);
      } else if (stats.isDirectory()) {
        await processImagesInDirectory(filePath);
      }
    }
  } catch (error) {
    console.error('Error processing directory:', error);
  }
}

async function main() {
  try {
    const rootDirectory = __dirname;
    await processImagesInDirectory(rootDirectory);
    console.log('All images processed.');
  } catch (error) {
    console.error('Main error:', error);
  }
}

main();