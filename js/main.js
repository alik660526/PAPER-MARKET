// ============================================================
// 1. ТЕМА (СВЕТЛАЯ / ТЁМНАЯ)
// ============================================================

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        updateThemeIcon('dark');
    } else {
        document.body.classList.remove('dark-theme');
        updateThemeIcon('light');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark ? 'dark' : 'light');
}

function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Переключить на светлую тему' : 'Переключить на тёмную тему');
}

// ============================================================
// 2. ЗАГРУЗКА ДАННЫХ ТОВАРОВ
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    // --- Инициализация темы ---
    initTheme();
    
    // --- Кнопка переключения темы ---
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
    }

    // --- Каталог ---
    const catalogGrid = document.getElementById('catalogGrid');
    if (catalogGrid && typeof data !== 'undefined' && data.products) {
        const allProducts = [
            ...data.products.corner,
            ...data.products.fluting,
            ...data.products.liner
        ];
        renderCatalog(allProducts);
    }

    // --- Карточка товара ---
    const productContainer = document.getElementById('productContainer');
    if (productContainer && typeof data !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');
        if (id) {
            const product = findProductById(id);
            if (product) renderProduct(product);
        }
    }

    // --- Прайс-лист ---
    const priceBody = document.getElementById('priceTableBody');
    if (priceBody && typeof data !== 'undefined' && data.products && data.products.corner) {
        renderPriceTable(data.products.corner);
    }

    // --- Калькулятор на странице calculator.html ---
    const calcSelect = document.getElementById('productSelect');
    const calcBtn = document.getElementById('calcBtn');
    const quantityInput = document.getElementById('quantity');
    const totalPrice = document.getElementById('totalPrice');
    const unitPrice = document.getElementById('unitPrice');
    const orderBtn = document.getElementById('orderBtn');

    if (calcSelect && typeof data !== 'undefined' && data.products && data.products.corner) {
        const corners = data.products.corner;
        corners.forEach(p => {
            const opt = document.createElement('option');
            opt.value = p.id;
            opt.textContent = `${p.title} (от ${p.priceMin} ₽/п.м.)`;
            calcSelect.appendChild(opt);
        });

        if (calcBtn) {
            calcBtn.addEventListener('click', function() {
                const id = parseInt(calcSelect.value);
                const qty = parseInt(quantityInput.value) || 0;
                const product = corners.find(p => p.id === id);
                if (!product || qty < 1) {
                    totalPrice.textContent = '0';
                    unitPrice.textContent = '0';
                    return;
                }
                let pricePerUnit = product.priceOver3000;
                if (qty <= 100) pricePerUnit = product.priceTo100;
                else if (qty <= 500) pricePerUnit = product.priceTo500;
                else if (qty <= 1000) pricePerUnit = product.priceTo1000;
                else if (qty <= 3000) pricePerUnit = product.priceTo3000;
                const total = pricePerUnit * qty;
                totalPrice.textContent = total.toFixed(2);
                unitPrice.textContent = pricePerUnit.toFixed(2);
            });
        }

        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                if (orderBtn.disabled) return;
                
                // Проверка согласия на обработку ПД
                const consentCheckbox = document.querySelector('#contactForm input[name="personal_data_consent"]');
                if (consentCheckbox && !consentCheckbox.checked) {
                    alert('Пожалуйста, дайте согласие на обработку персональных данных.');
                    return;
                }

                orderBtn.disabled = true;
                orderBtn.textContent = 'Отправка...';

                const id = parseInt(calcSelect.value);
                const product = corners.find(p => p.id === id);
                const qty = parseInt(quantityInput.value) || 0;
                const total = totalPrice.textContent;

                if (!product || qty < 1) {
                    alert('Выберите товар и укажите количество.');
                    orderBtn.disabled = false;
                    orderBtn.textContent = 'Отправить заявку';
                    return;
                }

                const whatsapp = (typeof data !== 'undefined' && data.company && data.company.whatsapp) ? data.company.whatsapp : '79183268872';
                const msg = `Здравствуйте! Хочу заказать ${product.title} в количестве ${qty} п.м. Общая стоимость: ${total} ₽. Прошу сделать коммерческое предложение.`;
                window.location.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;

                setTimeout(() => {
                    orderBtn.disabled = false;
                    orderBtn.textContent = 'Отправить заявку';
                }, 3000);
            });
        }
    }

    // --- Форма обратной связи ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Проверка согласия на обработку ПД
            const consentCheckbox = this.querySelector('input[name="personal_data_consent"]');
            if (consentCheckbox && !consentCheckbox.checked) {
                alert('Пожалуйста, дайте согласие на обработку персональных данных.');
                return;
            }

            const name = this.querySelector('input[name="name"]')?.value || '';
            const phone = this.querySelector('input[name="phone"]')?.value || '';
            const email = this.querySelector('input[name="email"]')?.value || '';
            const message = this.querySelector('textarea[name="message"]')?.value || '';

            if (!name || !phone) {
                alert('Пожалуйста, заполните имя и телефон.');
                return;
            }

            const whatsapp = (typeof data !== 'undefined' && data.company && data.company.whatsapp) ? data.company.whatsapp : '79183268872';
            const msg = `Здравствуйте! Меня зовут ${name}. Мой телефон: ${phone}. Email: ${email}. Сообщение: ${message}`;
            window.location.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`;
        });
    }

    // --- Мобильное меню ---
    const menuToggle = document.getElementById('mobileMenuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            if (nav) {
                nav.classList.toggle('open');
            }
        });
    }

    // --- Плавный скролл для якорных ссылок ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// ============================================================
// 3. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================

function renderCatalog(products) {
    const grid = document.getElementById('catalogGrid');
    if (!grid) return;

    grid.innerHTML = '';
    products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const imageSrc = p.image || 'images/zaglushki/no-image.webp';
        const title = p.title || 'Товар';
        const description = p.description || '';
        const price = p.priceMin !== undefined ? `от ${p.priceMin} ₽/п.м.` : '';
        const application = p.application || '';

        card.innerHTML = `
            <img src="${imageSrc}" alt="${title}" loading="lazy" onerror="this.src='images/zaglushki/no-image.webp'">
            <h3>${title}</h3>
            <p>${description}</p>
            ${application ? `<p style="font-size:0.9rem;color:var(--text-secondary);padding:0 15px 5px;"><strong>Применение:</strong> ${application}</p>` : ''}
            ${price ? `<div class="price">${price}</div>` : ''}
            <div class="category-actions">
                <a href="product.html?id=${p.id}" class="btn">Подробнее</a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function findProductById(id) {
    if (typeof data === 'undefined' || !data.products) return null;
    const all = [
        ...data.products.corner,
        ...data.products.fluting,
        ...data.products.liner
    ];
    return all.find(p => String(p.id) === String(id)) || null;
}

