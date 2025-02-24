// gallery.js

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    if (!gallery) {
        console.log("Gallery element not found.");
        return;
    }

    console.log("lightgallery initialization started");

    const imageContainers = gallery.querySelectorAll('.image-container');

    imageContainers.forEach(container => {
        const img = container.querySelector('img');
        if (!img) return;

        const link = document.createElement('a');
        link.href = img.src;
        link.dataset.src = img.src;

        while (container.firstChild) {
            link.appendChild(container.firstChild);
        }

        container.appendChild(link);
    });

    lightGallery(gallery, {
        selector: 'a',
        thumbnail: false,
        share: false,
        download: false
    });

    console.log("lightgallery initialization completed");
});