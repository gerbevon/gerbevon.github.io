/* jshint esversion: 8 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMsg = document.getElementById('success-message');
    const errorMsg = document.getElementById('error-message');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');

    // ВАШИ ДАННЫЕ TELEGRAM БОТА
    const TELEGRAM_BOT_TOKEN = '8579415616:AAEt8e1j_1aD6VAV5BdLuy5z_azCe_djFxA'; 
    const TELEGRAM_CHAT_ID = '-1003700242342'; 

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            // 1. Меняем вид кнопки во время отправки
            submitBtn.disabled = true;
            submitBtn.classList.add('bg-blue-400', 'cursor-not-allowed');
            submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            btnText.textContent = 'Отправка...';
            if (btnIcon) btnIcon.classList.add('hidden');
            
            // 2. Скрываем прошлые сообщения
        successMsg.classList.add('hidden');
        errorMsg.classList.add('hidden');

        // 3. Собираем данные из полей формы
        const name = document.getElementById('name').value;
        const contactInfo = document.getElementById('email').value; // Теперь сюда попадает любой текст
        const message = document.getElementById('message').value;

        // 4. Формируем красивое сообщение для Telegram 
        const messageText = `🔥 <b>Новая заявка (Портфолио)</b>\n\n👤 <b>Имя:</b> ${name}\n💬 <b>Контакт:</b> ${contactInfo}\n📝 <b>Сообщение:</b>\n${message}`;

        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        try {
            // 5. Отправляем запрос в Telegram
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: messageText,
                        parse_mode: 'HTML'
                    })
                });

                // Скрываем форму после нажатия
                form.classList.add('hidden');

                if (response.ok) {
                    // УСПЕХ: Показываем галочку
                    successMsg.classList.remove('hidden');
                    form.reset(); // Очищаем поля
                    
                    // Возвращаем пустую форму через 4 секунды
                    setTimeout(() => {
                        form.classList.remove('hidden');
                        successMsg.classList.add('hidden');
                    }, 4000);
                } else {
                    // ОШИБКА TELEGRAM
                    errorMsg.classList.remove('hidden');
                    console.error('Telegram API Error');
                    
                    setTimeout(() => {
                        form.classList.remove('hidden');
                        errorMsg.classList.add('hidden');
                    }, 4000);
                }
            } catch (error) {
                // ОШИБКА СЕТИ (нет интернета)
                form.classList.add('hidden');
                errorMsg.classList.remove('hidden');
                console.error('Fetch Error:', error);
                
                setTimeout(() => {
                    form.classList.remove('hidden');
                    errorMsg.classList.add('hidden');
                }, 4000);
            } finally {
                // 6. В любом случае возвращаем кнопку в исходное состояние
                submitBtn.disabled = false;
                submitBtn.classList.remove('bg-blue-400', 'cursor-not-allowed');
                submitBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
                btnText.textContent = 'Отправить сообщение';
                if (btnIcon) btnIcon.classList.remove('hidden');
            }
        });
    }
});