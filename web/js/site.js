function isVisible(elem) {
  let coords = elem.getBoundingClientRect();
  let windowHeight = document.documentElement.clientHeight;

  let topVisible = coords.top > 0 && coords.top < windowHeight;
  let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

  return topVisible || bottomVisible;
}

function backToProductCatalog() {
  let filter = localStorage.getItem('FilterType');
  if (filter) {
    window.location = `${window.location.origin}/veikals/catalog?wsh=${filter}#products`;
  } else window.location = `${window.location.origin}/veikals/catalog#products`;
}

/*

function isVisible(elem) {

  let coords = elem.getBoundingClientRect();

  let windowHeight = document.documentElement.clientHeight;

  let extendedTop = -windowHeight;
  let extendedBottom = 2 * windowHeight;

  // top visible || bottom visible
  let topVisible = coords.top > extendedTop && coords.top < extendedBottom;
  let bottomVisible = coords.bottom < extendedBottom && coords.bottom > extendedTop;

  return topVisible || bottomVisible;
}
*/

function showVisible() {
  for (let img of document.querySelectorAll('img')) {
    let realSrc = img.dataset.src;
    if (!realSrc) continue;

    if (isVisible(img)) {
      img.src = realSrc;
      img.dataset.src = '';
    }
  }
}
function showVisibleTimeOut() {
  setTimeout(() => {
    console.log(1111);
    showVisible();
  }, 300);
}
let activeType = '';
const activeFilters = {
  /*FilterColor: [],
  FilterMaterial: [],
  FilterType: [] */
};

let webDataArray = [];
  // get WebProductMaterialColor
  if (window.location.pathname == '/veikals/catalog') {
    $.ajax({
      type: "GET",
      url: `${window.location.origin}/WebProductMaterialColor.hal`,
      success: (data, message, res) => {

        if (res.status != 200) return;
        let webData = data;
        webData = webData.slice(1, -1);
        let tmpWebDataArray = webData.split('],');
        let i = 0;
        for (let el of tmpWebDataArray) {
            i++;
            if (i == tmpWebDataArray.length) el = el.slice(0, -1);
            el = el.slice(1);
            el = el.split(',');
            webDataArray.push(el);
        }
        const filter = filtrateByUrl(); 
        if (filter) {
          SetFilterProduct(filter);
        }
      },
      error: (e) => {
        console.log('error = ', e);
      }
    });
  }
// galery 
const galerySlider = () => {
  if (window.location.pathname != '/' && window.location.pathname != '/musu-darbi') return;
  const tabModals = {};
  $('.Tab-panel-works').each((index, element) => {
    let id = $(element).attr('id');
    tabModals[id]= [];
    $(element).find('span').each((i, el) => {
      let modalName = $(el).attr('data-target');
      tabModals[id].push(modalName);
    });
  });

  $('.ModalArrowNext').click((e) => {
    const currentModalId = $(e.target).closest('.ModalWork').attr('id');
    const currentTabId = $(`[data-target='#${currentModalId}']`).closest('.Tab-panel-works').attr('id');
    if (tabModals[currentTabId] && tabModals[currentTabId].includes(`#${currentModalId}`)) {
      let next;
      for (let i in tabModals[currentTabId]) {
        if (tabModals[currentTabId][i] != `#${currentModalId}`) continue;
        if (i < (tabModals[currentTabId].length - 1)) {
          next = parseInt(i, 10) + 1;
        } else next = 0;
      }
      $(e.target).closest('.ModalWork').modal('hide');
      $(`${tabModals[currentTabId][next]}`).modal('show');
      showVisibleTimeOut();
    }
  });

  $('.ModalArrowPrev').click((e) => {
    const currentModalId = $(e.target).closest('.ModalWork').attr('id');
    const currentTabId = $(`[data-target='#${currentModalId}']`).closest('.Tab-panel-works').attr('id');
    if (tabModals[currentTabId] && tabModals[currentTabId].includes(`#${currentModalId}`)) {
      let prev;
      for (let i in tabModals[currentTabId]) {
        if (tabModals[currentTabId][i] != `#${currentModalId}`) continue;
        if (i > 0) {
          prev = parseInt(i, 10) - 1;
        } else prev = (tabModals[currentTabId].length - 1);
      }
      $(e.target).closest('.ModalWork').modal('hide');
      $(`${tabModals[currentTabId][prev]}`).modal('show');
      showVisibleTimeOut();
    }
  });
}
// delivery
const onDeliveryClick = (deliveryType) => {
  if (!deliveryType) return;
  if (deliveryType == 1 ) {
    $.ajax({
      type: "GET",
      url: `${window.location.origin}/WebDeliveryMode.hal?mode=${deliveryType}`,
      success: (data, message, res) => {
        if (res.status != 200) return;
        if (res.responseText == 'Error') {
          console.log('Error');
        } else if (res.responseText == 'Ok') {  
          $.ajax({
            type: "GET",
            url: `${window.location.origin}/WebFinishOrder.hal?mode=${deliveryType}`,
            success: (data, message, res) => {
              if (res.status != 200) return;
              if (res.responseText == 'Error') {
                console.log('Error');
              } else if (res.responseText == 'Ok') {
                window.location.href = `${window.location.origin}/thanks`;
              }
            },
            error: (e) => {
              console.log('error = ', e);
            }
          });
        }
      },
      error: (e) => {
        console.log('error = ', e);
      }
    });
  } else {
    const country = $('#country_dlvr').val();
    const city = $('#city_dlvr').val();
    const street = $('#street_dlvr').val();
    const houseNumber = $('#hNumber_dlvr').val();
    const zipCode = $('#code_dlvr').val();
    // console.log(country, city, street, houseNumber, zipCode);
    if (!country || !city || !street || !houseNumber || !zipCode) return;
    $.ajax({
      type: "GET",
      url: `${window.location.origin}/WebDeliveryMode.hal?mode=${deliveryType}&country=${country}&city=${city}&street=${street}&houseNumber=${houseNumber}&zipCode=${zipCode}`,
      success: (data, message, res) => {
        if (res.status != 200) return;
        if (res.responseText == 'Error') {
          console.log('Error');
        } else if (res.responseText == 'Ok') {
          $('#ModalDelivery').modal('hide');
          $.ajax({
            type: "GET",
            url: `${window.location.origin}/WebFinishOrder.hal?mode=${deliveryType}`,
            success: (data, message, res) => {
              if (res.status != 200) return;
              if (res.responseText == 'Error') {
                console.log('Error');
              } else if (res.responseText == 'Ok') {
                window.location.href = `${window.location.origin}/thanks`;
              }
            },
            error: (e) => {
              console.log('error = ', e);
            }
          });
        }
      },
      error: (e) => {
        console.log('error = ', e);
      }
    });
  }
  
};
// ---------------------------------------------- end delivery --------------------

