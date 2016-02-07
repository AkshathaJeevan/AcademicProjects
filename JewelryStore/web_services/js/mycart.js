

$(document).ready( function()
 {  
  var bad=0;  

    $('[name="card_type"]').on('change', check_card_type);
    $('[name="card_type"]').on('blur', check_card_type);
    
    $('#card_no').on('blur', check_card_no);
      
    $('[name="b_fname"]').on('blur', check_b_fname);
    $('[name="b_lname"]').on('blur', check_b_lname);
    $('[name="b_address1"]').on('blur', check_b_address);
    $('[name="b_city"]').on('blur', check_b_city);
    $('[name="b_zip"]').on('blur', check_b_zip);
    $('[name="b_phone"]').on('blur', check_b_phone);

    $('[name="s_fname"]').on('blur', check_s_fname);
    $('[name="s_lname"]').on('blur', check_s_lname);
    $('[name="s_address1"]').on('blur', check_s_address);
    $('[name="s_city"]').on('blur', check_s_city);
    $('[name="s_zip"]').on('blur', check_s_zip);
    $('[name="s_phone"]').on('blur', check_s_phone);

   $('[name="b_fname"]').on('change', function(){
		if ($('#same_addr').is(':checked'))
		{ $('#s_fname').val($('#b_fname').val());} 
	});

   $('[name="b_lname"]').on('change', function(){
                if ($('#same_addr').is(':checked'))
                { $('#s_lname').val($('#b_lname').val());}
        });

   $('[name="b_address1"]').on('change', function(){
                if ($('#same_addr').is(':checked'))
                { $('#s_address1').val($('#b_address1').val());}
        });

   $('[name="b_address2"]').on('change', function(){
                if ($('#same_addr').is(':checked'))
                { $('#s_address2').val($('#b_address2').val());}
        });

   $('[name="b_city"]').on('change', function(){
                if ($('#same_addr').is(':checked'))
                { $('#s_city').val($('#b_city').val());}
        });

   $('[name="b_zip"]').on('change', function(){
                if ($('#same_addr').is(':checked'))
                { $('#s_zip').val($('#b_zip').val());}
        });

   $('[name="b_phone"]').on('change', function(){
                if ($('#same_addr').is(':checked'))
                { $('#s_phone').val($('#b_phone').val());}
        });

   $('[name="b_statesdropdown"]').on('change', function(){
                if ($('#same_addr').is(':checked'))
                { $('#s_statesdropdown').val($('#b_statesdropdown').val());}
        });

    $('#same_addr').on('click', function()
	{  if (this.checked)
		{
		 $('#s_fname').val($('#b_fname').val());
		 $('#s_lname').val($('#b_lname').val());
		 $('#s_address1').val($('#b_address1').val());
		 $('#s_address2').val($('#b_address2').val());
		 $('#s_city').val($('#b_city').val());
		 $('#s_zip').val($('#b_zip').val());
		 $('#s_phone').val($('#b_phone').val());
		 $('#s_statesdropdown').val($('#b_statesdropdown').val());

		 $('#s_fname').attr('disabled','disabled');
		 $('#s_lname').attr('disabled','disabled');
		 $('#s_address1').attr('disabled','disabled');
		 $('#s_address2').attr('disabled','disabled');
		 $('#s_city').attr('disabled','disabled');
		 $('#s_zip').attr('disabled','disabled');
		 $('#s_phone').attr('disabled','disabled');
		 $('#s_statesdropdown').attr('disabled','disabled');

		}
		else
		 {
		$('#s_fname').removeAttr('disabled');
		$('#s_lname').removeAttr('disabled');
		$('#s_address1').removeAttr('disabled');
		$('#s_address2').removeAttr('disabled');
		$('#s_city').removeAttr('disabled');
		$('#s_zip').removeAttr('disabled');
		$('#s_phone').removeAttr('disabled');
		$('#s_statesdropdown').removeAttr('disabled');

		 $('#s_fname').val("");
                 $('#s_lname').val("");
                 $('#s_address1').val("");
                 $('#s_address2').val("");
                 $('#s_city').val("");
                 $('#s_zip').val("");
                 $('#s_phone').val("");
		}
	});

function preview_order()
{

	var cart = new shopping_cart("jadrn021");
    var cartArray = cart.getCartArray();
	var amount = 0;
        var toWrite ="<div>";
	toWrite += "<div id='preview_left'>";
	toWrite += "<span id='customer'><span class='makewhite'>Shipping To: </span>"+$('#s_fname').val()+" "+$('#s_lname').val()+" <br/><span class='makewhite'> Shipping At:</span> <br/>"+ $('#s_address1').val()+" "+$('#s_address2').val()+"<br/>"+$('#s_city').val()+" "+$('#s_statesdropdown').val()+"- "+$('#s_zip').val()+"</span>";
	toWrite +="<table id='preview_table'>";
        toWrite += "<tr><th> Product</th><th>Quantity</th><th>Price</th></tr>";
        for(i=0; i < cartArray.length; i++) {
            toWrite += "<tr>";
	    toWrite += "<td class='choconame'>"+cartArray[i][0]+"</td>";

	      var res = cartArray[i][0].split("(");
	      res[1] = res[1].replace(/[)]/g,'')
            toWrite += "<td>"+cartArray[i][1]+"</td>";
            toWrite += "<td>"+cartArray[i][2]+"</td>"; 
            toWrite += "</tr>";
	    amount = amount + parseFloat(cartArray[i][2],10);
            }
       
       var  amount1 = amount.toFixed(2);	
	 toWrite += "</table>";
	var cartsize = cart.size();
	var shippingcost = cartsize * 5;
        var taxcost = amount1 * 0.08; 
	
	var taxamount = taxcost + shippingcost + amount;
	taxamount = taxamount.toFixed(2);
	toWrite += "<span class='preview_total'><br/> <strong> Tax Amount Applied&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;: <span class='makewhite'>$"+taxcost.toFixed(2) +" </span></strong>";
	toWrite += "<br/> <strong >Shipping Cost (5 Dollars Each)&nbsp;&nbsp;: <span class='makewhite'>$" +shippingcost +"</span></strong>";
	toWrite += "<br/> <strong> Grand Total (Tax + Shipping) &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span class='makewhite'>$"+taxamount + "</span></strong></span>";
	toWrite +="</div><div id='preview_right'><img src='/jadrn019/css/jew7.jpg' id='girl' alt='Girl Buying' /></div></div>";
$('#preview_order').html (toWrite);
         $("#dialog-modal1").dialog('open');

}

   $('#cancelling').on('click',function(){
	  $("#dialog-modal1").dialog('close');
	})

   $('form[name=preview]').bind('submit', function(e)
        {
		deleteAllCookies();
	})

    $('form[name=order]').bind('submit', function(e) 
	{

	e.preventDefault();
	if(validateForm())
	{
       $(this).find(':input').removeAttr('disabled');
	$("#dialog-modal").dialog('close');
	preview_order();
	}
    });
 
   $(':reset').on('click', function(e) {  
        $('form input').text("");
        $('.error' ).text("");
        $('#errMsg').text(""); 
        $('form input' ).css( "border", "1px solid black" );
        $('form input' ).css( "background", "white" );
   	document.order.card_type.style.border='1px solid black';
	document.order.card_type.style.background = "white";

   });      
   
});

