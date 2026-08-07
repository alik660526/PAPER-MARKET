/* ================================================================
   Модуль: Каталог (заполнение селектов, фильтры)
   Версия: 1.0
   ================================================================ */

function initCatalog() {
    if (typeof data === 'undefined' || !data.products) return;

    // --- Заполнение селекта на главной и в калькуляторе ---
    var productSelects = document.querySelectorAll('#indexProductSelect, #productSelect');

    productSelects.forEach(function (select) {
        if (!select || select.options.length > 1) return; // уже заполнен

        data.products.corner.forEach(function (p) {
            var opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = p.title + ' (от ' + p.priceMin.toFixed(2) + ' ₽/п.м.)';
            select.appendChild(opt);
        });
    });

    // --- Каталог с фильтрами ---
    var filterButtons = document.querySelectorAll('#filterButtons .filter-btn');
    var productGrid = document.getElementById('productGrid');

    if (filterButtons.length === 0 || !productGrid) return;

    function getCategoryFromURL() {
        var params = new URLSearchParams(window.location.search);
        return params.get('category') || 'all';
    }

    function renderProducts(category) {
        productGrid.innerHTML = '';
        var products = [];

        if (category === 'all' || category === 'corner') {
            data.products.corner.forEach(function (p) {
                products.push({
                    id: p.id,
                    article: p.article,
                    title: p.title,
                    image: p.image,
                    description: p.description,
                    priceMin: p.priceMin,
                    catName: 'Защитный уголок'
                });
            });
        }
        if (category === 'all' || category === 'fluting') {
            data.products.fluting.forEach(function (p) {
                products.push({
                    id: p.id,
                    title: p.title,
                    image: p.image,
                    description: p.description,
                    priceMin: p.priceMin,
                    catName: 'Крафт-бумага'
                });
            });
        }
        if (category === 'all' || category === 'karton') {
            data.products.karton.forEach(function (p) {
                products.push({
                    id: p.id,
                    title: p.title,
                    image: p.image,
                    description: p.description,
                    priceMin: p.priceMin,
                    catName: 'Картон'
                });
            });
        }

        if (products.length === 0) {
            productGrid.innerHTML = '<p>Товары не найдены.</p>';
            return;
        }

        products.forEach(function (p) {
            var card = document.createElement('div');
            card.className = 'card';

            var imgSrc = p.image || 'images/zaglushki/no-image.webp';
            var priceText = (p.priceMin && p.priceMin > 0)
                ? 'от ' + p.priceMin.toFixed(2) + ' ₽/п.м.'
                : 'Цена по запросу';

            card.innerHTML =
                '<img src="' + imgSrc + '" alt="' + p.title + '" class="card__image" loading="lazy" onerror="this.src=\'images/zaglushki/no-image.webp\'">' +
                '<div class="card__body">' +
                    '<span class="card__badge" style="font-size:0.75rem;background:var(--primary-light);color:var(--primary);padding:4px 12px;border-radius:20px;display:inline-block;margin-bottom:8px;">' + p.catName + '</span>' +
                    '<h3 class="card__title">' + p.title + '</h3>' +
                    '<p class="card__text">' + (p.description || '') + '</p>' +
                    '<div class="card__price">' + priceText + '</div>' +
                    '<a href="product.html?id=' + (p.id || p.article) + '" class="btn btn--primary">Подробнее</a>' +
                '</div>';

            productGrid.appendChild(card);
        });
    }

    function setActiveFilter(category) {
        filterButtons.forEach(function (btn) {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    filterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var cat = this.dataset.category;
            setActiveFilter(cat);
            renderProducts(cat);
            if (history.pushState) {
                var url = new URL(window.location);
                if (cat === 'all') {
                    url.searchParams.delete('category');
                } else {
                    url.searchParams.set('category', cat);
                }
                window.history.pushState({}, '', url);
            }
        });
    });

    var initialCategory = getCategoryFromURL();
    setActiveFilter(initialCategory);
    renderProducts(initialCategory);
}

// Автозапуск
document.addEventListener('DOMContentLoaded', initCatalog);