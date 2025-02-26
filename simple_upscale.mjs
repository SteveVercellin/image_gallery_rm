import Upscaler from 'upscaler';
import esrgan from '@upscalerjs/esrgan-thick';

async function testUpscaler() {
    try {
        const upscaler = new Upscaler({
            model: esrgan,
        });
        console.log("Upscaler initialized successfully!");
    } catch (error) {
        console.error("Error initializing Upscaler:", error);
    }
}

testUpscaler();