function deleteAllCookies()
 {
 //alert("In delete cookie method");
 var c = document.cookie.split("; ");
 for (i in c) 
  document.cookie =/^[^=]+/.exec(c[i])[0]+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT";    
}

function validateForm()
{

if (check_card_type())
{ 
	if(check_card_no())
	{
	 if (check_b_fname())
	{ if (check_b_lname())
	{ if (check_b_address())
	 {if (check_b_city())
	 {if (check_b_zip())
	 {if (check_b_phone())
	 {if (check_s_fname())
         {if (check_s_lname())
         {if (check_s_address())
         {if (check_s_city())
         {if (check_s_zip())
         {if (check_s_phone())	
		{ if (check_date())
			{ 
			 return true;}
		  else
			{
				$('#daydropdown').focus();
			}
       		}
	 else
        {
        $('#s_phone').focus();
        }
        }
        else
        {
        $('#s_zip').focus();
        }
        }
        else
        {
        $('#s_city').focus();
        }        
        }
        else
        {
        $('#s_address1').focus();
        }  
 	 }
        else
        {
        $('#s_lname').focus();
        }
	 }
        else
        {
        $('#s_fname').focus();
        }
	 }
        else
        {
        $('#b_phone').focus();
        }

	 }
        else
        {
        $('#b_zip').focus();
        }
	}
        else
        {
        $('#b_city').focus();
        }
	}
        else
        {
        $('#b_address1').focus();
        }

	}
        else
        {
        $('#b_lname').focus();
        }
	}
	else
	{
        $('#b_fname').focus();
	}
        }
        else
        {
         $('#card_no').focus();
        }
}
else
{
	$('#card_type').focus();
//	return false;
}

return false;
 // check_date();

}




// 4. Function to check relationship with kid
function check_card_type()
{
if( document.order.card_type.value == "-1" )
   {
      document.getElementById("errMsg").innerHTML = " Select Card Type";
      document.order.card_type.style.border='1px solid red';
      document.order.card_type.style.background='#FFCCCC';
     	return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.order.card_type.style.border='1px solid black';
     document.order.card_type.style.background='white';
  	return true;
    }
}


