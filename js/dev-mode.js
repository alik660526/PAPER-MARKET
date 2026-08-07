/* ================================================================
   Модуль: Dev Mode (режим разработчика)
   Включение:
     - ПК: Ctrl+Shift+D
     - Телефон: добавить #dev-on в адресную строку и обновить
   Версия: 1.1
   ================================================================ */

(function () {
    'use strict';

    var DEV_KEY = 'dev-mode';

    // Проверка при загрузке: localStorage или хеш #dev-on
    var isDev = localStorage.getItem(DEV_KEY) === 'on' || window.location.hash === '#dev-on';

    if (isDev) {
        document.documentElement.setAttribute('data-theme', 'dev');
        localStorage.setItem(DEV_KEY, 'on');
    }

    // Создание информационной панели
    var panel = document.createElement('div');
    panel.className = 'dev-panel';
    panel.id = 'devPanel';
    document.body.appendChild(panel);

    function updatePanel() {
        if (!isDev) return;
        var w = window.innerWidth;
        var h = window.innerHeight;
        panel.innerHTML =
            'DEV MODE ON<br>' +
            'Viewport: ' + w + ' × ' + h + '<br>' +
            'Breakpoint: ' + getBreakpoint(w) + '<br>' +
            'Ctrl+Shift+D — выключить';
    }

    function getBreakpoint(width) {
        if (width <= 480) return 'xs (≤480)';
        if (width <= 768) return 'sm (≤768)';
        if (width <= 992) return 'md (≤992)';
        if (width <= 1200) return 'lg (≤1200)';
        return 'xl (>1200)';
    }

    // Переключение Dev Mode
    function toggleDev() {
        isDev = !isDev;

        if (isDev) {
            document.documentElement.setAttribute('data-theme', 'dev');
            localStorage.setItem(DEV_KEY, 'on');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.removeItem(DEV_KEY);
            // Убираем хеш из адреса
            if (window.location.hash === '#dev-on') {
                history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        }

        updatePanel();
    }

    // Клавиатурное переключение (ПК)
    document.addEventListener('keydown', function (e) {
        if (e.ctrlKey && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            toggleDev();
        }
    });

    // Обновление панели при ресайзе
    window.addEventListener('resize', updatePanel);
    updatePanel();

    // Расстановка data-section-name для подписей секций
    function labelSections() {
        var sections = document.querySelectorAll('.section');
        sections.forEach(function (sec, i) {
            if (sec.hasAttribute('data-section-name')) return;
            var title = sec.querySelector('.section__title');
            var name = title ? title.textContent.trim() : 'Секция ' + (i + 1);
            sec.setAttribute('data-section-name', name);
        });

        // Также метим main, если у него есть data-section-name
        var main = document.querySelector('main[data-section-name]');
        if (main) {
            main.classList.add('section'); // чтобы подхватился стилями dev-mode
        }
    }

    document.addEventListener('DOMContentLoaded', labelSections);
})();