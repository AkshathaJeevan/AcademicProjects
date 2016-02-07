<%@ page import="javax.servlet.*, javax.servlet.http.*" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<!--    Mallikarjunaiah, Akshatha    Account:  jadrn019
                      CS645, Spring 2015
                      Project #2
              -->
<head>
   
    <title>Jewelry Inventory</title>
    	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
	<meta http-equiv="Content-Style-Type" content="text/css" /> 
	<link rel="stylesheet" type="text/css" href="/jadrn019/jewel/css/login.css" />
	<script src="/jquery/jquery.js"></script>
        <script src="/jadrn019/jewel/js/index.js"></script>
</head>
<body>
<div class="body">
<div class="header">
			<div>Jewelry<span>Empire</span></div>
		</div>
<div class="login">
	<form action="/jadrn019/servlet/Login" method="post">
		
				<input type="text" placeholder="username" name="username"><br>
				<input type="password" placeholder="password" name="password"><br>
				<input type="submit" value="Log In" />
				<input type="reset" value="Reset" />
		

</form>
<div class = "footer">
<div>Sorry some error occured. Login Again!!!</div>
</div>
</div> </div>
</body>
</html>