function check_card_no()
{
   if( document.order.card_no.value == "" || isNaN( document.order.card_no.value) || document.order.card_no.value.length != 16 || document.order.card_no.value.indexOf(' ') >= 0 )
   {
        document.getElementById("errMsg").innerHTML = "Provide 16 Digits Card No";
        document.order.card_no.style.border='1px solid red';
        document.order.card_no.style.background='#FFCCCC';
        return false;
}
else
    {
        document.getElementById("errMsg").innerHTML = " ";
        document.order.card_no.style.border='1px solid black';
        document.order.card_no.style.background='white';
        return true;
         }
 }



// 5. Function to check Parent's Name
function check_b_fname()
{
if (document.order.b_fname.value == "")
      {
     	document.getElementById("errMsg").innerHTML = "Provide FirstName";
      	document.order.b_fname.style.border='1px solid red';
      	document.order.b_fname.style.background='#FFCCCC';
        return false;
     }
else if  (allLetter(document.order.b_fname) == false)
	{
		document.getElementById("errMsg").innerHTML = "Invalid Characters in Name";
      	document.order.b_fname.style.border='1px solid red';
      	document.order.b_fname.style.background='#FFCCCC';
      	return false;
	}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.b_fname.style.border='1px solid black';
     	document.order.b_fname.style.background='white';
    	return true;
   }
}

function check_b_lname()
{
if (document.order.b_lname.value == "")
      {
     	document.getElementById("errMsg").innerHTML = "Provide LastName";
      	document.order.b_lname.style.border='1px solid red';
      	document.order.b_lname.style.background='#FFCCCC';
        return false;
 }
else if  (allLetter(document.order.b_lname) == false)
	{
		document.getElementById("errMsg").innerHTML = "Invalid Characters in Name";
      	document.order.b_lname.style.border='1px solid red';
      	document.order.b_lname.style.background='#FFCCCC';
	return false;
}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.b_lname.style.border='1px solid black';
     	document.order.b_lname.style.background='white';
    	return true;
	 }
}

function check_b_address()
{
   if( document.order.b_address1.value == "" )
   {
	document.getElementById("errMsg").innerHTML = "Provide Address";
      	document.order.b_address1.style.border='1px solid red';
      	document.order.b_address1.style.background='#FFCCCC';
	return false;
	}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.b_address1.style.border='1px solid black';
     	document.order.b_address1.style.background='white';
    	return true;
	 }
}

function check_b_city()
{
   if( document.order.b_city.value == "" || (allLetterForCity(document.order.b_city) == false))
  {
		document.getElementById("errMsg").innerHTML = "Provide Valid City";
      	document.order.b_city.style.border='1px solid red';
      	document.order.b_city.style.background='#FFCCCC';
	return false;
	}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.b_city.style.border='1px solid black';
     	document.order.b_city.style.background='white';
	return true;
 }
}

function check_b_zip()
{
   if( document.order.b_zip.value == "" || isNaN( document.order.b_zip.value ) || document.order.b_zip.value.length != 5 || document.order.b_zip.value.indexOf(' ') >= 0  )
   {
		document.getElementById("errMsg").innerHTML = "Provide 5-Digit Zip Code";
      	document.order.b_zip.style.border='1px solid red';
      	document.order.b_zip.style.background='#FFCCCC';
	return false;
	}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.b_zip.style.border='1px solid black';
     	document.order.b_zip.style.background='white';
	return true;
  }
}



function check_b_phone()
{
   if( document.order.b_phone.value == "" || isNaN( document.order.b_phone.value) || document.order.b_phone.value.length != 10 || document.order.b_phone.value.indexOf(' ') >= 0 )
   {
	document.getElementById("errMsg").innerHTML = "Provide 10-Digit Phone";
      	document.order.b_phone.style.border='1px solid red';
      	document.order.b_phone.style.background='#FFCCCC';
	return false;
}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.b_phone.style.border='1px solid black';
     	document.order.b_phone.style.background='white';
    	return true;
	 }
 }
 
 
 ///////////////////////////// Shipping //////////////////////////////
 
 // 5. Function to check Parent's Name
function check_s_fname()
{
if (document.order.s_fname.value == "")
      {
     	document.getElementById("errMsg").innerHTML = "Provide FirstName";
      	document.order.s_fname.style.border='1px solid red';
      	document.order.s_fname.style.background='#FFCCCC';
        return false;
     }
else if  (allLetter(document.order.s_fname) == false)
	{
		document.getElementById("errMsg").innerHTML = "Invalid Characters in Name";
      	document.order.s_fname.style.border='1px solid red';
      	document.order.s_fname.style.background='#FFCCCC';
      	return false;
	}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.s_fname.style.border='1px solid black';
     	document.order.s_fname.style.background='white';
        return true;
   }
}

