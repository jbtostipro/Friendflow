document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('posts-container');  
    const imageModal = document.getElementById('image-modal');    
    const modalImg = document.getElementById('modal-img');        
    const closeModal = document.getElementById('close-modal');     

    // Récupère les posts depuis le fichier JSON
    fetch('data/posts.json')
        .then(r => r.json())
        .then(posts => {
            // Pour chaque post, crée la structure HTML correspondante
            posts.forEach(post => {
                const postEl = document.createElement('div');
                postEl.className = 'post';

                // Auteur du post
                const headerEl = document.createElement('div');
                headerEl.className = 'post-header';
                headerEl.innerHTML = `<span class="post-author">${post.author}</span>`;
                postEl.appendChild(headerEl);

                // Texte du post 
                if (post.text) {
                    const textEl = document.createElement('p');
                    textEl.className = 'post-text';
                    textEl.textContent = post.text;
                    postEl.appendChild(textEl);
                }

                // Image du post 
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

                // Bloc de réactions
                const reactionsEl = document.createElement('div');
                reactionsEl.className = 'reactions';
                ['👍','👎','❤️'].forEach(emoji => {
                    const btn = document.createElement('button');
                    btn.textContent = emoji;
                    // Au clic sur un bouton de réaction, lance l'animation de particules
                    btn.addEventListener('click', () => animateReaction(btn, emoji));
                    reactionsEl.appendChild(btn);
                });
                postEl.appendChild(reactionsEl);

                // Bloc des commentaires
                const commentsTitle = document.createElement('h3');
                commentsTitle.textContent = 'Commentaires';
                commentsContainer.appendChild(commentsTitle);
                const commentsContainer = document.createElement('div');
                commentsContainer.className = 'comments-container';

                // Liste des commentaires existants
                const commentsList = document.createElement('div');
                commentsList.className = 'comments-list';
                (post.comments || []).forEach(c => {
                    const cEl = document.createElement('div');
                    cEl.className = 'comment';
                    cEl.innerHTML = `<span class="comment-author">${c.author}:</span> ${c.text}`;
                    commentsList.appendChild(cEl);
                });
                commentsContainer.appendChild(commentsList);

                // Formulaire pour ajouter un nouveau commentaire
                const addCommentForm = document.createElement('form');
                addCommentForm.className = 'add-comment-form';

                const commentInput = document.createElement('input');
                commentInput.type = 'text';
                commentInput.placeholder = 'Votre commentaire...';

                const commentBtn = document.createElement('button');
                commentBtn.type = 'submit';
                commentBtn.textContent = 'Envoyer';

                addCommentForm.append(commentInput, commentBtn);

                // Quand le formulaire est soumis, on ajoute le commentaire tapé
                addCommentForm.addEventListener('submit', e => {
                    e.preventDefault();
                    const val = commentInput.value.trim();
                    if(val) {
                        const newC = document.createElement('div');
                        newC.className = 'comment';
                        newC.innerHTML = `<span class="comment-author">Vous:</span> ${val}`;
                        commentsList.appendChild(newC);
                        commentInput.value = '';
                    }
                });

                commentsContainer.appendChild(addCommentForm);
                postEl.appendChild(commentsContainer);

                // Ajoute le post complet au conteneur principal
                container.appendChild(postEl);
            });
        })
        .catch(err => console.error("Erreur chargement posts:", err));



});