// profile
const getData = () => {
  $.ajax({
    type: "GET",
    url: `${window.location.origin}/WebGetCabinetData.hal`,
    success: (data, message, res) => {
      data = JSON.parse(data);
      if (res.status != 200) return;
      if (res.responseText == 'Error') {
        return console.log('Error');
      }
      const { name, phone, email, address } = data;
      if (name) $('#cabinet_firstname').val(name);
      if (phone) $('#cabinet_phone').val(phone);
      if (email) $('#cabinet_email').val(email);
      if (address) $('#cabinet_address').val(address);
    },
    error: (e) => {
      console.log('error = ', e);
    }
  });
};

const onCabinetSaveBtnClick = () => {
  const name = $('#cabinet_firstname').val();
  const surename = $('#cabinet_secondname').val();
  const email = $('#cabinet_email').val();
  const phone = $('#cabinet_phone').val();
  const newPW = $('#cabinet_newPw').val();
  const againPw =$('#cabinet_againPw').val();
  const address = $('#cabinet_address').val();

  
  if (newPW && newPW !== againPw) {
    let hasClass = $('#cabinet_newPw').hasClass('is-invalid');
    if (!hasClass) $('#cabinet_newPw').addClass('is-invalid');
    hasClass = $('#cabinet_againPw').hasClass('is-invalid');
    if (!hasClass) $('#cabinet_againPw').addClass('is-invalid');
    return;
  } else {
    $('#cabinet_newPw').removeClass('is-invalid');
    $('#cabinet_againPw').removeClass('is-invalid');
  }
  // if (!email || !address) return;

  const validateEmail = (mail) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
  }


if (!validateEmail(email)) {
    let hasClass = $('#cabinet_email').hasClass('is-invalid');
    if (!hasClass) $('#cabinet_email').addClass('is-invalid');
    // $('#emailMessage_incorrect').show();
    return;
} else {
    $('#cabinet_email').removeClass('is-invalid');
    // $('#emailMessage_incorrect').hide();
}


