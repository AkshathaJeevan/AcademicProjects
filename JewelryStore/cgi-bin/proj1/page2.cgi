#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

my $q = new CGI;
my $cookie_sid = $q->cookie('jadrn019SID');
my $session = new CGI::Session(undef, $cookie_sid, {Directory=>'/tmp'});   
my $sid = $session->id;

if($cookie_sid ne $sid) {
    print <<END;
Content-type:  text/html

<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/~jadrn019/proj1/error.html" />
</head><body></body>
</html>

END
return;
}

print <<END;
Content-type: text/html

<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
        <title>Edit Inventory</title>
        <meta http-equiv="content-type" content="text/html;charset=utf-8" />
	
        <link rel="stylesheet" type="text/css" href="/~jadrn019/proj1/css/menu.css" />
        <script type="text/javascript" src="/jquery/jquery.js"></script>
   	<script type="text/javascript" src="/~jadrn019/proj1/js/ajax_get_lib.js"></script>
	<script type="text/javascript" src="/~jadrn019/proj1/js/edit_script.js"></script>
      
</head>

<body onunload="">
  <h1> <a href="/perl/jadrn019/proj1/logout.cgi">Logout Now</a> </h1>
	<p>
        	<div id="navigation">
       	<ul>
             <li class="buttons"><a href="/perl/jadrn019/proj1/page1.cgi">Add record</a></li>
             <li class="buttons"><a id="current" href="/perl/jadrn019/proj1/page2.cgi">Edit record</a></li> 
             <li class="buttons"><a href="/perl/jadrn019/proj1/page3.cgi">Delete record</a></li> 
        </ul>
        </div>   
	</p>
            <div>
           	<form name="edit" method="post" enctype="multipart/form-data"  action=""  id="edit">
		 <fieldset id="edit_product">
		<label for="sku">SKU *:</label>		
		<input type="text" placeholder="AAA-000" name="sku" size="7" id="sku" maxlength="7"/><br/><br/><br/>
		<label id="lbl_vendor" for="vendor">Vendor *:</label>
		<select class="disabled" name="vendor" id="vendor"></select> &nbsp;&nbsp;
	 	<label for="category">Category *:</label>
                 <select class="disabled" name="category" id="category"></select> <br/><br/><br/>
		<label for="prod_id" id="lbl_manu_id">Product's ID *:</label>
		<input type="text" class="disabled" name="prod_id" size="15" placeholder="Alphabet/digits" id="prod_id" /><br/><br/>
		<br />
		<label for="description">Description *:</label>
		<textarea rows="4" cols="50" class="disabled" id="description" name="description" placeholder="(Minimum 10 Chars)"></textarea><br/><br/>
		<label for="feature">Product's Features *:</label>				
		<textarea rows="4" cols="50" name="feature" id="feature" class="disabled" placeholder="(Minimum 10 Chars)"></textarea><br/><br/><br/>
		<label for="cp">Cost in USD *:</label>		
		<input type="text" name="cp" size="6" id="cp" maxlength="6" class="disabled"  placeholder="0.0"/>
		<label for="sp" id="lbl_sp">Retail in USD *:</label>		
		<input type="text" name="sp" size="6" id="sp" maxlength="6" class="disabled" placeholder="0.0"/>
		<br /><br/><br/>
		<label for="image">Product Image *:</label>
		<span id="img_data"></span>
		<input type="file" name="image" id="image" class="disabled" />
		<br/><br/>
		<span id="btn"><input type="reset"  value="Clear" class="disabled"> &nbsp;&nbsp;
		<input type="submit" value="Update" id="submit" class="disabled"/> </span>
		<span class="error" id="errMsg"></span> <br />    
	</fieldset>
	</form> 		 
	</div>                  

</body>
</html>

END
