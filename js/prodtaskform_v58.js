
function ProdTask_Form_SplitRow(n)
{
  if (document.getElementById("split_row"))
    {
       document.getElementById("split_row").value = n;
    }
  if (document.getElementById("reg_uzd"))
    {
       document.getElementById("reg_uzd").value = "false";
    }
}

function ProdTask_Form_AddRow()
{
  var item = prompt("Ievadiet artikula kodu", "");
  if (document.getElementById("reg_uzd"))
    {
       document.getElementById("reg_uzd").value = "false";
    }
  if (item != null)
    {
        document.getElementById("add_row").value = item;
        document.forms["PT_Form"].submit();
    }    
}

function GetTotQty(n)
{
var sumqty = new Number(0);
var x1 = new Number(0);
var i = 0;
   for (i=0;i<n;i++)
     {
       x1 = document.getElementById("idqty" + i).value;
       sumqty = sumqty + Number(x1);
       if (sumqty.toFixed)
       {
          sumqty = Number(sumqty.toFixed(3));
       }
     }
return sumqty;
}

function ProdTask_Form_onChange()
{
var n = document.forms["PT_Form"]["rnd"].value;

   document.getElementById("idtotprodqty").value = GetTotQty(n);
   
return true;
}

function GetTotWeight(n)
{
var sumqty = new Number(0);
var x1 = new Number(0);
var i = 0;
   for (i=0;i<n;i++)
     {
       if (document.getElementById("idmervieniba" + i).value=="KG")
       {
          x1 = document.getElementById("idqty" + i).value;
          if (x1=="XX" || x1=="xx")
          {
             x1 = 0;
          }
          sumqty = sumqty + Number(x1);
          if (sumqty.toFixed)
          {
             sumqty = Number(sumqty.toFixed(3));
          }
       }
     }
return sumqty;
}

function ProdOrder_Form_onChange()
{
   var n = document.forms["PT_Form"]["rnd"].value;
   var x = document.getElementById("idmasas").value;

   document.getElementById("idtotsvars").value = GetTotWeight(n);
   
   if (document.getElementById("idmasas").value==1)
   {
      document.getElementById("idtotprodqty").value = document.getElementById("idtotsvars").value;
   }

return true;
}

function ProdOrder_RowType3_Change()
{
   var n  = document.forms["PT_Form"]["rnd"].value;
   var starttotprodquant = document.forms["PT_Form"]["starttotprodquant"].value;
   var totprodqty = document.forms["PT_Form"]["totprodqty"].value;
   
      for (i=0;i<n;i++)
        {
          x1 = document.getElementById("idwebrowtype" + i).value;
          x2 = i + 1;
          if (x1==3 && x2<n)
          {
           if (document.getElementById("idwebrowtype" + x2).value==4)
              {
                qty3 = document.getElementById("idqty" + i).value;
                qty4 = document.getElementById("idqty" + x2).value;
                if (qty3!=qty4)
                {
                   diff = qty3 - qty4;
                   document.getElementById("idqty" + x2).value = qty3;
                   document.forms["PT_Form"]["totprodqty"].value = Number(totprodqty) + diff;
                   i = n;
                }
              } 
              else
              {
                qty3 = document.getElementById("idqty" + i).value;
                qty4 = document.getElementById("idstartqty" + i).value;
                if (qty3!=qty4)
                {
                   diff = qty3 - qty4;
                   document.getElementById("idstartqty" + i).value = qty3;
                   document.forms["PT_Form"]["totprodqty"].value = Number(totprodqty) + diff;
                   i = n;
                }
              }
          }
        }
      
      totprodqty = document.forms["PT_Form"]["totprodqty"].value;
      proc = (totprodqty*100/starttotprodquant);

      for (i=0;i<n;i++)
        {
        if (document.getElementById("idwebrowtype" + i).value==2)
          {
             oldqty = document.getElementById("idoldqty" + i).value;
             x = oldqty*proc/100;
             document.getElementById("idqty" + i).value = x.toFixed(5);
          }
        }
        
return true;
}

