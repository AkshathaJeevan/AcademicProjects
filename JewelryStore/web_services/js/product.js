var proj3_data;
var cart;
var vendors;
var categories;
var onhand_data;
var dialog_string;


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


$(document).ready(function() {
    document.getElementById("current").style.color = " #E11A46";

    $('#search_product').on('click', function() {
        window.location = "/jadrn019/search.html?search=" + $('#product_name').val();
    })

    var handle = document.getElementById('content');
    handle.innerHTML = '<img align="middle" src="/~jadrn019/proj1/css/load.gif" id="busy_wait" alt="Product Picture" height="50px" width="50px"/>';

    $('#emptylist').hide();
    cart = new shopping_cart("jadrn019");
    $('.count').html(cart.size());

    $('#view_cart').show();


    proj3_data = new Array();
    onhand_data = new Array();
    categories = new Array();
    vendors = new Array();
    $.get("/jadrn019/servlet/GetProducts", storeData);
    $.get("/jadrn019/servlet/GetOnHand", storeOnHandData);
    $.get("/jadrn019/servlet/GetVendorList", vendor_response);
    $.get("/jadrn019/servlet/GetCategoryList", category_response);

    $('#by_vendor').on('click', function() {
        var ven = vendors[0].split(",");
        var searchingProduct = "Showing: <span class='picked'>All Products of " + ven[1].trim() + "</span>";
        $('#pickedproducts').html(searchingProduct);

        $('#emptylist').hide();
        var handle = document.getElementById('content');
        all_vendors();
        var ven1 = vendors[0].split(",");
        get_product_data(ven1[0]);


    });

    $('#by_category').on('click', function() {


        var cat = categories[0].split(",");
        var searchingProduct = "Showing: <span class='picked'>All Products of type " + cat[1].trim() + "</span>";
        $('#pickedproducts').html(searchingProduct);

        $('#emptylist').hide();
        var handle = document.getElementById('content');
        all_categories();
        var cat1 = categories[0].split(",");
        get_product_data_by_category(cat1[0]);

    })

    $("#dialog-modal").dialog({
        height: 500,
        width: 500,
        modal: true,
        autoOpen: false,
        buttons: [{
            text: "Done",
            click: function() {
                $(this).dialog('close');
            }
        }]
    });

    $('#content').delegate('input.infoButton', 'click', function(event) {
        var selSku = event.target.id;
        dialog_string = get_extra_product_data(selSku);
        var handle = document.getElementById('dialog_content');
        handle.innerHTML = dialog_string;
        $("#dialog-modal").dialog('open');
    });

    $('#listing').on('click', function(event) {

        event.preventDefault();
        event.stopPropagation();
    });


    $('#listing').delegate('input.ven_list_button', 'click', function(event) {
        event.preventDefault();
        event.stopPropagation();

        $('#emptylist').hide();
        get_categories_filter(); //Mini

        var selVendor = event.target.id;

        var searchingProduct = "Showing: <span class='picked'>All Products of " + event.target.value + "</span>";
        $('#pickedproducts').html(searchingProduct);

        get_product_data(selVendor);
        //change_bg_vendor(selVendor);

        //event.preventDefault();

        if (event.defaultPrevented) return;
        //event.stopPropagation();
        //return false;

    });


    $('#listing').delegate('input.cat_list_button', 'click', function(event) {

        event.preventDefault();
        event.stopPropagation();

        $('#emptylist').hide();
        get_vendors_filter(); //Mini

        var selCategory = event.target.id;

        var searchingProduct = "Showing: <span class='picked'>All Products of type " + event.target.value + "</span>";
        $('#pickedproducts').html(searchingProduct);

        get_product_data_by_category(selCategory);



    });



    function vendor_response(response) {
        vendors = response.split("||");
        var ven = vendors[0].split(",");
        var searchingProduct = "Showing: <span class='picked'>All Products of " + ven[1].trim() + "</span>";
        $('#pickedproducts').html(searchingProduct);

        all_vendors();
    }

    function all_vendors() {
        var tmpString = "";
        tmpString += '<ul id="listing_type">';
        for (var i = 0; i < vendors.length - 1; i++) {
            var ven = vendors[i].split(",");
            tmpString += '<li><input type="button" class="ven_list_button" value="' + ven[1] + '" id="' + ven[0] + '" /></li>';
        }
        tmpString += '</ul>';
        var handle = document.getElementById('listing');
        handle.innerHTML = tmpString;
        get_categories_filter();
    }

    function category_response(response) {
        categories = response.split("||");
        get_categories_filter();
    }

    function all_categories() {
        var tmpString = "";
        tmpString += '<ul id="listing_type">';
        for (var i = 0; i < categories.length - 1; i++) {
            var cat = categories[i].split(",");
            tmpString += '<li><input type="button" class="cat_list_button" value="' + cat[1] + '" id="' + cat[0] + '" /></li>';
        }
        tmpString += '</ul>';
        var handle = document.getElementById('listing');
        handle.innerHTML = tmpString;
        get_vendors_filter();
    }


    function get_categories_filter() {
        var filterString = "";
        for (var i = 0; i < categories.length - 1; i++) {
            var cat = categories[i].split(",");
            cat[0] = cat[0].trim();
            cat[1] = cat[1].trim();

        }

        filterString += '<br/><u>By Price</u><br/>';
        filterString += '<input checked type="checkbox" name="prodPrice[]" class="pricefilters" value="$20 or Less" id="price1">&nbsp;&nbsp;$20 or Less<br/>';
        filterString += '<input checked type="checkbox" name="prodPrice[]" class="pricefilters" value="$19 to $49" id="price2">&nbsp;&nbsp;$19 to $49<br/>';
        filterString += '<input checked type="checkbox" name="prodPrice[]" class="pricefilters" value="$50 or More" id="price3">&nbsp;&nbsp;$50 or More<br/>';

        var handle = document.getElementById('listing1');
        handle.innerHTML = filterString;
    }

    function get_vendors_filter() {
        var filterString = "";
        for (var i = 0; i < vendors.length - 1; i++) {
            var ven = vendors[i].split(",");
            ven[0] = ven[0].trim();
            ven[1] = ven[1].trim();

        }

        filterString += '<br/><u>By Price</u><br/>';
        filterString += '<input checked type="checkbox"  name="prodPrice[]" class="pricefilters" value="$20 or Less" id="price1">&nbsp;&nbsp;$20 or Less<br/>';
        filterString += '<input checked type="checkbox"  name="prodPrice[]" class="pricefilters" value="$19 to $49" id="price2">&nbsp;&nbsp;$19 to $49<br/>';
        filterString += '<input checked type="checkbox"  name="prodPrice[]" class="pricefilters" value="$50 or More" id="price3">&nbsp;&nbsp;$50 or More<br/>';


        var handle = document.getElementById('listing1');
        handle.innerHTML = filterString;
    }



    function get_title_for_cart(product) {
        var final_v;
        var final_c;
        for (var i = 0; i < proj3_data.length; i++) {
            if (proj3_data[i][0] == product) {

                for (var x = 0; x < vendors.length; x++) {
                    var ven = vendors[x].split(",");
                    if (proj3_data[i][9] == ven[0].trim()) {
                        final_v = ven[1];
                    }
                }

                for (var y = 0; y < categories.length; y++) {
                    var cat = categories[y].split(",");
                    if (proj3_data[i][2] == cat[0].trim()) {
                        final_c = cat[1];
                    }
                }

                final_v = final_v;
                final_c = final_c.trim();
                var choco = final_v + "--" + final_c;
                return choco;
            }
        }
    }

    $('#listing1').delegate('input.pricefilters', 'change', function(event) {
        var insideText;
        insideText = $("#content").html();
        var selCheckbox = event.target.id;
        var low;
        var high;

        if (selCheckbox == "price1") {
            low = 0;
            high = 20;
        }
        if (selCheckbox == "price2") {
            low = 19;
            high = 49;
        }
        if (selCheckbox == "price3") {
            low = 50;
            high = 9999;
        }


        var productsDisplayed = explodeArray(insideText, '<br><fieldset');
        var productscount = productsDisplayed.length;
        if ($("input[id=" + selCheckbox + "]").is(':checked')) {
            for (var x = 0; x < productsDisplayed.length; x++) {
                var n = productsDisplayed[x].indexOf("id=");
                var newID = productsDisplayed[x].substring(n + 4, n + 11);
                var prodprice = get_product_price(newID);
                if (prodprice >= low && prodprice <= high) {

                    var pos = productsDisplayed[x].indexOf("value=");
                    var prodtitle = productsDisplayed[x].substring(pos + 7, pos + 11);

                    var catType = prodtitle.charAt(0);
                    var prodtitle = $('strong[class=ven-cat][id=' + newID + ']').html();
                    var ven = prodtitle.split("--");
                    var vendor = ven[1].substring(0, 1);

                    var cboxes = document.getElementsByName('brands[]');
                    var len = cboxes.length;
                    for (var i = 0; i < len; i++) {
                        if (cboxes[i].checked) {

                            if (cboxes[i].id.substring(0, 1) == vendor)
                                $("fieldset[class=product_display][id=" + newID + "]").show();
                        }
                    }
                    if ($("input[class=catfilters][id=" + catType + "]").is(':checked'))
                        $("fieldset[class=product_display][id=" + newID + "]").show();
                }
                if ($("fieldset[class=product_display][id=" + newID + "]").is(':hidden'))
                    productscount--;
            }
        } else {
            for (var x = 0; x < productsDisplayed.length; x++) {
                var n = productsDisplayed[x].indexOf("id=");
                var newID = productsDisplayed[x].substring(n + 4, n + 11);
                var prodprice = $("span[class=price][id=" + newID + "]").html();
                prodprice = prodprice.replace(/^\D+/g, '');
                prodprice = prodprice.replace(")", '');

                if (prodprice >= low && prodprice <= high) {
                    $("fieldset[class=product_display][id=" + newID + "]").hide();
                }
                if ($("fieldset[class=product_display][id=" + newID + "]").is(':hidden'))
                    productscount--;
            }
        }

        if (productscount == 0)
            $('#emptylist').show();
        else
            $('#emptylist').hide();

        printFilterList();
    });


    function printFilterList() {
        var filters = "";
        var cboxes1 = document.getElementsByName('brands[]');
        for (var i = 0; i < cboxes1.length; i++) {
            if (cboxes1[i].checked) {
                filters += cboxes1[i].value + " ; ";
            }
        }

        var cboxes2 = document.getElementsByName('prodType[]');
        for (var i = 0; i < cboxes2.length; i++) {
            if (cboxes2[i].checked) {
                filters += cboxes2[i].value + " ; ";
            }
        }

        var first = 0;
        var cboxes3 = document.getElementsByName('prodPrice[]');
        for (var i = 0; i < cboxes3.length; i++) {
            if (cboxes3[i].checked) {
                if (first == 0) {
                    first = 1;
                    filters += "<br/><span class='price'>In Price Range: </span>"
                }
                filters += cboxes3[i].value + " ; ";
            }
        }


        if (filters == "")
            var searchingProduct = "Showing: <span class='picked'>None</span>";
        else
            var searchingProduct = "Showing: <span class='picked'>" + filters + "</span>";
        $('#pickedproducts').html(searchingProduct);
    }


    $('#listing1').delegate('input.catfilters', 'change', function(event) {
        var insideText;
        insideText = $("#content").html();
        var selCheckbox = event.target.id;

        var productsDisplayed = explodeArray(insideText, '<br><fieldset');
        var productscount = productsDisplayed.length;
        if ($("input[id=" + selCheckbox + "]").is(':checked')) {
            for (var x = 0; x < productsDisplayed.length; x++) {
                var pos = productsDisplayed[x].indexOf("value=");
                var prodtitle = productsDisplayed[x].substring(pos + 7, pos + 11);
                var catType = prodtitle.charAt(0);

                var n = productsDisplayed[x].indexOf("id=");
                var newID = productsDisplayed[x].substring(n + 4, n + 11);

                if (catType == selCheckbox) {
                    var prodprice = get_product_price(newID);
                    for (var z = 1; z < 4; z++) {
                        var p = "price" + z;

                        if (z == 1) {
                            low = 0;
                            high = 20;
                        }
                        if (z == 2) {
                            low = 19;
                            high = 49;
                        }
                        if (z == 3) {
                            low = 50;
                            high = 9999;
                        }

                        if ($("input[id=" + p + "]").is(':checked') && (prodprice >= low && prodprice <= high))
                            $("fieldset[class=product_display][id=" + newID + "]").show();
                    }
                }
                if ($("fieldset[class=product_display][id=" + newID + "]").is(':hidden'))
                    productscount--;
            }
        } else {
            for (var x = 0; x < productsDisplayed.length; x++) {
                var pos = productsDisplayed[x].indexOf("value=");
                var prodtitle = productsDisplayed[x].substring(pos + 7, pos + 11);
                var catType = prodtitle.charAt(0);

                var n = productsDisplayed[x].indexOf("id=");
                var newID = productsDisplayed[x].substring(n + 4, n + 11);

                if (catType == selCheckbox)
                    $("fieldset[class=product_display][id=" + newID + "]").hide();

                if ($("fieldset[class=product_display][id=" + newID + "]").is(':hidden'))
                    productscount--;

            }
        }

        if (productscount == 0)
            $('#emptylist').show();
        else
            $('#emptylist').hide();


        printFilterList();
    });


    $('#listing1').delegate('input.venfilters', 'change', function(event) {
        var selCheckbox = event.target.value;
        var cbID = event.target.id;
        selCheckbox = selCheckbox.toLowerCase().trim;
        selCheckbox = selCheckbox.substring(0, 2);

        var insideText;
        insideText = $("#content").html();
        var productsDisplayed = explodeArray(insideText, '<br><fieldset');
        var productscount = productsDisplayed.length;

        if ($("input[id=" + cbID + "]").is(':checked')) {
            for (var x = 0; x < productsDisplayed.length; x++) {
                var n = productsDisplayed[x].indexOf("id=");
                var newID = productsDisplayed[x].substring(n + 4, n + 11);
                var pos = productsDisplayed[x].indexOf("value=");
                var prodtitle = productsDisplayed[x].substring(pos + 7, pos + 11);
                var catType = prodtitle.charAt(0);
                var ven = prodtitle.split("--");
                var vendor = ven[1].substring(0, 1);

                if (vendor == selCheckbox) {
                    var prodprice = get_product_price(newID);
                    for (var z = 1; z < 4; z++) {
                        var p = "price" + z;

                        if (z == 1) {
                            low = 0;
                            high = 20;
                        }
                        if (z == 2) {
                            low = 19;
                            high = 49;
                        }
                        if (z == 3) {
                            low = 50;
                            high = 9999;
                        }

                        if ($("input[id=" + p + "]").is(':checked') && (prodprice >= low && prodprice <= high))
                            $("fieldset[class=product_display][id=" + newID + "]").show();
                    }
                }

                if ($("fieldset[class=product_display][id=" + newID + "]").is(':hidden'))
                    productscount--;
            }

        } else {
            for (var x = 0; x < productsDisplayed.length; x++) {
                var n = productsDisplayed[x].indexOf("id=");
                var newID = productsDisplayed[x].substring(n + 4, n + 11);
                var lowerID = newID.toLowerCase();

                var pos = productsDisplayed[x].indexOf("value=");
                var prodtitle = productsDisplayed[x].substring(pos + 7, pos + 11);
                var catType = prodtitle.charAt(0);
                var ven = prodtitle.split("--");
                var vendor = ven[1].substring(0, 1);

                if (vendor == selCheckbox)
                    $("fieldset[class=product_display][id=" + newID + "]").hide();

                if ($("fieldset[class=product_display][id=" + newID + "]").is(':hidden'))
                    productscount--;
            }
        }

        if (productscount == 0)
            $('#emptylist').show();
        else
            $('#emptylist').hide();

        printFilterList();
    });


    $('#content').delegate('input.deleteButton', 'click', function(event) {

        var currentSku = event.target.id;
        var title = get_title_for_cart(currentSku);
        var chocolate = title + '(' + currentSku + ')';

        var update = cart.delete(chocolate);
        $('#count').text(cart.size());
        if (update == true) {
            var name = "msg" + currentSku;
            var handle = document.getElementById(name);
            handle.style.display = "inline";
            handle.innerHTML = "All items of this Product Deleted from Cart";
        }
        if (cart.size() == 0) {
            $('#view_cart').hide();
        } else {
            $('#view_cart').show();
        }
    });

    //$('input[type=image][class=changeButton]').on('click', function() 

    $('#content').delegate('input.changeButton', 'click', function(event) {
        var currentSku = event.target.id;

        var currentQty = $("input[class=qty][id=" + currentSku + "]").val();

        if (isNaN(currentQty) || currentQty < 0) {

            alert("Invalid Quantity Provided");
        } else if (currentQty == "" || currentQty == 0) {
            alert("Provide Quantity (Minimum: 1)");
        } else {

            var title = get_title_for_cart(currentSku);
            var price = get_product_price(currentSku);
            var chocolate = title + '(' + currentSku + ')';

            var available = 0;
            for (var x = 0; x < onhand_data.length; x++) {
                if (onhand_data[x][0] == currentSku) {
                    available = onhand_data[x][2];
                }
            }

            if (parseInt(currentQty, 10) > available) {
                alert("Only " + available + " of this product in stock !");
            } else {
                var qtyCart = cart.setQuantity(chocolate, currentQty, price);
                $('#count').text(cart.size());
                if (qtyCart) {
                    var name = "msg" + currentSku;
                    var handle = document.getElementById(name);
                    handle.style.display = "inline";
                    //handle.innerHTML = qtyCart + " of this Product in Cart";
                }
            }

            if (cart.size() == 0) {
                $('#view_cart').hide();
            } else {
                $('#view_cart').show();
            }
        }

    })



    $('#content').delegate('input.addButton', 'click', function(event) {
        var currentSku = event.target.id;

        var currentQty = $("input[class=qty][id=" + currentSku + "]").val();

        if ((/^Q_/).test(currentSku)) {
            currentSku = currentSku.substring(2);
        }

        if (isNaN(currentQty) || currentQty < 0) {
            alert("Invalid Quantity Provided");
        } else if (currentQty == "" || currentQty == 0) {
            alert("Provide Quantity (Minimum: 1)");
        } else {
            var available = 0;
            for (var x = 0; x < onhand_data.length; x++) {
                if (onhand_data[x][0] == currentSku) {
                    available = onhand_data[x][2];
                }
            }

            var title = get_title_for_cart(currentSku);
            var price = get_product_price(currentSku);
            var chocolate = title + '(' + currentSku + ')';
            var inCart = cart.find(chocolate);
            var newTotal = parseInt(currentQty, 10) + parseInt(inCart, 10);

            if (newTotal > available) {
                alert("Only " + available + " of this product in stock !");
            } else {
                var qtyCart = cart.add(chocolate, currentQty, price);
                $('#count').text(cart.size());
                var name = "msg" + currentSku;
                var handle = document.getElementById(name);
                handle.style.display = "inline";
                handle.innerHTML = qtyCart + " of this Product in Cart";
            }
            if (cart.size() == 0) {
                $('#view_cart').hide();
            } else {
                $('#view_cart').show();
            }
        }
    })



    $('#dialog_content').delegate('input.addButton', 'click', function(event) {

        var currentSku = event.target.id;

        if ((/^Q_/).test(currentSku)) {
            currentSku = currentSku.substring(2);
        }
        var currentQty = $("input[class=qty][id=" + currentSku + "]").val();

        if (isNaN(currentQty) || currentQty < 0) {
            alert("Invalid Quantity Provided" + currentQty);
        } else if (currentQty == "" || currentQty == 0) {
            alert("Provide Quantity (Minimum: 1)" + currentQty);
        } else {
            var available = 0;
            for (var x = 0; x < onhand_data.length; x++) {
                if (onhand_data[x][0] == currentSku) {
                    available = onhand_data[x][2];
                    break;
                }
            }

            var title = get_title_for_cart(currentSku);
            var price = get_product_price(currentSku);
            var chocolate = title + '(' + currentSku + ')';
            var inCart = cart.find(chocolate);
            var newTotal = parseInt(currentQty, 10) + parseInt(inCart, 10);

            if (newTotal > available) {
                alert("Only " + available + " of this product in stock !");
            } else {
                var qtyCart = cart.add(chocolate, currentQty, price);
                $('#count').text(cart.size());

                var dialogname = "dialog" + currentSku;
                var handle = document.getElementById(dialogname);
                handle.style.display = "inline";
                handle.innerHTML = qtyCart + " of this Product in Cart";

                var name = "msg" + currentSku;
                var handle = document.getElementById(name);
                handle.style.display = "inline";
                handle.innerHTML = qtyCart + " of this Product in Cart";
            }
            if (cart.size() == 0) {
                $('#view_cart').hide();
            } else {
                $('#view_cart').show();
            }
        }
    })


});

