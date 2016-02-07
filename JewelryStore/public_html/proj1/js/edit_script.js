
$(document).ready( function()
 {
	document.getElementById("current").style.border="2px solid green";
	document.getElementById("current").style.color="green";
	document.getElementById("current").style.backgroundColor="pink";

	 $('.disabled').attr('disabled','disabled');

 $('#busy_wait').hide(); 
	$('#sku').focus();

// Fetching Vendor & Category List
  
   $.get("/perl/jadrn019/proj1/fetch_vendor.cgi",fix_vendor);
   $.get("/perl/jadrn019/proj1/fetch_category.cgi",fix_category);

// Function to  convert sku to uppercase.
   $('[name="sku"]').on('keyup', function() {
       var currentVal = $('[name="sku"]').val().toUpperCase();
       $('[name="sku"]').val(currentVal);
       if(currentVal.length == 3)
           $('[name="sku"]').val(currentVal+"-");       
       }); 

   $('#submit').bind('click', function(e) {
			e.preventDefault();

			var img_data="";
			if(document.edit.image.value)
			{	
				send_file();
				img_data=$('#image').val();
			}
			 var url = "/perl/jadrn019/proj1/edit_prod_db.cgi";
        		 var params = $('#edit').serialize();
			 if(img_data)
				params +='&image='+encodeURIComponent(img_data);
       			 $.post(url, params, handle_delete);
     });
   
    $('[name="category"]').on('change', check_category);
    $('[name="category"]').on('blur', check_category);
    $('[name="vendor"]').on('change', check_vendor);
    $('[name="vendor"]').on('blur', check_vendor);

    $('[name="image"]').on('change', check_image);
    $('[name="image"]').on('blur', check_image);   
 
    $('[name="description"]').on('blur', check_description);   
    $('[name="feature"]').on('blur', check_feature);   
    $('[name="prod_id"]').on('blur', check_prod_id);   
 
 
    $('#sku').on('blur', function(){

	var inputValue =  $.trim( $('[name="sku"]').val() );  
	 if( inputValue == "") return; // if no input do nothing
		if(validate_sku())
		{
			var url = "/perl/jadrn019/proj1/fetch_string1.cgi?sku=" + inputValue;
           		 $.get(url, handle_string_data);
		}
		else
		{
			disabling_all();
		}
	check_sku();
		
	});
    $('#cp').on('blur', function(){
	check_price(document.edit.cp);
	});

     $('#sp').on('blur', function(){
	check_price(document.edit.sp);
	});



   $(':reset').on('click', function(e) {  
        $('input').text("");
        $('.error' ).text("");
        $('#errMsg').text(""); 
        $( 'input' ).css( "border", "2px inset #C0C0C0" );
        $( 'input' ).css( "background", "white" );
  	$( 'textarea' ).css( "border", "2px inset #C0C0C0" );
        $( 'textarea' ).css( "background", "white" );
   	document.edit.category.style.border="2px inset #C0C0C0";
	document.edit.category.style.background = "white";
	document.edit.vendor.style.border= "2px inset #C0C0C0";
        document.edit.vendor.style.background = "white";  
	 $('#sku').focus(); 
 });      
   
});

function disabling_all()
{
	    $('#vendor').val(-1);
                           $('#category').val(-1);
                           $('#prod_id').val("");
                           $('#description').val("");
                           $('#feature').val("");
                           $('#cp').val("");
                           $('#sp').val("");
                           answer="";
                           document.getElementById("img_data").innerHTML = answer;
                           $('.disabled').attr('disabled','disabled');
}

function handle_string_data(response)
{
if (response == "not_found")
{
	   document.getElementById("errMsg").innerHTML = "This SKU doesnt exists in DataBase";
	disabling_all();
}
else
{
	$('.disabled').removeAttr('disabled');
	 var records = new Array();   
        records = response.split("||");
        for(i=0; i < records.length; i++) {
        var fields = new Array();
        fields = records[i].split("|");
   $('#vendor').val(fields[1]);
   $('#category').val(fields[2]);
   $('#prod_id').val(fields[3]);
   $('#description').val(fields[4]);
   $('#feature').val(fields[5]);
   $('#cp').val(fields[6]);
   $('#sp').val(fields[7]);
	tmp =fields[8];
answer="";
answer +="<img align='middle' width='50px' height='50px' src=\"/~jadrn019/upload_imgs/" + fields[8] + "\" /> ";
document.getElementById("img_data").innerHTML = answer;
}
}

}


