var window_has_focus = true;
window.onblur = function(){  
    window_has_focus=false;  
}  
window.onfocus = function(){  
    window_has_focus=true;  
}

$(document).ready(function(){

  if ($("#managers_wrap").length>0) {
    var app = new ManagerApp();
  }

});

$(function() {
    $.datepicker.setDefaults($.datepicker.regional['lv']);
});

function HandleMatrixNavigation(el,code,e){
  
  switch (code) {
      case 39:
          if ($(el).attr("fn")!="Spec") {
            e.stopPropagation(); e.preventDefault();
            $(el).closest('.matrix_field').next().find('input').focus(); 
          } else {
            console.log(e.target.selectionStart + ":" + e.target.value.length);
            if (e.target.selectionStart==e.target.value.length){
              e.stopPropagation(); e.preventDefault();
              $(el).closest('.matrix_field').next().find('input').focus(); 
            }
          }
          break;
      case 37:
          if ($(el).attr("fn")!="Spec") {
            e.stopPropagation(); e.preventDefault();
            $(el).closest('.matrix_field').prev().find('input').focus(); break;
          } else {
            if (e.target.selectionStart==0){
              e.stopPropagation(); e.preventDefault();
              $(el).closest('.matrix_field').prev().find('input').focus(); break;
            }
          }
          break;
      case 40:
          let nextrw = $(el).closest('.matrix_line').next();
          while ($(nextrw).find("input[fn='stp']").val()!="1" && $(nextrw).length>0){
            nextrw = $(nextrw).next();
          }
          $(nextrw).children().eq($(el).closest('.matrix_field').index()).find('input').focus(); break;
          break;
      case 38:
          let prevrw = $(el).closest('.matrix_line').prev();
          while ($(prevrw).find("input[fn='stp']").val()!="1" && $(prevrw).length>0){
            prevrw = $(prevrw).prev();
          }
          $(prevrw).children().eq($(el).closest('.matrix_field').index()).find('input').focus(); break;
          break;
  }

}

function CheckEmail(str){
      var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (re.test(str.toLowerCase())){
        return true;
      } else {
        return false;
      }
}


function GetSingleOrderLine(){

  let tstr = "<div class='line'><div class='head_fields'>" + 
             "<div class='okflag'></div>" + 
             "<div class='closed'></div>" + 
             "<div class='sernr'></div>" + 
             "<div class='custcode'></div>" + 
             "<div class='custname'></div>" + 
             "<div class='sum4'></div>" + 
             "<div class='orddate'></div>" + 
             "<div class='confirmdate'></div>" + 
             "<div class='planship'></div>" + 
             "<div class='delivered'></div>" + 
             "<div class='invoicesum'></div>" + 
             "<div class='invoiced'></div>" + 
             "<div class='emailsent'></div>" + 
             "<div class='edit_record'></div><div class='clear'></div></div>" + 
             "<div class='rows'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;
}

function GetSingleCustomerLine(){

  let tstr = "<div class='line'><div class='head_fields'>" + 
             "<div class='code'></div>" + 
             "<div class='custname'></div>" + 
             "<div class='regnr'></div>" + 
             "<div class='phone'></div>" + 
             "<div class='mobile'></div>" + 
             "<div class='email'></div>" + 
             "<div class='contact'></div>" + 
             "<div class='language'></div>" + 
             "<div class='edit_record'></div><div class='clear'></div></div>" + 
             "<div class='rows'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;
}

function GetSingleInvoiceLine(){

  let tstr = "<div class='line'><div class='head_fields'>" + 
             "<div class='okflag'></div>" + 
             "<div class='sernr'></div>" + 
             "<div class='custcode drilldown'></div>" + 
             "<div class='custname'></div>" + 
             "<div class='ordernr'></div>" + 
             "<div class='invdate'></div>" + 
             "<div class='duedate'></div>" + 
             "<div class='duedays'></div>" + 
             "<div class='total'></div>" + 
             "<div class='currency'></div>" + 
             "<div class='emailstat'></div>" + 
             "<div class='print_record'></div><div class='clear'></div></div>" + 
 /*            "<div class='transdate'></div>" + */
             "<div class='rows'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;
}

function GetSingleCustomerRowLine(){
  let tstr = "<div class='line contactline'>" + 
             "<div class='contactname'></div>" + 
             "<div class='phone'></div>" + 
             "<div class='mobile'></div>" + 
             "<div class='email'></div>" + 
             "<div class='clear'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;

}


function GetSingleQTLine(){

  let tstr = "<div class='line'><div class='head_fields'>" + 
             "<div class='sernr'></div>" + 
             "<div class='qtdate'></div>" + 
             "<div class='ordernr'></div>" + 
             "<div class='salesman'></div>" + 
             "<div class='custcode'></div>" + 
             "<div class='custname'></div>" + 
             "<div class='sum4'></div>" + 
             "<div class='edit_record'></div><div class='clear'></div></div>" + 
             "<div class='rows'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;
}


function GetSingleQTRowLine_Normal(){
  let tstr = "<div class='line'>" + 
             "<div class='number'></div>" + 
             "<div class='item'></div>" + 
             "<div class='name'></div>" + 
             "<div class='qty'></div>" + 
             "<div class='price'></div>" + 
             "<div class='discount'></div>" + 
             "<div class='sum'></div>" + 
             "<div class='vatcode_qt'></div>" + 
             "<div class='location2'></div>" + 
             "<div class='clear'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;

}

function GetSingleQTRowLine_Subtotal(){
  let tstr = "<div class='line subtotal_line'>" + 
             "<div class='subtotal'><div class='subtotal_str'>" + man_lab["Subtotal"] + "</div><div class='subtotal_item'></div></div>" + 
             "<div class='unit'></div>" + 
             "<div class='price'></div>" + 
             "<div class='discount'></div>" + 
             "<div class='vatcode'></div>" + 
             "<div class='sum'></div>" + 
             "<div class='clear'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;

}
function GetSingleQTRowLine_Totals(){
  let tstr = "<div class='line order_totals qt_totals'>" + 
             "<div class='line_totals'></div>" + 
             "<div class='line_vat'></div>" + 
             "<div class='line_subtotal'></div>" + 
             "<div class='line_total'></div>" + 
             "<div class='clear'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;

}


function GetSingleOrderRowLine_Normal(){
  let tstr = "<div class='line'>" + 
             "<div class='item'></div>" + 
             "<div class='qty'></div>" + 
             "<div class='name'></div>" + 
             "<div class='width'></div>" + 
             "<div class='length'></div>" + 
             "<div class='qty2'></div>" + 
             "<div class='unit'></div>" + 
             "<div class='price'></div>" + 
             "<div class='discount'></div>" + 
             "<div class='vatcode'></div>" + 
             "<div class='sum'></div>" + 
             "<div class='inprod'></div>" + 
             "<div class='produced'></div>" + 
             "<div class='clear'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;

}

function GetSingleInvoiceRowLine_Normal(){
  let tstr = "<div class='line'>" + 
             "<div class='item'></div>" + 
             "<div class='qty'></div>" + 
             "<div class='name'></div>" + 
             "<div class='unit'></div>" + 
             "<div class='price'></div>" + 
             "<div class='discount'></div>" + 
             "<div class='sum'></div>" + 
             "<div class='clear'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;

}

function GetSingleOrderRowLine_Subtotal(){
  let tstr = "<div class='line subtotal_line'>" + 
             "<div class='subtotal'><div class='subtotal_str'>" + man_lab["Subtotal"] + "</div><div class='subtotal_item'></div></div>" + 
             "<div class='qty2'></div>" + 
             "<div class='unit'></div>" + 
             "<div class='price'></div>" + 
             "<div class='discount'></div>" + 
             "<div class='vatcode'></div>" + 
             "<div class='sum'></div>" + 
             "<div class='clear'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;

}
function GetSingleOrderRowLine_Totals(){
  let tstr = "<div class='line order_totals'>" + 
             "<div class='line_totals'></div>" + 
             "<div class='line_vat'></div>" + 
             "<div class='line_subtotal'></div>" + 
             "<div class='line_total'></div>" + 
             "<div class='clear'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;

}



function GetSingleInvoiceRowLine_Subtotal(){
  let tstr = "<div class='line subtotal_line'>" + 
             "<div class='subtotal subtotaliv'><div class='subtotal_str'>" + man_lab["Subtotal"] + "</div><div class='subtotal_item'></div></div>" + 
             "<div class='unit'></div>" + 
             "<div class='price'></div>" + 
             "<div class='discount'></div>" + 
             "<div class='sum'></div>" + 
             "<div class='clear'></div>" + 
             "</div>"; 

  let line = $(tstr);
  return line;

}

function AddTextField(opt){
  let ps = "";
  if (opt.ps){
    ps = " ps='" + opt.ps + "'"; 
    if (opt.ps_multi){
      ps += " ps_multi";
    }
  }
  let readonly = "";
  if (opt.readonly){
    readonly = " readonly";
  }
  let pos = "top:" + opt.ypos + "px";
  if (opt.ypos<0){
    pos = "bottom:" + (-opt.ypos) + "px";
  }
  
  return "<div class='editfield " + opt.field + "' style='" + pos + ";left:" + opt.xpos + "px;width:" + opt.w + "px;height:" + opt.h + "'><div class='ef_label'>" + opt.label + "</div><div class='ef_input'><textarea  " + ps + readonly + "></textarea></div></div>";
}

function AddSimpleField(opt,type){
  let ps = "";
  if (opt.ps){
    ps = " ps='" + opt.ps + "'"; 
    if (opt.ps_multi){
      ps += " ps_multi";
    }
  }
  let readonly = "";
  if (opt.readonly){
    readonly = " readonly defreadonly";
  }
  let pos = "top:" + opt.ypos + "px";
  if (opt.ypos<0){
    pos = "bottom:" + (-opt.ypos) + "px";
  }
  
  return "<div class='" + type + " " + opt.field + "' style='" + pos + ";left:" + opt.xpos + "px;width:" + opt.w + "px'><div class='ef_label'>" + opt.label + "</div><div class='ef_input'><input type='text' " + ps + readonly + "></div></div>";
}



function AddEditField(opt){
  return AddSimpleField(opt,"editfield");
}

function AddFilterField(opt){
  return AddSimpleField(opt,"filterfield");
}

function AddCheckBox(opt){
  return "<div class='checkbox " + opt.field + "' style='top:" + opt.ypos + "px;left:" + opt.xpos + "px;'><div class='chb_input'><input type='checkbox'></div><div class='chb_label'>" + opt.label + "</div></div>";
}
function AddRadioButton(opt){
  var res = "<div class='radiobutton " + opt.field + "' style='top:" + opt.ypos + "px;left:" + opt.xpos + "px;'><div class='radio_label'>" + opt.label + "</div>";
  for (var i in opt.options){
    res += "<div class='radio_input'><input type='radio' name='" + opt.field + "' value='" + opt.options[i].val + "'><div class='radio_val_label'>" + opt.options[i].lab + "</div></div>";
  }
  
  res +="</div>";
  return res;
}



function AddCustomerSelectField(label,cls){
  return "<div class='editfield " + cls + "'><div class='ef_label'>" + label + "</div><div class='ef_input'><select></select></div></div>";
}

function AddStaticText(opt){
  return "<div class='static_text' style='top:" + opt.ypos + "px;left:" + opt.xpos + "px;'>" + opt.label + "</div>";
}

function DisplayMatrixContext(type){

  let res = "<div class='matrix_context'><div class='context_icon'></div><div class='context_menu'>" + 
            "<div class='addlinebelow mcontext_item'>" + man_lab["AddRowBelow"] + "</div>";
            if (type==0) {
              res += "<div class='addsubtotal mcontext_item'>" + man_lab["AddSubtotal"] + "</div>"; 
              res += "<div class='addheader mcontext_item'>" + man_lab["AddHeader"] + "</div>"; 
            }
            if (type==0 || type==6){
              res += "<div class='copyrow mcontext_item'><div class='copyrow_text'>" + man_lab["CopyRow"] + "</div><div class='copyrow_input'><input type='number'></div><div class='copyrow_do'>OK</div></div>";
            };
            res += "<div class='deleterow mcontext_item'>" + man_lab["DeleteRow"] + "</div>"; 
  
            res += "</div></div>";

  return res;
}
function DisplayMatrixRemove(){

  let res = "<div class='matrix_remove'><input type='checkbox'></div>";

  return res;
}

function DisplayMatrixRemoveHead(){

  
  let res = "<div class='matrix_remove_head'><div class='remove_checkbox'><input type='checkbox'></div><div class='remove_icon'></div></div>";

  return res;
}