function get_product_price(product) {
    for (var i = 0; i < proj3_data.length; i++) {
        if (proj3_data[i][0] == product) {
            return proj3_data[i][10];
        }
    }
}

function get_product_vendor(product) {
    for (var i = 0; i < proj3_data.length; i++) {
        if (proj3_data[i][0] == product) {
            var final_v;

            for (var x = 0; x < vendors.length - 1; x++) {
                var ven = vendors[x].split(",");
                if (proj3_data[i][1] == ven[0].trim()) {
                    final_v = ven[1];
                }
            }

            final_v = final_v.trim();
            return final_v;
        }
    }
}


function get_product_category(product) {
    for (var i = 0; i < proj3_data.length; i++) {
        if (proj3_data[i][0] == product) {

            var final_c;

            for (var y = 0; y < categories.length - 1; y++) {
                var cat = categories[y].split(",");
                if (proj3_data[i][2] == cat[0].trim()) {
                    final_c = cat[1];
                }
            }

            final_c = final_c.trim();


            return final_c;
        }
    }
}

function get_product_title(product) {

    var title = get_product_vendor(product) + "--" + get_product_category(product);
    return title;
}




function storeData(response) {

    var tmpArray = explodeArray(response, ';');
    for (var i = 0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i], '|');
        proj3_data[i] = innerArray;
    }

    var delay = 1000; //1 seconds
    setTimeout(function() {
        var ven1 = vendors[0].split(",");
        get_product_data(ven1[0]);
    }, delay);
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