function handle_delete(response)
{
if(response == "edited") 
      {
      document.getElementById("errMsg").innerHTML = "Successfully Update the product !";
        }
    else
      {
	document.getElementById("errMsg").innerHTML = "Error in Updation. Try Again!!";
      }
return;

}
function send_file() 
{    
        
	var form_data = new FormData($('form')[0]);       
        form_data.append("image", document.getElementById("image").files[0]);
       
	 $.ajax( {
            url: "/perl/jadrn019/proj1/upload.cgi",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
	    success: function(response) {
            answer="";
        	answer +="<img width='50px' align='middle' height='50px' src=\"/~jadrn019/upload_imgs/" + $('#image').val() + "\" /> ";
        	document.getElementById("img_data").innerHTML = answer;
 
	       },
            error: function(response) {
            //alert("Sorry, an upload error occurred, "+response.statusText);
                }
	});
 }



function validate_sku() {
    var value = $('[name="sku"]').val();
    value = $.trim(value);
    var pattern = /^[A-Z]{3}-[0-9]{3}$/;
    if(pattern.test(value))
        return true;
    return false;
    } 


function fix_vendor(response) {
    var key = new Array();
    var description = new Array();
    var toWrite = "<option value=\"-1\">Select Vendor</option>";
    var tmpStr = response.split("||");
    for(i=0; i<tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
        }
    $('[name="vendor"]').append(toWrite);
    }


function fix_category(response) {
    var key = new Array();
    var description = new Array();
    var toWrite = "<option value=\"-1\">Select Category</option>";
    var tmpStr = response.split("||");
    for(i=0; i<tmpStr.length; i++) {
        tmp = tmpStr[i].split("=");
        toWrite += "<option value=" + tmp[0] + ">"+tmp[1]+"</option>\n";
        }
    $('[name="category"]').append(toWrite);
    }


function validateForm()
{

if (check_sku())
{ 
  if(check_vendor())
     {
	if(check_category())
	{
		if(check_prod_id())
		{
			if(check_description())
			{
				if(check_feature())
				{
					if(check_price(document.edit.cp))
					{
						if(check_price(document.edit.sp))
						{
							if(check_image()) 
							{ return true;}
							else
							{ $('#image').focus();}
						}
						else
						{
						$('#sp').focus();
						}
					}
					else
					{ 
		 			$('#cp').focus();
					}
				}
				else
				{
				 $('#feature').focus();
				}
			}
			else
			{
			 $('#description').focus();	
			}
		}
		else
		{
			$('#prod_id').focus();
		}	
    	}
        else
        {
        	 $('#category').focus();
        }
    }
   else
   {
  	$('#vendor').focus();
   }
}
else
{
	$('#sku').focus();
}

return false;

}

function check_prod_id()
{
if( !document.edit.prod_id.value)
   {
      document.getElementById("errMsg").innerHTML = "* Provide Manufacturer's Identifier";
      document.edit.prod_id.style.border='2px solid red';
      document.edit.prod_id.style.background='#FFCCCC';
        return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.edit.prod_id.style.border= "2px inset #C0C0C0";
     document.edit.prod_id.style.background='white';
        return true;
    }
}



function check_description()
{
if( !document.edit.description.value || (document.edit.description.value.length <10) )
   {
      document.getElementById("errMsg").innerHTML = "* Provide Description (Atleast 10Chars)";
      document.edit.description.style.border='2px solid red';
      document.edit.description.style.background='#FFCCCC';
        return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.edit.description.style.border="2px inset #C0C0C0" ;
     document.edit.description.style.background='white';
        return true;
    }
}


