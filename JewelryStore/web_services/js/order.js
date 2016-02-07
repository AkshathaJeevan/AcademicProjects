var proj3_data;
var cart;
var vendors;
var categories;
var onhand_data;
var dialog_string;

$(document).ready(function() {
    document.getElementById("current").style.color = "red";

    proj3_data = new Array();
    onhand_data = new Array();
    cart = new shopping_cart("jadrn019");
    var vendors;
    var categories;

    $.get("/jadrn019/servlet/GetProducts", storeData);
    $.get("/jadrn019/servlet/GetOnHand", storeOnHandData);
    $.get("/jadrn019/servlet/GetVendorList", vendor_response);
    $.get("/jadrn019/servlet/GetCategoryList", category_response);

    $('#busy_wait').show();
    var delay = 1000; //1 seconds
    setTimeout(function() {

        $('#busy_wait').hide();
        updateDisplay();
    }, delay);

    function vendor_response(response) {
        vendors = response.split("||");
        var list = [];
        var vendorHandle = document.getElementById("vendor");

        for (var i = 0; i < vendors.length - 1; i++) {
            var ven = vendors[i].split(",");
            list.push(ven[1]);
        }


        for (var i = 0; i < list.length; i++) {
            vendorHandle.options[i] = new Option(list[i]);
        }
    }

    function category_response(response) {
        categories = response.split("||");
        var list = [];
        var categoryHandle = document.getElementById("category");

        for (var i = 0; i < categories.length - 1; i++) {
            var cat = categories[i].split(",");
            list.push(cat[1]);
        }


        for (var i = 0; i < list.length; i++) {
            categoryHandle.options[i] = new Option(list[i]);
        }

        get_product_by_vendor((1));
    }

    $(function() {
        var availableTags = [
            "Anne Klein",
            "Bvlgari",
            "Buccellati",
            "Chopard",
            "Harry Winston",
            "Mikimoto",
            "Van Cleef & Arpels",
            "Anklets",
            "Bangles",
            "Bracelets",
            "Earrings",
            "Necklaces",
            "Rings",
            "Pearls"
        ];
        $("#product_name").autocomplete({
            source: availableTags
        });
    });

    $('#search_product').on('click', function() {
        window.location = "/jadrn019/search.html?search=" + $('#product_name').val();
    });


    $('#vendor').on('change', function() {
        selVendor = $('select[name="vendor"]')[0].selectedIndex;
        get_product_by_vendor((selVendor + 1));
    });

    $('#category').on('change', function() {
        selVendor = $('select[name="vendor"]')[0].selectedIndex;
        get_product_by_vendor((selVendor + 1));
    });

    $('#sku').on('focus', function() {
        $('#qty').val("");
        var product = $('#sku').val();
        var res = product.split("|");
        get_product_info(res[1]);

    });

    $('#sku').on('click', function() {
        $('#qty_box').show();
        $('#addButton').show();
        $('#quantityButton').show();
	    $('#qty').val("");
        var product = $('#sku').val();
        var res = product.split("|");
        get_product_info(res[1]);

    });


    $('#addButton').on('click', function() {
        var quantity = $('#qty').val();
        var type = document.getElementById("vendor").value;
        if (type == -1) {
            alert("Pick a Product !")
        } else {
            if (quantity == "" || quantity == 0) {
                alert("Fill Quantity Field ! (Minimum: 1)");
            } else if (isNaN(quantity) || quantity < 0) {
                alert("Invalid Quantity Provided");
            } else {
                var product = $('#sku').val();
                var res = product.split("|");
                var price = get_product_price(res[1]);
                var chocolate = type + "--" + $('#category').val() + '(' + res[1] + ')';

                cart.add(chocolate, quantity, price);
                updateDisplay();
            }
        }
    });

    $('#quantityButton').on('click', function() {
        var quantity = $('#qty').val();
        var type = document.getElementById("vendor").value;

        if (quantity == "" || quantity == 0) {
            alert("Fill Quantity Field ! (Minimum: 1)");
        } else if (isNaN(quantity) || quantity < 0) {
            alert("Invalid Quantity Provided");
        } else {
            var product = $('#sku').val();
            var res = product.split("|");
            var price = get_product_price(res[1]);
            var chocolate = type + "--" + $('#category').val() + '(' + res[1] + ')';
            cart.setQuantity(chocolate, quantity, price);
            updateDisplay();
        }
    });

    $('input[type=image][class=deleteButton]').on('click', function() {
        var currentSku = $(this).attr('id');
        cart.delete(currentSku);
        $('#count').text(cart.size());
        if (cart.size() == 0) {
            $('#order_button').hide();
        } else {
            $('#order_button').show();
        }

        updateDisplay();
    });


    $('input[type=image][class=changeButton]').on('click', function() {
        var currentSku = $(this).attr('id');
        var res = currentSku.split("(");
        res[1] = res[1].replace(/[)]/g, '')
        var currentQty = $("input[class=qty][id=" + res[1] + "]").val();
        currentQty = parseInt(currentQty, 10);
        var price = get_product_price(res[1]);

        if (isNaN(currentQty) || currentQty < 0) {

            alert("Invalid Quantity Provided");

            var qtyCart = cart.setQuantity(currentSku, 1, price);
            $('#count').text(cart.size());

        } else if (currentQty == "" || currentQty == 0) {

            alert("Provide Quantity (Minimum: 1)");

            var qtyCart = cart.setQuantity(currentSku, 1, price);
            $('#count').text(cart.size());

        } else {
            var available = 0;
            for (var x = 0; x < onhand_data.length; x++) {
                if (onhand_data[x][0] == res[1]) {
                    available = onhand_data[x][2];
                }
            }

            if (currentQty > available) {

                alert("Only " + available + " of this product in stock !");

                var qtyCart = cart.setQuantity(currentSku, available, price);
                $('#count').text(cart.size());
            } else {
                var qtyCart = cart.setQuantity(currentSku, currentQty, price);
                $('#count').text(cart.size());
            }


            if (cart.size() == 0) {
                $('#order_button').hide();
            } else {
                $('#order_button').show();
            }
        }

        updateDisplay();
    })


    function updateDisplay() {
        var cartArray = cart.getCartArray();

        if (cartArray.length == 0) {
            var handle = document.getElementById('cart');
            handle.innerHTML = '<div id="no_cart"><h2>Your Cart is Empty ! Check <a href="product.html"><span class="makered">Collection</span></a>Section !</h2> <br/></div>';
            return;
        }
        var amount = 0;
        var toWrite = "<table>";
        toWrite += "<tr><th>Delete</th><th>Image</th><th>Product Picked</th><th>Quantity</th><th>Price</th></tr>";
        for (i = 0; i < cartArray.length; i++) {

            var res = cartArray[i][0].split("(");
            res[1] = res[1].replace(/[)]/g, '');

            toWrite += "<tr>";
            toWrite += "<td><input type='image' src='css/del.png' align='middle'  alt='Delete' class='deleteButton' title='Delete Product From Cart'  id='" + cartArray[i][0] + "'/></td>";

            for (var x = 0; x < proj3_data.length; x++) {
                if (proj3_data[x][0] == res[1])
                    toWrite += '<td><img align="middle" src=\'/~jadrn019/upload_imgs/' + proj3_data[x][8] + '\' alt=\'' + proj3_data[x][3] + '\'height="70px"  width="70px"/></td>';
            }

            toWrite += "<td class='choconame'>" + cartArray[i][0] + "</td>";


            //  var res = cartArray[i][0].split("(");
            //  res[1] = res[1].replace(/[)]/g,'')
            toWrite += "<td><input type='text' size='3' maxlength='4' value='" + cartArray[i][1] + "' class='qty' id='" + res[1] + "'/>";
            toWrite += "<input type='image' src='css/update.png' align='middle'  alt='Update' class='changeButton' title='Update Quantity in Cart'  id='" + cartArray[i][0] + "'/>";
            toWrite += "</td>";

            // toWrite += "<td>"+cartArray[i][1]+"</td>"; 
            toWrite += "<td>" + cartArray[i][2] + "</td>";
            toWrite += "</tr>";
            //  alert(cartArray[i][2]);
            amount = amount + parseFloat(cartArray[i][2], 10);
        }

        var amount1 = amount.toFixed(2);
        toWrite += "</table>";
        var cartsize = cart.size();
        var shippingcost = cartsize * 5;
        var taxcost = amount1 * 0.08;

        var taxamount = taxcost + shippingcost + amount;
        taxamount = taxamount.toFixed(2);
        toWrite += "<hr><br /><strong>Total (Before Tax Amount)&nbsp;&nbsp;: <span class='makewhite'>$" + amount1 + "</span></strong>";
        toWrite += "<br/> <strong> Tax Rate ( 8% of Total)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <span class='makewhite'>$" + taxcost.toFixed(2) + " </span></strong>";
        toWrite += "<br/> <strong >Shipping Cost (5$ for each)&nbsp;&nbsp;: <span class='makewhite'>$" + shippingcost + "</span></strong>";
        toWrite += "<br/> <strong> Grand Total (Tax + Shipping): <span class='makewhite'>$" + taxamount + "</span></strong>";
        $('#cart').hide();
        $('#cart').html(toWrite);
        $('#cart').slideDown();
        $('#count').text(cart.size());

        if (amount == 0) {
            $('#cart').hide();
            $('#order_button').hide();
        } else {
            $('#cart').show();
            $('#order_button').show();
        }
    }

    $("#dialog-modal").dialog({
        height: 1000,
        width: 1000,
        resizable: false,
        modal: true,
        autoOpen: false
    });

    $("#dialog-modal1").dialog({
        height: 1000,
        width: 1000,
        resizable: false,
        modal: true,
        autoOpen: false
    });

    function get_date() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }




    $('#order_button').bind('click', function($e) {
        var cartArray = cart.getCartArray();
        toWrite = "";
        var amount = 0;
        var count = 0;
        for (i = 0; i < cartArray.length; i++) {
            cartArray[i][0] = cartArray[i][0].replace(/[)]/g, '')
            var res = cartArray[i][0].split("(");
            toWrite += "<input type='hidden' name='p_name" + (i + 1) + "' value='" + res[0] + "'>";
            toWrite += "<input type='hidden' name='p_sku" + (i + 1) + "' value='" + res[1] + "'>";
            toWrite += "<input type='hidden' name='quantity" + (i + 1) + "' value='" + cartArray[i][1] + "'>";
            toWrite += "<input type='hidden' name='price" + (i + 1) + "' value='" + cartArray[i][2] + "'>";
            var cprice = get_cp(res[1]);
            var cp = cprice * cartArray[i][1];
            toWrite += "<input type='hidden' name='cp" + (i + 1) + "' value='" + cp + "'>";
            count++;
            amount = amount + parseFloat(cartArray[i][2], 10);
        }
        var cartsize = cart.size();
        var shippingcost = cartsize * 5;
        var taxcost = amount * 0.08;
        var taxamount = taxcost + shippingcost + amount;

        toWrite += "<input type='hidden' name='tax' value=" + taxcost.toFixed(2) + ">";
        toWrite += "<input type='hidden' name='shipping' value=" + shippingcost + ">";
        toWrite += "<input type='hidden' name='total' value=" + taxamount.toFixed(2) + ">";
        toWrite += "<input type='hidden' name='count' value=" + count + ">";
        var d = get_date();
        toWrite += "<input type='hidden' name='date' value='" + d + "'>";
        $('#param').html(toWrite);
        $("#dialog-modal").dialog('open');
    });
});