function get_product_data(product) {
    var foundresult = 0;
    tmpString = "";
    for (var i = 0; i < proj3_data.length; i++) {
        if (proj3_data[i][2] == product.trim()) {

            foundresult = 1;
            var title = proj3_data[i][0];
            var p_cat = get_product_category(proj3_data[i][0]);

            tmpString += '<fieldset id="' + proj3_data[i][0] + '" class="product_display"><legend class="heading">' + p_cat + '</legend>';
            tmpString += '<table> <tr><td>'
            tmpString += '<img align="middle" src=\'/~jadrn019/upload_imgs/' + proj3_data[i][8] + '\' alt=\'' + proj3_data[i][3] + '\'  height="150px" width="150px"/>';
            tmpString += '<span class="price" id="' + proj3_data[i][0] + '">(Price: $' + proj3_data[i][7] + ')</span> <br/>';
            tmpString += '<input type="button" value="Shop now" align="middle" class="infoButton" id="' + proj3_data[i][0] + '"/>';
            var flag = 0;

            for (var x = 0; x < onhand_data.length; x++) {
                if (onhand_data[x][0] == proj3_data[i][0]) {
                    flag = 1;
                    if (onhand_data[x][2] > 0) {
                        tmpString += "<br/><input type='text' size='4' maxlength='4' value='1' class='qty' id='" + proj3_data[i][0] + "'/>";
                        tmpString += "<input type='image' src='/jadrn019/css/add.png' align='middle'  alt='Add to Cart'  class='addButton' title='Add Product to Cart' id='" + proj3_data[i][0] + "'/>";
                        tmpString += "<input type='image' src='/jadrn019/css/del.png' align='middle'  alt='Delete All' class='deleteButton' title='Delete Product From Cart'  id='" + proj3_data[i][0] + "'/>";
                    } else if (onhand_data[x][2] == 0) {
                        tmpString += "<br/><span class='avail_status' id='status" + proj3_data[i][0] + "'>More on the way !</span> </td>";
                    }
                }
            }

            if (flag == 0)
                tmpString += "<br/><span class='avail_status' id='status" + proj3_data[i][0] + "'> On the way !!</span> </td>";

            var chocolate = title + '(' + proj3_data[i][0] + ')';
            var qtyCart = cart.find(chocolate);
            if (qtyCart == 0) {
                tmpString += "<span class='msg' id='msg" + proj3_data[i][0] + "'></span> </td>";
            } else {
                var cartValue = qtyCart + " of this Product in Cart";
                tmpString += "<span style='display:inline;' class='msg' id='msg" + proj3_data[i][0] + "'>" + cartValue + "</span> </td>";
            }

            tmpString += "</tr></table></fieldset><td>";
        }
    }

    if (foundresult == 0)
        tmpString = '<div class="price">Jewels Out of stock of this Vendor !</div>';

    var handle = document.getElementById('content');
    handle.innerHTML = tmpString;
}


