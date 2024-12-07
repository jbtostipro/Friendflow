document.addEventListener('DOMContentLoaded', () => {
    let conversationsData = [];
    const conversationsList = document.getElementById('conversations-ul');
    const messagesContainer = document.getElementById('messages-container');
    const convTitle = document.getElementById('conv-title');
    const messageForm = document.getElementById('message-form');
    const newMessageInput = document.getElementById('new-message-input');

    fetch('data/conversations.json')
        .then(res => res.json()) 
        .then(data => {
            conversationsData = data; // Stockage des données dans le tableau conversationsData
            renderConversationsList(); // Affichage de la liste des conversations
            const urlParams = new URLSearchParams(window.location.search); // verification URL
            const convId = urlParams.get('conversationId');
            if(convId) {
                const conv = conversationsData.find(c => c.id == convId);
                if(conv) {
                    showConversation(conv);
                }
            }
        })
        .catch(err => console.error("Erreur chargement conversations :", err));

    // Fonction pour afficher la liste des conversations
    function renderConversationsList() {
        conversationsList.innerHTML = '';
        conversationsData.forEach(conv => {
            const li = document.createElement('li');
            const lastMessage = conv.messages[conv.messages.length -1]; // dernier message
            // On insère le nom du contact, l'image et le dernier message
            li.innerHTML = `
                <div class="conv-contact">
                    <img src="${conv.contactImage}" alt="${conv.contactName}" class="conv-img"/>
                    <div>
                        <strong>${conv.contactName}</strong><br>
                        <small>${lastMessage ? lastMessage.text : ''}</small>
                    </div>
                </div>
            `;
            li.addEventListener('click', () => {
                showConversation(conv);
            });
            conversationsList.appendChild(li);
        });
    }

    // Fonction pour afficher une conversation donnée
    function showConversation(conv) {
       /*  console.log(conv); */
        convTitle.textContent = conv.contactName; 
        messagesContainer.innerHTML = '';
        //  boucle sur les messages de la conversation
        conv.messages.forEach(msg => {
            const msgEl = document.createElement('div');
            msgEl.className = 'message';
            msgEl.innerHTML = `
                <div class="message-author">${msg.author}</div>
                <div class="message-text">${msg.text}</div>
                <div class="message-timestamp">${msg.timestamp}</div>
            `;
            messagesContainer.appendChild(msgEl);
        });

        messageForm.style.display='flex';
        

        messageForm.onsubmit = (e) => {
            e.preventDefault(); // Empêche le rechargement de la page
            const val = newMessageInput.value.trim(); // Récupère le texte entré par l'utilisateur
            if(val) {
                const newMsg = {
                    "author":"me",
                    "text": val,
                    "timestamp": new Date().toLocaleString()
                };
                conv.messages.push(newMsg); // nouveau message
                newMessageInput.value = '';
                showConversation(conv);
                renderConversationsList(); // MAJ 
            }
        };
    }
});
