After user logs out from inventory page and when he click back button ,logout
confirmation will say "Your has session expired.Please login again".

To implement this I have written below code in logout.cgi.


$session = new CGI::Session(undef, $sid, {Directory => '/tmp'});
$session->expires('-1d');
$session->delete();
if($session->is_expired){
my $cookie = $q->cookie(jadrn019SID => '');
print $q->header( -cookie=>$cookie ,-cache_control=>"no-cache, no-store, must-revalidate"); #send cookie with session ID to browser  

     	print "Your has session expired. Please login again."; 
 	print "<br/><a href='/~jadrn019/proj1/index.html'>";
  }