function check_feature()
{
if( !document.edit.feature.value || (document.edit.feature.value.length <10) )
   {
      document.getElementById("errMsg").innerHTML = "* Provide Features (Atleast 10Chars)";
      document.edit.feature.style.border='2px solid red';
      document.edit.feature.style.background='#FFCCCC';
        return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.edit.feature.style.border= "2px inset #C0C0C0";
     document.edit.feature.style.background='white';
        return true;
    }
}

function check_vendor()
{
if( document.edit.vendor.value == "-1" )
   {
      document.getElementById("errMsg").innerHTML = "* Pick a Vendor";
      document.edit.vendor.style.border='2px solid red';
      document.edit.vendor.style.background='#FFCCCC';
        return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.edit.vendor.style.border= "2px inset #C0C0C0";
     document.edit.vendor.style.background='white';
        return true;
    }
}



function check_category()
{
if( document.edit.category.value == "-1" )
   {
      document.getElementById("errMsg").innerHTML = "* Pick a Category";
      document.edit.category.style.border='2px solid red';
      document.edit.category.style.background='#FFCCCC';
     	return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.edit.category.style.border= "2px inset #C0C0C0";
     document.edit.category.style.background='white';
  	return true;
    }
}


function check_sku()
{
if ((document.edit.sku.value.length !=7) || (!document.edit.sku.value) || ((!(document.edit.sku.value.substring(0,3).match(/^[A-Z]+$/) ) || (document.edit.sku.value.charAt(3)!='-' ) || (isNaN(document.edit.sku.value.substring(4)))))) 
{
        document.getElementById("errMsg").innerHTML = "* Invalid SKU (Correct: AAA-###)";
        document.edit.sku.style.border='2px solid red';
        document.edit.sku.style.background='#FFCCCC';
        document.getElementById("lookup").style.visibility = "hidden";  
	  $('.disabled').attr('disabled','disabled');
        return false;
}
else
    {
        document.getElementById("errMsg").innerHTML = " ";
        document.edit.sku.style.border= "2px inset #C0C0C0";
        document.edit.sku.style.background='white';
       document.getElementById("lookup").style.visibility = "visible"; 
       return true;
         }
 }


function check_price(pricetxt)
{
  
var rx = new RegExp(/^\d+(?:\.\d{0,2})?$/);
 if(rx.test(pricetxt.value)) { 
      
      var numDec = pricetxt.value.split(".")[1].length;
	if (numDec == 1)
	{ 
	  var newValue = pricetxt.value + 0.00;
	}
    }
    else { 
    } 
 
 if(!(pricetxt.value) || isNaN(pricetxt.value ) || (pricetxt.value == 0))
   {
       document.getElementById("errMsg").innerHTML= "* Provide Valid Price !";
       pricetxt.style.border='2px solid red';
       pricetxt.style.background='#FFCCCC';
	return false; 
   }
 else
    {
       pricetxt.style.border= "2px inset #C0C0C0";
       pricetxt.style.background='white';
       document.getElementById("errMsg").innerHTML= "" ;
	return true;
	 }
}

function check_image()
{   
if  ((validateFileExtension(document.edit.image.value) == false))
      {
     document.getElementById("errMsg").innerHTML="* Provide Product's Image (jpeg/gif/png)";
     document.edit.image.style.border='2px solid red';
     document.edit.image.style.background='#FFCCCC';
	return false;
    }
 else
    {
     document.edit.image.style.border= "2px inset #C0C0C0";
     document.edit.image.style.background='white';
     document.getElementById("errMsg").innerHTML= "" ;
     	return true;
    }
}


//  Function to validate extension of image uploaded 
function validateFileExtension(component)
{
      var ext=component.substring(component.lastIndexOf('.')+1);
      if(ext == "gif" || ext == "GIF" || ext == "JPEG" || ext == "jpeg" || ext == "jpg" || ext == "PNG" || ext == "png")
		{
			return true;
		} 
	else
		{
			return false;
		}
}
 
function submitForm() {
   // Get the first form with the name
   // Hopefully there is only one, but there are more, select the correct index
   var frm = document.getElementsByName('contact-form')[0];
   frm.submit(); // Submit
   frm.reset();  // Reset
   return false; // Prevent page refresh
}
