/* ================================================================
   Модуль: Меню v4.0
   Десктоп: выпадашка «Связаться»
   Мобильные: гамбургер, выпадающее меню, смена иконки
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

        // --- Мобильное меню ---
        var burger = document.getElementById('mobileMenuToggle');
        var mobileMenu = document.getElementById('mobileMenu');
        var menuLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-menu__link') : [];

        function openMenu() {
            if (burger) burger.classList.add('header__burger--open');
            if (mobileMenu) mobileMenu.classList.add('mobile-menu--open');
        }

        function closeMenu() {
            if (burger) burger.classList.remove('header__burger--open');
            if (mobileMenu) mobileMenu.classList.remove('mobile-menu--open');
        }

        function toggleMenu() {
            if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        if (burger) {
            burger.addEventListener('click', function (e) {
                e.stopPropagation();
                toggleMenu();
            });
        }

        // Закрытие по клику на пункт меню
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                closeMenu();
            });
        });

        // Закрытие по клику вне меню
        document.addEventListener('click', function (e) {
            if (mobileMenu && mobileMenu.classList.contains('mobile-menu--open')) {
                if (!mobileMenu.contains(e.target) && e.target !== burger) {
                    closeMenu();
                }
            }
        });

        // Копирование email на мобильных
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