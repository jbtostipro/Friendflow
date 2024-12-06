document.addEventListener('DOMContentLoaded', () => {
    const friendsList = document.getElementById('friends-list');
    let draggedItem = null;

    // Drag & Drop
    friendsList.addEventListener('dragstart', (e) => {
        if(e.target.classList.contains('friend-item')){
            draggedItem = e.target;
            e.dataTransfer.effectAllowed = 'move';
        }
    });

    friendsList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const element = e.target.closest('.friend-item');
        if(element && element !== draggedItem) {
            const bounding = element.getBoundingClientRect();
            const offset = bounding.y + bounding.height/2;
            if(e.clientY - offset > 0) {
                // déplacer en dessous
                element.insertAdjacentElement('afterend', draggedItem);
            } else {
                // déplacer au-dessus
                element.insertAdjacentElement('beforebegin', draggedItem);
            }
        }
    });

    friendsList.addEventListener('drop', (e) => {
        e.preventDefault();
        draggedItem = null;
    });
});
