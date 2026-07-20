// ===== Мобильное меню =====
document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('mobileMenuToggle');
    if (toggle) {
        toggle.addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            if (nav) nav.classList.toggle('open');
        });
    }

    // ===== Аккордеон FAQ (если есть) =====
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', function() {
            const item = this.parentElement;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // ===== Появление блоков при скролле =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.section').forEach(s => observer.observe(s));

    // ===== Генерация каталога (если есть контейнер) =====
    const catalogGrid = document.getElementById('catalogGrid');
    if (catalogGrid && typeof data !== 'undefined') {
        const allProducts = [
            ...data.products.corner.map(p => ({...p, category: 'corner'})),
            ...data.products.fluting.map(p => ({...p, category: 'fluting'})),
            ...data.products.liner.map(p => ({...p, category: 'liner'}))
        ];
        if (allProducts.length === 0) {
            catalogGrid.innerHTML = '<p>Товары не найдены.</p>';
        } else {
            allProducts.forEach(p => {
                const card = document.createElement('div');
                card.className = 'product-card';
                const priceHtml = p.priceMin ? `<div class="price">от ${p.priceMin} ₽/п.м.</div>` : '<div class="price">Цена по запросу</div>';
                card.innerHTML = `
                    <img src="${p.image || 'https://picsum.photos/seed/'+p.id+'/400/300'}" alt="${p.title}" loading="lazy">
                    <h3>${p.title}</h3>
                    ${priceHtml}
                    <div class="category-actions">
                        <a href="product.html?id=${p.id}" class="btn btn-sm">Подробнее</a>
                        <a href="https://wa.me/7XXXXXXXXXX?text=Здравствуйте!%20Хочу%20заказать%20${encodeURIComponent(p.title)}" target="_blank" class="btn btn-sm btn-outline">WhatsApp</a>
                        <a href="https://t.me/username?text=Здравствуйте!%20Хочу%20заказать%20${encodeURIComponent(p.title)}" target="_blank" class="btn btn-sm btn-outline">Telegram</a>
                    </div>
                `;
                catalogGrid.appendChild(card);
            });
        }
    }

    // ===== Страница товара (product.html) =====
    const productContainer = document.getElementById('productContainer');
    if (productContainer && typeof data !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        // Ищем товар во всех категориях
        let product = null;
        const all = [...data.products.corner, ...data.products.fluting, ...data.products.liner];
        if (productId) {
            // ищем по id (для уголков это число, для других – строка)
            product = all.find(p => String(p.id) === productId);
        }
        // Если не нашли, берем первый уголок для демо
        if (!product && all.length) product = all[0];
        if (product) {
            // Рендерим карточку товара (упрощённо)
            productContainer.innerHTML = `
                <div class="product-hero" style="display:flex;gap:40px;align-items:center;background:#f9f9f9;padding:40px;border-radius:12px;margin-bottom:40px;">
                    <div style="flex:1;max-width:50%;">
                        <img src="${product.image || 'https://picsum.photos/seed/'+product.id+'/600/400'}" alt="${product.title}" style="width:100%;border-radius:8px;">
                    </div>
                    <div style="flex:1;">
                        <h1>${product.title}</h1>
                        <p style="font-size:1.2rem;color:#555;">${product.description || 'Качественный упаковочный материал'}</p>
                        <p style="margin:20px 0;"><strong>Цена:</strong> от ${product.priceMin || 'уточняйте'} ₽/п.м.</p>
                        <div style="display:flex;gap:15px;flex-wrap:wrap;">
                            <a href="https://wa.me/7XXXXXXXXXX?text=Здравствуйте!%20Хочу%20заказать%20${encodeURIComponent(product.title)}" target="_blank" class="btn">Заказать в WhatsApp</a>
                            <a href="https://t.me/username?text=Здравствуйте!%20Хочу%20заказать%20${encodeURIComponent(product.title)}" target="_blank" class="btn btn-outline">Telegram</a>
                        </div>
                    </div>
                </div>
                <div style="padding:20px;background:#fff;border-radius:8px;box-shadow:0 2px 10px rgba(0,0,0,0.04);">
                    <h3>Характеристики</h3>
                    <ul style="list-style:none;padding:0;">
                        ${product.width ? `<li><strong>Ширина:</strong> ${product.width} мм</li>` : ''}
                        ${product.thickness ? `<li><strong>Толщина:</strong> ${product.thickness} мм</li>` : ''}
                        ${product.density ? `<li><strong>Плотность:</strong> ${product.density}</li>` : ''}
                        ${product.rollWeight ? `<li><strong>Вес рулона:</strong> ${product.rollWeight}</li>` : ''}
                        ${product.article ? `<li><strong>Артикул:</strong> ${product.article}</li>` : ''}
                    </ul>
                </div>
            `;
        } else {
            productContainer.innerHTML = '<p>Товар не найден. <a href="catalog.html">Вернуться в каталог</a></p>';
        }
    }

    // ===== Калькулятор (если есть) =====
    const calcBtn = document.getElementById('calcBtn');
    if (calcBtn && typeof data !== 'undefined') {
        const select = document.getElementById('productSelect');
        const quantity = document.getElementById('quantity');
        const totalPrice = document.getElementById('totalPrice');
        const unitPrice = document.getElementById('unitPrice');

        const corners = data.products.corner || [];
        corners.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `${p.title} (от ${p.priceMin} ₽/п.м.)`;
            select.appendChild(opt);
        });

        calcBtn.addEventListener('click', function() {
            const id = parseInt(select.value);
            const qty = parseInt(quantity.value) || 0;
            const product = corners.find(p => p.id === id);
            if (!product || qty < 1) {
                totalPrice.textContent = '0';
                unitPrice.textContent = '0';
                return;
            }
            let pricePerUnit = product.priceTo1000;
            if (qty <= 100) pricePerUnit = product.priceTo100;
            else if (qty <= 500) pricePerUnit = product.priceTo500;
            else if (qty <= 1000) pricePerUnit = product.priceTo1000;
            const total = pricePerUnit * qty;
            totalPrice.textContent = total.toFixed(2);
            unitPrice.textContent = pricePerUnit.toFixed(2);
        });

        document.getElementById('orderBtn').addEventListener('click', function() {
            const id = parseInt(select.value);
            const product = corners.find(p => p.id === id);
            const qty = parseInt(quantity.value) || 0;
            const total = totalPrice.textContent;
            if (!product || qty < 1) { alert('Выберите товар и количество'); return; }
            const msg = `Здравствуйте! Хочу заказать ${product.title} в количестве ${qty} п.м. Общая стоимость: ${total} ₽. Прошу сделать коммерческое предложение.`;
            window.location.href = `https://wa.me/7XXXXXXXXXX?text=${encodeURIComponent(msg)}`;
        });
    }
});