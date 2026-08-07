/* ================================================================
   Модуль: Карточка товара (product.html)
   Версия: 1.0
   ================================================================ */

function initProduct() {
    var container = document.getElementById('productContainer');
    if (!container || typeof data === 'undefined') return;

    var params = new URLSearchParams(window.location.search);
    var id = params.get('id');

    if (!id) {
        container.innerHTML =
            '<div style="text-align:center;padding:60px 0;">' +
                '<p style="font-size:1.2rem;">Товар не выбран.</p>' +
                '<a href="catalog.html" class="btn btn--primary" style="margin-top:15px;">Перейти в каталог</a>' +
            '</div>';
        return;
    }

    var product = findProductById(id);

    if (!product) {
        container.innerHTML =
            '<div style="text-align:center;padding:60px 0;">' +
                '<p style="font-size:1.2rem;">Товар не найден.</p>' +
                '<a href="catalog.html" class="btn btn--primary" style="margin-top:15px;">Вернуться в каталог</a>' +
            '</div>';
        return;
    }

    renderProduct(product);
}

function findProductById(id) {
    if (typeof data === 'undefined' || !data.products) return null;

    var all = [];
    if (data.products.corner) all = all.concat(data.products.corner);
    if (data.products.fluting) all = all.concat(data.products.fluting);
    if (data.products.karton) all = all.concat(data.products.karton);

    for (var i = 0; i < all.length; i++) {
        if (String(all[i].id) === String(id)) return all[i];
    }
    return null;
}

function renderProduct(product) {
    // Хлебные крошки
    var breadcrumb = document.getElementById('breadcrumbProduct');
    if (breadcrumb) {
        breadcrumb.textContent = product.title || 'Товар';
    }

    // Основная информация
    var main = document.getElementById('productMain');
    if (main) {
        var imageSrc = product.image || 'images/zaglushki/no-image.webp';
        var priceText = (product.priceMin && product.priceMin > 0)
            ? 'от ' + product.priceMin.toFixed(2) + ' ₽/п.м.'
            : 'Цена по запросу';

        var html = '<div class="product-detail" style="display:flex;flex-wrap:wrap;gap:40px;align-items:flex-start;">';
        html += '<div style="flex:1;min-width:280px;">';
        html += '<img src="' + imageSrc + '" alt="' + product.title + '" style="width:100%;border-radius:16px;box-shadow:var(--shadow-card);" onerror="this.src=\'images/zaglushki/no-image.webp\'">';
        html += '</div>';
        html += '<div style="flex:2;min-width:280px;">';
        html += '<h1 style="font-size:2rem;margin-bottom:15px;">' + product.title + '</h1>';

        if (product.description) {
            html += '<p style="font-size:1.1rem;color:var(--text-secondary);margin-bottom:20px;">' + product.description + '</p>';
        }

        if (product.width || product.thickness || product.density || product.rollWeight) {
            html += '<table class="table" style="margin-bottom:20px;">';
            if (product.width) html += '<tr><td style="font-weight:600;background:var(--bg-gray);">Ширина</td><td>' + product.width + ' мм</td></tr>';
            if (product.thickness) html += '<tr><td style="font-weight:600;background:var(--bg-gray);">Толщина</td><td>' + product.thickness + ' мм</td></tr>';
            if (product.density) html += '<tr><td style="font-weight:600;background:var(--bg-gray);">Плотность</td><td>' + product.density + '</td></tr>';
            if (product.rollWeight) html += '<tr><td style="font-weight:600;background:var(--bg-gray);">Вес рулона</td><td>' + product.rollWeight + '</td></tr>';
            html += '</table>';
        }

        html += '<div style="font-size:2rem;font-weight:700;color:var(--primary);margin:20px 0;">' + priceText + '</div>';
        html += '<div style="display:flex;gap:15px;flex-wrap:wrap;margin:20px 0;">';
        html += '<a href="calculator.html" class="btn btn--primary">Рассчитать стоимость</a>';
        html += '<a href="contacts.html" class="btn btn--outline">Получить КП</a>';
        html += '</div>';
        html += '<p style="color:var(--text-muted);font-size:0.85rem;">Не является публичной офертой.</p>';
        html += '</div></div>';

        main.innerHTML = html;
    }

    // Применение
    var appContainer = document.getElementById('productApplication');
    if (appContainer && product.application) {
        appContainer.innerHTML =
            '<div style="background:var(--primary-light);padding:25px;border-radius:16px;margin-top:30px;border-left:4px solid var(--primary);">' +
                '<h3 style="margin-top:0;">Область применения</h3>' +
                '<p style="font-size:1.05rem;margin:10px 0 0;">' + product.application + '</p>' +
            '</div>';
    }

    // Преимущества (только для уголков)
    var benefitsContainer = document.getElementById('productBenefits');
    if (benefitsContainer && product.id && typeof product.id === 'number') {
        benefitsContainer.innerHTML =
            '<div style="background:var(--bg-card);padding:25px;border-radius:16px;margin-top:30px;border:1px solid var(--border-light);">' +
                '<h3 style="margin-top:0;">Преимущества защитных картонных уголков</h3>' +
                '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:15px;">' +
                    '<div style="padding:12px;background:var(--bg-gray);border-radius:8px;">✅ Надёжная защита углов груза</div>' +
                    '<div style="padding:12px;background:var(--bg-gray);border-radius:8px;">✅ Укрепление коробок и паллет</div>' +
                    '<div style="padding:12px;background:var(--bg-gray);border-radius:8px;">✅ Снижение повреждений при транспортировке</div>' +
                    '<div style="padding:12px;background:var(--bg-gray);border-radius:8px;">✅ Экологичный материал</div>' +
                '</div>' +
            '</div>';
    }

    // Запрос образцов
    var samplesContainer = document.getElementById('productSamples');
    if (samplesContainer) {
        samplesContainer.innerHTML =
            '<div style="background:var(--primary-light);padding:25px;border-radius:16px;margin-top:30px;text-align:center;">' +
                '<h3 style="margin-top:0;">🧪 Хотите проверить качество?</h3>' +
                '<p style="margin-bottom:15px;">Запросите тестовые образцы продукции.</p>' +
                '<a href="index.html#samples" class="btn btn--primary">Запросить образцы</a>' +
            '</div>';
    }

    // Похожие товары
    var relatedContainer = document.getElementById('productRelated');
    if (relatedContainer && product.id && typeof product.id === 'number' && data.products.corner) {
        var related = [];
        for (var i = 0; i < data.products.corner.length; i++) {
            if (data.products.corner[i].id !== product.id) {
                related.push(data.products.corner[i]);
                if (related.length >= 3) break;
            }
        }

        if (related.length > 0) {
            var html = '<h3 style="text-align:center;margin:50px 0 30px;">С этим товаром также заказывают</h3>';
            html += '<div class="card-grid">';

            related.forEach(function (p) {
                html +=
                    '<div class="card">' +
                        '<img src="' + (p.image || 'images/zaglushki/no-image.webp') + '" alt="' + p.title + '" class="card__image" onerror="this.src=\'images/zaglushki/no-image.webp\'">' +
                        '<div class="card__body">' +
                            '<h3 class="card__title">' + p.title + '</h3>' +
                            '<div class="card__price">от ' + p.priceMin.toFixed(2) + ' ₽/п.м.</div>' +
                            '<a href="product.html?id=' + p.id + '" class="btn btn--secondary">Подробнее</a>' +
                        '</div>' +
                    '</div>';
            });

            html += '</div>';
            relatedContainer.innerHTML = html;
        }
    }
}

// Автозапуск
document.addEventListener('DOMContentLoaded', initProduct);