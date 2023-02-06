$(document).ready(function() {
    //Вычисление ширины линии вне навигации
    $('.header__bottom-color').width(($(window).width() - $('.header__bottom-inner').width()) / 2);

    //Покраска линии слева в хедере
    for(let i = 6; i >= 1; i--){
        let className = '';
        switch(i){
            case 6:
                className = 'green';
                break;
            case 5:
                className = 'darkBlue';
                break;
            case 4:
                className ='darkWhiteBlue';
                break;
            case 3:
                className ='blue';
                break;
            case 2:
                className ='pink';
                break;
            case 1:
                className ='yellow';
                break;
        }

        $(`.header__bottom-link--wrapper:nth-of-type(${i})`).on('mouseover', () => {$('.header__bottom-color').addClass(className)})
        $(`.header__bottom-link--wrapper:nth-of-type(${i})`).on('mouseleave', () => {$('.header__bottom-color').removeClass(className)})
    }

    //Открытие/закрытие мини меню
    $('.js-open-miniMenu').on('click', function(e) {
        e.preventDefault();

        $('.header__bigMenu').slideUp();
        $('.header__miniMenu.active:not([data-minimenu="' + $(this).data('minimenu') + '"])');

        $('.header__miniMenu[data-minimenu="' + $(this).data('minimenu') + '"]').toggleClass('active');
    })

    //Открытие/закрытие большого меню
    $('.js-open-bigMenu').on('click', function(e) {
        e.preventDefault();

        $('.header__miniMenu').removeClass('active');
        $('.header__bigMenu:not([data-bigmenu="' + $(this).data('bigmenu') + '"])').slideUp();

        $('.header__bigMenu[data-bigmenu="' + $(this).data('bigmenu') + '"]').slideToggle();
    })

    //FAQ
    $('.js-openClose-FAQ').on('click', function() {
        $(this).toggleClass('active');

        $(this).parent().next().slideToggle();
    })

    //Открытие/закрытие меню фильтрации
    $('.catalog__filter-choice').on('click', function(e) {
        $(this).toggleClass('active');
        $(this).next().toggle();
    })

    //Слайдеры
    let slider = new Swiper('.slider', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.slider__pagination',
            clickable: true,
            bulletClass: 'slider__pagination-bullet',
        },
    })

    $('.productItem').each(function() {
        let data = $(this).data('slider');
        let sldr = '.productItem[data-slider="' + data + '"] .productItem__imgs-wrapper';

        new Swiper(sldr, {
            loop: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            autoplay: {
                delay: 5000,
            },
            navigation: {
                nextEl: sldr + ' .swiper-button-next',
                prevEl: sldr + ' .swiper-button-prev',
            },
            pagination: {
                el: sldr + ' .swiper-pagination',
                clickable: true,
                bulletClass: 'productItem__pagination-bullet',
            }
        })
    })
});