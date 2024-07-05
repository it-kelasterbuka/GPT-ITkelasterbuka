const apiKey = 'sk-proj-lXJ5gAkN7w3Btt1pNF2cT3BlbkFJqhu49bpbY67j4WfzvqQq';  // Ganti dengan API Key Anda
const endpoint = 'https://api.openai.com/v1/chat/completions';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('chat-form');
    const input = document.getElementById('user-input');
    const chatbox = document.getElementById('chatbox');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userMessage = input.value.trim();
        if (userMessage === '') return;

        chatbox.innerHTML += `
            <div class="message user">
                <div class="message-content">${userMessage}</div>
            </div>
        `;
        chatbox.scrollTop = chatbox.scrollHeight;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',  // Model yang digunakan
                    messages: [{ role: 'user', content: userMessage }],
                    max_tokens: 150  // Sesuaikan jumlah token sesuai kebutuhan
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            chatbox.innerHTML += `
                <div class="message bot">
                    <div class="message-content">${data.choices[0].message.content.trim()}</div>
                </div>
            `;
            chatbox.scrollTop = chatbox.scrollHeight;
        } catch (error) {
            console.error('Error fetching response from ChatGPT:', error);
            chatbox.innerHTML += `
                <div class="message bot">
                    <div class="message-content">Terjadi kesalahan. Coba lagi nanti.</div>
                </div>
            `;
        }

        input.value = '';
    });
});