function MatrixField(opt){
  let fields = opt.fields;
  let bottom = "";
  if (opt.bottom){
    bottom = "bottom:" + opt.bottom + "px";
  }
  let hidden = "";
  let hiddenstp = {};
  let line = {};
  let res = "<div class='matrix_frame' style='top:" + opt.ypos + "px;left:" + opt.xpos + "px;" + bottom + "'><div class='matrix_head'><div class='matrix_line'>";
  res += DisplayMatrixRemoveHead();
  for (let i in fields){
    let ps = "";
    let readonly = "";
    if (fields[i].ps){
      ps = " ps='" + fields[i].ps + "'";
    }
    if (line[fields[i].stp]===undefined){
      line[fields[i].stp] = "";
    }
    if (fields[i].readonly){
      readonly = "readonly defreadonly";
    }
    if (fields[i].text){
      line[fields[i].stp] += "<div class='matrix_field text_field' style='width:" + fields[i].width + "px'>" + fields[i].text + "</div>";
    } else {
      line[fields[i].stp] += "<div class='matrix_field " + fields[i].field + "' style='width:" + fields[i].width + "px'><input type='text' fn='" + fields[i].field + "' " + ps + " " + readonly + "></div>";
      
    }
    if (fields[i].stp==1){
      res += "<div class='matrix_field " + fields[i].field + "' style='width:" + fields[i].width + "px'>" + fields[i].label + "</div>";
    }
  }
  for (let i in opt.hiddenfields){
    if (opt.hiddenfields[i].stp==-1){
      hidden += "<div class='matrix_field " + opt.hiddenfields[i].field + "'><input type='hidden' fn='" + opt.hiddenfields[i].field + "'></div>";
    } else {
      if (hiddenstp[opt.hiddenfields[i].stp]===undefined){
        hiddenstp[opt.hiddenfields[i].stp] = "";
      }
      hiddenstp[opt.hiddenfields[i].stp] += "<div class='matrix_field " + opt.hiddenfields[i].field + "'><input type='hidden' fn='" + opt.hiddenfields[i].field + "'></div>";
    }
  }

  res += "</div></div><div class='matrix_templ'>";
  
  for (let i in line){
    if (line[i]===undefined){
      line[i] = "";
    }
    if (hiddenstp[i]===undefined){
      hiddenstp[i] = "";
    }
    res +=  "<div class='matrix_line stp_" + i + "'>" + line[i] + DisplayMatrixContext(opt.type) + DisplayMatrixRemove() + hidden + hiddenstp[i] + "</div>";
  }
  res += "</div><div class='matrix_body'>";
  res += "</div><div class='addline mcontext_main'>" + man_lab["AddRow"] + "</div></div>";
  return res;
}

function GetOrderWindow(){
  let h = 130,v = 20,vs = 30, w = 120, h2 = 390, h3 = 600; h4 = 980, vs2 = 20, w2 = 220,vm = 0;
  let res = {title:man_lab["Order"],window:""}
  let window = AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["SerNr"],       field:"SerNr",      readonly:true   }) +
               AddEditField({xpos:h2,ypos:v,w:380,label:man_lab["Customer"],        field:"CustCode",   ps:"customers"}) +
               AddEditField({xpos:h2,ypos:v+=vs,w:380,label:man_lab["Name"],        field:"Addr0"}) +
               
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["Date"],        field:"OrdDate",       ps:"date"  }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["PayTerm"],        field:"PayDeal",    ps:"payterm"  }) +
               AddEditField({xpos:h,ypos:vm=v+=vs,w:w,label:man_lab["PasteExcel"],        field:"PasteExcel"  }) +

               AddEditField({xpos:h2,ypos:v=110,w:w,label:man_lab["PlanotsSanemt"],    field:"PlanotsSanemt", ps:"date"   }) +
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["PlanotsNosutit"],    field:"PlanShip",     ps:"date"          }) +
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["DespatchDate"],    field:"DespatchDate",   ps:"date"      }) +
               
               AddEditField({xpos:h3,ypos:v=110,w:w2,label:man_lab["SalesMan"],    field:"SalesMan",  ps:"users",readonly:true  }) +
               AddEditField({xpos:h3,ypos:v+=vs,w:w2,label:man_lab["Language"],    field:"LangCode",  ps:"language"      }) +
               AddEditField({xpos:h3,ypos:v+=vs,w:430,label:man_lab["Objects"],    field:"Objects",    ps:"objects",ps_multi:true   }) +

               //AddEditField({xpos:h4,ypos:v=110,w:w,label:man_lab["ShipMode"],    field:"ShipMode", ps:"shipmode"   }) +
               AddEditField({xpos:h4,ypos:v=110,w:w,label:man_lab["ShipDeal"],    field:"ShipDeal",   ps:"shipdeal"   }) +
               
               AddCheckBox({xpos:h4,ypos:v=50,w:w,label:man_lab["Confirmed"],   field:"OKFlag"         }) + 
               AddCheckBox({xpos:h4,ypos:v+=vs2,w:w,label:man_lab["Faktoring"],   field:"FactoringSwedbank"         }) + 
               AddCheckBox({xpos:h4,ypos:v+=vs2,w:w,label:man_lab["Closed"],   field:"Closed"         })+
               AddEditField({xpos:h2+130,ypos:-30,w:w,label:man_lab["VATSum"],       field:"Sum3",      readonly:true   })+         
               AddEditField({xpos:h3+130,ypos:-30,w:w,label:man_lab["Subtotal2"],       field:"Sum1",      readonly:true   })+         
               AddEditField({xpos:h4,ypos:-30,w:w,label:man_lab["Total"],       field:"Sum4",      readonly:true   }) +         

               AddEditField({xpos:h,ypos:v=vm+vs,w:900,label:man_lab["DeliveryAddress"],    field:"ShipAddr1",            }) +
               AddEditField({xpos:h4+200,ypos:v,w:w,label:man_lab["ContactPerson"],       field:"CustContact",      readonly:true   }) +         
               AddEditField({xpos:h,ypos:v+=vs,w:900,label:man_lab["Comment"],    field:"Comment",            }) + 
               AddEditField({xpos:h4+200,ypos:v,w:w,label:man_lab["Phone"],       field:"Phone",      readonly:true   });      

  v = 240;
  window += MatrixField({xpos:0,ypos:v+=vs,bottom:60,fields:[
              {stp:1,label:man_lab["ItemCode"],   field:"ArtCode",   width:150, ps:"items"},
              {stp:1,label:man_lab["Name"],       field:"Spec",      width:200},
              {stp:1,label:man_lab["TotalQty"],   field:"Quant",     width:50},
              {stp:1,label:man_lab["Width"],      field:"UnitXVal",  width:50,readonly:true},
              {stp:1,label:man_lab["Length"],     field:"UnitZVal",  width:50},
              {stp:1,label:man_lab["Qty"],        field:"Coefficient",width:50},
              {stp:1,label:man_lab["Unit"],       field:"UnitCode"  ,width:50},
              {stp:1,label:man_lab["Price"],      field:"Price",     width:50},
              {stp:1,label:man_lab["Discount"],   field:"vRebate",   width:40},
              {stp:1,label:man_lab["Sum"],        field:"Sum",       width:70},
              {stp:1,label:man_lab["SerialNr"],   field:"SerialNr",  width:90},
              {stp:1,label:man_lab["VATCode"],    field:"VATCode",   width:70, ps:"vatcode"},
              {stp:1,label:man_lab["ShipNote"],   field:"ShipNote",  width:90},
              {stp:1,label:man_lab["Location"],   field:"Location",  width:100,ps:"locations"},
              {stp:1,label:man_lab["ProdStatus"], field:"NevajagRazot",width:100,ps:"prodstat"},
              {stp:1,label:man_lab["Person"],     field:"Person",width:80,readonly:true},
              {stp:9,text:man_lab["Subtotal"]                ,       width:250},
              {stp:17,                            field:"Spec",      width:450},
              {stp:9,                             field:"Spec",      width:250},
              {stp:9,                             field:"Quant",     width:50},
              {stp:9,                             field:"UnitCode",  width:50},
              {stp:9,                             field:"Price",     width:50},
              {stp:9,label:man_lab["vRebate"],field:"vRebate",      width:40},
              {stp:9,                             field:"Sum",       width:70}
            ],hiddenfields:[
              {stp:-1,field:"stp"},
              {stp:-1,                            field:"UnitFactQuant"},
              {stp:-1,                            field:"UnitFactPrice"},
              {stp:-1,                            field:"Unit2Code"},
              {stp:9,                             field:"ArtCode"},
              {stp:9,                             field:"Quant",},
              {stp:9,                             field:"UnitXVal"},
              {stp:9,                             field:"UnitZVal"},
              {stp:9,                             field:"Price"},
              {stp:9,                             field:"vRebate"},
              {stp:9,                             field:"SerialNr"},
              {stp:9,                             field:"Coefficient"},
              {stp:9,                             field:"ShipNote"}
            ],type:0});   
            
  res.window = $(window);
  return res;
}

function GetQTWindow(){
  let h = 130,v = 20,vs = 30, w = 120, h2 = 390, h3 = 600; h4 = 880, vs2 = 20, w2 = 220,vm = 0;
  let res = {title:man_lab["QTs"],window:""}
  let window = AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["SerNr"],       field:"SerNr",      readonly:true   }) +
               AddEditField({xpos:h2,ypos:v,w:380,label:man_lab["Customer"],        field:"CustCode",   ps:"customers"}) +
               AddEditField({xpos:h2,ypos:v+=vs,w:380,label:man_lab["Name"],        field:"Addr0"}) +
               
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["Date"],        field:"QTDate",       ps:"date"  }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["PayTerm"],        field:"PayDeal",    ps:"payterm"  }) +

               
               AddEditField({xpos:h2,ypos:v=110,w:w2,label:man_lab["SalesMan"],    field:"SalesMan",  ps:"users",readonly:true  }) +
               AddEditField({xpos:h2,ypos:v+=vs,w:w2,label:man_lab["Language"],    field:"LangCode",  ps:"language"      }) +

               AddEditField({xpos:h,ypos:v+=vs,w:880,label:man_lab["Comment"],        field:"Comment"  }) +

               
               AddRadioButton({xpos:h4,ypos:v=40,w:w,label:man_lab["Status"],   field:"Rejected",options:[{val:0,lab:man_lab["QTOpen"]},{val:2,lab:man_lab["QTApproved"]},{val:1,lab:man_lab["QTDeclined"]}]})+
               AddCheckBox({xpos:h4,ypos:v+=90,w:w,label:man_lab["Closed"],   field:"Closed"         })+
               AddEditField({xpos:h2,ypos:-30,w:w,label:man_lab["VATSum"],       field:"Sum3",      readonly:true   })+         
               AddEditField({xpos:h3,ypos:-30,w:w,label:man_lab["Subtotal2"],       field:"Sum1",      readonly:true   })+         
               AddEditField({xpos:h4,ypos:-30,w:w,label:man_lab["Total"],       field:"Sum4",      readonly:true   });         


  v = 180;
  window += MatrixField({xpos:0,ypos:v+=vs,bottom:60,fields:[
              {stp:1,label:man_lab["ItemCode"],   field:"ArtCode",   width:150, ps:"items"},
              {stp:1,label:man_lab["Name"],       field:"Spec",      width:200},
              {stp:1,label:man_lab["Qty2"],        field:"Quant",     width:60},
              {stp:1,label:man_lab["Price"],      field:"Price",     width:60},
              {stp:1,label:man_lab["Discount"],   field:"vRebate",   width:60},
              {stp:1,label:man_lab["Sum"],        field:"Sum",       width:80},
              {stp:1,label:man_lab["VATCode"],    field:"VATCode",   width:70, ps:"vatcode"},
              {stp:1,label:man_lab["Location"],   field:"Location",  width:100,readonly:true},
            ],hiddenfields:[
              {stp:-1,                            field:"stp"},
              {stp:-1,                            field:"Objects"}
            ],type:6});   
            
  res.window = $(window);
  return res;
}
function GetCustomerWindow(){
  let h = 180,h2 = 700,h3 = 700,v = 50,vs = 30,w = 200,w2 = 100,vm = 140;
  let res = {title:man_lab["Customer"],window:""};
  let window = AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["Name"],       field:"Name"                }) +
               AddEditField({xpos:h2,ypos:v,w:w2,label:man_lab["Code"],         field:"Code",  readonly:true}) +