function validateProdOrderForm()
{
  var n  = document.forms["PT_Form"]["rnd"].value;
  var x1 = document.forms["PT_Form"]["oldtotquant"].value;
  var x2 = document.forms["PT_Form"]["totprodqty"].value;
  var x3 = (x1-x2);
  var x4 = 0;
  var x5 = 0;
  var i = 0;
  var j = 0;
  var artikuls = [];
  var nosaukums = [];
  var qty1 = [];
  var qty2 = [];
  var RindaAktiva = [];
  var rowProc = 0;
  var totProc = 0;
  var starpiba = 0;
  var kluda = 0;
  var IzejvielasVeids = "";
  var starttotprodquant = document.forms["PT_Form"]["starttotprodquant"].value;
  var StartQtyDiffProc = (x2*100/starttotprodquant);

  if (document.getElementById("reg_uzd"))
    {
       if (document.getElementById("reg_uzd").value=="false")
       {
        return true;
       }
    }

      for (i=0;i<n;i++)
        {
          artikuls[i] = document.getElementById("iditemcodeX" + i).value;
          nosaukums[i] = document.getElementById("iditemname" + i).value;
          qty1[i] = document.getElementById("idqty" + i).value;
          qty2[i] = document.getElementById("idoldqty" + i).value;
          if (qty1[i] == null || qty1[i] == '')
          {
             qty1[i] = "0";
          }
          if (qty2[i] == null || qty2[i] == '')
          {
             qty2[i] = "0";
          }
          RindaAktiva[i] = 1;
          if (document.getElementById("idwebrowtype" + i).value==1)
          {
             //RindaAktiva[i] = 0;
          }
        }
        
      for (i=0;i<n;i++)
        {
          if (RindaAktiva[i]==1)
          {
             x4 = Number(parseFloat(qty1[i].replace(',','.')));
             x5 = Number(parseFloat(qty2[i].replace(',','.')));
             RindaAktiva[i] = 0;
             for (j=0;j<n;j++)
             {
                if (artikuls[i]==artikuls[j] && RindaAktiva[j]==1)
                {
                   x4 = x4 + Number(parseFloat(qty1[j].replace(',','.')));
                   x5 = x5 + Number(parseFloat(qty2[j].replace(',','.')));
                   RindaAktiva[j] = 0;
                }
             }
             rowProc = document.getElementById("idrowProc" + i).value;
             x5 = x5*StartQtyDiffProc/100;
             starpiba = x4 - x5;
             if (Number(starpiba)<0)
                {
                   starpiba=-starpiba;
                }
                starpiba = starpiba.toFixed(5);
                kluda = x5*rowProc/100;
                kluda = kluda.toFixed(5);
                if (Number(starpiba)>Number(kluda))
                {
                   alert('Pārāk liela daudzuma starpība! Artikuls: ' + nosaukums[i] + ', daudzums ' + x4 + ', sākotnējais daudzums ' + x5 + ', starpība ' + starpiba + ', pieļaujamā starpība ' + rowProc + '%');
                   return false;
                }
          }
        }
      for (i=0;i<n;i++)
        {
          arw = document.getElementById("idarw" + i).value;
          partija = document.getElementById("idpart" + i).value;
          x4 = document.getElementById("idqty" + i).value;
          IzejvielasVeids = document.getElementById("idIzejvielasVeids" + i).value;
          rinda = i;
          rnd = Number(rinda) + 1;
          if (arw>0 && partija=="" && x4>0 && IzejvielasVeids=="0")
          {
           alert('Rinda: ' + rnd + ', nav norādīts partijas numurs!');
           return false;
          }
        }
  if (document.forms["PT_Form"]["kontroletsvaru"].value==1)
  {
    totProc = document.getElementById("idtotProc").value;
    if (totProc==0)
      {
       totProc = 0;
      }
    
    x3 = x3.toFixed(5);
    kluda = x1*totProc/100;
    kluda = kluda.toFixed(5);
    if (Number(x3)<0)
      {
       x3=-x3;
      }
    if (Number(x3)>Number(kluda))
      {
      alert('Pārāk liela daudzuma starpība gatavajam produktam! Daudzums: ' + x2 + ', sākotnējais daudzums ' + x1 + ', starpība ' + x3 + ', pieļaujamā starpība ' + totProc + '%');
      return false;
      }
  }
  
  return true;
      
}

function ProdOrder_totprodqty_Change()
{
   var n  = document.forms["PT_Form"]["rnd"].value;
   var starttotprodquant = document.forms["PT_Form"]["starttotprodquant"].value;
   var totprodqty = document.forms["PT_Form"]["totprodqty"].value;
   var proc = (totprodqty*100/starttotprodquant);
   var x1 = 0;

      for (i=0;i<n;i++)
        {
          oldqty = document.getElementById("idoldqty" + i).value;
          x1 = oldqty*proc/100;
          x1 = x1.toFixed(5);
          document.getElementById("idqty" + i).value = x1;
        }
        
   document.getElementById("idtotsvars").value = GetTotWeight(n);

return true;
}