$.ajax({
  type: "GET",
  url: `${window.location.origin}/WebUpdateCustomerData.hal?name=${name}&surename=${surename}&email=${email}&phone=${phone}&address=${address}&newPw=${newPW}`,
  success: (data, message, res) => {
    if (res.status != 200) return;
    if (res.responseText == 'Error') {
        console.log('Error');
    } else if (res.responseText == 'Ok') {
      console.log('Ok');
      $('#savedLabel').css('display', 'inline');
      const timeOut = setTimeout(() => {
        $('#savedLabel').hide();
        clearTimeout(timeOut);
      }, 2000);
    }
  },
  error: (e) => {
    console.log('error = ', e);
  }
});

};
// ---------------------------------------------- end profile --------------------
let filterNames = [];
let waw = () => 1;
// product info page
const productInfoPriceGenerate = (productCode) => {
  /* $("select[name='color']").styler({
    selectSearch: true
  }); 
  $("select[name='type']").styler({
    selectSearch: true
  });
  */ 
  if (!productCode) return;
  $.ajax({
    type: "GET",
    url: `${window.location.origin}/WebProductPrices.hal?prod=${productCode}`,
    success: (data) => {
      if (!data) return;
      data = JSON.parse(data);
      const prices = data.prices;

      let pricesArray = [];
      for (let price of prices) {
        let p = price[Object.keys(price)[0]];
        if (!pricesArray.includes(p)) pricesArray.push(p);
      }
      let maхPrice = Math.max.apply(Math,pricesArray);
      let minPrice = Math.min.apply(Math,pricesArray);

      if (minPrice != maхPrice) $('.Product .DetailsProd .ProdLi .Price').html(`€${minPrice} - ${maхPrice}`);
      else $('.Product .DetailsProd .ProdLi .Price').html(`€${minPrice}`);

      $(".jq-selectbox select[name='color']").attr("disabled","disabled");
      
      $("input[name=unit]").attr("disabled","disabled");
      $("a[data-target='#ModalRecommended']").attr('style', 'cursor: not-allowed');
      $('select[name=type]').trigger('refresh');
      $('select[name=color]').trigger('refresh');
      let allColorOption = [];
      let allMaterial = [];

      $(".jq-selectbox select[name='color'] option").each((i, el) => {
        allColorOption.push($(el));
      });

      $(".jq-selectbox select[name='type'] option").each((i, el) => {
        allMaterial.push($(el));
      });
      // console.log('allMaterial = ', allMaterial);
      if (allMaterial.length == 2) { // case: if only 1 material
        $(".jq-selectbox select[name='type'] option[value='']").prop('selected', true);
        $(".jq-selectbox select[name='type']").attr("disabled", true);
        $(".jq-selectbox select[name='color']").attr("disabled", false);
        $('select[name=type]').trigger('refresh');
        $('select[name=color]').trigger('refresh');
      }

      if (allMaterial.length < 2) {
        $(".jq-selectbox select[name='type']").parent().parent().parent().remove();
        $(".jq-selectbox select[name='color']").attr("disabled", false);
        $('select[name=color]').trigger('refresh');
      }


      $('input[name=unit]').on('input', (e) => {
        $($('input[name=unit]')).val($($('input[name=unit]')).val().replace(/[A-Za-zА-Яа-яЁё]/, ''));
      });
      $(".jq-selectbox select[name='type']").change((e) => {
        let typeCode = e.target.value;
        let colorCode = $(".jq-selectbox select[name='color']").val();

        let key = `${typeCode}_${colorCode}`;
        if ( typeCode == 'emptyMaterial') {
          $(".jq-selectbox select[name='color']").attr("disabled","disabled"); 
          if (minPrice != maхPrice) $('.Product .DetailsProd .ProdLi .Price').html(`€${minPrice} - ${maхPrice}`);
          else $('.Product .DetailsProd .ProdLi .Price').html(`€${minPrice}`);
          $(".jq-selectbox select[name='color'] option[value='emptyColor']").prop('selected', true);
          $("a[data-target='#ModalRecommended']").attr('style', 'cursor: not-allowed');
          $('select[name=color]').trigger('refresh');
          return;
        } else{
          $("a[data-target='#ModalRecommended']").attr('style', 'cursor: not-allowed');
          $(".jq-selectbox select[name='color']").attr("disabled", false);
          $('select[name=color]').trigger('refresh');
        } 
        for (let price of prices) {
          let combination = Object.keys(price)[0];
          let a = combination.split('_');
          if (typeCode == a[0]) $('.Product .DetailsProd .ProdLi .Price').html(`€${price[combination]}`);
        }
        
        let keys = prices.map(price => Object.keys(price)[0]);
        let colorCodes = [];
        for (let k of keys) {
          let str = k.slice(0, k.lastIndexOf('_'));
          if (str == typeCode) colorCodes.push(k.slice(k.lastIndexOf('_') + 1, k.length));
        }
        $("select[name='color']").empty();
        for (let option of allColorOption) {
          $("select[name='color']").append(option);
        }
       
        $(".jq-selectbox select[name='color'] option").each((i, el) => {
          let val = $(el).val();
          if (colorCodes.includes(val) || val == 'emptyColor') {
            $(el).prop('disabled', false);
          } else {
            $(el).remove();
          }
          if (val == 'emptyColor')  $(el).prop('selected', true);
        });
        $('select[name=color]').trigger('refresh');

      });
      
      $(".jq-selectbox select[name='color']").change((e) => {
        let typeCode = $(".jq-selectbox select[name='type']").val();
        let colorCode = e.target.value;
        if (colorCode != 'emptyColor') {
          $("a[data-target='#ModalRecommended']").attr('style', 'cursor: pointer');
          $("input[name=unit]").removeAttr("disabled");
        }
        else {
          $("a[data-target='#ModalRecommended']").attr('style', 'cursor: not-allowed');
          $("input[name=unit]").attr("disabled","disabled");
        }
        let key = `${typeCode}_${colorCode}`;
        for (let price of prices) {
          if (price[key]) {
            $('.Product .DetailsProd .ProdLi .Price').html(`€${price[key]}`);
          }
        }
      });


    },
    error: (e) => {
      console.log('error = ', e);
    }
  });
};
//

const onFilterClick = (param, param2) => {
  const contextsContainer = document.getElementsByClassName('resultProducts')[0];
  const items = contextsContainer.getElementsByClassName('productItem');
  for (let el of items) {
      if (el.style.display === 'none') {
          $(el).addClass('filteredItem')
      } else {
          el.removeAttribute('style');
          $(el).removeClass('filteredItem')
      }
  }
  setTimeout(() => {
    paginationProducts.rebuild();
  }, 500);
};
// filtrate by url
const filtrateByUrl = () => {
  const search = window.location.search;
  if (search.indexOf('?wsh=') === -1) return;
  const filterCode = search.slice(search.lastIndexOf('=') + 1, search.length);
  if (!filterCode) return
  return filterCode;
};

