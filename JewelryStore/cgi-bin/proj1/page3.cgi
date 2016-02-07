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
        <title>Delete Inventory</title>
        <meta http-equiv="content-type" content="text/html;charset=utf-8" />
        <link rel="stylesheet" type="text/css" href="/~jadrn019/proj1/css/menu.css" />
        <script type="text/javascript" src="/jquery/jquery.js"></script>
      	<script type="text/javascript" src="/~jadrn019/proj1/js/ajax_get_lib.js"></script> 
	 <script type="text/javascript" src="/~jadrn019/proj1/js/delete_script.js"></script>
        
<style type="text/css">
</style>
</head>

<body onunload="">
	 <h1> <a href="/perl/jadrn019/proj1/logout.cgi">Logout Now</a> </h1>
<p>
        <div id="navigation">
        <ul>
            <li class="buttons"><a href="/perl/jadrn019/proj1/page1.cgi">Add record</a></li>
            <li class="buttons"><a href="/perl/jadrn019/proj1/page2.cgi">Edit record</a></li> 
            <li class="buttons"><a id="current" href="/perl/jadrn019/proj1/page3.cgi">Delete record</a></li> 
         </ul>
        </div>    
</p>
            <div>
                <div id="content">
		<label for="sku">Enter SKU of Product to be deleted :</label>		
		<input type="text" placeholder="AAA-000" name="sku" size="7" id="sku" maxlength="7"/>
		<input type="image" name="lookup" src="/~jadrn019/proj1/css/search.png" height="20px" width="30px" align='middle'  alt="Check Availability" id="lookup"/>
		 </div>
		<div id="data"></div>
            </div>              
    

</body>
</html>

END
