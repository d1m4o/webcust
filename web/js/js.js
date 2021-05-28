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
    
    $('.OrderClass a').click(() => {
        console.log('OrderClass clicked!');
        window.location = `${window.location.origin}/cabinet-orders`;
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
/*
WebOutString("<div class='PageCabinet ListCabinet'>");
WebOutString("<div class='BoxTitleImageCab'>");
WebOutString("<div class='ImageCab'> <a href=''><img src='../img/temp/our_product.jpg' alt='image'></a> </div>");
WebOutString("<div class='InfoBox'> <h2><a href=''>name</a></h2> <div class='descrip'>descrip</div>");
WebOutString("<div class='price'>€200 price</div> </div> </div>");
WebOutString("<div class='ListInfoCab'>");
WebOutString("<div class='row'> <div class='col-6'> <div class='Info1'>Pasitujuma numurs:</div> </div>");
WebOutString("<div class='col-6'> <div class='Info2'>123123123123</div> </div> </div> </div>");
WebOutString("<div class='ListInfoCab'>");
WebOutString("<div class='row'> <div class='col-6'> <div class='Info1'>Preču pārvadātājs:</div> </div>");
WebOutString("<div class='col-6'> <div class='Info2'>Sanemts veikala</div> </div> </div> </div>");
WebOutString("<div class='ListInfoCab'> <div class='row'> <div class='col-6'><div class='Info1'>Saņēmējs:</div></div>");
WebOutString("<div class='col-6'> <div class='Info2'>Vlads Ventru</div> </div> </div></div>");
WebOutString("<div class='ListInfoCab'> <div class='row'> <div class='col-6'> <div class='Info1'>Samaksas veids:</div> </div>");
WebOutString("<div class='col-6'> <div class='Info2'>Pārskaitījums</div> </div> </div></div>");
WebOutString("<div class='ListInfoCab'> <div class='row'>");
WebOutString("<div class='col-6'> <div class='Info1'>Statuss:</div> </div> <div class='col-6'>");
WebOutString("<div class='Info2 Status'>Prece vel veikala</div> </div> </div> </div>");
WebOutString("<div class='ListInfoCab'> <div class='row'> <div class='col-6'><div class='Info1'>Datums:</div>");
WebOutString("</div> <div class='col-6'> <div class='Info2'>" & ToolWebNGTranslateText(25805) & "</div> </div>");
WebOutString("</div></div><div class='BoxBtns'> <a href='' class='btns-blue-dark'>Pasutīt velreiz</a> </div> </div>");
 */