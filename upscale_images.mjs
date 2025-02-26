import Upscaler from 'upscaler';
import { promises as fs } from 'fs';
import path from 'path';
import tf from '@tensorflow/tfjs-node';
import esrgan from '@upscalerjs/esrgan-thick';

async function upscaleImage(inputPath, outputPath) {
    try {
        const upscaler = new Upscaler({
            model: esrgan,
            warmupSizes: [{ patchSize: 64, padding: 6 }],
        });

        const imageBuffer = await fs.readFile(inputPath);
        const imageTensor = tf.node.decodeImage(imageBuffer);

        const upscaledTensor = await upscaler.upscale(imageTensor);

        const upscaledBuffer = await tf.node.encodePng(upscaledTensor);

        await fs.writeFile(outputPath, upscaledBuffer);
        console.log(`Upscaled: ${outputPath}`);
    } catch (error) {
        console.error('Error upscaling image:', error);
    }
}

async function processImagesInDirectory(directoryPath) {
    try {
        const files = await fs.readdir(directoryPath);

        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile() && /\.(jpe?g|png|webp)$/i.test(file)) {
                const outputPath = path.join(directoryPath, `upscaled_${file}`);
                await upscaleImage(filePath, outputPath);
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
        console.log('All images upscaled.');
    } catch (error) {
        console.error('Main error:', error);
    }
}

main();