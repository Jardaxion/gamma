let images = [];
$('.productTop__left-img').each(function() {
    images.push($(this).attr('src'));
})

let numPage = 1;
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

    //Сокрытие/показ нижней части хедера при скорлле
    $(window).on('scroll', function() {
        if($(window).scrollTop() > 0) {
            $('.header__bottom').addClass('disactive');
        } else {
            $('.header__bottom').removeClass('disactive');
        }
    })

    if($(window).scrollTop() > 0) {
        $('.header__bottom').addClass('disactive');
    } else {
        $('.header__bottom').removeClass('disactive');
    }

    //Переключение страничек в карточке товара
    $('.js-select-page').on('click', function(e) {
        e.preventDefault();

        $('.js-select-page.active').removeClass('active');
        $(this).addClass('active');

        $('.productBottom__page.active').removeClass('active');
        $('.productBottom__page[data-page="' + $(this).data('page') + '"]').addClass('active');
    })

    //Скрытие самописного placeholder
    $('.basketBuy__label').each(function(){
        $($(this)).children('input').focus(function(){
            $(this).siblings('.basketBuy__placeholder').hide();
        })
        $($(this)).children('input').blur(function(){
            if($(this).val() === ''){
                $(this).siblings('.basketBuy__placeholder').show();
            }
        })
    })

    //Открытие открытие фильтра
    $('.js-openClose-filter').on('click', function(){
        $(this).children().next().toggleClass('active');
        $(this).next().slideToggle();
    })

    //Range slider
    $( "#slider-range" ).slider({
        range: true,
        min: $('#slider-range').data('min'),
        max: $('#slider-range').data('max'),
        values: [ $('#slider-range').data('min'), $('#slider-range').data('max') ],
        slide: function( event, ui ) {
            $(".catalog__filterMenu-box--minMaxBlock.min").html(ui.values[ 0 ]);
            $(".catalog__filterMenu-box--minMaxBlock.max").html(ui.values[ 1 ]);
        }
    });

    $(".catalog__filterMenu-box--minMaxBlock.min").html($("#slider-range").slider("values", 0));
    $(".catalog__filterMenu-box--minMaxBlock.max").html($("#slider-range").slider("values", 1));

    //Переключение страниц на регистрации
    $('.js-next').on('click', function(e) {
        e.preventDefault();

        numPage++;
        $('.reg__right-page.active').hide();
        $('.reg__right-page[data-page="' + numPage + '"]').css({display: 'flex'});
        $('.reg__right-page[data-page="' + numPage + '"]').addClass('active');
        $('.reg__left-box--text.active').removeClass('active');
        $('.reg__left-box').each(function() {
            if($(this).children().html() == numPage){
                $(this).addClass('active');
                if($(window).width() < 960){
                    $(this).children().next().addClass('active');
                }
            }
        })
    })

    $('.reg__left-box').each(function() {
        if($(this).children().html() == numPage){
            if($(window).width() < 960){
                $(this).children().next().addClass('active');
                console.log()
            }
        }
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

    let sliderMobile = new Swiper('.sliderMobile', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.sliderMobile__pagination',
            clickable: true,
            bulletClass: 'sliderMobile__pagination-bullet',
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

    let productSlider = new Swiper('.productTop__left-right', {
        navigation: {
            nextEl: '.productTop__rightArrow',
            prevEl: '.productTop__leftArrow',
        },
        pagination: {
            el: '.productTop__pagination',
            clickable: true,
            renderBullet: function(index, className) {
                return '<img class="' + className +' swiper-slide" src="' + images[index] + '">';
            }
        }
    })

    let productSliderPag = new Swiper('.productTop__left-left', {
        direction: 'horizontal',
        slidesPerView: 3,
        spaceBetween: 19,
        breakpoints: {
            960: {
                direction: 'vertical',
                spaceBetween: 10
            }
        }
    })

    //Модальные окна
    //Открытие
    $('.js-open-modal').on('click', function(e){
        e.preventDefault();

        if($('.js-open-desktop-menu').hasClass('reverse')){
            openCloseMenu();
        }

        if($('.js-open-mobile-menu').hasClass('reverse')){
            openCloseMobMenu();
        }

        openModal($(this).data('modal'));
    })
    //Закрытие
    $('.js-close-modal').on('click', function(e){
        e.preventDefault();

        closeModal();
    })
    $('.modal').on('click', function(e){
        e.preventDefault();

        if(e.target === document.querySelector('.modal')){
            closeModal();
        }

    })
    //Переоткрытие
    $('.js-reOpen-modal').on('click', function(e){
        e.preventDefault();

        reOpenModal($(this).data('modal'));
    })

    //Открытие/закрытие моб меню
    $('.js-open-mobileMenu').on('click', function(e){
        e.preventDefault();

        $(this).toggleClass('active');
        $('.header__menu').slideToggle('medium', function() {
            if ($(this).is(':visible'))
                $(this).css('display','flex');
        });
        $('.header__categories').removeClass('active');
    })

    //Открытие категорий мобилка
    $('.js-open-categories').on('click', function(e){
        e.preventDefault();

        $(this).toggleClass('active');
        $('.header__categories').toggleClass('active');
    })
});

//Модальные окна
//Открытие
function openModal(id){
    $('.modal#'+id).addClass('active');
    $('.modal__background').addClass('active');
    $('body').addClass('noScroll');
}

//Закрытие
function closeModal() {
    $('.modal.active').removeClass('active');
    $('.modal__background').removeClass('active');
    $('body').removeClass('noScroll');
}

//Закрытие одного модального окна и открытие другого
function reOpenModal(id) {
    $('.modal.active').removeClass('active');
    $('.modal#'+id).addClass('active');
}