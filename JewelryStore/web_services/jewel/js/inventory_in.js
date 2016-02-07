$(document).ready( function()
 {
	

	document.getElementById("current").style.border="2px outset white";
	document.getElementById("current").style.color="white";
	document.getElementById("current").style.backgroundColor="green";

	$('.disabled').attr('disabled','disabled');
	$('#busy_wait').hide(); 
	$('#sku').focus();
	var today = get_date();
	 $('#date').val(today);


	 $.get("/jadrn019/servlet/GetVendorList", vendor_response);
	 $.get("/jadrn019/servlet/GetCategoryList", category_response);
	 var vendors;
	 var categories;

	 function vendor_response(response)
        {
        	vendors = response.split("||");
	}

	 function category_response(response)
        {
                categories = response.split("||");
        }


// Validations for Valid SKU's
   $('[name="sku"]').on('keyup', function() {
       var currentVal = $('[name="sku"]').val().toUpperCase();
       $('[name="sku"]').val(currentVal);
       if(currentVal.length == 3)
           $('[name="sku"]').val(currentVal+"-");       
       }); 

	
   $('#sku').on('focus',function(){
	 var today = get_date();
         $('#date').val(today);
	$('#quantity').attr('disabled', 'disabled');
	$('#submit').attr('disabled', 'disabled');
	 $(this).css( "border", "2px solid blue" );
	 $( '#quantity' ).css( "border", "2px inset #C0C0C0" );
        $( '#quantity' ).css( "background", "white" );
	$('#vendor').val("");
	$('#category').val("");
	$('#prod_id').val("");
	$('#quantity').val("");
	$('#prod_img').text("");
	} );


   $('#submit').bind('click', function(e) {
			e.preventDefault();

	if (validateForm())
		{
			$('#busy_wait').show();
				var sku=$('#sku').val();
				var date=$('#date').val();
				var qty=$('#quantity').val();
			 $.get("/jadrn019/servlet/DBInventoryIn?sku="+sku+"&date="+date+"&qty="+qty, submit_response);
		}
     });

	  function submit_response(response)
        {

		$('#busy_wait').hide();
                $('input').text("");
                $("#sku").focus();
        if(!response)
        {
                $("#errMsg").text("* Error inserting !");
                return;
        }

                $("#errMsg").text("* "+response);
	
	}

 
    $('#quantity').on('blur',check_quantity); 
    $('#sku').on('blur', function(){
	      var today = get_date();
         $('#date').val(today);

	var inputValue =  $.trim( $('[name="sku"]').val() );  
	
	if(inputValue && validate_sku())
		{
			$.get("/jadrn019/servlet/GetProduct?sku="+inputValue, sku_response);	
		}
		
	check_sku();
		
	});

	function sku_response(response)
	{
	if(!response)
	{
		$("#errMsg").text("* SKU not found in Database !");
		$("#sku").focus();
		$('input').text("");
		return;
	}
		
	$('#submit').removeAttr('disabled');
	var res = response.split("|");
	var ven = vendors[res[1]-1].split(",");
	var cat = categories[res[2]-1].split(",");
	$('#vendor').val(ven[1]);
	$('#category').val(cat[1]);
	$('#prod_id').val(res[3]);
	$('#quantity').removeAttr('disabled');
	$('#quantity').focus();
	$('#quantity').val("");
	$( '#quantity' ).css( "border", "2px solid blue" );

var answer="";
answer +="<img align='middle' width='150px' height='200px' src=\"/~jadrn019/upload_imgs/" + res[8] + "\" /> ";
document.getElementById("prod_img").innerHTML = answer;
}
   

$(':reset').on('click', function(e) {  
        $('input').text("");
        $('.error' ).text("");
        $('#errMsg').text(""); 
        $( 'input' ).css( "border", "2px inset #C0C0C0" );
        $( 'input' ).css( "background", "white" );
	 $('#sku').focus();
 
 });      

   
});



function validate_sku() {
    var value = $('[name="sku"]').val();
    value = $.trim(value);
    var pattern = /^[A-Z]{3}-[0-9]{3}$/;
    if(pattern.test(value))
        return true;
    return false;
    } 




function validateForm()
{
if (check_sku())
{ 
  if(check_quantity())
     {
		return true;
	 }
		
   else
   {
  	$('#quantity').focus();
   }
}
else
{
	$('#sku').focus();
}

return false;

}


function check_sku()
{
if ((document.edit.sku.value.length !=7) || (!document.edit.sku.value) || ((!(document.edit.sku.value.substring(0,3).match(/^[A-Z]+$/) ) || (document.edit.sku.value.charAt(3)!='-' ) || (isNaN(document.edit.sku.value.substring(4)))))) 
{
        document.getElementById("errMsg").innerHTML = "* Enter Valid SKU (format : AAA-###)";
        document.edit.sku.style.border='2px solid red';
        document.edit.sku.style.background='#FFCCCC';
	 $('.disabled').attr('disabled','disabled');
        return false;
}
else
    {

        document.getElementById("errMsg").innerHTML = " ";
        document.edit.sku.style.border= "2px inset #C0C0C0";
        document.edit.sku.style.background='white';
       return true;
         }
 }


function check_quantity()
{
 if(!(document.edit.quantity.value) || isNaN(document.edit.quantity.value ) || (document.edit.quantity.value <= 0))
   {
       document.getElementById("errMsg").innerHTML= "* Enter Valid Quantity !";
       document.edit.quantity.style.border='2px solid red';
       document.edit.quantity.style.background='#FFCCCC';
	return false; 
   }
 else
    {
       document.edit.quantity.style.border= "2px inset #C0C0C0";
       document.edit.quantity.style.background='white';
       document.getElementById("errMsg").innerHTML= "" ;
	return true;
	 }
}

function get_date()
{
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = mm+'/'+dd+'/'+yyyy;
return today;
}
