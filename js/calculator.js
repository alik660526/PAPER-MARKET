/* ================================================================
   Модуль: Калькулятор (calculator.html)
   Версия: 1.0
   ================================================================ */

function initCalculator() {
    if (typeof data === 'undefined' || !data.products || !data.products.corner) return;

    var select = document.getElementById('productSelect');
    var calcBtn = document.getElementById('calcBtn');
    var quantityInput = document.getElementById('quantity');
    var totalPrice = document.getElementById('totalPrice');
    var unitPrice = document.getElementById('unitPrice');
    var orderBtn = document.getElementById('orderBtn');

    if (!select || !calcBtn) return;

    var corners = data.products.corner;

    // Заполнение селекта
    corners.forEach(function (p) {
        var opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.title + ' (от ' + p.priceMin.toFixed(2) + ' ₽/п.м.)';
        select.appendChild(opt);
    });

    // Кнопка «Рассчитать»
    calcBtn.addEventListener('click', function () {
        var id = parseInt(select.value);
        var qty = parseInt(quantityInput ? quantityInput.value : 0) || 0;

        var product = null;
        for (var i = 0; i < corners.length; i++) {
            if (corners[i].id === id) {
                product = corners[i];
                break;
            }
        }

        if (!product || qty < 1) {
            if (totalPrice) totalPrice.textContent = '0';
            if (unitPrice) unitPrice.textContent = '0';
            return;
        }

        var pricePerUnit = product.priceOver3000;
        if (qty <= 100) pricePerUnit = product.priceTo100;
        else if (qty <= 500) pricePerUnit = product.priceTo500;
        else if (qty <= 1000) pricePerUnit = product.priceTo1000;
        else if (qty <= 3000) pricePerUnit = product.priceTo3000;

        var total = pricePerUnit * qty;

        if (totalPrice) totalPrice.textContent = total.toFixed(2);
        if (unitPrice) unitPrice.textContent = pricePerUnit.toFixed(2);
    });

    // Кнопка «Заказать»
    if (orderBtn) {
        orderBtn.addEventListener('click', function () {
            if (orderBtn.disabled) return;

            var consent = document.querySelector('#contactForm input[type="checkbox"]');
            if (consent && !consent.checked) {
                alert('Дайте согласие на обработку персональных данных.');
                return;
            }

            orderBtn.disabled = true;
            orderBtn.textContent = 'Отправка...';

            var id = parseInt(select.value);
            var qty = parseInt(quantityInput ? quantityInput.value : 0) || 0;
            var total = totalPrice ? totalPrice.textContent : '0';

            var product = null;
            for (var i = 0; i < corners.length; i++) {
                if (corners[i].id === id) {
                    product = corners[i];
                    break;
                }
            }

            if (!product || qty < 1) {
                alert('Выберите товар и укажите количество.');
                orderBtn.disabled = false;
                orderBtn.textContent = 'Отправить заявку';
                return;
            }

            var whatsapp = (typeof data !== 'undefined' && data.company && data.company.whatsapp)
                ? data.company.whatsapp
                : '79183268872';

            var msg = 'Здравствуйте! Хочу заказать ' + product.title +
                ' в количестве ' + qty + ' п.м. Общая стоимость: ' + total + ' ₽.';

            window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(msg), '_blank');

            setTimeout(function () {
                orderBtn.disabled = false;
                orderBtn.textContent = 'Отправить заявку';
            }, 3000);
        });
    }
}

// Автозапуск
document.addEventListener('DOMContentLoaded', initCalculator);