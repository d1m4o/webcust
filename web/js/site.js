
let filterNames = [];
let waw = () => 1;
// product info page
const productInfoPriceGenerate = (productCode) => {
  if (!productCode) return;
  // http://127.0.0.1:81/WebProductPrices.hal?prod=102
  console.log('url = ', `${window.location.origin}/WebProductPrices.hal?prod=${productCode}`);
  $.ajax({
    type: "GET",
    url: `${window.location.origin}/WebProductPrices.hal?prod=${productCode}`,
    success: (data) => {
      if (!data) return;
      data = JSON.parse(data);
      const prices = data.prices;
      console.log('prices = ', prices);
      // set first price
      let colorC = $(".jq-selectbox select[name='color']").val();
      let typeC = $(".jq-selectbox select[name='type']").val();
      let k = `${typeC}_${colorC}`;
      let hasP = false;
      for (let price of prices) {
        if (price[k]) {
          $('.Product .DetailsProd .ProdLi .Price').html(`€${price[k]}`);
          hasP = true;
        }
      }
      if (!hasP)  $('.Product .DetailsProd .ProdLi .Price').html('-');
      //
      $(".jq-selectbox select[name='type']").change((e) => {
        let typeCode = e.target.value;
        let colorCode = $(".jq-selectbox select[name='color']").val();
        let key = `${typeCode}_${colorCode}`;
        let hasPrice = false;
        for (let price of prices) {
          if (price[key]) {
            $('.Product .DetailsProd .ProdLi .Price').html(`€${price[key]}`);
            hasPrice = true;
          }
        }
        if (!hasPrice)  $('.Product .DetailsProd .ProdLi .Price').html('-');
        /*
        let keys = prices.map(price => Object.keys(price)[0]);
        let colorCodes = [];
        for (let k of keys) {
          let str = k.slice(0, k.lastIndexOf('_'));
          if (str == typeCode) colorCodes.push(k.slice(k.lastIndexOf('_') + 1, k.length));
        }
        console.log('colorCodes = ', colorCodes);
        $(".jq-selectbox select[name='color'] option").each((i, el) => {
          let val = $(el).val();
          console.log('val = ', val);
          if (colorCodes.includes(val)) {
            $(`.color-class-${val}`).show();
            // $(el).show();
          } else {
            $(`.color-class-${val}`).hide(); // $(el).hide();
          }
        });
        */
      });
      $(".jq-selectbox select[name='color']").change((e) => {
        let typeCode = $(".jq-selectbox select[name='type']").val();
        let colorCode = e.target.value;
        let key = `${typeCode}_${colorCode}`;
        let hasPrice = false;
        for (let price of prices) {
          if (price[key]) {
            $('.Product .DetailsProd .ProdLi .Price').html(`€${price[key]}`);
            hasPrice = true;
          }
        }
        if (!hasPrice)  $('.Product .DetailsProd .ProdLi .Price').html('-');
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
  console.log('filterCode = ', filterCode);
  return filterCode;
};

const SetFilterProduct = (searchCode) => {
  let liWSH = $(".filter-buttons li").map((e,l) => {
    if ($(l).attr('list-cls') == 'FilterType') return l;
  });
  console.log('liWSH = ', liWSH);
  let cls = $(liWSH).attr("list-cls");
  var l = $(liWSH);
  cls = $(l).attr("list-cls");
  console.log('cls = ', cls);
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
        console.log('cls = ', cls);
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
  console.log('ready');
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
  const filter = filtrateByUrl(); 
  if (filter) SetFilterProduct(filter);
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
  //console.log('productElement = ', productElement);
  let dropdownProductsHTML = '';
   $.ajax({
    type: "GET",
    url: `${window.location.origin}/WebGetFilters.hal`,
    success: (data) => {
      console.log('success !!! = ', data);
      if (!data) return;
      data = JSON.parse(data);
      if (!data['FilterType'] || !data['FilterType'].length) return;
      const wshData = data['FilterType'].map(el => el);
      for (let el of wshData) {
        dropdownProductsHTML += `<li><a href=${window.location.origin}/veikals/catalog?wsh=${Object.keys(el)[0]}> ${Object.values(el)[0]} </a></li>`;
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
    $.get("/WebUpdatingAction.hal?action=mm_addtobasket&type=" + form.type.value + "&color=" + form.color.value + "&qty=" + form.qty.value + "&item=" + form.item.value,function(data){
      //alert(data);
      //refresh basket
      //location.reload();
      $(".Cart a").html($(data).find("res").attr("qty"));
    })
  });  
  
  
  $(".DeliveryWrapp .deliv1").click(function(){
    
  
  });
  $(".DeliveryWrapp .deliv2").click(function(){
  
  
  });
  /*
  $("[data-target='#ModalLogin']").click((e) => {
    console.log('e = ', e);

  });*/
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
              selectSearch: true
          }); 
          $(".ModProdLi .btns-white-red").click(function(){
            var pop = $(this).closest("#ModalAddCart");
            var form = $(this).closest("form").get(0);
            //consol.elog(form);
            $.get("/WebUpdatingAction.hal?action=mm_addtobasket&type=" + form.type.value + "&color=" + form.color.value + "&qty=" + form.qty.value + "&item=" + form.item.value,function(data){
              //alert(data);
              //refresh basket
              //location.reload();
              $(".Cart a").html($(data).find("res").attr("qty"));
              $(pop).modal('toggle');
            })
          });
        } else {
          $.get("/WebUpdatingAction.hal?action=mm_addtobasket&qty=" + qty + "&item=" + itemcode,function(data){
            //alert(data);
            //refresh basket
            //location.reload();
            $(".Cart a").html($(data).find("res").attr("qty"));
          });
        }
      });
    }
  });
  $(".InnerCartList .number-plus-minus input").change(function(){
    $.get("/WebUpdatingAction.hal?action=updatebasketqty&rownr=" + $(this).attr("rw") + "&qty=" + $(this).val(),function(){
      location.reload();
    })
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
    //console.log('l = ',l);
    cls = $(l).attr("list-cls");
    if ($(".active_filter").length>0){
      $(".active_filter").remove();
    } else {
      list = $(".filter_option .filter_list" + cls + " > div");
      sel = $(list).clone(true,true);
      $(sel).addClass("active_filter");
      $(".product-catalog-list").prepend(sel);
      SetFilterSelection(sel,l);
    }
  });

  $(".filter_menu ul li a").click(function(e){
    e.stopPropagation();
    e.preventDefault();
    var l = $(this).parent();
    
    $(l).toggleClass("active_filter_option");
    $(l).toggleClass("active");
    
    var type = $(this).closest(".filter_menu").attr("list-type");
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
      //console.log('cls = ', cls);
      //console.log('$(this).html() = ', $(this).html());
      strvals.push($(this).html());
    }
    //console.log('opt397 = ', opt);
    $(opt).data("filter_options",options);
    $(opt).data("filter_options_str",strvals);
    if (strvals.length>0){
      $(opt).find("a").html(strvals.join(","));
    } else {
      $(opt).find("a").html($(opt).data("origstr"));
    }
    RefreshFilters();
    
    onFilterClick(); // rebuild pagination after filtrated
    console.log('filterNames406 =', filterNames);
    if (filterNames.includes($(opt).text().toUpperCase())) {
      $(opt).removeClass('active');
    } else {
      //console.log('opt = ', opt);
      $(opt).addClass('active');
      $(opt).find("a").append(`<span id=\'span\' class=\'fa fa-times fa-lg\' aria-hidden=\'true\'> </span>`);
      setTimeout(() => {
        $('.filter-buttons li a').each((index) => {
          if ($('.filter-buttons li a')[index].firstElementChild) {
            console.log(`$('.filter-buttons li a') = `, $('.filter-buttons li a'));
            $('.filter-buttons li a')[index].firstElementChild.addEventListener('click', (e)=> {
              console.log('fb li a = ', $('.filter-buttons li a')[index]);
              $(opt).data("filter_options", []);
              $(opt).data("filter_options_str",[]);
              $(opt).find("a").html($(opt).data("origstr"));
              RefreshFilters();
              onFilterClick();
              $(opt).removeClass('active');
            });
          }
        })
      }, 500);
 
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
 
  // setTimeout(() => {
    // $('.ModalLogin').toggle()
  // });
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