function get_product_data_by_category(product) {
    var foundresult = 0;
    tmpString = "";
    for (var i = 0; i < proj3_data.length; i++) {
        if (proj3_data[i][2] == product.trim()) {

            foundresult = 1;
            var title = proj3_data[i][0];
            var p_ven = get_product_vendor(proj3_data[i][0]);
            tmpString += '<fieldset  id="' + proj3_data[i][0] + '" class="product_display"><legend class="heading">' + p_ven + '</legend>';
            tmpString += '<table "><tr><td>'
            tmpString += '<img align="middle" src=\'/~jadrn019/upload_imgs/' + proj3_data[i][8] + '\' alt=\'' + proj3_data[i][3] + '\'  height="150px" width="150px"/>';


            tmpString += '<span class="price" id="' + proj3_data[i][0] + '">(Price: $' + proj3_data[i][7] + ')</span><br/> ';
            tmpString += '<input type="button" value="Shop now" align="middle" class="infoButton" id="' + proj3_data[i][0] + '"/>';


            var flag = 0;

            for (var x = 0; x < onhand_data.length; x++) {
                if (onhand_data[x][0] == proj3_data[i][0]) {
                    flag = 1;
                    if (onhand_data[x][2] > 0) {
                        tmpString += "<br/><input type='text' size='4' maxlength='4' value='1' class='qty' id='" + proj3_data[i][1] + "'/>";
                        tmpString += "<input type='image' src='/jadrn019/css/add.png' align='middle'  alt='Add to Cart'  class='addButton' title='Add Product to Cart' id='" + proj3_data[i][0] + "'/>";
                        tmpString += "<input type='image' src='/jadrn019/css/del.png' align='middle'  alt='Delete All' class='deleteButton' title='Delete Product From Cart'  id='" + proj3_data[i][0] + "'/>";
                    } else if (onhand_data[x][2] == 0) {
                        tmpString += "<br/><span class='avail_status' id='status" + proj3_data[i][0] + "'> More on the way !</span> </td>";
                    }
                }

            }

            if (flag == 0)
                tmpString += "<br/><span class='avail_status' id='status" + proj3_data[i][0] + "'> On the Way!!!</span> </td>";
            var chocolate = title + '(' + proj3_data[i][0] + ')';
            var qtyCart = cart.find(chocolate);
            if (qtyCart == 0) {
                tmpString += "<span class='msg' id='msg" + proj3_data[i][0] + "'></span> </td>";
            } else {
                var cartValue = qtyCart + " of this Product in Cart";
                tmpString += "<span style='display:inline;' class='msg' id='msg" + proj3_data[i][0] + "'>" + cartValue + "</span> </td>";
            }

            tmpString += "</tr></table></fieldset>";
        }
    }

    if (foundresult == 0)
        tmpString = '<div class="price">No product found of this category!</div>';

    var handle = document.getElementById('content');
    handle.innerHTML = tmpString;
}




