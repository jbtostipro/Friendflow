document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('posts-container');
    const imageModal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.getElementById('close-modal');

    fetch('data/posts.json')
        .then(res => res.json())
        .then(posts => {
            posts.forEach(post => {
                const postEl = document.createElement('div');
                postEl.className = 'post';

                // Auteur
                const headerEl = document.createElement('div');
                headerEl.className = 'post-header';
                headerEl.innerHTML = `<span class="post-author">${post.author}</span>`;
                postEl.appendChild(headerEl);

                // Texte
                if (post.text) {
                    const textEl = document.createElement('p');
                    textEl.className = 'post-text';
                    textEl.textContent = post.text;
                    postEl.appendChild(textEl);
                }

                // Image (clic = plein écran)
                if (post.image) {
                    const imgEl = document.createElement('img');
                    imgEl.className = 'post-image';
                    imgEl.src = post.image;
                    imgEl.alt = 'post image';
                    imgEl.addEventListener('click', () => {
                        modalImg.src = post.image;
                        imageModal.style.display = 'flex';
                    });
                    postEl.appendChild(imgEl);
                }

                // Réactions
                const reactionsEl = document.createElement('div');
                reactionsEl.className = 'reactions';
                ['👍','👎','❤️'].forEach(emoji => {
                    const btn = document.createElement('button');
                    btn.textContent = emoji;
                    btn.addEventListener('click', () => animateReaction(btn, emoji));
                    reactionsEl.appendChild(btn);
                });
                postEl.appendChild(reactionsEl);

                // Commentaires 
                const commentsContainer = document.createElement('div');
                commentsContainer.className = 'comments-container';
                const commentsTitle = document.createElement('h3');
                commentsTitle.textContent = 'Commentaires';
                commentsContainer.appendChild(commentsTitle);

                const commentsList = document.createElement('div');
                commentsList.className = 'comments-list';
                (post.comments || []).forEach(c => {
                    const cEl = document.createElement('div');
                    cEl.className = 'comment';
                    cEl.innerHTML = `<span class="comment-author">${c.author}:</span> ${c.text}`;
                    commentsList.appendChild(cEl);
                });
                commentsContainer.appendChild(commentsList);

                const addCommentForm = document.createElement('form');
                addCommentForm.className = 'add-comment-form';
                const commentInput = document.createElement('input');
                commentInput.type = 'text';
                commentInput.placeholder = 'Votre commentaire...';

                const commentBtn = document.createElement('button');
                commentBtn.type = 'submit';
                commentBtn.textContent = 'Envoyer';
                addCommentForm.append(commentInput, commentBtn);

                addCommentForm.addEventListener('submit', e => {
                    e.preventDefault();
                    const val = commentInput.value.trim();
                    if (val) {
                        const newC = document.createElement('div');
                        newC.className = 'comment';
                        newC.innerHTML = `<span class="comment-author">Vous:</span> ${val}`;
                        commentsList.appendChild(newC);
                        commentInput.value = '';
                    }
                });

                commentsContainer.appendChild(addCommentForm);
                postEl.appendChild(commentsContainer);

                container.appendChild(postEl);
            });
        })
        .catch(err => console.error("Erreur chargement posts:", err));

    // Modal fermeture
    window.addEventListener('click', e => {
        if(e.target === imageModal){
            imageModal.style.display = 'none';
            modalImg.src = '';
        }
    });

    function animateReaction(button, emoji) { // affichier l'émoji puis il disparrait
        const particle = document.createElement('span');
        particle.textContent = emoji;
        particle.style.position = 'absolute';
        particle.style.fontSize = '2rem';
        const rect = button.getBoundingClientRect();
        particle.style.left = (rect.left + window.scrollX + rect.width/2) + 'px';
        particle.style.top = (rect.top + window.scrollY + rect.height/2) + 'px';
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.animation = 'fly 1s ease-out forwards';
        particle.style.zIndex = 9999;
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
});
