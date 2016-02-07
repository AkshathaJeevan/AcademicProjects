use CGI;
use CGI::Session;
use CGI::Carp qw (fatalsToBrowser);

my $q = new CGI;
my $sid = $q->cookie("jadrn019SID") || undef;
$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->expires('-1d');
$session->delete();
if($session->is_expired){
my $cookie = $q->cookie(jadrn019SID => '');
print $q->header( -cookie=>$cookie ,-cache_control=>"no-cache, no-store, must-revalidate"); #send cookie with session ID to browser  

     	print "Your has session expired. Please login again.";
 	print "<br/><a href='/~jadrn019/proj1/index.html'>";
  }

my $cookie = $q->cookie(jadrn019SID => '');
print $q->header( -cookie=>$cookie ,-cache_control=>"no-cache, no-store, must-revalidate"); #send cookie with session ID to browser  


print <<END;    
    
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">


<head>
   
    <title>Jewelry Inventory</title>
    	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
	<meta http-equiv="Content-Style-Type" content="text/css" /> 
	<link rel="stylesheet" type="text/css" href="/~jadrn019/proj1/css/index.css" />
	<script src="/jquery/jquery.js"></script>
        <script src="/~jadrn019/proj1/css/index.js"></script>
</head>
<body>
<div class="body">
<div class="header">
			<div>Jewelry<span>Empire</span></div>
		</div>
<div class="login">
	<form action="/perl/jadrn019/proj1/login.cgi" method="post">
		
				<input type="text" placeholder="username" name="user"><br>
				<input type="password" placeholder="password" name="password"><br>
				<input type="submit" value="Log In" />
				<input type="reset" value="Reset" />
		

</form>
<div class = "footer">
<div> You have Successfully logged out!!!</div>
</div>
</div> </div>
</body>
</html>


END