const SetFilterProduct = (searchCode) => {
  let liWSH = $(".filter-buttons li").map((e,l) => {
    if ($(l).attr('list-cls') == 'FilterType') return l;
  });
  let cls = $(liWSH).attr("list-cls");
  activeType = cls;
  var l = $(liWSH);
  cls = $(l).attr("list-cls");
  if ($(".active_filter").length>0){
    $(".active_filter").remove();
  } else {
    list = $(".filter_option .filter_list" + cls + " > div");
    sel = $(list).clone(true,true);
    $(sel).addClass("active_filter");
    $(".product-catalog-list").prepend(sel);
    SetFilterSelection(sel,l);
    // start
    var type = 'FilterType';
    var opt = $(".filter-buttons > li[list-cls='" + type + "']");

    var options = $(opt).data("filter_options");
    if (!options){
      options = [];
    }
    var strvals = $(opt).data("filter_options_str");
    if (!strvals){
      strvals = [];
      $(opt).data("origstr",$(opt).find("a").html());
    }
    
    cls = cls.toUpperCase();
    var inx = options.indexOf(cls);
    if (inx>-1){
      options.splice(inx,1);
      strvals.splice(inx,1);
    } else {
      $(".resultProducts div ul li").each((i, el) => {
        cls = $(el).attr("cls");
        if (cls === searchCode) {
          $(el).toggleClass("active_filter_option");
          $(el).toggleClass("active");
          options.push(cls);
          strvals.push($(el.firstElementChild).html());
        }
      });
    }

    $(opt).data("filter_options",options);
    $(opt).data("filter_options_str",strvals);
    if (strvals.length>0) {
      $(opt).find("a").html(strvals.join(","));
    } else {
      $(opt).find("a").html($(opt).data("origstr"));
    }
    RefreshFilters();
    
    if (filterNames.includes($(opt).text().toUpperCase())) {
      $(opt).removeClass('active');
    } else {
      $(opt).addClass('active');
      waw = () => {
          $(opt).data("filter_options", []);
          $(opt).data("filter_options_str",[]);
          $(opt).find("a").html($(opt).data("origstr"));
          RefreshFilters();
          onFilterClick();
          $(opt).removeClass('active');
      };
      $(opt).find("a").append(` <span id=\'span\' onclick='waw()'  class=\'fa fa-times fa-lg\' aria-hidden=\'true\'></span>`);        
    }
    onFilterClick(); // rebuild pagination after filtrated
    // end
  }
};


function SetContactForm(form){
    $(form).find("input[type='text']").each(function(){
      $(this).keyup(function(){
        $(this).removeClass("err");
      });
    });
    $(form).find("textarea").each(function(){
      $(this).keyup(function(){
        $(this).removeClass("err");
      });
    });
}

function ValidateContactForm(form){
  var res = true;
  $(form).find("input[type='text']").each(function(){
    if ($(this).val()==""){
      $(this).addClass("err");
      res = false;
    }
  });
  $(form).find("textarea").each(function(){
    if ($(this).val()==""){
      $(this).addClass("err");
      res = false;
    }
  });
  return res;
}

function ClearContactForm(form){
    $(form).find("input[type='text']").each(function(){
      $(this).val("");
    });
    $(form).find("textarea").each(function(){
      $(this).val("");
    });
}

