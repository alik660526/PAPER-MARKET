/* ================================================================
   Модуль: Мобильное меню и выпадающие подменю v2.0
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
        var mobileClose = document.getElementById('mobileMenuClose');

        if (burger && mobileMenu) {
            burger.addEventListener('click', function () {
                mobileMenu.classList.add('mobile-menu--open');
                document.body.style.overflow = 'hidden';
            });

            if (mobileClose) {
                mobileClose.addEventListener('click', function () {
                    mobileMenu.classList.remove('mobile-menu--open');
                    document.body.style.overflow = '';
                });
            }

            mobileMenu.addEventListener('click', function (e) {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.remove('mobile-menu--open');
                    document.body.style.overflow = '';
                }
            });

            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape' && mobileMenu.classList.contains('mobile-menu--open')) {
                    mobileMenu.classList.remove('mobile-menu--open');
                    document.body.style.overflow = '';
                }
            });
        }
    });
})();