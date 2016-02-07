<%@ page import="javax.servlet.*, javax.servlet.http.*" %>

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
   "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
        <title>Jewel Inventory</title>
             <meta charset="utf-8">
   	 <meta http-equiv="Pragma" content="no-cache">
    	<meta http-equiv="cache-control" content="no-cache, no-store">
    	<meta http-equiv="Expires" CONTENT="-1">
        <meta http-equiv="Content-Style-Type" content="text/css" />

	<script type="text/javascript" src="/jquery/jquery.js"></script>
   	<script type="text/javascript" src="/jadrn019/jewel/js/inventory_out.js"></script>
    	<link rel="stylesheet" type="text/css" media="screen"
        href="http://jadran.sdsu.edu/jadrn019/jewel/css/menu.css" />
	<script type="text/javascript"> history.go(1);</script>
	
</head>

<body onunload="">
 
       <h3> <a href="/jadrn019/jsp/logout.jsp">Logout</a> </h3> 
        <form method="post" action="/jadrn019/servlet/DBInventoryOut" name="edit">
		<div id="navigation">
        <ul>
	<li class="buttons"><a href="/jadrn019/jsp/menu_in.jsp">Inventory In</a></li>
	<li class="buttons"><a id="current" href="/jadrn019/jsp/menu_out.jsp">Inventory Out</a></li>    
        </ul>
    	</div>   
<fieldset id="out">
		<table border="0">
		<tr><td>
		<label for="sku">SKU*:</label>		
		<input type="text" placeholder="AAA-000" name="sku" size="7" id="sku" maxlength="7"/>
                <br/><br/>
		<label for="date" id="lbl_date">Date: </label>           
                <input type="text" placeholder="Date" name="date"  id="date" class="disabled" /> 
		<label for="quantity">Quantity *:</label>           
                <input type="text" class="disabled" name="quantity" size="5" id="quantity" maxlength="5"/>
		<br/><br/>	
		<label id="lbl_vendor" for="vendor">Vendor :</label>
		<input type="text"  name="vendor" class="disabled" id="vendor"/>
		<br /><br/>
	 
		<label for="category">Category:</label>
		<input type="text"  name="cateogry"  id="category" class="disabled" />
        	<br/><br/>
		<label for="prod_id" id="lbl_manu_id">Product ID: </label>
		<input type="text"  name="prod_id" size="15" class="disabled" id="prod_id"  />
		</td>
	<td><span id="prod_img"></span></td></tr></table>
<br/><br/>

<span id="btn"><input type="reset"  value="Clear">
<input type="submit" value="Send OUT" id="submit" class="disabled"/>
</span>
<span class="error" id="errMsg"></span> <br />    
</fieldset><br/>
</form>
</body>
</html>
