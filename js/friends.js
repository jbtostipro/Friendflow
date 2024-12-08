document.addEventListener('DOMContentLoaded', () => {
    const friendsList = document.getElementById('friends-list');
    const filterInput = document.getElementById('friend-filter');

    filterInput.addEventListener('input', () => {
        const val = filterInput.value.toLowerCase();
        const items = friendsList.querySelectorAll('.friend-item');
        items.forEach(item => {
            const name = item.querySelector('.friend-name').textContent.toLowerCase();
            if(name.includes(val)) {
                item.style.display='';
            } else {
                item.style.display='none';
            }
        });
    });
});
