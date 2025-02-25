async function resizeAndCompressImage(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = function (event) {
        const img = new Image();
  
        img.onload = function () {
          const maxWidth = 1000;
          let width = img.width;
          let height = img.height;
  
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
  
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
  
          let quality = 0.9; // Initial quality (0-1)
          let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
  
          function checkSizeAndCompress(dataUrl) {
            const byteLength = (dataUrl.length * 3) / 4 - dataUrl.lastIndexOf('=', dataUrl.length) / 3; // Approximate byte size from data URL
            const maxSize = 2 * 1024 * 1024; // 2MB
  
            if (byteLength > maxSize && quality > 0.1) { //0.1 is the minimum quality, to avoid infinite loops.
              quality -= 0.1; // Reduce quality
              compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
              checkSizeAndCompress(compressedDataUrl);
            } else {
              resolve(compressedDataUrl);
            }
          }
  
          checkSizeAndCompress(compressedDataUrl);
        };
  
        img.onerror = reject; // Handle image load errors
        img.src = event.target.result;
      };
  
      reader.onerror = reject; // Handle file read errors
      reader.readAsDataURL(file);
    });
  }
  
  // Example usage:
  async function processFile(file) {
    try {
      const compressedDataUrl = await resizeAndCompressImage(file);
      // Now you have the compressed data URL. You can use it to display the image,
      // upload it, etc.
      console.log('Compressed image data URL:', compressedDataUrl);
  
      // Create an image element to display the compressed image.
      const imgElement = document.createElement('img');
      imgElement.src = compressedDataUrl;
      document.body.appendChild(imgElement);
  
    } catch (error) {
      console.error('Error processing image:', error);
    }
  }
  
  // Example: Get a file from an input element
  const inputElement = document.getElementById('imageInput'); // Assuming an <input type="file" id="imageInput"> exists
  
  inputElement.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  });
