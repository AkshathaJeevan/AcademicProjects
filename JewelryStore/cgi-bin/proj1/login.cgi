#!/usr/bin/perl

use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);
use Crypt::SaltedHash;

##---------------------------- MAIN ---------------------------------------

my $q;
if(authenticate_user()) {
    send_to_main();   
    }
else {
    send_to_login_error();
    }    
###########################################################################

###########################################################################
sub authenticate_user {
    $q = new CGI;
    my $user = $q->param("user");
    my $password = $q->param("password");    
    open DATA, "</srv/www/cgi-bin/jadrn019/proj1/passwords.dat" 
        or die "Cannot open file.";
    @file_lines = <DATA>;
    close DATA;

    $OK = 0; #not authorized

    foreach $line (@file_lines) {
        chomp $line;
        ($stored_user, $stored_pass) = split /=/, $line;    
        if($stored_user eq $user && Crypt::SaltedHash->validate($stored_pass, $password)) {
            $OK = 1;
            last;
            }
        }
    return $OK;
    }
###########################################################################

###########################################################################
sub send_to_login_error {
    print <<END;
Content-type:  text/html


<html>
<head>
    <meta http-equiv="refresh" 
        content="0; url=http://jadran.sdsu.edu/~jadrn019/proj1/error.html" />
</head><body></body>
</html>

END
    }  
    
###########################################################################
      
###########################################################################
sub send_to_main {
# args are DRIVER, CGI OBJECT, SESSION LOCATION
# default for undef is FILE, NEW SESSION, /TMP 
# for login.html, don't look for any existing session.
# Always start a new one.  Send a cookie to the browser.
# Default expiration is when the browser is closed.
# WATCH YOUR COOKIE NAMES! USE JADRNXXX_SID  
    my $session = new CGI::Session(undef, undef, {Directory=>'/tmp'});
    $session->expires('+1d');
    my $cookie = $q->cookie(jadrn019SID => $session->id);
    print $q->header( -cookie=>$cookie ); #send cookie with session ID to browser    
    my $sid = $session->id;
    

    print <<END;
    
  <?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<title>Add Inventory</title>
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
   	<link rel="stylesheet" type="text/css" href="/~jadrn019/proj1/css/menu.css" />
   	<script type="text/javascript" src="/jquery/jquery.js"></script>
   	<script type="text/javascript" src="/~jadrn019/proj1/js/ajax_get_lib.js"></script>
   	<script type="text/javascript" src="/~jadrn019/proj1/js/add_script.js"></script>
        
</head>

<body onunload="">
     <h1> <a href="/perl/jadrn019/proj1/logout.cgi">Logout Now</a> </h1>  
   
   <p>
        <div id="navigation">
        <ul>
            <li class="buttons"><a id="current" href="/perl/jadrn019/proj1/page1.cgi">Add record</a></li>
            <li class="buttons"><a href="/perl/jadrn019/proj1/page2.cgi">Edit record</a></li> 
            <li class="buttons"><a href="/perl/jadrn019/proj1/page3.cgi">Delete record</a></li>     
           
         </ul>
    	</div>    
   </p>
	        <div id="add_content">
 		<form name="add" id="add" method="post" enctype="multipart/form-data"  action="" onsubmit="return validateForm();">
	    	 <fieldset id="add_product">
		<label for="sku">SKU *:</label>		
		<input type="text" placeholder="AAA-000" name="sku" size="7" id="sku" maxlength="7"/>
		<input type='image' name="lookup" src='/~jadrn019/proj1/css/search.png' height="20px" width="30px" align='middle'  alt="Check Availability" id="lookup"/>
		<br/><br/><br/>
		<label id="lbl_vendor" for="vendor">Vendor *:</label>
		<select name="vendor" id="vendor"></select> &nbsp;&nbsp;
	 
		<label for="category">Category *:</label>
                <select name="category" id="category"></select> <br/><br/><br/>
		
                <label for="prod_id" id="lbl_manu_id">Product ID * : </label>
		<input type="text" name="prod_id" size="15" placeholder="Alphabet/digits" id="prod_id"  /> <br/><br/><br/>

		<label for="description">Description *:</label>
		<textarea rows="4" cols="50" id="description" name="description" placeholder="(Minimum 10 Chars)"></textarea><br /><br/><br/>

                <label for="feature">Product's Features* :</label>				
	        <textarea rows="4" cols="50" name="feature" id="feature" placeholder="(Minimum 10 Chars)"></textarea><br /> <br/><br/>

                <label for="cp">Cost in USD *:</label>		
		<input type="text" name="cp" size="6" id="cp" maxlength="6"  placeholder="0.0"/>
		
		<label for="sp" id="lbl_sp">Retail in USD *:</label>		
		<input type="text" name="sp" size="6" id="sp" maxlength="6" placeholder="0.0"/><br /><br/><br/>

       		<label for="image">Product Image *:</label>
		<input type="file" name="image" id="image" /> <br/><br/>
		
		<span id="btn"><input type="reset"  value="Clear"> &nbsp;&nbsp;
		<input type="submit" value="Add" id="submit"/> </span>
		<span class="error" id="errMsg"></span> <br />    

		</fieldset>
		</form> 		
 		</div>
		     
</body>
</html>


END
}
###########################################################################    
    