$(document).ready(function(){
  galerySlider();
  // profile 
  if (window.location.pathname == '/cabinet-profile') getData();
  $('#cabinet_saveBtn').click((e) => {
    onCabinetSaveBtnClick();
  });
  //paginationProducts start
  $(".filter-buttons li a").each(( index, value ) => {
    filterNames.push(value.innerText.toUpperCase());
  });
  $(function(){
    paginationProducts = new $.smFilteredPagination($("#paginationProducts"), {
        pagerItems: 'div.productItem',
        pagerItemsWrapper: "div.resultProducts",
        pagerFooter: "pagerFooterProduct",
        showPagerHeader: false,
        showPagerFooter: true,
        itemsPerPage: 8,
        filteredClassList: ".filteredItem",
    });
    if (window.location.search.indexOf('view=list')!=-1) {
      paginationProducts.setItemsPerPage(8);
    } else paginationProducts.setItemsPerPage(6);

  });
  /*
  const filter = filtrateByUrl(); 
  if (filter) {
    SetFilterProduct(filter);
  }*/
  // end

  // productInfo code
  if (window.location.pathname.indexOf('veikals/productinfo') != -1) {
    const path = window.location.pathname;
    const itemCode = path.slice(path.lastIndexOf('/') + 1, path.length);
    productInfoPriceGenerate(itemCode);
  }
  // end -------------
  // products dropdown
  const [ productElement ] = document.getElementsByClassName('ArrowDownMenu');

  $('.ArrowDownMenu a').attr('href', '/veikals/catalog#products');

  let dropdownProductsHTML = '';
   $.ajax({
    type: "GET",
    url: `${window.location.origin}/WebGetFilters.hal`,
    success: (data) => {
      if (!data) return;
      data = JSON.parse(data);
      if (!data['FilterType'] || !data['FilterType'].length) return;
      const wshData = data['FilterType'].map(el => el);
      for (let el of wshData) {
        dropdownProductsHTML += `<li><a href=${window.location.origin}/veikals/catalog?wsh=${Object.keys(el)[0]}#products> ${Object.values(el)[0]} </a></li>`;
      }
      if (dropdownProductsHTML) $(productElement).append(`<ul> ${dropdownProductsHTML} </ul>`);
    },
    error: (e) => {
      console.log('error = ', e);
    }
  });
  //
  if ($(".cu_form").length>0) {
  
    $(".cu_form form").submit(function(e){e.stopPropagation(); return false; });
    var form = $(".cu_form form");
    SetContactForm(form);
    
    $(".cu_form").find("input[type='submit']").click(function(){
      if (ValidateContactForm(form)) {
        $.ajax({
          url:"/WebUpdatingAction.hal?action=submitcuform",
          method:"POST",
          data:$(form).serialize(),
          success:function(data){
            alert($(data).attr('msg'));
            if ($(data).attr("err")=="0"){
              ClearContactForm(form);
            }
          }
        })
      };
    });  
  }
  if ( $(".newsletter-form form").length>0) {
    var newsform = $(".newsletter-form form").get(0);
    $(newsform).submit(function(e){e.stopPropagation(); return false; });
    $(".newsletter-form button").click(function(){
     $.ajax({
        type: "POST",
        url: "/WebSubmitNewsLetter.hal",
        data: $(newsform).serialize(),
        success: function(data){
           if ($(data).attr("msg")!=""){
              alert($(data).attr("msg"));
           }
           newsform.email.value = "";
        }
      });
    });
  }
  $(".owl-item:nth-child(odd) .SlideAbout-item .Square").addClass("Red");
  $(".owl-item:nth-child(even) .SlideAbout-item .Square").addClass("Blue");

  $(".DetailsProd .btns-red").click(function(){
    var form = $(this).closest("form").get(0);
    
    if (form.type && form.type.value == 'emptyMaterial' || form.color.value == 'emptyColor' || !form.unit.value) return console.log('EMPTY!');
    const typeVal = form.type ? form.type.value : '';
    $.get("/WebUpdatingAction.hal?action=mm_addtobasket&type=" + typeVal + "&color=" + form.color.value + "&qty=" + form.unit.value + "&item=" + form.item.value,function(data){
      console.log(`${'/WebUpdatingAction.hal?action=mm_addtobasket&type=' + typeVal + "&color=" + form.color.value + "&qty=" + form.unit.value + "&item=" + form.item.value}`);
      console.log('data = ', $(data).find("res").attr("qty"));
      console.log('data  dd = ', $(data).find("res"));
      console.log('data ', data);
      $(".Cart a").html(`<span class='CartNumb'>${parseInt($(data).find("res").attr("qty"), 10)} </span>`);
      
      $('#addedBasketAllert').show();
      if (form.type) form.type.value = 'emptyMaterial';
      form.color.value = 'emptyColor';
      form.unit.value = '';
      $('select[name=type]').trigger('refresh');
      $('select[name=color]').trigger('refresh');
      const timeOut = setTimeout(() => {
        $('#addedBasketAllert').hide();
        clearTimeout(timeOut);
      }, 2000);

      // $(".Cart a").html($(data).find("res").attr("qty"));
    })
  });  

  
  $(".DeliveryWrapp .deliv1").click(() => {
    onDeliveryClick(1);
  });

  $(".DeliveryWrapp .deliv2").click(() => {
    $('#ModalDelivery').modal('show');
  });

  $('#onOkDelivery').click(() => {
    onDeliveryClick(2);
  });

  $("[data-target='#ModalAddCart']").click(function(e){
    var itemcode = "";
    var a = this;
    qty = 1;
    if ($(this).closest("form").length>0){
      var form = $(this).closest("form").get(0);
      qty = form.qty.value;
      itemcode = form.item.value;
    } else if ($(this).closest(".ProductList-item").length>0){
      itemcode = $(this).closest(".ProductList-item").attr("itemcode");
      qty = $(this).closest(".ProductList-item").find("[name='qty']").val();
    }
    if ($(this).get(0).hasAttribute("data-toggle")==false) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (itemcode!=""){
      $.get("/WebAction.hal?action=getitemvars&item=" + itemcode,function(data){
        if (data!=""){
          $("#ModalAddCart .modal_inner_body").html(data);
          $("#ModalAddCart .modal_inner_body").find('input[type=checkbox], select, input[type=radio], input[type=file],input[type=number]').styler({
              selectSearch: true,
              selectSearchLimit: 5,
              selectSearchNotFound: ' ',
              selectSearchPlaceholder: '...',
          });
          //================Custom filter=============

          $.ajax({
            type: "GET",
            url: `${window.location.origin}/WebProductPrices.hal?prod=${itemcode}`,
            success: (data) => {
              if (!data) return;
              data = JSON.parse(data);
              const prices = data.prices; 
        
              let pricesArray = [];
              for (let price of prices) {
                let p = price[Object.keys(price)[0]];
                if (!pricesArray.includes(p)) pricesArray.push(p);
              }
              let maхPrice = Math.max.apply(Math,pricesArray);
              let minPrice = Math.min.apply(Math,pricesArray);
              //
              if (maхPrice != minPrice) $('.modalPrice').html(`€${minPrice} - ${maхPrice}`);
              else $('.modalPrice').html(`€${minPrice}`);

              $(".jq-selectbox select[name='color']").attr("disabled","disabled"); 
              $("a[data-target='#ModalRecommended']").attr('style', 'cursor: not-allowed');

              $('input[name=unit]').attr("disabled","disabled");
              $('input[name=unit]').trigger('refresh');
              $('select[name=type]').trigger('refresh');
              $('select[name=color]').trigger('refresh');
             
              let allColorOption = [];
              $(".jq-selectbox select[name='color'] option").each((i, el) => {
                allColorOption.push($(el));
              });

              $('input[name=unit]').on('input', (e) => {
                $($('input[name=unit]')).val($($('input[name=unit]')).val().replace(/[A-Za-zА-Яа-яЁё]/, ''))
              });

              $(".jq-selectbox select[name='type']").change((e) => {
                e.preventDefault();
                let typeCode = e.target.value;
                let colorCode = $(".jq-selectbox select[name='color']").val();

                if (colorCode == 'emptyColor' || typeCode =='emptyMaterial') {
                  $('input[name=unit]').attr("disabled",true);
                  $('input[name=unit]').trigger('refresh');
                } else {
                  $('input[name=unit]').attr("disabled", false);
                  $('input[name=unit]').trigger('refresh');
                }
                let key = `${typeCode}_${colorCode}`;
                if ( typeCode == 'emptyMaterial') {
                  $(".jq-selectbox select[name='color']").attr("disabled","disabled");
                  if (minPrice != maхPrice) $('.modalPrice').html(`€${minPrice} - ${maхPrice}`);
                  else $('.modalPrice').html(`€${minPrice}`);
                  $(".jq-selectbox select[name='color'] option[value='emptyColor']").prop('selected', true);
                  $("a[data-target='#ModalRecommended']").attr('style', 'cursor: not-allowed');
                  $('select[name=color]').trigger('refresh');
                  return;
                } else{
                  $("a[data-target='#ModalRecommended']").attr('style', 'cursor: not-allowed');
                  $(".jq-selectbox select[name='color']").attr("disabled", false);
                  $('select[name=color]').trigger('refresh');
                } 
                for (let price of prices) {
                  let combination = Object.keys(price)[0];
                  let a = combination.split('_');
                  if (typeCode == a[0]) $('.modalPrice').html(`€${price[combination]}`);
                }
                
                let keys = prices.map(price => Object.keys(price)[0]);
                let colorCodes = [];
                for (let k of keys) {
                  let str = k.slice(0, k.lastIndexOf('_'));
                  if (str == typeCode) colorCodes.push(k.slice(k.lastIndexOf('_') + 1, k.length));
                }
                $("select[name='color']").empty();
                for (let option of allColorOption) {
                  $("select[name='color']").append(option);
                }
               
                $(".jq-selectbox select[name='color'] option").each((i, el) => {
                  let val = $(el).val();
                  if (colorCodes.includes(val) || val == 'emptyColor') {
                    $(el).prop('disabled', false);
                  } else {
                    $(el).remove();
                  }
                  if (val == 'emptyColor')  $(el).prop('selected', true);
                });
                $('select[name=color]').trigger('refresh');
        
              });
              
              $(".jq-selectbox select[name='color']").change((e) => {
                e.preventDefault();
                let typeCode = $(".jq-selectbox select[name='type']").val();
                let colorCode = e.target.value;

                if (colorCode == 'emptyColor' || typeCode =='emptyMaterial') {
                  $('input[name=unit]').attr("disabled", true);
                  $('input[name=unit]').trigger('refresh');
                } else {
                  $('input[name=unit]').attr("disabled", false);
                  $('input[name=unit]').trigger('refresh');
                }
                if (colorCode != 'emptyColor') $("a[data-target='#ModalRecommended']").attr('style', 'cursor: pointer');
                else $("a[data-target='#ModalRecommended']").attr('style', 'cursor: not-allowed');
                let key = `${typeCode}_${colorCode}`;
                for (let price of prices) {
                  if (price[key]) {
                    $('.modalPrice').html(`€${price[key]}`);
                  }
                }
              });
            },
            error: (e) => {
              console.log('error = ', e);
            }
          });
          //=================end======================
          $(".modal_inner_body .btns-white-red").click(function(){
            var pop = $(this).closest("#ModalAddCart");
            var form = $(this).closest("form").get(0);
            if (form.type.value == 'emptyMaterial' || form.color.value == 'emptyColor' || !form.unit.value) return console.log('EMPTY!');
            //consol.elog(form);
            $.get("/WebUpdatingAction.hal?action=mm_addtobasket&type=" + form.type.value + "&color=" + form.color.value + "&qty=" + form.unit.value + "&item=" + form.item.value,function(data){
              //alert(data);
              //refresh basket
              //location.reload();
              // span 
              $(".Cart a").html(`<span class='CartNumb'>${parseInt($(data).find("res").attr("qty"), 10)} </span>`);
              // $(".Cart a").html($(data).find("res").attr("qty"));
              $(pop).modal('toggle');
            })
          });
        } else {
          $.get("/WebUpdatingAction.hal?action=mm_addtobasket&qty=" + qty + "&item=" + itemcode,function(data){
            //alert(data);
            //refresh basket
            //location.reload();
            $(".Cart a").html(`<span class='CartNumb'>${parseInt($(data).find("res").attr("qty"), 10)} </span>`);
            // $(".Cart a").html($(data).find("res").attr("qty"));
          });
        }
      });
    }
  });
  $(".InnerCartList .number-plus-minus input").change(function(e) {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) return;
    if (val > 100) e.target.value = 100;
    $.get("/WebUpdatingAction.hal?action=updatebasketqty&rownr=" + $(this).attr("rw") + "&qty=" + $(this).val(),function(){
      location.reload();
    });
  });
  $(".InnerCartList .DelCart").click(function(){
    $.get("/WebUpdatingAction.hal?action=removefrombasket&rownr=" + $(this).attr("rw"),function(){
      location.reload();
    })
  });
  
  $(".filter-buttons li a").click(function(e){
    e.stopPropagation();
    e.preventDefault();
    var l = $(this).parent();
    cls = $(l).attr("list-cls");
    if ($(".active_filter").length>0) {
      let activeCls = $(".active_filter").attr('list-type');
      $(".active_filter").remove();
      if (activeCls != cls) {
        list = $(".filter_option .filter_list" + cls + " > div");
        sel = $(list).clone(true,true);
        $(sel).addClass("active_filter");
        $(".product-catalog-list").prepend(sel);
        SetFilterSelection(sel,l);  
      }
    } else {
      list = $(".filter_option .filter_list" + cls + " > div");
      sel = $(list).clone(true,true);
      $(sel).addClass("active_filter");
      $(".product-catalog-list").prepend(sel);
      SetFilterSelection(sel,l);
    }
  });

  $(".filter_menu ul li a").click(function(e) {
    
    e.stopPropagation();
    e.preventDefault();
    let type = $(this).closest(".filter_menu").attr("list-type");
    let l = $(this).parent();

    if (type == 'FilterType') {
      let fListBtn = $(".filter-buttons > li[list-cls='" + type + "']");
      let activeFiltersList = $(fListBtn).data("filter_options");
      let clsAtr = $(l).attr("cls").toUpperCase();

      if (activeFiltersList && activeFiltersList.length && !activeFiltersList.includes(clsAtr)) return;
    }

    activeType = type;
    
    $(l).toggleClass("active_filter_option");
    $(l).toggleClass("active");
    
    var opt = $(".filter-buttons > li[list-cls='" + type + "']");
    var options = $(opt).data("filter_options");
    if (!options){
      options = [];
    }
    var strvals = $(opt).data("filter_options_str");
    if (!strvals){
      strvals = [];
      $(opt).data("origstr",$(opt).find("a").html());
    }
    var cls = $(l).attr("cls").toUpperCase();
 
    var inx = options.indexOf(cls);
    if (inx>-1){
      options.splice(inx,1);
      strvals.splice(inx,1);
    } else {
      options.push(cls);
      strvals.push($(this).html());
    }

    $(opt).data("filter_options",options);

    $(opt).data("filter_options_str",strvals);
    if (strvals.length>0){
      $(opt).find("a").html(strvals.join(","));
    } else {
      $(opt).find("a").html($(opt).data("origstr"));
    }
    RefreshFilters();
    
    onFilterClick(); // rebuild pagination after filtrated
    if (filterNames.includes($(opt).text().toUpperCase())) {
      $(opt).removeClass('active');
    } else {
      $(opt).addClass('active');
      $(opt).find("a").append(`
      <svg id='span${type}' class="svg-inline--fa fa-times fa-w-11 fa-lg" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" data-fa-i2svg=""><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
      `);
      // setTimeout(() => {
        /*
        $('.filter-buttons li a').each((index) => {
          if ($('.filter-buttons li a')[index].firstElementChild) {
            $('.filter-buttons li a')[index].firstElementChild.addEventListener('click', (e)=> {
              $(opt).data("filter_options", []);
              $(opt).data("filter_options_str",[]);
              $(opt).find("a").html($(opt).data("origstr"));
              RefreshFilters();
              onFilterClick();
              $(opt).removeClass('active');
            });
          }
        }) */
        $(`#span${type}`).click((e) => {
          $(opt).data("filter_options", []);
          $(opt).data("filter_options_str",[]);
          $(opt).find("a").html($(opt).data("origstr"));
          RefreshFilters();
          onFilterClick();
          $(opt).removeClass('active');
        });
      // }, 500);
 
    }
  });
  
  pg1 = new Pagination($(".BlogList > .row"),6);
  if ($("main.PageWorks").length>0) {
    pg7 = new Pagination($(".PageWorks #works1 > .row"),12);
    pg8 = new Pagination($(".PageWorks #works2 > .row"),12);
    pg9 = new Pagination($(".PageWorks #works3 > .row"),12);
    pg10 = new Pagination($(".PageWorks #works4 > .row"),12);
    pg11 = new Pagination($(".PageWorks #works5 > .row"),12);
  } else {
    pg2 = new Pagination($("#Works-tabContent #works1 > .row"),6);
    pg3 = new Pagination($("#Works-tabContent #works2 > .row"),6);
    pg4 = new Pagination($("#Works-tabContent #works3 > .row"),6);
    pg5 = new Pagination($("#Works-tabContent #works4 > .row"),6);
    pg6 = new Pagination($("#Works-tabContent #works5 > .row"),6);
  }
 
  // lazy load imgs
  window.addEventListener('scroll', showVisible);
  showVisible();
  $('.TabWrapp #Works-tab .nav-item > a').click(() => {
    setTimeout(() => {
      showVisible();
    }, 300);
  });
  $('.ImgWork .Image-container > svg').click(() => {
    console.log(11111111111111);
  });
})