function storeData(response) {
    var tmpArray = explodeArray(response, ';');
    for (var i = 0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i], '|');
        proj3_data[i] = innerArray;
    }
}

function storeOnHandData(response) {
    var tmp = explodeArray(response, ';');
    for (var i = 0; i < tmp.length - 1; i++) {
        secArray = explodeArray(tmp[i], '|');
        onhand_data[i] = secArray;
    }
}




function explodeArray(item, delimiter) {
    tempArray = new Array(1);
    var Count = 0;
    var tempString = new String(item);

    while (tempString.indexOf(delimiter) > 0) {
        tempArray[Count] = tempString.substr(0, tempString.indexOf(delimiter));
        tempString = tempString.substr(tempString.indexOf(delimiter) + 1, tempString.length - tempString.indexOf(delimiter) + 1);
        Count = Count + 1
    }

    tempArray[Count] = tempString;
    return tempArray;
}

function get_product_by_vendor(product) {
    var list = [];
    var skuHandle = document.getElementById("sku");
    var selCategory = $('select[name="category"]')[0].selectedIndex;

    for (var i = skuHandle.length - 1; i >= 0; i--)
        skuHandle.remove(i);


    for (var i = 0; i < proj3_data.length; i++) {
        if ((proj3_data[i][1] == product) && (proj3_data[i][2] == (selCategory + 1))) {
            var prodname = proj3_data[i][2] + ' |' + proj3_data[i][0];
            list.push(prodname);
        }
    }


    for (var i = 0; i < list.length; i++) {
        skuHandle.options[i] = new Option(list[i]);
    }
}


