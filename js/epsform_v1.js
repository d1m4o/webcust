
function EPS_Form_validate()
{
   var n=document.forms["EPS_Form"]["rnd"].value;
   var i=0;
   for (i=0;i<=n;i++)
   {
	var valoda=document.forms["EPS_Form"]["language"].value;
	var x1=document.forms["EPS_Form"]["nos" + i].value;
	var x2=document.forms["EPS_Form"]["sel" + i].value;
	var y1=document.forms["EPS_Form"]["gar" + i].value;
	var y2=document.forms["EPS_Form"]["plat" + i].value;
	var y3=document.forms["EPS_Form"]["biez" + i].value;
	var y4=document.forms["EPS_Form"]["skaits" + i].value;
	var y5=document.forms["EPS_Form"]["kg" + i].value;
	if (((x2!="Granulas") && (valoda=="LAT")) || ((x2!="Гранулы") && (valoda=="RUS")) || ((x2!="Pellets") && (valoda=="ENG")))
 	{
 		if (y1!="" || y2!="" || y3!="" || y4!="")
 		{
			if (y1==null || y1=="")
			{
				if (valoda=="LAT")
					{
  					alert("Garums nav aizpildīts!");
  					}
 				if ((valoda=="RUS" || valoda=="ENG"))
					{
					alert("Length not specified!");
					}
				document.getElementById("gar" + i).focus();
			return false;
 			}
 			if (y2==null || y2=="")
			{
				if (valoda=="LAT")
 					{
					alert("Platums nav aizpildīts!");
					}
 				if ((valoda=="RUS" || valoda=="ENG"))
 					{
 					alert("Width not specified!");
					}
				document.getElementById("plat" + i).focus();
			return false;
			}
			if (y3==null || y3=="")
			{
				if (valoda=="LAT")
 					{
					alert("Biezums nav aizpildоts!");
 					}
 				if ((valoda=="RUS" || valoda=="ENG"))
					{
					alert("Thickness not specified!");
					}
				document.getElementById("biez" + i).focus();
			return false;
			}
			if (y4==null || y4=="")
 			{
				if (valoda=="LAT")
  					{
					alert("Plвtтu skaits nav aizpildоts!");
					}
				if ((valoda=="RUS" || valoda=="ENG"))
					{
 					alert("Number of plates not specified!");
  					}
				document.getElementById("skaits" + i).focus();
			return false;
			}
		}
	}
	if (((x2=="Granulas") && (valoda=="LAT")) || ((x2=="Гранулы") && (valoda=="RUS")) || ((x2=="Pellets") && (valoda=="ENG")))
	{
		if (y5==null || y5=="")
		{
			if (valoda=="LAT")
 			{
			alert("Kilogramu skaits nav aizpildīts!");
			}
			if ((valoda=="RUS" || valoda=="ENG"))
			{
			alert("Kilograms not specified!");
			}
			document.getElementById("kg" + i).focus();
		return false;
		}
	}
   }
return true;
}


function EPS_Form_onChange()
{
var n=document.forms["EPS_Form"]["rnd"].value;
var i=0;
var sumkvm;
var sumkg;
var sumkubm;

   for (i=0;i<=n;i++)
     {
       var valoda=document.forms["EPS_Form"]["language"].value;
       var x1=document.forms["EPS_Form"]["nos" + i].value;
       var x2=document.forms["EPS_Form"]["sel" + i].value;
       var y1=document.forms["EPS_Form"]["gar" + i].value;
       var y2=document.forms["EPS_Form"]["plat" + i].value;
       var y3=document.forms["EPS_Form"]["biez" + i].value;
       var y4=document.forms["EPS_Form"]["skaits" + i].value;
       var y5=document.forms["EPS_Form"]["kg" + i].value;

       // alert("x2 = " + x2 + ", valoda = " + valoda + ", y1 = " + y1 + ", y2 = " + y2 + ", y4 = " + y4);

       if (((x2!="Granulas") && (valoda=="LAT")) || ((x2!="Гранулы") && (valoda=="RUS")) || ((x2!="Pellets") && (valoda=="ENG")))
          {
            if (y1!="" && y2!="" && y4!="")
               {
                 document.forms["EPS_Form"]["kvm" + i].value=(y1/1000 * y2/1000 * y4);
                 sumkvm = sumkvm + (y1/1000 * y2/1000 * y4);
                }
            if (y1!="" && y2!="" && y3!="" && y4!="")
               {
                 document.forms["EPS_Form"]["kubm" + i].value=(y1/1000 * y2/1000 * y3/1000 * y4);
               }
            document.forms["EPS_Form"]["kg" + i].value="";
          }
       if (((x2=="Granulas") && (valoda=="LAT")) || ((x2=="Гранулы") && (valoda=="RUS")) || ((x2=="Pellets") && (valoda=="ENG")))
          {
            document.forms["EPS_Form"]["gar" + i].value="";
            document.forms["EPS_Form"]["plat" + i].value="";
            document.forms["EPS_Form"]["biez" + i].value="";
            document.forms["EPS_Form"]["skaits" + i].value="";
            document.forms["EPS_Form"]["kvm" + i].value="";
            document.forms["EPS_Form"]["kubm" + i].value="";
            document.forms["EPS_Form"]["skpak" + i].value="";
          }
     }

    document.getElementById("totkvm").value=sumkvm;
    
return true;
}


function EPS_Form_AddRows()
{
 if (document.getElementById("add_rows"))
    {
    document.getElementById("add_rows").value="true";
    }
}


function EPS_Form_DoNothing()
{
  if (document.getElementById("add_rows"))
    {
    document.getElementById("add_rows").value="true";
    }
}
