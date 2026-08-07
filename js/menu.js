/* ================================================================
   Модуль: Меню v3.0
   Десктоп: выпадашка «Связаться»
   Мобильные: выезжающая панель справа с подменю
   ================================================================ */

(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        // --- Десктоп: выпадашка «Связаться» ---
        var contactToggle = document.getElementById('contactToggle');
        var contactDropdown = document.getElementById('contactDropdown');

        if (contactToggle && contactDropdown) {
            contactToggle.addEventListener('click', function (e) {
                e.stopPropagation();
                contactDropdown.classList.toggle('header__contact-dropdown--open');
            });

            document.addEventListener('click', function () {
                contactDropdown.classList.remove('header__contact-dropdown--open');
            });
        }

        // --- Мобильная панель ---
        var burger = document.getElementById('mobileMenuToggle');
        var overlay = document.getElementById('mobileOverlay');
        var panel = document.getElementById('mobilePanel');
        var closeBtn = document.getElementById('mobilePanelClose');

        function openPanel() {
            if (overlay) overlay.classList.add('mobile-overlay--open');
            if (panel) panel.classList.add('mobile-panel--open');
            document.body.style.overflow = 'hidden';
        }

        function closePanel() {
            if (overlay) overlay.classList.remove('mobile-overlay--open');
            if (panel) panel.classList.remove('mobile-panel--open');
            document.body.style.overflow = '';
        }

        if (burger) {
            burger.addEventListener('click', openPanel);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closePanel);
        }

        if (overlay) {
            overlay.addEventListener('click', closePanel);
        }

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && panel && panel.classList.contains('mobile-panel--open')) {
                closePanel();
            }
        });

        // --- Подменю в мобильной панели ---
        var subToggles = document.querySelectorAll('.mobile-panel__link--sub');

        subToggles.forEach(function (toggle) {
            toggle.addEventListener('click', function () {
                var sublist = this.nextElementSibling;
                var arrow = this.querySelector('.mobile-panel__arrow');

                if (sublist) {
                    sublist.classList.toggle('mobile-panel__sublist--open');
                }
                if (arrow) {
                    arrow.classList.toggle('mobile-panel__arrow--open');
                }
            });
        });

        // --- Копирование email на мобильных ---
        window.copyEmail = function (event) {
            var email = 'papir-market.sale@mail.ru';
            var link = event.currentTarget;

            setTimeout(function () {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(email).then(function () {
                        var original = link.innerHTML;
                        link.innerHTML = '✅ Email скопирован';
                        setTimeout(function () {
                            link.innerHTML = original;
                        }, 2000);
                    }).catch(function () {});
                }
            }, 300);
        };
    });
})();