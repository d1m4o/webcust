
function validateSM_Form()
   {      
     if (document.getElementById("idItemUpdate").value == "true")
     {
        return true;
     }
     
     if (document.getElementById("idproduct").checked == false && document.getElementById("idmaterial").checked == false)
       {
        alert('Nav norādīts darbības veids.');
        return false;
       }
        
     if (document.getElementById("idproduct").checked == true && document.getElementById("idProdOrdSerNr").value == "")
       {
        alert('Nav norādīts ražošanas pasūtījuma numurs.');
        return false;
       }
       
     if (document.getElementById("idProdOrderRequest").value == "true")
     {
        return true;
     }

     if (document.getElementById("iditemwithserialnr").value == 'true' && document.getElementById("idserialnr").value == "")
       {
        alert('Nav norādīts artikula sērijas numurs.');
        return false;
       }

     qty = document.getElementById("idqty").value;
     if (Number(qty)<=0 || isNaN(Number(qty)))
       {
        alert('Nav norādīts daudzums.');
        return false;
       }
   }