/*             AddStaticText({xpos:h2,ypos:v=50,label:man_lab["InvoiceAddress"]}) +*/
               AddEditField({xpos:h,ypos:v=vm,w:w,label:man_lab["InvAddr0"],    field:"InvAddr0"            }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["InvAddr1"],   field:"InvAddr1"            }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["InvAddr2"],   field:"InvAddr2"            }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["InvAddr3"],   field:"InvAddr3"            }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["InvAddr4"],   field:"InvAddr4"            }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["CountryCode"],field:"CountryCode",ps:"country"}) + 
               
               AddEditField({xpos:h,ypos:v+=(2*vs),w:w,label:man_lab["Phone"],  field:"Phone"  ,ps:"phone"   }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["Mobile"],     field:"Mobile" ,ps:"phone"   }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["Email"],      field:"eMail" , ps:"email"   }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["Contact"],    field:"Person"             }) +
               
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["PayTerm"],    field:"PayDeal",ps:"payterm"}) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["CreditLimit"],field:"CreditLimit"             }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["VATCode"],    field:"VATCode",ps:"vatcode"}) +

               AddStaticText({xpos:h,ypos:v+=vs,label:man_lab["AccountInfo"]}) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["IBANCode"],   field:"IBANCode"             }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["AccOperator"],field:"AccOperator",ps:"bank"}) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["BankAccount"],field:"BankAccount"             }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["Bank"],       field:"Bank"             }) +
               AddCheckBox({xpos:h,ypos:v+=vs,w:w,label:man_lab["Faktoring"],   field:"FactoringSwedbank"         }) + 
               AddTextField({xpos:h,ypos:v+=vs,w:1000,label:man_lab["Text"],      field:"Text"  ,h:400}) + 
/*               AddStaticText({xpos:h3,ypos:v=50,label:man_lab["DeliveryAddress"]}) +*/
               AddEditField({xpos:h2,ypos:v=vm-vs,w:w,label:man_lab["CustCategory"],field:"CustCat"             }) +
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["DelAddr0"],   field:"DelAddr0"             }) +
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["DelAddr1"],  field:"DelAddr1"            }) +
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["DelAddr2"],  field:"DelAddr2"            }) +
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["DelAddr3"],  field:"DelAddr3"            }) +
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["DelAddr4"],  field:"DelAddr4"            }) + 
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["DelCountry"],field:"DelCountry",ps:"country"}) + 

               AddEditField({xpos:h2,ypos:v+=(2*vs),w:w,label:man_lab["OrderComment"],    field:"OrderComment"           }) + 
               AddEditField({xpos:h2,ypos:v+=(2*vs),w:w,label:man_lab["WarningOnSales"],  field:"WarnText1"           }) + 
               AddEditField({xpos:h2,ypos:v+=(2*vs),w:w,label:man_lab["RegNr"],           field:"RegNr1"           }) + 
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["VATNr"],               field:"VATNr"                }) + 
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["VATNoCheck"],          field:"VATNrCheckDate",ps:"date" }) + 
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["Language"],            field:"LangCode",ps:"language"})  +
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["CustType"],            field:"CustType",ps:"custtype"}) + 
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["VATZone"],             field:"ExportFlag",ps:"exportflag"}) +
               AddEditField({xpos:h2,ypos:v+=vs,w:w,label:man_lab["SalesMan"],             field:"SalesMan",ps:"users",readonly:GetCustSalesManAccess()}) +
               
               AddCheckBox({xpos:h2,ypos:v+=(2*vs),w:w,label:man_lab["Prepayments"],   field:"OnAccount"         }) 


  res.window = $(window);
  return res;
}

function GetCustSalesManAccess()
{
  let res = false;
  $.ajax({
    url:"/WebManagersAction.hal?action=checkcustomeragentaccess",
    type: 'GET',
    async: false,
    success: function(data) {
      let js = jQuery.parseJSON(data);
      res = !js.Result;   

    }    
  });

  return res;
}

function GetAgentPaymentWindow(){
  let h = 180,v = 50,vs = 30,w = 200;
  let res = {title:man_lab["AgentPayments"],window:""};
  let window = AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["Period"],      field:"Period2Str", ps:"period" }) +
               AddEditField({xpos:h,ypos:v+=vs,w:80,label:man_lab["StartDate"],  field:"sStartDate", ps:"date"})+
               AddEditField({xpos:h+150,ypos:v,w:80,label:man_lab["EndDate"],    field:"sEndDate",   ps:"date"})+
               AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["Agent"],       field:"f1",         ps:"users"});
               


  res.window = $(window);
  return res;
}

function GetSLWindow(){
  let h = 180,v = 50,vs = 30,w = 200;
  let res = {title:man_lab["SalesLedger"],window:""};
  let window = AddEditField({xpos:h,ypos:v+=vs,w:w,label:man_lab["Customer"],      field:"f1",      ps:"customers" }) +
               AddEditField({xpos:h,ypos:v+=vs,w:w,   label:man_lab["Agent"],      field:"f2",      ps:"users"}) + 
               AddEditField({xpos:h,ypos:v+=vs,w:w,   label:man_lab["Function"],   field:"ArtMode", ps:"sl_artmode"});

  res.window = $(window);
  return res;
}

function GetOrderFilters(invf){
  let v = 10;
  
  let window = AddFilterField({xpos:43,ypos:v,w:80,label:"",       field:"SerNr" }) +
               AddFilterField({xpos:214,ypos:v,w:120,label:man_lab["Search"],    field:"Search"})+
               AddFilterField({xpos:435,ypos:v,w:80,label:man_lab["StartDate"],  field:"StartDate", ps:"date"})+
               AddFilterField({xpos:600,ypos:v,w:80,label:man_lab["EndDate"],    field:"EndDate",   ps:"date"});
               if (invf){
                 window += AddFilterField({xpos:800,ypos:v,w:160,label:man_lab["Status"],     field:"Status",    ps:"sl_colors"});
               }
  return $(window);
}

function GetInvoiceFilters(invf){
  let v = 10;
  
  let window = AddFilterField({xpos:43,ypos:v,w:80,label:"",       field:"SerNr" }) +
               AddFilterField({xpos:214,ypos:v,w:120,label:man_lab["Search"],    field:"Search"})+
               AddFilterField({xpos:435,ypos:v,w:80,label:man_lab["OrderNr"],    field:"OrderNr"})+
               AddFilterField({xpos:565,ypos:v,w:80,label:man_lab["StartDate"],  field:"StartDate", ps:"date"})+
               AddFilterField({xpos:710,ypos:v,w:80,label:man_lab["EndDate"],    field:"EndDate",   ps:"date"});
               if (invf){
                 window += AddFilterField({xpos:880,ypos:v,w:160,label:man_lab["Status"],     field:"Status",    ps:"sl_colors"});
               }
  return $(window);
}



function GetQTFilters(){
  let v = 10;
  
  let window = AddFilterField({xpos:43,ypos:v,w:80,label:"",       field:"SerNr" }) +
               AddFilterField({xpos:214,ypos:v,w:80,label:man_lab["OrderNr"],    field:"OrderNr"})+
               AddFilterField({xpos:435,ypos:v,w:120,label:man_lab["Search"],    field:"Search"})+
               AddFilterField({xpos:600,ypos:v,w:80,label:man_lab["StartDate"],  field:"StartDate", ps:"date"})+
               AddFilterField({xpos:765,ypos:v,w:80,label:man_lab["EndDate"],    field:"EndDate",   ps:"date"});
  return $(window);
}


function GetCustomerFilters(){
  let v = 10;
  
  let window = AddFilterField({xpos:2,ypos:v,w:80,label:"",     field:"Code" }) +
               AddFilterField({xpos:85,ypos:v,w:120,label:"", field:"Search"})+
               AddFilterField({xpos:303,ypos:v,w:120,label:"",  field:"RegNr"});

  return $(window);
}

function FixDateVal(tstr){
  var res = tstr.toString();
  if (res.length==1){
    res = "0" + res;
  }
  return res;
}

function CurrentDate(){
  var today = new Date();
  var res = today.getFullYear()+'-'+FixDateVal(today.getMonth()+1)+'-'+FixDateVal(today.getDate());
  return res;
}

function GetDateWithYear(years){
  var today = new Date();
  today.setYear(today.getFullYear() + years);
  var res = today.getFullYear()+'-'+FixDateVal(today.getMonth()+1)+'-'+FixDateVal(today.getDate());
  return res;

}

function OrderRecord(){
  var ORr = {};
  ORr.SerNr = -1;
  ORr.OrdDate = CurrentDate;
  ORr.CustCode = "";
  ORr.InvAddr0 = "";
  ORr.ConfirmDate = "";
  ORr.PlanShip = "";

  ORr.Rows = [];
  /*
  ORrw.ArtCode = "";
  ORrw.Quant = 0;
  ORrw.Spec = "";
  ORrw.Price = 0;
  ORrw.vRebate = 0;
  ORrw.Sum = 0;
  ORrw.UnitXval = 0;
  ORrw.UnitYval = 0;
  ORrw.UnitCode = "";
  */

  return ORr;
}

function QTRecord(){
  var QTr = {};
  QTr.SerNr = -1;
  QTr.QTDate = CurrentDate;
  QTr.CustCode = "";
  QTr.InvAddr0 = "";

  QTr.Rows = [];

  return QTr;
}

function CustomerRecord(){
  var CUr = {};
  CUr.Code = "";
  CUr.Name = "";
  CUr.RegNr1 = "";
  CUr.VATNr = "";
  CUr.Phone = "";
  CUr.Mobile = "";
  CUr.InvAddr0 = "";
  CUr.InvAddr1 = "";
  CUr.InvAddr2 = "";
  CUr.InvAddr3 = "";
  CUr.InvAddr4 = "";
  CUr.DelAddr0 = "";
  CUr.DelAddr1 = "";
  CUr.DelAddr2 = "";
  CUr.DelAddr3 = "";
  CUr.DelAddr4 = "";

  return CUr;
}

function InvoiceRecord(){
  var IVr = {};
  IVr.SerNr = -1;
  IVr.OrdDate = CurrentDate;
  IVr.CustCode = "";
  IVr.InvAddr0 = "";
  IVr.Sum1 = 0;
  IVr.Sum3 = 0;
  IVr.Sum4 = 0;

  IVr.Rows = [];
  /*
  IVrw.ArtCode = "";
  IVrw.Quant = 0;
  IVrw.Spec = "";
  IVrw.Price = 0;
  IVrw.vRebate = 0;
  IVrw.Sum = 0;
  IVrw.UnitCode = "";
  */

  return IVr;
}

function RepSpecRecord(){
  var RepSpec = {};
  RepSpec.Period2Str = "";
  RepSpec.f1 = "";
  RepSpec.f2 = "";
  RepSpec.ArtMode = "0";
  
  return RepSpec;
}

