$(document).ready( function()
 {
	document.getElementById("current").style.border="2px solid green";
        document.getElementById("current").style.color="green";
        document.getElementById("current").style.backgroundColor="pink";

 $('#busy_wait').hide(); 
	$('#sku').focus();

// function to convert sku to upper case
   $('[name="sku"]').on('keyup', function() {
       var currentVal = $('[name="sku"]').val().toUpperCase();
       $('[name="sku"]').val(currentVal);
       if(currentVal.length == 3)
           $('[name="sku"]').val(currentVal+"-");       
       }); 

$('#content #lookup').on('click', function() {
 var inputValue =  $.trim( $('[name="sku"]').val() );  
 if( inputValue == "") return; // if no input do nothing
        if(validate_sku())
           {
		//fetch_string_data();
		var url = "/perl/jadrn019/proj1/fetch_string.cgi?sku=" + inputValue;
            	$.get(url, handle_string_data);
   
            }
        else
	 alert ("Invalid SKU Passed !");
	 
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

 
function handle_string_data(response) {  
if (response == "not_found")
{
	alert("This SKU doesnt exists in DataBase");
}
else
{
var titles = new Array();
titles[0] = "SKU: ";
titles[1] = "Vendor: ";
titles[2] = "Category: ";
titles[3] = "Manufacture's ID: ";
titles[4] = "Description: ";
titles[5] = "Features: ";
titles[6] = "Cost Price: ";
titles[7] = "Retail Price: ";
titles[8] = "Product's Image: ";

    var records = new Array();   
 
    records = response.split("||");
    var answer = "<div id='delete_data'><h3>Product Details:</h1><br/>";
    for(i=0; i < records.length; i++) {
        var fields = new Array();
        fields = records[i].split("|");
	answer += "<fieldset><legend>"+fields[0]+"</legend>";
	answer += "<table><tr><td>"+"<img width='180px' height='200px' src=\"/~jadrn019/upload_imgs/" + fields[8] + "\" /> "+"</td><td>"
        for(j=1; j < fields.length-1; j++) 
	{	if (j == 4 || j == 5)
            		answer += "<h4>" +titles[j]+"<br/><span class='db_values'> "+ fields[j] + "</span></h4>";
		else
		        answer += "<h4>" +titles[j]+"<span class='db_values'> "+ fields[j] + "</span></h4>";
        }
	answer += "<input type='image' src='/~jadrn019/proj1/css/delete.png' align='middle'  alt='Delete Product' class='deleteButton' title='Delete Product from DB'  id='" + fields[0] + "'/> ";
	answer += "<br/></td></tr></table></fieldset></div>";
        }
    document.getElementById("data").innerHTML = answer;
    }
}

$(document).on('click','input[type=image][class=deleteButton]', function() {
    var currentSku = $(this).attr('id');

var r=confirm("Are you sure yo want to delete SKU: "+currentSku);
if (r==true)
  {
	
	var url = "/perl/jadrn019/proj1/delete_prod_db.cgi?sku=" + currentSku;
            $.get(url, handle_delete);

  }
else
  {
	alert ("Don't Delete !");
  }

});

function handle_delete(response) {

    if(response == "deleted") 
      {
	$('#delete_data').html("Successfully Deleted Inventory !");
        }
    else
      {
	$('#delete_data').html("Error in Deletion. Try Again!!");
      }
return;
}

function submitForm() {
   // Get the first form with the name
   // Hopefully there is only one, but there are more, select the correct index
   var frm = document.getElementsByName('contact-form')[0];
   frm.submit(); // Submit
   frm.reset();  // Reset
   return false; // Prevent page refresh
}
