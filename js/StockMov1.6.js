$(document).ready(function(){
     
  $('.doItemUpdate').change(function(){
      var itemcode = document.getElementById("iditem").value;
      var serialnr = document.getElementById("idserialnr").value;
      var noliktava1 = document.getElementById("idnoliktava1").value;
      var noliktava2 = document.getElementById("idnoliktava2").value;
      //alert('FormReload/artikuls = ' + itemcode);
        
      document.getElementById("doStore").value = "false";
      document.getElementById("idItemUpdate").value = "true";
      $('#FormReload').submit();
  });

  $('.doUpdate').change(function(){
      var itemcode = document.getElementById("iditem").value;
      var serialnr1 = document.getElementById("idserialnr").value;
      var serialnr = "";
      var noliktava1 = document.getElementById("idnoliktava1").value;
      var noliktava2 = document.getElementById("idnoliktava2").value;
    
      //alert('artikuls = ' + itemcode + ', serialnr1 = ' + serialnr1);

      for (var i = 0; i < serialnr1.length; i++)
      {
          if (serialnr1.charAt(i).trim()=='')
             {
              i = serialnr1.length;
             }
             else
             {
              if (serialnr1.charAt(i).trim()=='#')
                 {
                 serialnr = serialnr + ' ';
                 }
                else
                 {
                 serialnr = serialnr + serialnr1.charAt(i);
                 }
               //alert('serialnr = /' + serialnr + '/');
             }
      }

      //alert('artikuls = ' + itemcode + ', serialnr = ' + serialnr + ', noliktava1 = ' + noliktava1 + ', noliktava2 = ' + noliktava2);

      var llink = "WebGetItemValues.hal?itemcode=" + itemcode+ "&serialnr=" + serialnr + "&noliktava1=" + noliktava1 + "&noliktava2=" + noliktava2;
      $.get(llink, function(data){
         var arr = data.split(",");

         if (arr.length==6)
             { 
             if (arr[5]=="3")
                {
                document.getElementById("iditemname").innerHTML = arr[0];
                document.getElementById("idlocname1").innerHTML = arr[1];
                document.getElementById("idlocname2").innerHTML = arr[2];
                document.getElementById("idloc1qty").innerHTML = arr[3];
                document.getElementById("idloc2qty").innerHTML = arr[4];
                //document.getElementById("idqty").value = arr[3];
                }
              else
                {
                 $('#FormReload').submit();
                }
             }
           else
           {
               alert('Komunikācijas kļūda!');
               return false;
           }
      });
  });

  $('.RequestButton').click(function(){      
      document.getElementById("idProdOrderRequest").value = "true";
      $('#ProdOrdValues').submit();
  });

   $('#idmaterial').change(function(){
     document.getElementById("idmaterial").checked = true;
     document.getElementById("idproduct").checked = "";  
   });

   $('#idproduct').change(function(){
     document.getElementById("idmaterial").checked = "";
     document.getElementById("idproduct").checked = true;
   });

   $('#FormReload').submit(function(){
     document.getElementById("idProdOrdSerNr2").value = document.getElementById("idProdOrdSerNr").value;
     document.getElementById("idproduct2").value = document.getElementById("idproduct").checked;
     document.getElementById("idmaterial2").value = document.getElementById("idmaterial").checked;
   });

});
