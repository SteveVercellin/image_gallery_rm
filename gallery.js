// gallery.js

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) return; // Exit if no gallery element found

    const imageContainers = gallery.querySelectorAll('.image-container');

    imageContainers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return; // Exit if no image found

        const caption = container.querySelector('p');
        const imgSource = img.src; // Get the thumbnail src
        const fullSizeSource = imgSource.replace(/thumbnail/, 'fullsize'); // Create fullsize src

        // Create the <a> tag
        const link = document.createElement('a');
        link.href = "#"; // Placeholder, lightgallery will override this
        link.dataset.src = fullSizeSource;

        // Move the <img> and <p> into the <a>
        while (container.firstChild) {
            link.appendChild(container.firstChild);
        }

        // Append the <a> to the container
        container.appendChild(link);
    });

    lightGallery(gallery, {
        selector: 'a',
        thumbnail: false,
        share: false,
        download: false
    });
});