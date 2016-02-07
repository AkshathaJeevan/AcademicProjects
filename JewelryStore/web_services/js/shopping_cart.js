/*  A shopping cart in javascript that uses cookies
    Alan Riggins
    Spring 2015, CS645


    Method Prototypes:
    // creates a new shopping cart using cookies.
    // The parameter is your jadran account number.
    var cart = new shopping_cart("jadrnxxx");
    
    // Adds a new entry or increments the quantity if the entry exists.
    cart.add(sku, quantity);
    
    // changes the quantity associated with the sku to the new value
    // parameter provided
    cart.setQuantity(sku, quantity);
    
    // deletes the sku from the cart (cookie).
    cart.delete(sku);
    
    // returns the total number of elements in the cart.
    cart.size();
    
    // returns a two-dimensional array of the sku=quantity pairs
    // [0] is the sku, [1] is the quantity. array[sku][quantity]
    cart.getCartArray();
*/
    
    
function shopping_cart(owner) {
    this.owner = $.trim(owner);
    this.skuArray = new Array();
    this.qtyArray = new Array();
    this.prcArray = new Array();

//////////////////////////////////////////////////////////////////////////
// Do not use the following two methods;  they are private to this class
    this.getCookieValues = function() {  // PRIVATE METHOD
        var raw_string = document.cookie;        
        var arr = new Array();
        if(raw_string == undefined)
            return;
        var tmp = raw_string.split(";");
        var myValue = null;        
        for(i=0; i < tmp.length; i++)
            if(tmp[i].indexOf(owner) != -1)
                myValue = tmp[i].split("=");
        if(!myValue)
            return;
        arr = myValue[1].split("||");
        for(i=0; i < arr.length; i++) {
            var pair = arr[i].split("|"); 
            if(pair[0] == undefined || pair[1] == undefined) continue;
            this.skuArray[i] = pair[0];
            this.qtyArray[i] = pair[1];
            this.prcArray[i] = pair[2];
	}         
        }
        
    this.writeCookie = function() {  // PRIVATE METHOD
        var toWrite = this.owner+"=";
        for(i=0; i < this.skuArray.length; i++) 
            toWrite += this.skuArray[i] + "|" + this.qtyArray[i] + "|" + this.prcArray[i] + "||";
        toWrite = toWrite.substring(0,toWrite.length - 2);
        document.cookie = toWrite;
        }
//////////////////////////////////////////////////////////////////////////            
        
    this.add = function(sku, quantity,price) {
        sku = $.trim(sku);
        quantity = $.trim(quantity); 
        price = $.trim(price);
	 var total = quantity * price;
         total = total.toFixed(2);
	this.getCookieValues(); 
        var found = false;
        var qtyCart = quantity;
	for(i=0; i < this.skuArray.length; i++)
     //  alert(this.skuArray[i]);
	 if(this.skuArray[i] == sku) {
               
	 //  var total = quantity * price;
            this.qtyArray[i] = parseInt(quantity,10) + parseInt(this.qtyArray[i],10); 
            var new_price = parseFloat(total,10) + parseFloat(this.prcArray[i],10);
           this.prcArray[i]= new_price.toFixed(2);
	    found = true; qtyCart = this.qtyArray[i];           
            }
        if(!found) {
	 //   var total = quantity * price;
//		alert(total);       
            this.skuArray.push(sku);
            this.qtyArray.push(quantity);
            this.prcArray.push(total);
            }
        this.writeCookie();
return qtyCart;
    }
    
    this.setQuantity = function(sku, quantity,price) {  
        sku = $.trim(sku);
        var found = false;
        if(sku == "") return;        
        quantity = $.trim(quantity);    
        price = $.trim(price);            
        this.getCookieValues();
        var qtyCart = 0;
        for(i=0; i < this.skuArray.length; i++)
            if(this.skuArray[i] == sku) {        
                this.qtyArray[i] = parseInt(quantity,10);            
                var total = quantity * price;
         	total = total.toFixed(2);
		 this.prcArray[i] = parseFloat(total,10);            
		 found = true;
		qtyCart = this.qtyArray[i];
                }
        if(found)
            this.writeCookie();
	 else
             alert ("The product picked isn't in your Cart");
	return qtyCart;   
        }    
    
    this.delete = function(sku) {
        sku = $.trim(sku);
        var index = -1;
        var update = true;
        this.getCookieValues();       
        for(i=0; i < this.skuArray.length; i++)
        if(this.skuArray[i] == sku)  
            index = i;               
        if(index != -1) {      
            this.skuArray.splice(index,1);
            this.qtyArray.splice(index,1);
            this.prcArray.splice(index,1);
            }
	else
	   { update=false;
		alert ("The product picked isn't in your Cart");
	   }         
        if(this.skuArray.length == 0) {
            document.cookie = this.owner + "= ;expires=-1";
	  }
        else
            this.writeCookie();
       return update;
	 }
        
    this.size = function() {
        this.getCookieValues();
        var count = 0;
        for(i=0; i < this.qtyArray.length; i++)
            count += parseInt(this.qtyArray[i],10);
       // alert (count);
	return count;
        }        
        
    this.getCartArray = function() {
        this.getCookieValues();
        var returnArray = new Array();
        for(i=0; i < this.skuArray.length; i++) {
            returnArray[i] = new Array();
            returnArray[i].push(this.skuArray[i]);
            returnArray[i].push(this.qtyArray[i]);
            returnArray[i].push(this.prcArray[i]);
	 }
        return returnArray;
        }  

    this.find = function(sku) 
	{
        sku = $.trim(sku);
        this.getCookieValues();
        var qtyCart = 0;
        for(i=0; i < this.skuArray.length; i++)
         if(this.skuArray[i] == sku) 
	   {
             qtyCart = this.qtyArray[i];
            }
	return qtyCart;
    }

}    
        
