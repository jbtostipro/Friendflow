document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('posts-container');

    fetch('data/posts.json')
        .then(response => response.json())
        .then(posts => {
            posts.forEach(post => {
                const postEl = document.createElement('div');
                postEl.className = 'post';

                const headerEl = document.createElement('div');
                headerEl.className = 'post-header';
                headerEl.innerHTML = `<span class="post-author">${post.author}</span>`;
                postEl.appendChild(headerEl);

                if (post.text) {
                    const textEl = document.createElement('p');
                    textEl.className = 'post-text';
                    textEl.textContent = post.text;
                    postEl.appendChild(textEl);
                }

                if (post.image) {
                    const imgEl = document.createElement('img');
                    imgEl.className = 'post-image';
                    imgEl.src = post.image;
                    imgEl.alt = 'post image';
                    postEl.appendChild(imgEl);
                }

                container.appendChild(postEl);
            });
        })
        .catch(err => {
            console.error("Erreur lors du chargement des posts :", err);
        });
});
