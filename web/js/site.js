const a =  $.ajax({
  type: "GET",
  url: "../WebGetFilters.hal"
});

// filtrate by url
const filtrateByUrl = () => {
  // const origin = window.location.origin;
  // const structureUrl ='/veikals/catalog';
  const search = window.location.search;
  if (search.indexOf('?wsh=') === -1) return;
  console.log('search = ', search);
  console.log('lstindexof = ', search.lastIndexOf('='));
  console.log('indexof = ', search.indexOf('?wsh='));
  const filterCode = search.slice(search.lastIndexOf('=') + 1, search.length);
  console.log('filterCode = ', filterCode);
  if (!filterCode) return
  return filterCode;
};

const SetFilterProduct = () => {
  let liWSH = $(".filter-buttons li").map((e,l) => {
    if ($(l).attr('list-cls') == 'WSH') return l;
  });
  console.log(liWSH);
  let cls = $(liWSH).attr("list-cls");

  if ($(".active_filter").length>0){
    $(".active_filter").remove();
  } else {
    list = $(".filter_option .filter_list" + cls + " > div");
    sel = $(list).clone(true,true);
    $(sel).addClass("active_filter");
    $(".product-catalog-list").prepend(sel);
    SetFilterSelection(sel,$(liWSH));
  }
  
  // console.log('filter = ', filter);
  // $(".filter_menu").addClass('active_filter');
  
};

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
  paginationProducts.rebuild();
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
  //paginationProducts start
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
  filtrateByUrl();
  SetFilterProduct();
  console.log('SetFilterProduct(); = ', SetFilterProduct());
  // end
  // products dropdown
  const [ productElement ] = document.getElementsByClassName('ArrowDownMenu');
  let dropdownProductsHTML = '';
   $.ajax({
    type: "GET",
    url: "../WebGetFilters.hal",
    success: (data) => {
      if (!data) return;
      data = JSON.parse(data);
      if (!data['WSH'] || !data['WSH'].length) return;
      const wshData = data['WSH'].map(el => el);
      console.log('wshData = ', wshData);
      for (let el of wshData) {
        dropdownProductsHTML += `<li><a href=${window.location.origin}/veikals/catalog?wsh=${Object.keys(el)[0]}> ${Object.values(el)[0]} </a></li>`;
      }
      if (dropdownProductsHTML) $(productElement).append(`<ul> ${dropdownProductsHTML} </ul>`);
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
    //consol.elog(form);
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
    console.log('l = ',l);
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

  let filterNames = [];
  $(".filter-buttons li a").each(( index, value ) => {
    filterNames.push(value.innerText.toUpperCase());
  });

  $(".filter_menu ul li a").click(function(e){
    e.stopPropagation();
    e.preventDefault();
    var l = $(this).parent();
    console.log(' l = ', l);
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
      $(opt).find("a").append(`<span id=\'span\' class=\'fa fa-times fa-lg\' aria-hidden=\'true\'> </span>`);
      setTimeout(() => {
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
  console.log('opt = ', opt);
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

