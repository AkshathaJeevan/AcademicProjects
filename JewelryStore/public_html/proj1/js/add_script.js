
$(document).ready( function()
 {
	document.getElementById("current").style.border="2px solid green";
	document.getElementById("current").style.color="green";
	document.getElementById("current").style.backgroundColor="pink";

 $('#busy_wait').hide(); 
	$('#sku').focus();


// Fetching Vendor & Category List
   $.get("/perl/jadrn019/proj1/fetch_vendor.cgi",fix_vendor);
   $.get("/perl/jadrn019/proj1/fetch_category.cgi",fix_category);


// Function to convert sku to uppercase.
   $('[name="sku"]').on('keyup', function() {
       var currentVal = $('[name="sku"]').val().toUpperCase();
       $('[name="sku"]').val(currentVal);
       if(currentVal.length == 3)
           $('[name="sku"]').val(currentVal+"-");       
       }); 

   $('#submit').bind('click', function(e) {
		e.preventDefault();
		if (validateForm())
		{

 			$('#busy_wait').show(); 
			var img_data="";
			send_file();
			img_data=$('#image').val();
			 var url = "/perl/jadrn019/proj1/add_prod_db.cgi";
        		 var params = $('#add').serialize();
			params +='&image='+encodeURIComponent(img_data);
       			 $.post(url, params, handle_add);
		}
     });

 $('#sku').on('focus', function(e){
 document.getElementById("lookup").src = "/~jadrn019/proj1/css/search.png";	
 document.getElementById("lookup").style.visibility = "hidden";
}); 

$('#lookup').on('click', function() {
 var inputValue =  $.trim( $('[name="sku"]').val() );  
 if( inputValue == "") return; // if no input do nothing

        if(validate_sku())
           {   
            $('#busy_wait').show();       
            var url = "/perl/jadrn019/proj1/check_dup_sku.cgi?sku=" + inputValue;
            $.get(url, check_sku_for_dups);
            }
        else
	document.getElementById("lookup").src = "/~jadrn019/proj1/css/unavailable.png"; 

	 
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
 
 
    $('#sku').on('blur', check_sku);
    $('#cp').on('blur', function(){
	check_price(document.add.cp);
	});

     $('#sp').on('blur', function(){
	check_price(document.add.sp);
	});



   $(':reset').on('click', function(e) {  
        $('input').text("");
        $('.error' ).text("");
        $('#errMsg').text(""); 
        $( 'input' ).css( "border", "2px inset #C0C0C0" );
        $( 'input' ).css( "background", "white" );
  	$( 'textarea' ).css( "border", "2px inset #C0C0C0" );
        $( 'textarea' ).css( "background", "white" );
   	document.add.category.style.border="2px inset #C0C0C0";
	document.add.category.style.background = "white";
	document.add.vendor.style.border= "2px inset #C0C0C0";
        document.add.vendor.style.background = "white";  
	 $('#sku').focus(); 
 });      
   
});

function handle_add(response)
{

    $('#busy_wait').hide();
	//alert(response);
	if(response == "Added") 
      {

      document.getElementById("errMsg").innerHTML = "Successfully Added !!!";

      }
    else
      {
	 document.getElementById("errMsg").innerHTML = "SKU Already Exists.!!!";

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
              // alert("Your file has been received.");
             
                },
            error: function(response) {
         
           //    alert("Sorry, an upload error occurred, "+response.statusText);
                }
	});
 }


function check_sku_for_dups(response) {
    $('#busy_wait').hide();
    if(response == "ok") 
      {
 document.getElementById("lookup").src = "/~jadrn019/proj1/css/available.png";
        }
else
{
 document.getElementById("lookup").src = "/~jadrn019/proj1/css/unavailable.png";
}
return;
 
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
					if(check_price(document.add.cp))
					{
						if(check_price(document.add.sp))
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
if( !document.add.prod_id.value)
   {
      document.getElementById("errMsg").innerHTML = "* Provide Manufacturer's Identifier";
      document.add.prod_id.style.border='2px solid red';
      document.add.prod_id.style.background='#FFCCCC';
        return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.add.prod_id.style.border= "2px inset #C0C0C0";
     document.add.prod_id.style.background='white';
        return true;
    }
}



function check_description()
{
if( !document.add.description.value || (document.add.description.value.length <10) )
   {
      document.getElementById("errMsg").innerHTML = "* Provide Description (Atleast 10Chars)";
      document.add.description.style.border='2px solid red';
      document.add.description.style.background='#FFCCCC';
        return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.add.description.style.border="2px inset #C0C0C0" ;
     document.add.description.style.background='white';
        return true;
    }
}


function check_feature()
{
if( !document.add.feature.value || (document.add.feature.value.length <10) )
   {
      document.getElementById("errMsg").innerHTML = "* Provide Features (Atleast 10Chars)";
      document.add.feature.style.border='2px solid red';
      document.add.feature.style.background='#FFCCCC';
        return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.add.feature.style.border= "2px inset #C0C0C0";
     document.add.feature.style.background='white';
        return true;
    }
}

function check_vendor()
{
if( document.add.vendor.value == "-1" )
   {
      document.getElementById("errMsg").innerHTML = "* Pick a Vendor";
      document.add.vendor.style.border='2px solid red';
      document.add.vendor.style.background='#FFCCCC';
        return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.add.vendor.style.border= "2px inset #C0C0C0";
     document.add.vendor.style.background='white';
        return true;
    }
}



function check_category()
{
if( document.add.category.value == "-1" )
   {
      document.getElementById("errMsg").innerHTML = "* Pick a Category";
      document.add.category.style.border='2px solid red';
      document.add.category.style.background='#FFCCCC';
     	return false;
   }
 else
    {
     document.getElementById("errMsg").innerHTML = " ";
     document.add.category.style.border= "2px inset #C0C0C0";
     document.add.category.style.background='white';
  	return true;
    }
}


function check_sku()
{

if ((document.add.sku.value.length !=7) || (!document.add.sku.value) || ((!(document.add.sku.value.substring(0,3).match(/^[A-Z]+$/) ) || (document.add.sku.value.charAt(3)!='-' ) || (isNaN(document.add.sku.value.substring(4)))))) 
{
        document.getElementById("errMsg").innerHTML = "* Invalid SKU (Correct: AAA-###)";
        document.add.sku.style.border='2px solid red';
        document.add.sku.style.background='#FFCCCC';
        document.getElementById("lookup").style.visibility = "hidden";  

        return false;
}
else
    {
        document.getElementById("errMsg").innerHTML = " ";
        document.add.sku.style.border= "2px inset #C0C0C0";
        document.add.sku.style.background='white';
       document.getElementById("lookup").style.visibility = "visible"; 
       return true;
         }
 }


function check_price(pricetxt)
{

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
if (!(document.add.image.value) || (validateFileExtension(document.add.image.value) == false))
      {
     document.getElementById("errMsg").innerHTML="* Provide Product's Image (jpeg/gif/png)";
     document.add.image.style.border='2px solid red';
     document.add.image.style.background='#FFCCCC';
	return false;
    }
 else
    {
     document.add.image.style.border= "2px inset #C0C0C0";
     document.add.image.style.background='white';
     document.getElementById("errMsg").innerHTML= "" ;
     	return true;
    }
}


//  Function to check uploaded image
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
 
  document.forms["add"].submit(); //first submit
    document.forms["add"].reset();

}

