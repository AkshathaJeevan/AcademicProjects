var proj3_data;
var cart;
var vendors;
var categories;
var onhand_data;
var toSearch;

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

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

$(document).ready(function() {

    toSearch = getParameterByName('search');
    var searchingProduct = "Search Results for: <span class='makewhite'>" + toSearch + "</span>";
    $('#searchlist').html(searchingProduct);
    $('#emptylist').hide();

    $('#search_product').on('click', function() {
        window.location = "/jadrn019/search.html?search=" + $('#product_name').val();
    })

    cart = new shopping_cart("jadrn019");
    $('#count').text(cart.size());
    if (cart.size() != 0) {
        $('#view_cart').show();
    }

    proj3_data = new Array();
    onhand_data = new Array();

    $.get("/jadrn019/servlet/GetProducts", storeData);
    $.get("/jadrn019/servlet/GetOnHand", storeOnHandData);
    $.get("/jadrn019/servlet/GetVendorList", vendor_response);
    $.get("/jadrn019/servlet/GetCategoryList", category_response);


    function vendor_response(response) {
        vendors = response.split("||");
    }


    function category_response(response) {
        categories = response.split("||");
    }


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
            return proj3_data[i][7];
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
    get_product_data(toSearch);
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

    product = product.toLowerCase();
    var delay = 1000; //1 seconds
    setTimeout(function() {

        $('#busy_wait').hide();
        tmpString = "";
        for (var i = 0; i < proj3_data.length; i++) {
            var hasShown = 0;
            for (var j = 0; j < proj3_data[i].length; j++) {
                var n;
                if (j == 1) {
                    for (var x = 0; x < vendors.length - 1; x++) {
                        var ven = vendors[x].split(",");
                        if (proj3_data[i][1] == ven[0].trim()) {
                            ven[1] = ven[1].trim();
                            var lower1 = ven[1].toLowerCase();
                            n = lower1.search(product);

                        }
                    }

                } else if (j == 2) {
                    for (var y = 0; y < categories.length - 1; y++) {
                        var cat = categories[y].split(",");
                        if (proj3_data[i][2] == cat[0].trim()) {
                            cat[1] = cat[1].trim();
                            var lower1 = cat[1].toLowerCase();
                            n = lower1.search(product);

                        }
                    }


                } else {
                    var lower1 = proj3_data[i][j].toLowerCase();
                    n = lower1.search(product);
                }
                if (n >= 0 && (hasShown == 0)) {
                    hasShown = 1;
                    var title = get_product_title(proj3_data[i][0]);
                    tmpString += '<fieldset id="' + proj3_data[i][0] + '" class="product_display"><legend class="heading">' + proj3_data[i][3] + '</legend>';
                    tmpString += '<table><tr><td>'
                    tmpString += '<img align="middle" src=\'/~jadrn019/upload_imgs/' + proj3_data[i][8] + '\' alt=\'' + proj3_data[i][3] + '\'  height="150px" width="150px"/>';
                    tmpString += '</td><td>';
                    tmpString += '<span class="price" id="' + proj3_data[i][0] + '">(Price: $' + proj3_data[i][7] + ')</span><br/> ';
                    tmpString += '<div class="details"><strong class="ven-cat">' + title + '</strong>';
                    tmpString += '<input type="button" value="Shop Now" align="middle" class="infoButton" id="' + proj3_data[i][0] + '"/>';
                    // tmpString += '<br />'+ proj3_data[i][4] + '</div><span class="price"></span>'; 
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
                        tmpString += "<br/><span class='avail_status' id='status" + proj3_data[i][0] + "'> Coming Soon !</span> </td>";

                    var title = get_product_title(proj3_data[i][0]);
                    var chocolate = title + '(' + proj3_data[i][0] + ')';
                    var qtyCart = cart.find(chocolate);
                    if (qtyCart == 0) {
                        tmpString += "<span class='msg' id='msg" + proj3_data[i][0] + "'></span> </td>";
                    } else {
                        var cartValue = qtyCart + " of this Product in Cart";
                        tmpString += "<span style='display:inline;' class='msg' id='msg" + proj3_data[i][0] + "'>" + cartValue + "</span> </td>";
                    }

                    tmpString += "</tr></table></fieldset><br />";
                }
            }
            if (tmpString == "")
                $('#emptylist').show();
            else
                $('#emptylist').hide();
            var handle = document.getElementById('content');
            handle.innerHTML = tmpString;
        }

    }, delay);
}


function get_extra_product_data(product) {
    tmpString = "";
    for (var i = 0; i < proj3_data.length; i++) {
        if (proj3_data[i][0] == product) {
            var title = get_product_title(proj3_data[i][0]);
            tmpString += '<table><tr><td>'
            tmpString += '<img align="middle" src=\'/~jadrn019/upload_imgs/' + proj3_data[i][8] + '\' alt=\'' + proj3_data[i][3] + '\'  height="170px" width="180px"/>';
            tmpString += '</td><td rowspan="2">';
            tmpString += '<div class="details"><u>Product:</u><strong>&nbsp;&nbsp;' + title + '</strong></div><br/>'
            tmpString += '<div class="details"><u>Description:</u><br/> <strong>' + proj3_data[i][4] + '</strong></div><br/>';
            tmpString += '<br/><div class="details"><u>Features: </u><br/><strong>' + proj3_data[i][5] + '</strong> </div>';


            var flag = 0;

            for (var x = 0; x < onhand_data.length; x++) {
                if (onhand_data[x][0] == proj3_data[i][0]) {
                    flag = 1;
                    if (onhand_data[x][2] > 0) {
                        tmpString += "</td></tr><tr><td><br/><input type='text' size='4' maxlength='4' value='1' class='qty' id='Q_" + proj3_data[i][0] + "'/>";
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

            tmpString += "</tr></table><br />";
        }
    }

    return tmpString;
}
