async function upscaleWebp(filePath, scaleFactor) {
    try {
        const sharp = (await import('sharp')).default;
        const fs = require('fs').promises;
        const path = require('path');

        const upscaledBuffer = await sharp(filePath)
            .resize({
                width: null,
                height: null,
                factor: scaleFactor,
                kernel: sharp.kernel.lanczos3,
            })
            .webp({ quality: 90 })
            .toBuffer();

        await fs.writeFile(filePath, upscaledBuffer);
        console.log(`Upscaled and overwritten: ${filePath}`);
    } catch (error) {
        console.error(`Error upscaling ${filePath}:`, error);
    }
}

async function processWebpImagesInDirectory(directoryPath, scaleFactor) {
    try {
        const fs = require('fs').promises;
        const path = require('path');
        const files = await fs.readdir(directoryPath);

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile() && file.toLowerCase().endsWith('.webp')) {
                await upscaleWebp(filePath, scaleFactor);
            } else if (stats.isDirectory()) {
                await processWebpImagesInDirectory(filePath, scaleFactor);
            }
        }
    } catch (error) {
        console.error('Error processing directory:', error);
    }
}

async function main() {
    try {
        const rootDirectory = __dirname;
        const scaleFactor = 2;
        await processWebpImagesInDirectory(rootDirectory, scaleFactor);
        console.log('All WebP images upscaled and overwritten.');
    } catch (error) {
        console.error('Main error:', error);
    }
}

main();