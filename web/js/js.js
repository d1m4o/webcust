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
    // console.log('docready = ', JSON.parse(JSON.stringify($('#loggedIn'))));
    $('#loggedIn').click(function (){
        console.log('loggedIn');
        $('.LoginInner').toggle();
        return false;
    });
    $('.logoutClass a').click(() => {
        console.log('logout');
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
        buttons: false,
        waitForLayers: true,
        fade: true,
        autoplay: false,
        autoScaleLayers: false
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
        selectSearch: true
    }); 
    /*
   /* $('#MapProduct').click(function (){
        $('.mapster_el').css({"opacity":".3"});
    });
    $('area').click(function (){
        $('area').addClass('active').css({"opacity":"1"});
    }); */
 });


// http://localhost:81/dologin&company=3&login=1005&passwd=123