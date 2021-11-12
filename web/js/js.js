$(document).ready(function(){
    $('.TopMenu > ul > li').has( 'ul' ).addClass('ArrowDownMenu');
    $('.TopMenu > ul > li').hover(function(){
        $(this).find('ul').stop().slideToggle(200);}
    );/*
    notLoggedIn
    $('.Login').click(function (){
        $('.LoginInner').toggle();
        return false;
    }); */
    $('.InnerCartList > input[type=number]').change((e) => {
        console.log('e = ', e);
    });
    $('.AboutUsClass a').attr('href', `${window.location.origin}/par-mums#aboutUs`); 
    /*$('.AboutUsClass a').click(() => {
        window.location = `${window.location.origin}/par-mums#aboutUs`;
    });*/

    $('#loggedIn').click(function (){
        $('.LoginInner').toggle();
        return false;
    });
    // ChangePWClass
    $('.ChangePWClass a').click(() => {
        $('#ModalChangePass').modal('show');
    });
    
    $('.OrderClass a').click(() => {
        window.location = `${window.location.origin}/veikals/orders`;
    });

    $('.logoutClass a').click(() => {
        window.location = `${window.location.origin}/WebUpdatingAction.hal?action=logout&path=/`;
    });
    $('#checkoutBtn').click((e) => {
        if (document.getElementById('loggedIn')) {
            window.location = `${window.location.origin}/delivery`;
        } else $('#ModalLogin').modal('show');
    });
    $('#RespBurg').click(function (){
        $('.TopMenu').toggle();
        $(this).toggleClass('active');
        return false;
    });     
    $('#myCabResp').click(function (){
        if (!$('.LoginInner ul li').length) {
            $('#ModalLogin').modal('show');
            return false;
        }
        $(".LoginInner").toggle();
        $(this).toggleClass('active');
        return false;
    });

    $('#Slider').owlCarousel({
        loop:false,
        nav:true,
        margin:0,
        responsiveClass:true,
        items:1
    });
    $('#ProductSlider').owlCarousel({
        loop:false,
        nav:true,
        margin:0,
        autoHeight:false,
        responsiveClass:true,
        items:1
    }); 
    $('#TeamSlider').owlCarousel({
        loop:false,
        nav:true,
        margin:0,
        autoHeight:false,
        responsiveClass:true,
        items:3,
        responsive:{
            0:{
                items:1
            },
            767:{
                items:2
            },
            1000:{
                items:3
            }
        }        
    });
    $('#ClientsAboutUsSlider').owlCarousel({
        loop:false,
        nav:true,
        margin:0,
        autoHeight:false,
        responsiveClass:true,
        items:3,
        responsive:{
            0:{
                items:1
            },
            767:{
                items:2
            },
            1000:{
                items:3
            },
            1200:{
                items:4
            }            
        }        
    });
    $( '#ProdSlider' ).sliderPro({
        width: 960,
        height: 500,
        arrows: true,
        buttons: true,
        waitForLayers: true,
        fade: true,
        autoplay: false,
        autoScaleLayers: false,
        // autoHeight: true
    });
    $('.sp-arrow').css('cursor', 'pointer');
    $('.sp-thumbnail').css('cursor', 'pointer');
   
    $('#ProdSlider').on('click', (event) => {
        if (event.target.className == 'sp-image') {
            const gallery = new Viewer(document.getElementById('ProdSlider'), {
                filter(image) {
                    if (image.className == 'sp-image') return image
                },
            });
            gallery.show();
        }
    });


    $('#ProdListSlide').owlCarousel({
        loop:false,
        nav:true,
        margin:30,
        autoHeight:false,
        responsiveClass:true,
        items:3,
        responsive:{
            0:{
                items:1
            },
            767:{
                items:1
            },
            1000:{
                items:2
            },
            1200:{
                items:3
            }            
        }        
    });     
    $('input[type=checkbox], select, input[type=radio], input[type=file],input[type=number]').styler({
        selectSearch: true,
        selectSearchNotFound: ' ',
        selectSearchPlaceholder: '...',
        selectSearchLimit: 5
    }); 
    /*
   /* $('#MapProduct').click(function (){
        $('.mapster_el').css({"opacity":".3"});
    });
    $('area').click(function (){
        $('area').addClass('active').css({"opacity":"1"});
    }); */
 });
