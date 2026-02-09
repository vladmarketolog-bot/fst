// Form submission handler for Google Sheets integration
// Replace SCRIPT_URL with your Google Apps Script Web App URL

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxEknH519zTdeFtMe_Xn747dmGGS6SDTLRu51uCgKJFmV25bBewHlOvzudin8lY5FM5ZQ/exec';

let selectedOption = null;

document.addEventListener('DOMContentLoaded', function () {
    // Handle CTA option selection
    const ctaOptions = document.querySelectorAll('.cta-option');

    ctaOptions.forEach(option => {
        option.addEventListener('click', function () {
            // Remove selected state from all options
            ctaOptions.forEach(opt => {
                opt.classList.remove('ring-2', 'ring-blue-500', 'ring-purple-500', 'ring-green-500');
                const checkmark = opt.querySelector('.checkmark');
                if (checkmark) checkmark.classList.add('hidden');
            });

            // Add selected state to clicked option
            const optionType = this.dataset.option;
            selectedOption = optionType;

            // Add appropriate ring color
            if (optionType === 'government') {
                this.classList.add('ring-2', 'ring-blue-500');
            } else if (optionType === 'enterprise') {
                this.classList.add('ring-2', 'ring-purple-500');
            } else if (optionType === 'smb') {
                this.classList.add('ring-2', 'ring-green-500');
            }

            // Show checkmark
            const checkmark = this.querySelector('.checkmark');
            if (checkmark) {
                checkmark.classList.remove('hidden');
                // Reinitialize icons for the new checkmark
                lucide.createIcons();
            }
        });
    });

    // Handle form submission
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Отправка...';

        // Map option to readable format
        const optionLabels = {
            'government': 'Для госсектора',
            'enterprise': 'Для крупного бизнеса',
            'smb': 'Для среднего бизнеса'
        };

        // Collect form data
        const formData = {
            name: form.querySelector('[name="name"]').value,
            phone: form.querySelector('[name="phone"]').value,
            message: form.querySelector('[name="message"]').value,
            selectedOption: selectedOption ? optionLabels[selectedOption] : 'Не выбрано',
            timestamp: new Date().toLocaleString('ru-RU'),
            source: 'FST AI Website'
        };

        // Check if SCRIPT_URL is configured
        if (SCRIPT_URL.includes('YOUR_GOOGLE_SCRIPT_URL_HERE')) {
            console.error('Script URL not configured!');
            showNotification('Ошибка конфигурации: URL скрипта не установлен. Обратитесь к администратору.', 'error');
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            return;
        }

        try {
            // Send to Google Sheets
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                },
                body: JSON.stringify(formData)
            });

            // Show success message
            showNotification('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');

            // Reset form and selection
            form.reset();
            selectedOption = null;
            ctaOptions.forEach(opt => {
                opt.classList.remove('ring-2', 'ring-blue-500', 'ring-purple-500', 'ring-green-500');
                const checkmark = opt.querySelector('.checkmark');
                if (checkmark) checkmark.classList.add('hidden');
            });

        } catch (error) {
            console.error('Error:', error);
            showNotification('Произошла ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.', 'error');
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
});


function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification-toast');
    existingNotifications.forEach(n => n.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md transition-opacity duration-300 ${type === 'success'
        ? 'bg-green-500 text-white'
        : 'bg-red-500 text-white'
        }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

