/* ================================================================
   Модуль: Прайс-лист (таблица и форма КП)
   Версия: 1.0
   ================================================================ */

function initPrice() {
    if (typeof data === 'undefined' || !data.products || !data.products.corner) return;

    // --- Заполнение таблицы ---
    var tbody = document.getElementById('priceTableBody');

    if (tbody) {
        tbody.innerHTML = '';

        data.products.corner.forEach(function (p) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td class="table__name">' + p.title + '</td>' +
                '<td class="table__price">' + p.priceTo100.toFixed(2) + '</td>' +
                '<td class="table__price">' + p.priceTo500.toFixed(2) + '</td>' +
                '<td class="table__price">' + p.priceTo1000.toFixed(2) + '</td>' +
                '<td class="table__price">' + p.priceTo3000.toFixed(2) + '</td>' +
                '<td class="table__price">' + p.priceOver3000.toFixed(2) + '</td>';
            tbody.appendChild(tr);
        });
    }

    // --- Форма запроса КП ---
    var priceForm = document.getElementById('priceRequestForm');
    var priceSuccess = document.getElementById('priceFormSuccess');

    if (priceForm) {
        priceForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var consent = this.querySelector('input[type="checkbox"]');
            if (consent && !consent.checked) {
                alert('Дайте согласие на обработку персональных данных.');
                return;
            }

            var productSelect = document.getElementById('priceProduct');
            var quantity = document.getElementById('priceQuantity').value;
            var city = document.getElementById('priceCity').value;
            var name = document.getElementById('priceName').value;
            var phone = document.getElementById('pricePhone').value;
            var comment = document.getElementById('priceComment')
                ? document.getElementById('priceComment').value
                : '';

            if (!productSelect.value || !quantity || !city || !name || !phone) {
                alert('Заполните все обязательные поля.');
                return;
            }

            var productText = productSelect.options[productSelect.selectedIndex].text;
            var whatsapp = (typeof data !== 'undefined' && data.company && data.company.whatsapp)
                ? data.company.whatsapp
                : '79183268872';

            var msg = 'Здравствуйте! Запрос коммерческого предложения:\n' +
                'Товар: ' + productText + '\n' +
                'Объём: ' + quantity + ' п.м.\n' +
                'Город: ' + city + '\n' +
                'Имя: ' + name + '\n' +
                'Телефон: ' + phone;

            if (comment) {
                msg += '\nКомментарий: ' + comment;
            }

            window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(msg), '_blank');

            if (priceSuccess) {
                priceSuccess.style.display = 'block';
            }
            this.reset();
            setTimeout(function () {
                if (priceSuccess) priceSuccess.style.display = 'none';
            }, 10000);
        });
    }
}

// Автозапуск
document.addEventListener('DOMContentLoaded', initPrice);