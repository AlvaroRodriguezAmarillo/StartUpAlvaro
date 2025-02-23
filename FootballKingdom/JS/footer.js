document.querySelector('.sitemap-toggle').addEventListener('click', function(e) {
    e.preventDefault();
    const content = document.querySelector('.sitemap-content');
    content.classList.toggle('active');
});

