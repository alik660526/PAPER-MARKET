/* ================================================================
   Модуль: Анимации при скролле
   Версия: 1.0
   ================================================================ */

function initAnimations() {
    var fadeElements = document.querySelectorAll('.fade-in');

    if (fadeElements.length === 0) return;

    // Проверка поддержки Intersection Observer
    if (!('IntersectionObserver' in window)) {
        // Если браузер не поддерживает — показываем все элементы сразу
        fadeElements.forEach(function (el) {
            el.classList.add('fade-in--visible');
        });
        return;
    }

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in--visible');
                observer.unobserve(entry.target); // анимируем только один раз
            }
        });
    }, {
        threshold: 0.1
    });

    fadeElements.forEach(function (el) {
        observer.observe(el);
    });
}

// Автозапуск
document.addEventListener('DOMContentLoaded', initAnimations);