function RefreshFilters(){
  var filters = {};
  $(".filter-buttons > li").each(function(){
    filters[$(this).attr("list-cls")] = $(this).data("filter_options");
    $(".product-catalog-list > div").each(function(){
      var el = this;
      if ($(el).hasClass("filter_menu")==false){
        var showallf = true;
        for (var i in filters){
          var showf = false;
          var attr = ("list-" + i).toLowerCase();
          list = $(el).attr(attr).split(",");
          if (filters[i]!==undefined && filters[i].length>0){
            for (var j in filters[i]){
              if (list.indexOf(filters[i][j])>-1) {
                showf = true;
              } else {
              
              }
            }
          } else {
            showf = true;
          }
          if (showf==false){
            showallf = false;
          }
        }
        if (showallf){
          $(el).show();
        } else {
          $(el).hide();
        }
      }
    });
  })
  // console.log('filters = ', filters);
  localStorage.setItem('FilterType', filters['FilterType']);
  filtrateFilters(filters);
  showVisible();
}
/*
function filtrateFilters(activeFiltersObj) {
  let showallf = true;
  for (let filterName in activeFiltersObj) {
    activeFilters[filterName] = [];
    if (activeFiltersObj[filterName] && activeFiltersObj[filterName].length > 0) showallf = false;
  }
  if (showallf) {
    for (let aFName in activeFilters) {
      $(`div[list-type=${aFName}] div ul li`).each((index, element) => {
         $(element).show();
      });
    }
    return;
  }

  for (let filterName in activeFiltersObj) {
    if (activeFiltersObj[filterName] && activeFiltersObj[filterName].length) {

      for (let choosenFilter of activeFiltersObj[filterName]) {

        for (let el of webDataArray) {
          if (el.includes(choosenFilter)) {
            if (filterName == 'FilterType' ) {
              if (!activeFilters.FilterMaterial.includes(el[1])) activeFilters.FilterMaterial.push(el[1]);
              if (!activeFilters.FilterColor.includes(el[2])) activeFilters.FilterColor.push(el[2]);
            } else if (filterName == 'FilterMaterial') { 
              if (!activeFilters.FilterType.includes(el[0])) activeFilters.FilterType.push(el[0]);
              if (!activeFilters.FilterColor.includes(el[2])) activeFilters.FilterColor.push(el[2]);
            } else if (filterName == 'FilterColor') {
              if (!activeFilters.FilterType.includes(el[0])) activeFilters.FilterType.push(el[0]);
              if (!activeFilters.FilterMaterial.includes(el[1])) activeFilters.FilterMaterial.push(el[1]);
            }
          }
        }

      }

    }
  }

  for (let aFName in activeFilters) {
    $(`div[list-type=${aFName}] div ul li`).each((index, element) => {
      let cls = $(element).attr('cls');
      if (activeType !== aFName && activeFilters[aFName] && !activeFilters[aFName].includes(cls)) {
        $(element).hide();
      }
      if (activeFilters[aFName].includes(cls)) $(element).show();
    });
  }
}
*/