function get_extra_product_data(product) {
    tmpString = "";
    for (var i = 0; i < proj3_data.length; i++) {
        if (proj3_data[i][0] == product) {

            var title = proj3_data[i][0];
            tmpString += '<table><tr><td>'
            tmpString += '<img align="middle" src=\'/~jadrn019/upload_imgs/' + proj3_data[i][8] + '\' alt=\'' + proj3_data[i][3] + '\'  height="200px" width="200px"/>';
            tmpString += '</td><td rowspan="2">';
            tmpString += '<div class="details"><u>Product:</u><strong>&nbsp;&nbsp;' + title + '</strong></div><br/>'
            tmpString += '<div class="details"><u>Description:</u><br/> <strong>' + proj3_data[i][5] + '</strong></div><br/>';
            tmpString += '<br/><div class="details"><u>Features: </u><br/><strong>' + proj3_data[i][5] + '</strong> </div>';


            var flag = 0;

            for (var x = 0; x < onhand_data.length; x++) {
                if (onhand_data[x][0] == proj3_data[i][0]) {
                    flag = 1;
                    if (onhand_data[x][2] > 0) {

                        tmpString += "</td></tr><tr><td><br/><input type='text' size='4' maxlength='4' value='1' class='qty' id='Q_" + proj3_data[i][1] + "'/>";
                        tmpString += "<input type='image' src='/jadrn019/css/add1.png' align='middle' alt='Add'  class='addButton' title='Add Product to Cart' id='Q_" + proj3_data[i][0] + "'/>";
                    } else if (onhand_data[x][2] == 0) {
                        tmpString += "</td></tr><tr><td><br/><span class='dialog_avail_status' id='status" + proj3_data[i][0] + "'> More on the way !</span>";
                    }
                }

            }

            if (flag == 0)
                tmpString += "</td></tr><tr><td><br/><span class='dialog_avail_status' id='status" + proj3_data[i][0] + "'> Coming Soon !</span>";

            tmpString += '<br/><br/><span class="price">Price: $' + proj3_data[i][7] + '</span><br/><span class="price"> Shipping Cost: $5</span> ';
            tmpString += "</td>";
            tmpString += "<br/><span class='dialogmsg' id='dialog" + proj3_data[i][0] + "'></span> </td>";
            tmpString += "</tr></table><br />";
        }
    }

    return tmpString;
}