function renderProduct(product) {
    const mainContainer = document.getElementById('productMain');
    if (!mainContainer) return;

    const imageSrc = product.image || 'images/zaglushki/no-image.webp';
    const price = product.priceMin !== undefined ? `от ${product.priceMin} ₽/п.м.` : 'Цена по запросу';

    mainContainer.innerHTML = `
        <div style="display:flex;flex-wrap:wrap;gap:40px;align-items:flex-start;">
            <div style="flex:1;min-width:280px;">
                <img src="${imageSrc}" alt="${product.title}" style="width:100%;border-radius:8px;box-shadow:var(--shadow-card);" onerror="this.src='images/zaglushki/no-image.webp'">
            </div>
            <div style="flex:2;min-width:280px;">
                <h1>${product.title}</h1>
                ${product.description ? `<p style="font-size:1.1rem;color:var(--text-secondary);margin:15px 0;">${product.description}</p>` : ''}
                
                ${product.width || product.thickness ? `
                <div style="background:var(--bg-gray);padding:15px;border-radius:8px;margin:20px 0;border:1px solid var(--border-light);">
                    <h3>Характеристики</h3>
                    <ul style="list-style:none;padding:0;margin:10px 0 0 0;">
                        ${product.width ? `<li>📐 Ширина: ${product.width} мм</li>` : ''}
                        ${product.thickness ? `<li>📏 Толщина: ${product.thickness} мм</li>` : ''}
                        ${product.density ? `<li>📊 Плотность: ${product.density}</li>` : ''}
                        ${product.rollWeight ? `<li>⚖️ Вес рулона: ${product.rollWeight}</li>` : ''}
                    </ul>
                </div>
                ` : ''}
                
                <div style="font-size:1.5rem;font-weight:700;color:var(--accent);margin:20px 0;">
                    ${price}
                </div>
                
                <div style="display:flex;gap:15px;flex-wrap:wrap;margin:20px 0;">
                    <a href="calculator.html" class="btn">Рассчитать стоимость</a>
                    <a href="contacts.html" class="btn btn-outline">Получить коммерческое предложение</a>
                </div>
                
                <p style="color:var(--text-muted);font-size:0.85rem;margin-top:20px;">Не является публичной офертой.</p>
            </div>
        </div>
    `;

    // Применение
    const applicationContainer = document.getElementById('productApplication');
    if (applicationContainer && product.application) {
        applicationContainer.innerHTML = `
            <div style="background:var(--bg-gray);padding:25px;border-radius:8px;border-left:4px solid var(--accent);border:1px solid var(--border-light);">
                <h3 style="margin-top:0;">Область применения</h3>
                <p style="font-size:1.05rem;color:var(--text-primary);margin:10px 0 0 0;">${product.application}</p>
            </div>
        `;
    }

    // Преимущества (только для уголков)
    const benefitsContainer = document.getElementById('productBenefits');
    if (benefitsContainer && product.id && typeof product.id === 'number') {
        benefitsContainer.innerHTML = `
            <div style="background:var(--bg-card);padding:25px;border-radius:8px;border:1px solid var(--border-light);">
                <h3 style="margin-top:0;">Преимущества защитных картонных уголков</h3>
                <ul style="list-style:none;padding:0;margin:15px 0 0 0;display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                    <li style="padding:8px 12px;background:var(--bg-gray);border-radius:4px;border:1px solid var(--border-light);">✅ Надёжная защита углов груза</li>
                    <li style="padding:8px 12px;background:var(--bg-gray);border-radius:4px;border:1px solid var(--border-light);">✅ Укрепление коробок и паллет</li>
                    <li style="padding:8px 12px;background:var(--bg-gray);border-radius:4px;border:1px solid var(--border-light);">✅ Снижение повреждений при транспортировке</li>
                    <li style="padding:8px 12px;background:var(--bg-gray);border-radius:4px;border:1px solid var(--border-light);">✅ Экологичный и перерабатываемый материал</li>
                </ul>
            </div>
        `;
    }

    // Похожие товары
    const relatedContainer = document.getElementById('productRelated');
    if (relatedContainer && product.id && typeof product.id === 'number' && data.products && data.products.corner) {
        const related = data.products.corner
            .filter(p => p.id !== product.id)
            .slice(0, 3);
        
        if (related.length > 0) {
            let html = `
                <h3 style="text-align:center;margin-bottom:25px;color:var(--text-primary);">С этим товаром также заказывают</h3>
                <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:20px;">
            `;
            related.forEach(p => {
                html += `
                    <div style="background:var(--bg-card);border-radius:8px;border:1px solid var(--border-light);padding:15px;text-align:center;">
                        <img src="${p.image || 'images/zaglushki/no-image.webp'}" alt="${p.title}" style="width:100%;height:150px;object-fit:contain;border-radius:4px;" onerror="this.src='images/zaglushki/no-image.webp'">
                        <h4 style="font-size:0.95rem;margin:10px 0 5px;color:var(--text-primary);">${p.title}</h4>
                        <p style="font-size:0.85rem;color:var(--text-secondary);">от ${p.priceMin} ₽/п.м.</p>
                        <a href="product.html?id=${p.id}" class="btn" style="font-size:0.85rem;padding:6px 16px;margin-top:8px;">Подробнее</a>
                    </div>
                `;
            });
            html += `</div>`;
            relatedContainer.innerHTML = html;
        }
    }
}

function renderPriceTable(corners) {
    const tbody = document.getElementById('priceTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    corners.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="product-name">${p.title}</td>
            <td class="price-cell">${p.priceTo100.toFixed(2)} ₽</td>
            <td class="price-cell">${p.priceTo500.toFixed(2)} ₽</td>
            <td class="price-cell">${p.priceTo1000.toFixed(2)} ₽</td>
            <td class="price-cell">${p.priceTo3000.toFixed(2)} ₽</td>
            <td class="price-cell">${p.priceOver3000.toFixed(2)} ₽</td>
            <td><a href="calculator.html" class="order-btn">Рассчитать</a></td>
        `;
        tbody.appendChild(tr);
    });
}