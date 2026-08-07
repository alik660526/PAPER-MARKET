/* ================================================================
   Модуль: Формы (калькулятор, образцы, обратная связь)
   Версия: 1.0
   ================================================================ */

function initForms() {
    const whatsapp = (typeof data !== 'undefined' && data.company && data.company.whatsapp)
        ? data.company.whatsapp
        : '79183268872';

    // --- Калькулятор на главной ---
    const calcForm = document.getElementById('calcForm');
    const calcResult = document.getElementById('indexResult');

    if (calcForm) {
        calcForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const consent = this.querySelector('input[type="checkbox"]');
            if (consent && !consent.checked) {
                alert('Дайте согласие на обработку персональных данных.');
                return;
            }

            const productSelect = document.getElementById('indexProductSelect');
            const quantity = document.getElementById('indexQuantity').value;
            const city = document.getElementById('indexCity').value;
            const phone = document.getElementById('indexPhone').value;

            if (!productSelect.value || !quantity || !city || !phone) {
                alert('Заполните все поля.');
                return;
            }

            let productName = '';
            if (typeof data !== 'undefined' && data.products && data.products.corner) {
                const found = data.products.corner.find(p => p.id == productSelect.value);
                if (found) productName = found.title;
            }

            const msg = 'Здравствуйте! Хочу получить расчёт:\n' +
                'Товар: ' + productName + '\n' +
                'Количество: ' + quantity + ' п.м.\n' +
                'Город: ' + city + '\n' +
                'Телефон: ' + phone;

            window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(msg), '_blank');

            if (calcResult) {
                calcResult.style.display = 'block';
                calcResult.innerHTML = '<p>✅ Спасибо! Запрос отправлен.</p>';
            }
            this.reset();
            setTimeout(function () {
                if (calcResult) calcResult.style.display = 'none';
            }, 10000);
        });
    }

    // --- Форма тестовых образцов ---
    const samplesForm = document.getElementById('samplesForm');
    const samplesResult = document.getElementById('samplesResult');

    if (samplesForm) {
        samplesForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const consent = this.querySelector('input[type="checkbox"]');
            if (consent && !consent.checked) {
                alert('Дайте согласие на обработку персональных данных.');
                return;
            }

            const name = document.getElementById('samplesName').value;
            const phone = document.getElementById('samplesPhone').value;
            const product = document.getElementById('samplesProduct').value;

            if (!name || !phone || !product) {
                alert('Заполните обязательные поля.');
                return;
            }

            const msg = 'Здравствуйте! Запрос на тестовые образцы:\n' +
                'Имя: ' + name + '\n' +
                'Телефон: ' + phone + '\n' +
                'Продукт: ' + product;

            window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(msg), '_blank');

            if (samplesResult) {
                samplesResult.style.display = 'block';
            }
            this.reset();
            setTimeout(function () {
                if (samplesResult) samplesResult.style.display = 'none';
            }, 10000);
        });
    }

    // --- Форма обратной связи ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const consent = this.querySelector('input[type="checkbox"]');
            if (consent && !consent.checked) {
                alert('Дайте согласие на обработку персональных данных.');
                return;
            }

            const name = this.querySelector('input[name="name"]').value;
            const phone = this.querySelector('input[name="phone"]').value;
            const message = this.querySelector('textarea[name="message"]').value || '';

            if (!name || !phone) {
                alert('Заполните имя и телефон.');
                return;
            }

            const msg = 'Сообщение с сайта:\n' +
                'Имя: ' + name + '\n' +
                'Телефон: ' + phone + '\n' +
                'Сообщение: ' + message;

            window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(msg), '_blank');
            this.reset();
        });
    }
}

// Автозапуск
document.addEventListener('DOMContentLoaded', initForms);