function filtrateFilters(activeFiltersObj) {
  let showallf = true;
  for (let filterName in activeFiltersObj) {
    activeFilters[filterName] = [];
    if (activeFiltersObj[filterName] && activeFiltersObj[filterName].length > 0) showallf = false;
  }
  if (showallf) {
    for (let aFName in activeFilters) {
      $(`div[list-type=${aFName}] div ul li`).each((index, element) => {
         $(element).show();
      });
    }
    return;
  }

  let filtratedWebDataArray = webDataArray
    .filter(el => {
      if (!activeFiltersObj.FilterType || (activeFiltersObj.FilterType && !activeFiltersObj.FilterType.length)) return true;
      return activeFiltersObj.FilterType.includes(el[0]);
    })
    .filter(el => {
      if (!activeFiltersObj.FilterMaterial || (activeFiltersObj.FilterMaterial && !activeFiltersObj.FilterMaterial.length)) return true;
      return activeFiltersObj.FilterMaterial.includes(el[1]);
    })
    .filter(el => {
      if (!activeFiltersObj.FilterColor || (activeFiltersObj.FilterColor && !activeFiltersObj.FilterColor.length)) return true;
      return activeFiltersObj.FilterColor.includes(el[2]);
  });
  
  filtratedWebDataArray.forEach((el) => {
    if (!activeFilters.FilterType.includes(el[0])) activeFilters.FilterType.push(el[0]);
    if (!activeFilters.FilterMaterial.includes(el[1])) activeFilters.FilterMaterial.push(el[1]);
    if (!activeFilters.FilterColor.includes(el[2])) activeFilters.FilterColor.push(el[2]);
  });

  // console.log('filtratedWebDataArray = ', filtratedWebDataArray);
  // console.log('activeFilters= ', activeFilters);
  for (let aFName in activeFilters) {
    $(`div[list-type=${aFName}] div ul li`).each((index, element) => {
      // console.log('element = ', element);
      let cls = $(element).attr('cls');
      // console.log('cls ', cls);
      // console.log('activeType = ', activeType);
      if (activeType !== aFName && activeFilters[aFName] && !activeFilters[aFName].includes(cls)) {
        $(element).hide();
      }
      if (activeFilters[aFName].includes(cls)) $(element).show();
    });
  }
}