function check_s_lname()
{
if (document.order.s_lname.value == "")
      {
     	document.getElementById("errMsg").innerHTML = "Provide LastName";
      	document.order.s_lname.style.border='1px solid red';
      	document.order.s_lname.style.background='#FFCCCC';
        return false;    
 }
else if  (allLetter(document.order.s_lname) == false)
	{
		document.getElementById("errMsg").innerHTML = "Invalid Characters in Name";
      	document.order.s_lname.style.border='1px solid red';
      	document.order.s_lname.style.background='#FFCCCC';
	return false;	
}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.s_lname.style.border='1px solid black';
     	document.order.s_lname.style.background='white';
    	return true;
	 }
}

function check_s_address()
{
   if( document.order.s_address1.value == "" )
   {
	document.getElementById("errMsg").innerHTML = "Provide Address";
      	document.order.s_address1.style.border='1px solid red';
      	document.order.s_address1.style.background='#FFCCCC';
	return false;
	}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.s_address1.style.border='1px solid black';
     	document.order.s_address1.style.background='white';
    	return true;
	 }
}

function check_s_city()
{
   if( document.order.s_city.value == "" || (allLetterForCity(document.order.s_city) == false))
  {
		document.getElementById("errMsg").innerHTML = "Provide Valid City";
      	document.order.s_city.style.border='1px solid red';
      	document.order.s_city.style.background='#FFCCCC';
	return false;
	}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.s_city.style.border='1px solid black';
     	document.order.s_city.style.background='white';
	return true;    
 }
}

function check_s_zip()
{
   if( document.order.s_zip.value == "" || isNaN( document.order.s_zip.value ) || document.order.s_zip.value.length != 5 || document.order.s_zip.value.indexOf(' ') >= 0  )
   {
		document.getElementById("errMsg").innerHTML = "Provide 5-Digit Zip Code";
      	document.order.s_zip.style.border='1px solid red';
      	document.order.s_zip.style.background='#FFCCCC';
	return false;
	}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.s_zip.style.border='1px solid black';
     	document.order.s_zip.style.background='white';
	return true;   
  }
}



function check_s_phone()
{
   if( document.order.s_phone.value == "" || isNaN( document.order.s_phone.value) || document.order.s_phone.value.length != 10 || document.order.s_phone.value.indexOf(' ') >= 0 )
   {
	document.getElementById("errMsg").innerHTML = "Provide 10-Digit Phone";
      	document.order.s_phone.style.border='1px solid red';
      	document.order.s_phone.style.background='#FFCCCC';
	return false;
}
else
    {
     	document.getElementById("errMsg").innerHTML = " ";
     	document.order.s_phone.style.border='1px solid black';
     	document.order.s_phone.style.background='white';
    	return true;
	 }
 }
 


// 12. Restrict Characters 
function allLetter(inputtxt)  
{  
   var letters = /^[ A-Za-z'-.]+$/;  
   if(inputtxt.value.match(letters))  
     {  
      return true;  
     }  
   else  
     {    
     return false;  
     }  
  }  
  
function allLetterForCity(inputtxt)  
{  
   var letters = /^[ A-Za-z'-.]+$/;  
   if(inputtxt.value.match(letters))  
     {  
      return true;  
     }  
   else  
     {    
     return false;  
     }  
  } 
  

//14. Checking User has selected valid date
function check_date() 
{
    var day   = document.getElementById("daydropdown").value; 
    var month = document.getElementById("monthdropdown").value;
    var year  = document.getElementById("yeardropdown").value;

   if( (day == "Day") || (month == "Month") || (year == "Year"))
      {
          document.getElementById("errMsg").innerHTML="Pick Expiry Date";
          return false;
       }

    switch (month)
{
	case "January" :
        mon = '1';
        break;
    case "February":
        mon = '2';
        break;
    case "March":
        mon = '3';
        break;
    case "April" :
        mon = '4';
        break;
    case "May":
        mon = '5';
        break;
    case "June":
        mon = '6';
        break;
    case "July" :
        mon = '7';
        break;
    case "August":
        mon = '8';
        break;
    case "September":
        mon = '9';
        break;
    case "October" :
        mon = '10';
        break;
    case "November":
        mon = '11';
        break;
    case "December":
        mon = '12';
        break;
}
 
    var checkDate = new Date(year, mon-1, day);    
    var checkDay = checkDate.getDate();
    var checkMonth = checkDate.getMonth()+1;
    var checkYear = checkDate.getFullYear();
   if( (day == checkDay) && (mon == checkMonth) && (year == checkYear))
      { 
	  document.getElementById("errMsg").innerHTML="";
	  return true;
       }
	 else
	{ 
       	 document.getElementById("errMsg").innerHTML="* Wrong Date Picked";        
	 return false;
	}
}