function ManagerApp(){
  this.curPage = 0;
  this.pageCnt = 0;
  this.pageMargins = 4;
  this.orders = [];
  this.invoices = []
  this.customers = []
  this.orderWrap = $("#list");
  this.paginationWrap = $("#pagination");
  this.curView = 0;
  this.curRec = null;
  this.curRecRows = null;
  this.curActiverow = 0;
  this.curActiveField = 0;
  this.userType = "user";
  this.PSList = {};
  this.waction_in_progress = false;

  this.Init = function(){
    this.SetNavigation();
  
    //this.GetOrders();
    
  }
  
  this.AddExpand = function(){
  
    $(".filters").append("<div class='expand_lines'></div>");
    $(".filters .expand_lines").click(function(){
      let openf = false;
      $(this).toggleClass("active");
      if ($(this).hasClass("active")) {
        openf = true;
      }
      $("#list > .line .head_fields").each(function(){
        if ((openf && $(this).next().css("display")!="block") || (!openf && $(this).next().css("display")=="block")){
          $(this).click();
        }
      });
    });

  }
  
  this.ResetExpand = function(){
    $(".expand_lines.active").removeClass("active");
  }
  
  this.SetOrderTitles = function(){
    var self = this;
    $(".filters").html("");
    $(".filters").append("<div class='user_filter'><div class='uf_button all'>" + man_lab["AllOrders"] + "</div><div class='uf_button my selected'>" + man_lab["MyOrders"] + "</div></div>");
    $(".filters").append("<div class='new_record'>" + man_lab["NewRecord"] + "</div>");
    $(".filters").find(".new_record").click(function(e){
      self.OpenRecord(e,0,-1);
    });
    this.AddExpand();
    $(".head_columns").html("");
    let line = GetSingleOrderLine();
    $(line).find(".okflag").html(man_lab["OKFlag"]);
    $(line).find(".closed").html(man_lab["Closed"]);
    $(line).find(".sernr").html(man_lab["SerNr"]);
    $(line).find(".custcode").html(man_lab["Customer"]);
    $(line).find(".custname").html(man_lab["CustName"]);
    $(line).find(".sum4").html(man_lab["Total"]);
    $(line).find(".orddate").html(man_lab["Date"]);
    $(line).find(".confirmdate").html(man_lab["ConfDate"]);
    $(line).find(".planship").html(man_lab["SanDatums"]);
    $(line).find(".invoicesum").html(man_lab["InvoiceSum"]);
    $(line).find(".invoiced").html(man_lab["Invoiced"]);
    $(line).find(".delivered").html(man_lab["Delivered"]);

    $(".head_columns").append(line);
    $(".filters .uf_button").click(function(){
      if ($(this).hasClass("all")) {
        self.userType = "__ALL";
      } else {
        self.userType = "user";      
      }
      $(".filters .uf_button.selected").removeClass("selected");
      $(this).addClass("selected");
      self.GetOrders();
    });
  }

  this.SetQTTitles = function(){
    var self = this;
    $(".filters").html("");
    $(".filters").append("<div class='user_filter'><div class='uf_button all'>" + man_lab["AllOrders"] + "</div><div class='uf_button my selected'>" + man_lab["MyOrders"] + "</div></div>");
    $(".filters").append("<div class='new_record'>" + man_lab["NewRecord"] + "</div>");
    $(".filters").find(".new_record").click(function(e){
      self.OpenRecord(e,6,-1);
    });
    this.AddExpand();
    $(".head_columns").html("");
    let line = GetSingleQTLine();
    $(line).find(".sernr").html(man_lab["SerNr"]);
    $(line).find(".ordernr").html(man_lab["OrderNr"]);
    $(line).find(".salesman").html(man_lab["SalesMan"]);
    $(line).find(".custcode").html(man_lab["Customer"]);
    $(line).find(".custname").html(man_lab["CustName"]);
    $(line).find(".sum4").html(man_lab["Total"]);
    $(line).find(".qtdate").html(man_lab["Date"]);

    $(".head_columns").append(line);
    $(".filters .uf_button").click(function(){
      if ($(this).hasClass("all")) {
        self.userType = "__ALL";
      } else {
        self.userType = "user";      
      }
      $(".filters .uf_button.selected").removeClass("selected");
      $(this).addClass("selected");
      self.GetQTs();
    });
  }
  
  
  this.SetCustomerTitles = function(){
    var self = this;
    $(".filters").html("");
    $(".filters").append("<div class='user_filter'><div class='uf_button all'>" + man_lab["AllOrders"] + "</div><div class='uf_button my selected'>" + man_lab["MyOrders"] + "</div></div>");
    $(".filters").append("<div class='new_record'>" + man_lab["NewRecord"] + "</div>");
    $(".filters").find(".new_record").click(function(e){
      self.OpenRecord(e,1,"");
    });
    this.AddExpand();
    $(".head_columns").html("");
    let line = GetSingleCustomerLine();
    $(line).find(".code").html(man_lab["Code"]);
    $(line).find(".custname").html(man_lab["CustName"]);
    $(line).find(".regnr").html(man_lab["RegNr"]);
    $(line).find(".vatnr").html(man_lab["VATNr"]);
    $(line).find(".phone").html(man_lab["Phone"]);
    $(line).find(".mobile").html(man_lab["Mobile"]);
    $(line).find(".email").html(man_lab["Email"]);
    $(line).find(".contact").html(man_lab["Contact"]);
    $(line).find(".language").html(man_lab["Language"]);
    $(".head_columns").append(line);
    $(".filters .uf_button").click(function(){
      if ($(this).hasClass("all")) {
        self.userType = "__ALL";
      } else {
        self.userType = "user";      
      }
      $(".filters .uf_button.selected").removeClass("selected");
      $(this).addClass("selected");
      self.GetCustomers();
    });
  }
  
  this.SetInvoiceTitles = function(){
    var self = this;
    $(".filters").html("");
    this.AddExpand();
    $(".head_columns").html("");
    $(".filters").append("<div class='user_filter'><div class='uf_button all'>" + man_lab["AllOrders"] + "</div><div class='uf_button my selected'>" + man_lab["MyOrders"] + "</div></div>");
    let line = GetSingleInvoiceLine();
    $(line).find(".okflag").html(man_lab["OKFlag"]);
    $(line).find(".sernr").html(man_lab["SerNr"]);
    $(line).find(".custcode").html(man_lab["Customer"]);
    $(line).find(".custname").html(man_lab["CustName"]);
    $(line).find(".ordernr").html(man_lab["OrderNr"]);
    $(line).find(".invdate").html(man_lab["InvDate"]);
    $(line).find(".duedate").html(man_lab["DueDate"]);
    $(line).find(".duedays").html(man_lab["DueDays"]);
    $(line).find(".total").html(man_lab["Total"]);
    $(line).find(".emailstat").html(man_lab["Email"]);
    $(line).find(".currency").html(man_lab["Currency"]);
    
    $(".head_columns").append(line);
    $(".filters .uf_button").click(function(){
      if ($(this).hasClass("all")) {
        self.userType = "__ALL";
      } else {
        self.userType = "user";      
      }
      $(".filters .uf_button.selected").removeClass("selected");
      $(this).addClass("selected");
      self.GetInvoices();
    });
  }
  
  
  this.SetOrderRowTitles = function(el){
  
    let line = GetSingleOrderRowLine_Normal();
    $(line).find(".item").html(man_lab["ItemCode"]);
    $(line).find(".qty").html(man_lab["TotalQty"]);
    $(line).find(".name").html(man_lab["Name"]);
    $(line).find(".width").html(man_lab["Width"]);
    $(line).find(".length").html(man_lab["Length"]);
    $(line).find(".qty2").html(man_lab["Qty"]);
    $(line).find(".unit").html(man_lab["Unit"]);
    $(line).find(".price").html(man_lab["Price"]);
    $(line).find(".discount").html(man_lab["Discount"]);
    $(line).find(".vatcode").html(man_lab["VATCode"]);
    $(line).find(".sum").html(man_lab["Sum"]);
    $(line).find(".inprod").html(man_lab["InProduction"]);
    $(line).find(".produced").html(man_lab["Produced"]);
    $(el).append(line);
  }
  this.SetQTRowTitles = function(el){
  
    let line = GetSingleQTRowLine_Normal();
    $(line).find(".number").html(man_lab["Nr"]);
    $(line).find(".item").html(man_lab["ItemCode"]);
    $(line).find(".qty").html(man_lab["TotalQty"]);
    $(line).find(".name").html(man_lab["Name"]);
    $(line).find(".price").html(man_lab["Price"]);
    $(line).find(".discount").html(man_lab["Discount"]);
    $(line).find(".vatcode_qt").html(man_lab["VATCode"]);
    $(line).find(".sum").html(man_lab["Sum"]);
    $(line).find(".location2").html(man_lab["Location"]);
    $(el).append(line);
  }
  
  
  this.SetCustomerRowTitles = function(el){
  
    let line = GetSingleCustomerRowLine();
    $(line).find(".contactname").html(man_lab["Name"]);
    $(line).find(".phone").html(man_lab["Phone"]);
    $(line).find(".mobile").html(man_lab["Mobile"]);
    $(line).find(".email").html(man_lab["Email"]);
    $(el).append(line);
  }
  
  this.SetInvoiceRowTitles = function(el){
  
    let line = GetSingleInvoiceRowLine_Normal();
    $(line).find(".item").html(man_lab["ItemCode"]);
    $(line).find(".qty").html(man_lab["TotalQty"]);
    $(line).find(".name").html(man_lab["Name"]);
    $(line).find(".unit").html(man_lab["Unit"]);
    $(line).find(".price").html(man_lab["Price"]);
    $(line).find(".discount").html(man_lab["Discount"]);
    $(line).find(".sum").html(man_lab["Sum"]);
    $(el).append(line);
  }
  
  this.ReadOrderFilters = function(invf){
    let sernr = $(".filters .SerNr input").val();
    let ordernr = $(".filters .OrderNr input").val();
    let search = $(".filters .Search input").val();
    let sd = $(".filters .StartDate input").val();
    let ed = $(".filters .EndDate input").val();
    let res = "";
    if (sernr!=""){
      res += "&sernr=" + sernr;
    }
    if (sd!=""){
      res += "&sd=" + sd;
    }
    if (ordernr!="" && ordernr!=undefined){
      res += "&ordernr=" + ordernr;
    }
    if (ed!=""){
      res += "&ed=" + ed;
    }
    if (search!=""){
      res += "&search=" + search;
    }
    if (invf){
      let stat = $(".filters .Status select").val();
      if (stat!=""){
        res += "&payment=" + stat;
      }
    }
    return res;
  }

  this.GetOrders = function(){
    var self = this;
    this.curView = 0;
    $.get("/WebManagersAction.hal?action=getorders&pg=" + this.curPage + this.ReadOrderFilters(false) + "&usertype=" + this.userType,function(data){
      let js = jQuery.parseJSON(data);
      if (js.hasOwnProperty("orders")){
        self.orders = js.orders;
      }
      self.ResetExpand();
      self.pageCnt = js.pageCnt;
      self.ShowOrders();  
    });
  }
  
  this.ReadQTFilters = function(invf){
    let sernr = $(".filters .SerNr input").val();
    let ordernr = $(".filters .OrderNr input").val();
    let search = $(".filters .Search input").val();
    let sd = $(".filters .StartDate input").val();
    let ed = $(".filters .EndDate input").val();
    let res = "";
    if (sernr!=""){
      res += "&sernr=" + sernr;
    }
    if (sd!=""){
      res += "&sd=" + sd;
    }
    if (ed!=""){
      res += "&ed=" + ed;
    }
    if (ordernr!=""){
      res += "&ordernr=" + ordernr;
    }
    if (search!=""){
      res += "&search=" + search;
    }
    return res;
  }

  this.GetQTs = function(){
    var self = this;
    this.curView = 6;
    $.get("/WebManagersAction.hal?action=getqt&pg=" + this.curPage + this.ReadQTFilters(false) + "&usertype=" + this.userType,function(data){
      let js = jQuery.parseJSON(data);
      if (js.hasOwnProperty("qts")){
        self.qts = js.qts;
      }
      self.ResetExpand();
      self.pageCnt = js.pageCnt;
      self.ShowQTs();  
    });
  }
  
  this.ReadCustomerFilters = function(){
    let code = $(".filters .Code input").val();
    let regnr = $(".filters .RegNr input").val();
    let search = $(".filters .Search input").val();
    let res = "";
    if (code!=""){
      res += "&code=" + code;
    }
    if (regnr!=""){
      res += "&regnr=" + regnr;
    }
    if (search!=""){
      res += "&search=" + search;
    }
    return res;
  }

  this.GetCustomers = function(){
    var self = this;
    this.curView = 1;
    $.get("/WebManagersAction.hal?action=getcustomers&pg=" + this.curPage + this.ReadCustomerFilters() + "&usertype=" + this.userType,function(data){
      let js = jQuery.parseJSON(data);
      if (js.hasOwnProperty("customers")){
        self.customers = js.customers;
      }
      self.ResetExpand();
      self.pageCnt = js.pageCnt;
      self.ShowCustomers();  
    });
  }
  
  this.GetInvoices = function(){
    var self = this;
    this.curView = 2;
    $.get("/WebManagersAction.hal?action=getinvoices&pg=" + this.curPage + this.ReadOrderFilters(true) + "&usertype=" + this.userType,function(data){
      let js = jQuery.parseJSON(data);
      if (js.hasOwnProperty("invoices")){
        self.invoices = js.invoices;
      }
      self.ResetExpand();
      self.pageCnt = js.pageCnt;
      self.ShowInvoices();  
    });
  }
  
  this.setCheckMark = function(el,cls,val,type=0){
    var img = "/images/tick_mark.png";
    if (type==1){
      img = "/images/email.png";
    }
    if (val=="1" || val==1){
      $(el).find(cls).html("<img class='tick_mark' src='" + img + "'>");
    }
    if (val=="18" || val==18){
      $(el).find(cls).html("-");
    }
  
  }
  
  this.SetOrderColor = function(line,ORr){
    let res = "";
    if (ORr.ShipFlag!="1"){
      if (ORr.prodstat=="3"){
        res = "#92cf4f";//green
      }
      if (ORr.prodstat=="2"){
        res = "#fffe01";//yellow
      }
      if (ORr.okflag=="1" && ORr.prodstat=="1"){
        res = "red";
      }
    }
    if (res!=""){
      $(line).find(".head_fields").css("background-color",res);
    }
  
  }
  
  
  
  this.ShowOrders = function(){
    var self = this;
    $(this.orderWrap).html("");
    for (let i=0;i<this.orders.length;i++){
      let ORr = this.orders[i];
      let line = GetSingleOrderLine();
      self.setCheckMark(line,".okflag",ORr.okflag);
      self.setCheckMark(line,".closed",ORr.Closed);
      $(line).find(".sernr").html(ORr.sernr);
      $(line).find(".custcode").html(ORr.custcode);
      $(line).find(".custname").html(ORr.custname);
      $(line).find(".orddate").html(ORr.orddate);
      $(line).find(".confirmdate").html(ORr.confirmdate);
      $(line).find(".planship").html(ORr.planrec);
      $(line).find(".sum4").html(ORr.Sum4);
      self.setCheckMark(line,".emailsent",ORr.emailsent,1);
      
      let del = ORr.delivered.split(",");
      for (let j=0;j<del.length;j++){
        if (del[j]!=""){
          let singledel = del[j].split(":");
          let delel = $("<div class='print_order_doc'>" + singledel[1] + "</div>");
          (function(tdelel,tsingledel){
            $(tdelel).click(function(e){
              self.PrintRecord(e,6,tsingledel[0]);
            });
          })(delel,singledel);
          $(line).find(".delivered").append(delel);
        }
      }
      let inv = ORr.invoiced.split(",");
      for (let j=0;j<inv.length;j++){
        if (inv[j]!=""){
          let singledel = inv[j].split(":");
          let delel = $("<div class='print_order_doc invoices'><span class='link'>" + singledel[0] + "</span> (" + singledel[1] + ", " + singledel[2] + ")</div>");
          (function(tdelel,tsingledel){
            $(tdelel).find(".link").click(function(e){
              self.PrintRecord(e,2,tsingledel[0]);
            });
          })(delel,singledel);
          $(line).find(".invoiced").append(delel);
          $(line).find(".invoicesum").append(singledel[3]);
        }
      }
      
      $(line).find(".curncycode").html(ORr.curncycode);
      $(this.orderWrap).append(line);
      (function(tline,tsernr,ti){
        $(tline).find(".head_fields").click(function(){
          self.ShowOrderDetails(tline,tsernr,ti);
        });
        $(tline).find(".edit_record").click(function(e){
          self.OpenRecord(e,0,tsernr);
        });
      })(line,ORr.sernr,i);
      this.SetOrderColor(line,ORr);
        
    }
    
    this.UpdatePagination();
  }
  
  this.ShowOrderDetails = function(el,sernr,num){
    var self = this;
    if (this.orders[num].active){
      var sel = getSelection().getRangeAt(0).toString();
      if(!sel){
        $(el).find(".rows").slideUp(function(){
          $(this).html("");
        });
        this.orders[num].active = false;
      }
      return;
    }
    $.get("/WebManagersAction.hal?action=getorderrows&sernr=" + sernr,function(data){
      let js = jQuery.parseJSON(data);
      let linewrap = $(el).find(".rows");
      $(linewrap).append("<div class='list_comment'>" + man_lab["Comment"] + ": " + js.comment + "</div>")
      self.SetOrderRowTitles(linewrap);
      for (let i=0;i<js.rows.length;i++){
        var ORrw = js.rows[i];
        let line;
        switch (ORrw.stp){
          case "1":
            line = GetSingleOrderRowLine_Normal();
            break;
          case "9":
            line = GetSingleOrderRowLine_Subtotal();
            break;
          case "1001":
            line = GetSingleOrderRowLine_Totals();
            break;
          default:
            line = GetSingleOrderRowLine_Normal();
            
        }
        $(line).find(".item").html(ORrw.itemcode);
        $(line).find(".name").html(ORrw.itemname);
        $(line).find(".qty").html(ORrw.quant);
        $(line).find(".length").html(ORrw.length);
        $(line).find(".width").html(ORrw.width);
        $(line).find(".price").html(ORrw.price);
        $(line).find(".unit").html(ORrw.unit);
        $(line).find(".qty2").html(ORrw.qty2);
        $(line).find(".discount").html(ORrw.discount);
        $(line).find(".vatcode").html(ORrw.vatcode);
        $(line).find(".sum").html(ORrw.sum);
        if (ORrw.stp=="1001") {
          $(line).find(".line_vat").html(man_lab["VATSum"] + " " + ORrw.sum3);
          $(line).find(".line_subtotal").html(man_lab["Subtotal"] + " " + ORrw.sum1);
          $(line).find(".line_total").html(man_lab["Total"] + " " + ORrw.sum4);
        }
        if (ORrw.itemcode!=""){
          self.setCheckMark(line,".produced",ORrw.ready);
          self.setCheckMark(line,".inprod",ORrw.inprod);
        }
        $(line).find(".subtotal_item").html(ORrw.itemname);
        $(linewrap).append(line);
      }
      $(linewrap).slideDown();
      self.orders[num].active = true;
    });
  }
  

  
  this.ShowQTs = function(){
    var self = this;
    $(this.orderWrap).html("");
    for (let i=0;i<this.qts.length;i++){
      let QTr = this.qts[i];
      let line = GetSingleQTLine();
      $(line).find(".sernr").html(QTr.sernr);
      var orderlink = $("<div class='order-link'>" + QTr.ordernr + "</div>");
      (function(torderlink,torderno){
        $(torderlink).click(function(e){
          self.OpenRecord(e,0,torderno);
        })
      })(orderlink,QTr.ordernr);
      $(line).find(".ordernr").append(orderlink);
      $(line).find(".salesman").html(QTr.salesman);
      $(line).find(".custcode").html(QTr.custcode);
      $(line).find(".custname").html(QTr.custname);
      $(line).find(".qtdate").html(QTr.qtdate);
      $(line).find(".sum4").html(QTr.Sum4);
      
      
      $(this.orderWrap).append(line);
      (function(tline,tsernr,ti){
        $(tline).find(".head_fields").click(function(){
          self.ShowQTDetails(tline,tsernr,ti);
        });
        $(tline).find(".edit_record").click(function(e){
          self.OpenRecord(e,6,tsernr);
        });
      })(line,QTr.sernr,i);
        
    }
    
    this.UpdatePagination();
  }
  
  this.ShowQTDetails = function(el,sernr,num){
    var self = this;
    if (this.qts[num].active){
      var sel = getSelection().getRangeAt(0).toString();
      if(!sel){
        $(el).find(".rows").slideUp(function(){
          $(this).html("");
        });
        this.qts[num].active = false;
      }
      return;
    }
    $.get("/WebManagersAction.hal?action=getqtrows&sernr=" + sernr,function(data){
      let js = jQuery.parseJSON(data);
      let linewrap = $(el).find(".rows");
      self.SetQTRowTitles(linewrap);
      for (let i=0;i<js.rows.length;i++){
        var QTrw = js.rows[i];
        let line;
        switch (QTrw.stp){
          case "1":
            line = GetSingleQTRowLine_Normal();
            break;
          case "9":
            line = GetSingleQTRowLine_Subtotal();
            break;
          case "1001":
            line = GetSingleQTRowLine_Totals();
            break;
          default:
            line = GetSingleQTRowLine_Normal();
            
        }
        $(line).find(".number").html(QTrw.rownr);
        $(line).find(".item").html(QTrw.itemcode);
        $(line).find(".name").html(QTrw.itemname);
        $(line).find(".qty").html(QTrw.quant);
        $(line).find(".price").html(QTrw.price);
        $(line).find(".unit").html(QTrw.unit);
        $(line).find(".discount").html(QTrw);
        $(line).find(".vatcode_qt").html(QTrw.vatcode);
        $(line).find(".sum").html(QTrw.sum);
        $(line).find(".location2").html(QTrw.location);
        if (QTrw.stp=="1001") {
          $(line).find(".line_vat").html(man_lab["VATSum"] + " " + QTrw.sum3);
          $(line).find(".line_subtotal").html(man_lab["Subtotal"] + " " + QTrw.sum1);
          $(line).find(".line_total").html(man_lab["Total"] + " " + QTrw.sum4);
        }
        $(line).find(".subtotal_item").html(QTrw.itemname);
        $(linewrap).append(line);
      }
      $(linewrap).slideDown();
      self.qts[num].active = true;
    });
  }
  
  this.ConvertEmailToLink = function(email){
    var res = email;
    if (email!=""){
      res = "<a href='mailto:" + res + "'>" + res + "</a>";
    }
    return res;
  }

  this.ShowCustomers = function(){
    var self = this;
    $(this.orderWrap).html("");
    for (let i=this.customers.length-1;i>=0;i--){
      let CUr = this.customers[i];
      let line = GetSingleCustomerLine();
      $(line).find(".code").html(CUr.code);
      $(line).find(".custname").html(CUr.name);
      $(line).find(".regnr").html(CUr.regnr);
      $(line).find(".vatnr").html(CUr.vatnr);
      $(line).find(".phone").html(CUr.phone);
      $(line).find(".mobile").html(CUr.mobile);
      $(line).find(".email").html(this.ConvertEmailToLink(CUr.email));
      if (CUr.contact!=""){
        let singleel = CUr.contact.split(":");
        let contact = "";
        if (singleel.length>1) {
          contact = $("<div class='open_record_line'>" + singleel[1] + "</div>");
          (function(tcontact,tsingleel){
            $(tcontact).click(function(e){
              self.OpenRecord(e,1,tsingleel[0]);
            });
          })(contact,singleel);
        } else {        
          contact = singleel[0];
        }
        $(line).find(".contact").html(contact);
      }
    
      $(line).find(".language").html(CUr.language);
      $(this.orderWrap).append(line);
      (function(tline,tcode,ti){
        $(tline).find(".edit_record").click(function(e){
          self.OpenRecord(e,1,tcode);
        });
        $(tline).find(".head_fields").click(function(){
          self.ShowCustomerDetails(tline,tcode,ti);
        });
      })(line,CUr.code,i);
        
    }
    
    this.UpdatePagination();
  }
  
  
  this.ShowCustomerDetails = function(el,code,num){
    var self = this;
    if (this.customers[num].active){
      var sel = getSelection().toString();
      if(!sel){
        $(el).find(".rows").slideUp(function(){
          $(this).html("");
        });
        this.customers[num].active = false;
      }
      return;
    }
    $.get("/WebManagersAction.hal?action=getcustomerrows&code=" + code,function(data){
      let js = jQuery.parseJSON(data);
      let linewrap = $(el).find(".rows");
      self.SetCustomerRowTitles(linewrap);//TODO
      for (let i=0;i<js.rows.length;i++){
        var CUrw = js.rows[i];
        let line;
        line = GetSingleCustomerRowLine();
        $(line).find(".contactname").html(CUrw.contactname);
        $(line).find(".phone").html(CUrw.phone);
        $(line).find(".mobile").html(CUrw.mobile);
        $(line).find(".email").html(self.ConvertEmailToLink(CUrw.email));
        $(linewrap).append(line);
      }
      $(linewrap).slideDown();
      self.customers[num].active = true;
    });
  }
  
  this.SetInvoiceColor = function(line,IVr){
    let res = "";
    let d = 0;
    if (IVr.duedays==""){
      if (IVr.okflag=="1"){
        res = "#92cf4f";
      }
    } else {
      d = parseInt(IVr.duedays);
      if (d>0){
        if (d<6){
          res = "#fffe01";
        }
      } else {
        res = "red";
      }
    }
    if (res!=""){
      $(line).find(".head_fields").css("background-color",res);
    }
  
  }
  
    
  this.ShowInvoices = function(){
    var self = this;
    $(this.orderWrap).html("");
    $(this.orderWrap).html("");
    for (let i=this.invoices.length-1;i>=0;i--){
      let IVr = this.invoices[i];
      let line = GetSingleInvoiceLine();
      self.setCheckMark(line,".okflag",IVr.okflag);
      $(line).find(".sernr").html(IVr.sernr);
      $(line).find(".custcode").html(IVr.custcode);
      (function(tline,tcode){
        $(tline).find(".custcode").click(function(e){
          self.OpenRecord(e,1,tcode);
        });
      })(line,IVr.custcode);
      var orderlink = $("<div class='order-link'>" + IVr.ordernr + "</div>");
      (function(torderlink,torderno){
        $(torderlink).click(function(e){
          self.OpenRecord(e,0,torderno);
        })
      })(orderlink,IVr.ordernr);
      $(line).find(".ordernr").append(orderlink);
      $(line).find(".custname").html(IVr.custname);
      $(line).find(".invdate").html(IVr.invdate);
      $(line).find(".duedate").html(IVr.duedate);
      $(line).find(".duedays").html(IVr.duedays);
      $(line).find(".total").html(IVr.total);
      $(line).find(".emailstat").html(IVr.emailstat.split(",").join("<br>"));
      $(line).find(".currency").html(IVr.curncycode);
      $(this.orderWrap).append(line);
      (function(tline,tsernr,ti){
        $(tline).click(function(){
          self.ShowInvoiceDetails(this,tsernr,ti);
        });
        $(tline).find(".print_record").click(function(e){
          self.PrintRecord(e,2,tsernr);
        });
      })(line,IVr.sernr,i);
      this.SetInvoiceColor(line,IVr);
        
    }
    
    this.UpdatePagination();
  }
  
  this.ShowInvoiceDetails = function(el,sernr,num){
    var self = this;
    if (this.invoices[num].active){
      $(el).find(".rows").slideUp(function(){
        $(this).html("");
      });
      this.invoices[num].active = false;
      return;
    }
    $.get("/WebManagersAction.hal?action=getinvoicerows&sernr=" + sernr,function(data){
      let js = jQuery.parseJSON(data);
      let linewrap = $(el).find(".rows");
      self.SetInvoiceRowTitles(linewrap);
      for (let i=0;i<js.rows.length;i++){
        var IVrw = js.rows[i];
        let line;
        switch (IVrw.stp){
          case "1":
            line = GetSingleInvoiceRowLine_Normal();//TODO
            break;
          case "9":
            line = GetSingleInvoiceRowLine_Subtotal();//TODO
            break;
          default:
            line = GetSingleInvoiceRowLine_Normal();
            
        }
        $(line).find(".item").html(IVrw.itemcode);
        $(line).find(".name").html(IVrw.itemname);
        $(line).find(".qty").html(IVrw.quant);
        $(line).find(".price").html(IVrw.price);
        $(line).find(".unit").html(IVrw.price);
        $(line).find(".discount").html(IVrw.discount);
        $(line).find(".sum").html(IVrw.sum);
        $(line).find(".subtotal_item").html(IVrw.itemname);
        $(linewrap).append(line);
      }
      $(linewrap).slideDown();
      self.invoices[num].active = true;
    });
  }
  
  this.UpdatePagination = function(){
    var self = this;
    $(this.paginationWrap).html("");
    if (this.curPage-this.pageMargins>0){
      let page = $("<div class='page_el'><<</div>");
      $(page).click(function(){
        self.SetPage(0);
      });
      $(this.paginationWrap).append(page);
    }
    if (this.curPage>0){
      let page = $("<div class='page_el'><</div>");
      $(page).click(function(){
        self.SetPage(self.curPage-1);
      });
      $(this.paginationWrap).append(page);
    }
    let sp = this.curPage-this.pageMargins;
    if (sp<0) sp = 0;
    let ep = this.curPage+this.pageMargins;
    if (ep>this.pageCnt) ep = this.pageCnt;
    
    for (let i=sp;i<ep;i++){
      let page = $("<div class='page_el'>" + (i+1) + "</div>");
      if (i==this.curPage){
        $(page).addClass("active_page");
      } else {
        (function(tpage,ti,tself){
          $(tpage).click(function(){
            self.SetPage(ti);
          });
        })(page,i,self);
      }
      $(this.paginationWrap).append(page);      
    }
    if (this.curPage<this.pageCnt-1){
      let page = $("<div class='page_el'>></div>");
      $(page).click(function(){
        self.SetPage(self.curPage+1);
      });
      $(this.paginationWrap).append(page);
    }
    if (this.curPage+this.pageMargins<this.pageCnt){
      let page = $("<div class='page_el'>>></div>");
      $(page).click(function(){
        self.SetPage(self.pageCnt);
      });
      $(this.paginationWrap).append(page);
    }
  }
  
  this.SetPage = function(pg){
    this.curPage = pg;
    switch (this.curView){
      case 0: this.GetOrders();    break;
      case 1: this.GetCustomers(); break;
      case 2: this.GetInvoices();  break;
      case 6: this.GetQTs();       break;
    }
  
  }
  
  this.SetCustomerFilters = function(){
    $(this.orderWrap).html("");
    this.SetCustomerTitles();
    let filters = GetCustomerFilters();
    $(".filters").append(filters);
    
    this.SetFilterWAction($(".filters .Code input"));
    this.SetFilterWAction($(".filters .RegNr input"));
    this.SetFilterWAction($(".filters .Search input"));
    
  }
  
  this.SetOrderFilters = function(){
    $(this.orderWrap).html("");
    this.SetOrderTitles();
    let filters = GetOrderFilters(false);
    $(".filters").append(filters);
    
    this.SetPasteSpecialField($(".filters .StartDate input"),filters,"StartDate",false,-1);
    this.SetPasteSpecialField($(".filters .EndDate input"),filters,"EndDate",false,-1);

    this.SetFilterWAction($(".filters .SerNr input"));
    this.SetFilterWAction($(".filters .StartDate input"));
    this.SetFilterWAction($(".filters .EndDate input"));
    this.SetFilterWAction($(".filters .Search input"));
    
    $(".filters .EndDate input").val(CurrentDate());
    $(".filters .StartDate input").val(GetDateWithYear(-1));
  }
  
  this.SetQTFilters = function(){
    $(this.orderWrap).html("");
    this.SetQTTitles();
    let filters = GetQTFilters(false);
    $(".filters").append(filters);
    
    this.SetPasteSpecialField($(".filters .StartDate input"),filters,"StartDate",false,-1);
    this.SetPasteSpecialField($(".filters .EndDate input"),filters,"EndDate",false,-1);

    this.SetFilterWAction($(".filters .SerNr input"));
    this.SetFilterWAction($(".filters .OrderNr input"));
    this.SetFilterWAction($(".filters .StartDate input"));
    this.SetFilterWAction($(".filters .EndDate input"));
    this.SetFilterWAction($(".filters .Search input"));
    
    $(".filters .EndDate input").val(CurrentDate());
    $(".filters .StartDate input").val(GetDateWithYear(-1));
  }
  
  this.SetInvoiceFilters = function(){
    $(this.orderWrap).html("");
    this.SetInvoiceTitles();
    let filters = GetInvoiceFilters(true);
    $(".filters").append(filters);
    
    $(".filters .Status input").val(0);
    this.SetPasteSpecialField($(".filters .StartDate input"),filters,"StartDate",false,-1);
    this.SetPasteSpecialField($(".filters .EndDate input"),filters,"EndDate",false,-1);
    this.SetPasteSpecialField($(".filters .Status input"),filters,"Status",false,-1);

    this.SetFilterWAction($(".filters .SerNr input"));
    this.SetFilterWAction($(".filters .OrderNr input"));
    this.SetFilterWAction($(".filters .StartDate input"));
    this.SetFilterWAction($(".filters .EndDate input"));
    this.SetFilterWAction($(".filters .Search input"));
//    this.SetFilterWAction($(".filters .Status select"));
 
    $(".filters .EndDate input").val(CurrentDate());
    $(".filters .StartDate input").val(GetDateWithYear(-1));
  }
    
  this.SetFilterWAction = function(input){
    var self = this;
    $(input).change(function(){
      self.DoRemoteWAction(null,null,null,-1,-1);
    });
  }
  
  this.SetNavigation = function(){
    var self = this;
    $("#customer_nav").click(function(){
      self.curPage = 0;
      $(".managers_menu_item.selected").removeClass("selected");
      $(this).addClass("selected");
      self.SetCustomerFilters();
      self.GetCustomers();
    });
    $("#order_nav").click(function(){
      self.curPage = 0;
      $(".managers_menu_item.selected").removeClass("selected");
      $(this).addClass("selected");
      self.SetOrderFilters();
      self.GetOrders();
    });
    $("#qt_nav").click(function(){
      self.curPage = 0;
      $(".managers_menu_item.selected").removeClass("selected");
      $(this).addClass("selected");
      self.SetQTFilters();
      self.GetQTs();
    });
    $("#invoice_nav").click(function(){
      self.curPage = 0;
      $(".managers_menu_item.selected").removeClass("selected");
      $(this).addClass("selected");
      self.SetInvoiceFilters();
      self.GetInvoices();
    });
    $("#agentpayments_nav").click(function(){
      self.curPage = 0;
      $(".managers_menu_item.selected").removeClass("selected");
      $(this).addClass("selected");
      self.ShowReport("agentpayments");
    });
    $("#sl_nav").click(function(){
      self.curPage = 0;
      $(".managers_menu_item.selected").removeClass("selected");
      $(this).addClass("selected");
      self.ShowReport("sl");
    });
    $("#logout_nav").click(function(){
      window.location.href = "/WebUpdatingAction.hal?action=logout&path=/login";
    });
    
    
    
     $("#order_nav").click();
  }

/* reports*/

  this.ShowReport = function(repname){
    let win = {};
    let type = -1;
    switch (repname){
      case "agentpayments":
        win = GetAgentPaymentWindow();
        type = 4;
        break;
      case "sl":
        win = GetSLWindow();
        type = 5;
        break;
    }
    
    this.curRec = RepSpecRecord();
    this.ShowWindow(win,type);
    
    this.SetWindowField(win.window,"Period2Str",type,true);
    this.SetWindowField(win.window,"f1",type,true);
    this.SetWindowField(win.window,"f2",type,true);
    this.SetWindowField(win.window,"ArtMode",type,true);
    this.SetWindowField(win.window,"sStartDate",type,true);
    this.SetWindowField(win.window,"sEndDate",type,true);
  }
  
  this.UpdateInlinePrintButton = function(type){
    if (type==0 || type==6){
      if (this.curRec.SerNr!="" && this.curRec.SerNr!="-1"){
        $(".window_pop").find(".print_inline_record").addClass("active");
        $(".window_pop").find(".delete_inline_record").addClass("active");
        $(".window_pop").find(".qt2or_inline_record").addClass("active");
        $(".window_pop").find(".prep_inline_record").addClass("active");
      } else {
        $(".window_pop").find(".print_inline_record").removeClass("active");
        $(".window_pop").find(".delete_inline_record").removeClass("active");
        $(".window_pop").find(".qt2or_inline_record").removeClass("active");
        $(".window_pop").find(".prep_inline_record").removeClass("active");
      }
    }

  }

/* record editing part*/

  this.OpenRecord = function(event,type,id){
    if (event){
      event.stopPropagation();
    }
    var self = this;
    $.get("/WebManagersAction.hal?action=getrecorddata&id=" + id + "&type=" + type,function(data){
      let js = jQuery.parseJSON(data);
      let rec = {};
      switch (type) {
        case 0: rec = OrderRecord();    break;
        case 1: rec = CustomerRecord(); break;
        case 2: rec = InvoiceRecord();  break;
        case 6: rec = QTRecord();  break;
      }
      self.curRec = rec;
      self.FillRecordData(js);
      self.ShowRecordWindow(type);
      self.MarkMandatoryField(type);
      self.UpdateInlinePrintButton(type);
    });
  }  
  
  this.FillRecordData = function(js){
    for (let i in js) {
      if (i=="warningtext"){
        alert(js[i]);
      } else {
        this.curRec[i] = js[i];
      }
    }
  }
  
  this.SetActiveField = function(js){
    setTimeout(function(){
      if (!js.hasOwnProperty("errorrow")){
        if ($(".editfield." + js.errorfield + " select").length>0) {
          $(".editfield." + js.errorfield + " select").trigger('chosen:activate');
        } else {
          $(".editfield." + js.errorfield + " input[type='text']").focus();
        }
      } else {
          $(".matrix_body .matrix_line:nth-child(" + js.errorrow + ") .matrix_field." + js.errorfield + " input[type='text']").focus();
      }
    },500);
  }

  this.GetRecordID = function(type){
    id = "";
    switch (type){
      case 0: id = this.curRec.SerNr; break;
      case 1: id = this.curRec.Code;  break;
      case 6: id = this.curRec.SerNr;  break;
    }
    return id;
  }
  
  this.TryToSaveRecord = function(window,type){
    var self = this;
    if (this.record_changed==true && this.waction_in_progress==false) {
      let rec = this.GetWindowRecord();
//should be more dynamic
      var id = this.GetRecordID(type);
      $.ajax({
        method:"POST",
        url:"/WebManagersUpdatingAction.hal?action=setrecorddata&type=" + type + "&id=" + id,
        data:rec,
        success:function(data){
          let js = jQuery.parseJSON(data);
          if (js.error){
            alert(js.error);
            self.SetActiveField(js);
          } else {
            self.FillRecordData(js);
            for (let i in self.curRec){
              self.SetWindowField(window,i,type,false);
            }
            self.record_changed = false;
            $(window).closest(".window_pop").find(".record_save").removeClass("active");
            self.UpdateInlinePrintButton(type);
          }
        }
      })      
    }
    //$(window).closest(".window_pop").remove();
    
  }
  
  this.ShowWindow = function(window,type){
    var self = this;
    let wr_text = "<div class='window_pop'><div class='window_frame window_type" + type + "'><div class='window_title'><div class='title_name'>" + window.title + "</div>";
    if (type==0 || type==1 || type==6){
      wr_text += "<div class='record_save'>" + man_lab["Save"] + "</div><div class='new_record'>" + man_lab["NewRecord"] + "</div><div class='duplicate_record'>" + man_lab["Duplicate"] + "</div>";
    }
    if (type==4 || type==5){
      wr_text += "<div class='run_report'>" + man_lab["Run"] + "</div>";
    }
    if (type==0){
      wr_text += "<div class='print_inline_record'>" + man_lab["Print"] + "</div>";
      wr_text += "<div class='delete_inline_record'>" + man_lab["Delete"] + "</div>";
      wr_text += "<div class='prep_inline_record'>" + man_lab["CreatePrep"] + "</div>";
    }
    if (type==6){
      wr_text += "<div class='delete_inline_record'>" + man_lab["Delete"] + "</div>";
      wr_text += "<div class='qt2or_inline_record'>" + man_lab["CreateOrder"] + "</div>";
      wr_text += "<div class='print_inline_record'>" + man_lab["Print"] + "</div>";
    }
       
    wr_text += "</div><div class='window_close'></div>";
    if (type==0 || type==1 || type==6) {
      wr_text += "<div class='attachlist'></div>";
      wr_text += "<div class='attachtoggle'></div>";
    }
    wr_text += "</div></div>";
    
    let wr = $(wr_text);
    $(wr).find(".window_frame").append(window.window);
    //TODO:: set titles and other actions (date field, customer select etc.)
    $(document.body).append(wr);
    $(wr).find(".attachtoggle").click(function(){
      $(".attachlist").toggleClass("active");
    });
    $(wr).find(".window_close").click(function(){
      //TODO:: chech if record was changed
      var remf = false;
      if (type==4 || type==5){
        remf = true;
      } else {
        if (self.record_changed){
          if (confirm(man_lab["CloseNoSave"])) {
            remf = true;
          }
        } else {
          remf = true;
        }
      }
      if (remf){
        $(wr).remove();      
      }
    });
    this.record_changed = false;
    $(wr).find(".record_save").click(function(){
      self.TryToSaveRecord(window.window,type);
    });
    $(wr).find(".new_record").click(function(e){
      $(wr).find(".window_close").click();
      if ($(".window_close").length==0){
        self.OpenRecord(e,type,"");
      }
    });
    $(wr).find(".duplicate_record").click(function(){
      self.DoRemoteWAction(window.window,null,"CopyRecord",-1,type);
    });
    $(wr).find(".qt2or_inline_record").click(function(){
      self.DoRemoteWAction(window.window,null,"CreateOrder",-1,type);
    });
    
    $(wr).find(".run_report").click(function(){
      self.RunReport(window.window,type);
    });
    $(wr).find(".print_inline_record").click(function(e){
      if (self.curRec.SerNr!="" && self.curRec.SerNr!="-1"){
        self.PrintRecord(e,type,self.curRec.SerNr);
      }
    });
    $(wr).find(".prep_inline_record").click(function(e){
      if (self.curRec.SerNr!="" && self.curRec.SerNr!="-1"){
        self.PrintRecord(null,0,self.curRec.SerNr,"prep");
      }
    });
    $(wr).find(".delete_inline_record").click(function(e){
      if (self.curRec.SerNr!="" && self.curRec.SerNr!="-1"){
        if (confirm(man_lab["DeleteMessage2"])) {
          self.DoRemoteWAction(window.window,null,"DeleteRecord",-1,type);
        }
      }
    });
    
  }
  
  this.DownloadPDF = function(data){
    if (data.length>0){
    //alert(data);
    /*
      var a = document.createElement('a');
      $(document.body).append(a);
      var pdfAsDataUri = "data:application/pdf;base64,"+data;
      //a.download = 'export.pdf';
      a.type = 'application/pdf';
      a.href = pdfAsDataUri + "\n";
      a.target = "blank";
      a.click();
      $(a).remove();
    */
    
      var blob = new Blob([data], { type: 'application/pdf' });
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob); // for IE
      }
      else {
          var fileURL = URL.createObjectURL(blob);
          var newWin = window.open(fileURL);
          newWin.focus();
          newWin.reload();
      }
    }
  }
  
  this.RunReport = function(window,type){
    var self = this;
    let rec = this.GetWindowRecord();
    /*
    $.ajax({
      method:"POST",
      url:"/WebManagersAction.hal?action=runreport&type=" + type,
      data:rec,
      success:function(data){
        self.DownloadPDF(data);
      }
    });
    */
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "/WebManagersAction.hal?action=runreport&type=" + type, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(oEvent) {
      var arrayBuffer = oReq.response;

      // if you want to access the bytes:
      var byteArray = new Uint8Array(arrayBuffer);
      self.DownloadPDF(byteArray);
    }
    oReq.send($.param(rec));
  }
  
  this.MarkMandatoryField = function(type){
    let fields = [];
    if (type==1){
      if (this.curRec.Code==""){
        fields = ["Name","eMail","CreditLimit","PayDeal","VATCode","Mobile"];
      }
    }
    
    for (let i=0;i<fields.length;i++){
      if ($(".editfield." + fields[i] + " input").val()=="" || $(".editfield." + fields[i] + " input").val()=="0.00"){
        $(".editfield." + fields[i]).addClass("mandatory");
      }
    }
  }

  this.CreateAttachRow = function(attach,type){
    var self = this;
    let res = $("<div class='attach_row'><div class='attach_name'>" + attach["name"] + "</div><div class='attach_remove'></div></div>");
    $(res).find(".attach_remove").click(function(){
      $.get("/WebManagersUpdatingAction.hal?action=removefile&type=" + type + "&id=" + attach["id"] + "&recid=" + attach["recid"],function(){
        $(res).remove();
      });
    });
    $(res).find(".attach_name").click(function(e){
      self.DownloadFile(e,type,attach["id"],attach["recid"]);        
    });
    return res;
  }

  this.CreateAttachUpload = function(type){
    let self = this;
    let res = $("<div class='fileupload'><input type='file' multiple><div class='do_upload'>Upload</div></div>");
    let recid = this.GetRecordID(type);
    id = type + "." + recid;
    let func = function(){
      self.OpenRecord(null,type,recid);
    }
    let file = $(res).find("input");
    $(res).find(".do_upload").click(function(){
      var test = new FileUpload($(file).parent().parent(),$(file).get(0),"webmanagers",id,func,null);
    });

    return res;
  }

  this.DisplayRecordAttachments = function(window,field,type){
    let self = this;
    let attachlist = $(".attachlist");
    if ($(attachlist).length>0) {
      $(attachlist).append(self.CreateAttachUpload(type));
      for (let i=0;i<field.length-1;i=i+1){//last element is a dummy element
        $(attachlist).append(self.CreateAttachRow(field[i],type));
      }
    }
  }  

  this.ShowRecordWindow = function(type){
    var self = this;
    switch (type) {
      case 0: win = GetOrderWindow();    break;
      case 1: win = GetCustomerWindow(); break;
      case 6: win = GetQTWindow(); break;
    }
    this.ShowWindow(win,type);
    
    for (let i in this.curRec){
      if (i=="Attachments") {
        this.DisplayRecordAttachments(win.window,this.curRec[i],type);
      } else {
        this.SetWindowField(win.window,i,type,true);
      }
    }
    if (type==0) {
      this.curRec.PasteExcel = "";
      this.SetWindowField(win.window,"PasteExcel",type,true);
    }
    self.MarkMandatoryField(type);
    
    $(".addline").click(function(){
      let tmpl = $(".matrix_frame .matrix_templ .matrix_line.stp_1").clone();
      $(".matrix_body").append(tmpl);
      self.AddMatrixRowActions(win.window,tmpl,type);

    });
    
  
  }
  this.SetPasteSpecialField = function(input,window,mf,ismatfieldf,type){
    var self = this;
    let ps = $(input).attr("ps");
    switch (ps){
      case "date":
        //if ($(input).get(0).hasAttribute("ReadOnly")==false){
          $(input).datepicker({
            dateFormat: 'yy-mm-dd',
            firstDay:1,
            beforeShow: function(i) { 
                          if ($(i).attr('readonly')) { return false; } 
                        }
          });  
        //}
        break;
      case "phone":
        $(input).keyup(function(e){
          this.value = this.value.replace(/[^\+? ?0-9]/g, '');
        });
        break;
      case "email":
        $(input).on("change blur",function(e){
          if (CheckEmail(this.value)==false){
            $(this).focus();
            $(this).addClass("error");
          } else {
            $(this).removeClass("error");
          }
        });
        break;
      default:
        let p = $(input).parent();
        $(input).css("display","none");
        let v = $(input).val();
        $(p).append("<select></select>");//.remove(this);
        let s = $(p).find("select");
        if ($(input).get(0).hasAttribute("defreadonly")){
          $(s).attr("Disabled","true");
          $(s).attr("defreadonly","");
          
        }
        if ($(input).get(0).hasAttribute("ps_multi")){
          $(s).attr("multiple","");
        }
        $(s).attr("fn",$(input).attr("fn"));
        this.SetFieldWindowActions(window,s,mf,ismatfieldf,type);

        if (ps=="customers" || ps=="items"){
          $(s).append("<option value='" + v + "'>" + v + "</option>");
          $.each(v.split(","), function(i,e){
              $(s).find("option[value='" + e + "']").prop("selected", true);
          });          
          $(s).ajaxChosen({
              type: 'GET',
              url: "/WebManagersAction.hal?action=getps&ps=" + ps,
              dataType: 'json'
          }, function (data) {
              var results = [];

              $.each(data, function (i, val) {
                  results.push({ value: val.value, text: val.text });
              });

              return results;
          });
      
        } else {
          $(s).chosen().on('chosen:showing_dropdown', function(e) {
            if (ps=="bank") {
              var chosenElement = $(e.currentTarget.nextSibling);
              $(chosenElement).find(".chosen-drop").css("width","500px");
              $(chosenElement).find(".chosen-results li").each(function(){
                let ind = parseInt($(this).attr("data-option-array-index"));
                if (ind>0) {
                  let opt = self.PSList[ps].options[ind]
                  let pos = opt.text.indexOf(" - ");
                  let tstr = opt.text.substr(-(opt.text.length-pos));
                  $(this).html($("<span style='width:90px;display:inline-block'>" + opt.value + "</span><span>" + tstr + "</span>"));
                }
              });
            }
          });
          //implement a more general solution if new fields with this is needed
          $(document).on('keyup', '.AccOperator .chosen-search input', function() {
            let drop = $(this).closest(".editfield").find(".chosen-drop");
            $(drop).css("width","500px");
            $(drop).find(".chosen-results li").each(function(){
              let ind = parseInt($(this).attr("data-option-array-index"));
              if (ind>0) {
                let opt = self.PSList["bank"].options[ind]
                $(this).html($("<span style='width:90px;display:inline-block'>" + opt.value + "</span><span>" + opt.text + "</span>"));
              }
            });
        })
          if (self.PSList[ps]){
            for (i=0;i<self.PSList[ps].options.length;i++){
              $(s).append("<option value='" + self.PSList[ps].options[i].value + "'>" + self.PSList[ps].options[i].text + "</option>");
            }
            $.each(v.split(","), function(i,e){
              $(s).find("option[value='" + e + "']").prop("selected", true);
            });          
            $(s).trigger("chosen:updated");
          } else {
            $.get("/WebManagersAction.hal?action=getps&ps=" + ps,function(data){
              let js = jQuery.parseJSON(data);
              self.PSList[ps] = {};
              self.PSList[ps].options = [];
              self.PSList[ps].active = true;
              for (i=0;i<js.length;i++){
                $(s).append("<option value='" + js[i].value + "'>" + js[i].text + "</option>");
                self.PSList[ps].options.push({value:js[i].value,text:js[i].text});
              }
              $.each(v.split(","), function(i,e){
                  $(s).find("option[value='" + e + "']").prop("selected", true);
              });          
              $(s).trigger("chosen:updated");
            });
          }
        }
        break;
    }  
  }
  
  this.AddMatrixRowActions = function(window,tmpl,type,showmenu=true){
    var self = this;
    $(tmpl).find("input").each(function(){
      if ($(this).closest(".copyrow").length==0 && $(this).closest(".matrix_remove").length==0){
        let mat_inp = this;
        let fn = $(mat_inp).attr("fn");
        if (showmenu){
          self.SetFieldWindowActions(window,mat_inp,fn,true,type);
          if ($(mat_inp).get(0).hasAttribute("defreadonly")==false){
            $(mat_inp).removeAttr("ReadOnly");
          }
        } else {
          $(mat_inp).attr("ReadOnly","");
        }
        if ($(mat_inp).get(0).hasAttribute("ps")){
          self.SetPasteSpecialField(mat_inp,window,fn,true,type);
        }
        $(this).on('keyup', function(e) {
      
          HandleMatrixNavigation(this,e.which,e);
        });
        if (fn=="Quant" && type!=6){
          self.SetItemEditable(this);
        }
      }
    });
  }
  
  this.SetItemEditable = function(field){
    var res = true;
    var item = $(field).closest(".matrix_line").find(".matrix_field.ArtCode select").val();
    $.get("./WebManagersAction.hal?action=iseditableitem&item=" + item,function(data){
      if ($(data).attr("res")=="0"){
        res = false;
      }
      if (!res){
        $(field).attr("ReadOnly","");
      }
    });
  }
    
  this.SetContextMenuActions = function(window,rw,i,type){
    var self = this;
    $(rw).find(".context_icon").click(function(){
      var cm = $(this).next();
      $(cm).toggleClass("active");
      $(".context_menu.active").not(cm).removeClass("active");
    });
    $(rw).find(".addlinebelow").click(function(){
      let tmpl = $(".matrix_frame .matrix_templ .matrix_line.stp_1").clone();
      $(tmpl).insertAfter(rw);
      self.AddMatrixRowActions(window,tmpl,type);
      $(".context_menu.active").removeClass("active");
    });
    $(rw).find(".addsubtotal").click(function(){
      self.DoRemoteWAction(window,null,"addsubtotal",i+1,type);
      $(".context_menu.active").removeClass("active");
    });
    $(rw).find(".addheader").click(function(){
      self.DoRemoteWAction(window,null,"addheader",i+1,type);
      $(".context_menu.active").removeClass("active");
    });
    $(rw).find(".copyrow input").keypress(function(e){
      if(e.which == 13) {
        $(rw).find(".copyrow_do").click();
      }
    });
    
    $(rw).find(".copyrow_do").click(function(){
      //copy row option from window
      let inp = $(this).closest(".copyrow").find("input");
      if ($(inp).length>0){
        if (parseInt($(inp).val())>0){
          self.DoRemoteWAction(window,null,"copyrow",i,type,$(inp).val());
        }
      }
      $(".context_menu.active").removeClass("active");
    });
    $(rw).find(".deleterow").click(function(){
      self.DoRemoteWAction(window,null,"deleterow",i,type);
      $(".context_menu.active").removeClass("active");
      //update record totals
    });
  
  }
  
  this.GetSelectedRemoveRows = function(){
    var i = 0;
    res = [];
    $(".matrix_body .matrix_line .matrix_remove input").each(function(){
      if ($(this).is(":checked")){
        res.push(i);
      }
      i++;
    });
    res = res.reverse();
    return res.join(",");  
  }
  
  this.SetRowRemoveActions = function(window,type){
    var self = this;
    $(".matrix_remove_head input").unbind("change");
    $(".matrix_remove_head .remove_icon").unbind("click");

    $(".matrix_remove_head input").change(function(){
      var nval = $(this).is(":checked");
      $(".matrix_body .matrix_line .matrix_remove input").each(function(){
        if (nval){
          $(this).prop('checked',true);
        } else {
          $(this).prop('checked',false);
        }
      });
    });
    $(".matrix_remove_head .remove_icon").click(function(){
      var r = self.GetSelectedRemoveRows();
      if (r!="" && confirm(man_lab["DeleteMessage"])){
        self.DoRemoteWAction(window,null,"deleterows",-1,type,self.GetSelectedRemoveRows());
      }
    });
  }
  this.RestrictEdit = function(){
    let res = false;
    
    if (this.curRec.hasOwnProperty("OKFlag") && this.curRec.OKFlag=="1") {
      res = true;
    }
    if (this.curView==6 && this.curRec.Closed=="1") {
      res = true;
    }
    return res;
  }
  
  this.SetWindowField = function(window,fn,type,openf){
    var self = this;
    if (fn=="Rows"){
      //deal with rows
      let showmenu = true;
      if (this.curRec.hasOwnProperty("OKFlag") && this.curRec.OKFlag=="1"){
        showmenu = false;
      }
      let matrix = $(".matrix_frame .matrix_body");
      $(matrix).html("");
      for (let i=0;i<this.curRec.Rows.length;i++) {
        let tmpl = $(".matrix_frame .matrix_templ .matrix_line.stp_" + this.curRec.Rows[i].stp).clone();
        $(matrix).append(tmpl);
        for (let mf in this.curRec.Rows[i]){
          let mfv = this.curRec.Rows[i][mf];
          let mat_inp = $(tmpl).find(".matrix_field." + mf + " input");
          if (mat_inp.length>0){
            $(mat_inp).val(mfv);
/*
            self.SetFieldWindowActions(window,mat_inp,mf,i,type);
            if ($(mat_inp).get(0).hasAttribute("ps")){
              self.SetPasteSpecialField(mat_inp,window,mf,i,type);
            }
*/
          }
        }
        self.AddMatrixRowActions(window,tmpl,type,showmenu);
        if (showmenu){
          this.SetContextMenuActions(window,tmpl,i,type);
        }
      }
      if (showmenu){
        this.SetRowRemoveActions(window,type);
      }
    } else {
      $(".editfield." + fn + " input[type='text']").each(function(){
        if (self.RestrictEdit()){
          $(this).attr("ReadOnly","");
        } else {
          if ($(this).get(0).hasAttribute("defreadonly")==false){
            $(this).removeAttr("ReadOnly");
          }
        }
      
        $(this).val(self.curRec[fn]);
        if (openf){
          self.SetFieldWindowActions(window,this,fn,false,type);
          if ($(this).get(0).hasAttribute("ps")) {
            self.SetPasteSpecialField(this,window,fn,false,type);
          }      
        }
      });
      $(".editfield." + fn + " textarea").each(function(){
        if (self.RestrictEdit()){
          $(this).attr("ReadOnly","");
        } else {
          if ($(this).get(0).hasAttribute("defreadonly")==false){
            $(this).removeAttr("ReadOnly");
          }
        }
      
        $(this).val(self.curRec[fn]);
        if (openf){
          self.SetFieldWindowActions(window,this,fn,false,type);
        }
      });
      $(".checkbox." + fn + " input[type='checkbox']").each(function(){
        if (self.RestrictEdit() && fn!="OKFlag" && fn!="Closed"){
          $(this).attr("Disabled","");
        } else {
          $(this).removeAttr("Disabled","");
        }
        $(this).prop( "checked", self.curRec[fn]=="1" );      
        self.SetFieldWindowActions(window,this,fn,false,type);

      });
      $(".radiobutton." + fn).each(function(){
        $(this).find("[value='" + self.curRec[fn] + "']").prop( "checked",true );      
        self.SetFieldWindowActions(window,this,fn,false,type);

      });
      $(".editfield." + fn + " select").each(function(){
        let sel = this;
        $.each(self.curRec[fn].split(","), function(i,e){
            $(sel).find("option[value='" + e + "']").prop("selected", true);
        });          

        if (self.RestrictEdit()){
          $(this).attr("Disabled","");
        } else {
          if ($(this).get(0).hasAttribute("defreadonly")==false){
            $(this).removeAttr("Disabled");
          }
        }

        if (openf){
          //self.SetFieldWindowActions(window,this,fn,-1,type);
        } else {
        }
        $(this).trigger("chosen:updated");
      });
     }
  }
  
  this.ExplodeRecordRows = function(rec){
    if (rec.Rows){
      for (let i=0;i<rec.Rows.length;i++) {
        for (let fn in rec.Rows[i]){
          rec["Rows_" + i + "_" + fn] = rec.Rows[i][fn];
        }
      }
      delete rec.Rows;
    }
  }
  
  this.DoRemoteWAction = function(window,el,fn,rw,type,arg1=""){
    var self = this;
    if (type==-1){//for browse windows
      this.SetPage(0);
    } else {
      self.record_changed = true;
      $(window).closest(".window_pop").find(".record_save").addClass("active");
      if ($(el).closest(".editfield").hasClass("mandatory")){
        if ($(el).val()!=""){
          $(el).closest(".editfield").removeClass("mandatory");
        }
      }
      let rec = self.GetWindowRecord();
      this.waction_in_progress = true;
      $.ajax({
        method:"POST",
        url:"/WebManagersAction.hal?action=waction&type=" + type + "&field=" + fn + "&rw=" + rw + "&arg1=" + arg1,
        data:rec,
        success:function(data){
          let js = jQuery.parseJSON(data);
          switch (fn) {
            case "DeleteRecord":
              if (js.success=="1"){
                $(".window_pop").remove();
                switch (self.curView) {
                  case 0:
                    self.GetOrders();
                    break;
                  case 6:
                    self.GetQTs();
                    break;
                }
              }
              break;
            case "CreateOrder":
              if (js.ordernr!="-1"){
                $(".window_pop").remove();
                self.GetQTs();
                self.OpenRecord(null,0,js.ordernr);
              }
              break;
            default:
              self.curActiveRow = $(self.activeField).closest(".matrix_line").index()+1;
              self.curActiveField = $(self.activeField).closest(".matrix_field").index()+1;
              let scrolltop = $(".matrix_frame").scrollTop();
              self.FillRecordData(js);
              for (let i in self.curRec){
                self.SetWindowField(window,i,type,false);
              }
              if (self.curRec.hasOwnProperty("PasteExcel")){
                self.curRec.PasteExcel = "";
                self.SetWindowField(window,"PasteExcel",type,false);
              }
              $(".matrix_frame").scrollTop(scrolltop);
              if (rw>-1){
                $(".matrix_body .matrix_line:nth-child(" + self.curActiveRow + ")  .matrix_field:nth-child(" + self.curActiveField  + ") input").focus(); 
              }
              if (fn=="CopyRecord"){
                self.MarkMandatoryField(type);
              }
          }
          self.waction_in_progress = false;
        }
      });
    }  
  }

  this.GetMatrixRowIndex = function(el,ismatfieldf){
    let res = -1;

    if (ismatfieldf) {
      res = $(el).closest(".matrix_line").index();
    }
    
    return res;
  }
  
  this.SetFieldWindowActions = function(window,el,fn,ismatfieldf,type){
    var self = this;
    $(el).unbind("change");
    $(el).unbind("focus");
    $(el).change(function(){
      self.DoRemoteWAction(window,el,fn,self.GetMatrixRowIndex(el,ismatfieldf),type);
    });
    $(el).focus(function(){
      self.activeField = el;
      if (ismatfieldf) {
        if ($(el).attr("fn")!="Spec") {
          $(this).select(); 
        };
      }
    });
  }
  
  this.GetWindowRecord = function(){
    var self = this;
    for (let i in this.curRec){
      if (i=="Rows"){
        this.curRec.Rows = [];
        $(".matrix_frame .matrix_body .matrix_line").each(function(){
          let row = {}
          $(this).find("input").each(function(){
            row[$(this).attr("fn")] = $(this).val();
          });
          $(this).find("select").each(function(){
            row[$(this).attr("fn")] = $(this).val();
          });
          
          self.curRec.Rows.push(row);
        });
        self.curRec.RowCnt = self.curRec.Rows.length;
      } else {
        if ($(".editfield." + i + " select").length>0) {
          this.curRec[i] = $(".editfield." + i + " select").val();          
          if (typeof $(".editfield." + i + " select").chosen().val() === 'object' && $(".editfield." + i + " select").chosen().val()!=null){
            this.curRec[i] = $(".editfield." + i + " select").chosen().val().join(",");
          }
        } else if ($(".editfield." + i + " input[type='text']").length>0) {
          this.curRec[i] = $(".editfield." + i + " input[type='text']").val();
        } else if ($(".checkbox." + i + " input").length>0) {
          this.curRec[i] = $(".checkbox." + i + " input").is(":checked")?"1":"0";
        } else if ($(".radiobutton." + i).length>0) {
          this.curRec[i] = $(".radiobutton." + i + " input:checked").val();
        } else if ($(".editfield." + i + " textarea").length>0){
          this.curRec[i] = $(".editfield." + i + " textarea").val();
        }
      }
    }
    let rec = { ...this.curRec };
    this.ExplodeRecordRows(rec);
    //let res = {json:JSON.stringify(rec)};

    return rec;
  }
  
  this.PrintRecord = function(e,type,id,type2=""){
    if (e){
      e.stopPropagation();
    }
    var iframe = $("<iframe src='/WebManagersUpdatingAction.hal?action=downloaddoc&id=" + id + "&type=" + type + "&type2=" + type2 + "'></iframe>");
    $(document.body).append(iframe);
    setTimeout(function(){$(iframe).remove()},3000);  
  }
  
  this.DownloadFile = function(e,type,id,recid){
    if (e){
      e.stopPropagation();
    }
    var iframe = $("<iframe src='/WebManagersAction.hal?action=downloadfile&id=" + id + "&type=" + type + "&recid=" + recid + "'></iframe>");
    $(document.body).append(iframe);
    setTimeout(function(){$(iframe).remove()},3000);
  
      
  }
  
  this.CheckLogin = function(){
    
    var self = this;
    setTimeout(function(){
      if (window_has_focus){
        $.get("./WebManagersAction.hal?action=checkloginstatus",function(data){
          if ($(data).attr("stat")=="1"){
            self.CheckLogin();
          } else {
            self.DisplayLogoutMessage();
          }
        }).fail(function() {
          self.CheckLogin();
        });
      } else {
        self.CheckLogin();
      }
    },5000);
  }
  
  this.DisplayLogoutMessage = function(){
    let wr = $("<div class='logout_back'><div class='logout_msg'><div class='logout_text'>" + man_lab["LogoutMsg"] + "</div><div class='login_btn'>" + man_lab["LoginBtn"] + "</div></div></div>");
    $(wr).find(".login_btn").click(function(){
      window.location.href = "/WebManagers.hal";
    });
    $(document.body).append(wr);
  
  }
  
  
  this.Init();
  this.CheckLogin();
}
