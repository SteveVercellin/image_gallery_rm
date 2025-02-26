document.addEventListener('DOMContentLoaded', function() {
    const imageContainers = document.querySelectorAll('.image-container');

    imageContainers.forEach(container => {
        const img = container.querySelector('img');
        const topUrl = img.src;
        const detailsUrl = topUrl.replace('/top/', '/details/').replace(/-TOP\.webp$/, '-DETAILS.webp');

        container.addEventListener('mouseover', () => {
            img.src = detailsUrl;
            img.style.objectFit = 'cover';
        });

        container.addEventListener('mouseout', () => {
            img.src = topUrl;
            img.style.objectFit = 'contain';
        });
    });
});