function get_product_price(product) {

    for (var i = 0; i < proj3_data.length; i++) {
        if (proj3_data[i][0] == product) {
            return proj3_data[i][7];
        }
    }

}

function get_cp(product) {

    //  alert(product);
    for (var i = 0; i < proj3_data.length; i++) {
        if (proj3_data[i][0] == product) {
            return proj3_data[i][6];
        }
    }

}


function get_product_info(product) {

    tmpString = "";
    for (var i = 0; i < proj3_data.length; i++) {
        if (proj3_data[i][0] == product) {
            tmpString += '<table id="product"><tr><td>';
            tmpString += '<img align="middle" src=\'/~jadrn019/upload_imgs/' + proj3_data[i][8] + '\' alt=\'' + proj3_data[i][3] + '\'  height="140px" width="140px"/>';
            tmpString += '</td><td><h3>' + proj3_data[i][3] + '</h3>  ';
            tmpString += '<span class="price">(Price: $' + proj3_data[i][7] + ')</span><br/> ';
            tmpString += '' + proj3_data[i][4] + '<br /><span class="price"> Shipping Cost for each item is $5</span></td>';
            tmpString += "<br /><br />";

        }
    }
    var handle = document.getElementById('desc');
    handle.innerHTML = tmpString;
}


function populatedropdown(dayfield, monthfield, yearfield, b_statesfield, s_statesfield) {
    var dayfield = document.getElementById(dayfield);
    var monthfield = document.getElementById(monthfield);
    var yearfield = document.getElementById(yearfield);
    var b_statesfield = document.getElementById(b_statesfield);
    var s_statesfield = document.getElementById(s_statesfield);

    dayfield.options[0] = new Option("Day");
    monthfield.options[0] = new Option("Month");
    yearfield.options[0] = new Option("Year");

    for (var i = 0; i < 31; i++) {
        dayfield.options[i + 1] = new Option(i + 1);
    }

    var monthtext = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    for (var m = 0; m < 12; m++) {
        monthfield.options[m + 1] = new Option(monthtext[m]);
    }

    year = 2015;
    for (var y = 0; y < 10; y++) {
        yearfield.options[y + 1] = new Option(year);
        year++;
    }

    var states = ['California', 'Alabama', ' Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Marianas Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Virgin Islands', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    for (var s = 0; s < 56; s++) {
        b_statesfield.options[s] = new Option(states[s]);
    }

    for (var s = 0; s < 56; s++) {
        s_statesfield.options[s] = new Option(states[s]);
    }
}