function SetFilterSelection(sel,l){
  var opt = $(l).data("filter_options");
  if (opt){
    for (var i in opt){
      var el = $(sel).find("li[cls='" + opt[i] + "']");
      $(el).toggleClass("active");
      $(el).toggleClass("active_filter_option");
    }
  }
  

}

function Pagination(list,perpage){
  this.curpage = 1;
  this.list = list;
  this.cnt = $(list).children().length;
  this.perpage = perpage;
  this.pages = parseInt(this.cnt/this.perpage)+1;
  this.firstf = false;

  if (this.cnt>this.perpage){
  
    $(list).parent().append("<div class='Pagination'><ul></ul></div>");
    var self = this;
    this.page_element = $(list).parent().find(".Pagination ul");

    for (var i=0;i<this.pages;i++){
       var dot = $("<li><a href='#'></a></li>");
       $(this.page_element).append(dot);
       (function(tdot,ti){
         $(tdot).find("a").click(function(e){
           e.preventDefault();
           e.stopPropagation();
           self.curpage = ti;
           self.curnum = self.curpage*self.perpage;
           $(self.list).children().hide().slice(self.curnum-self.perpage, self.curnum).show();
           $(self.page_element).find(".active").removeClass("active");
           $(tdot).addClass("active");
           if (self.firstf==true){
             $([document.documentElement, document.body]).animate({
                  scrollTop: $(self.list).offset().top
              }, 100);
            
            }
            self.firstf = true;
          });
       })(dot,i+1);
    };

    $(this.page_element).find("li:first-child a").click();
  }
}
