var proj3_data;
var list = [];
var list_desc = [];
var list_detail = [];
var list_price = [];


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
    document.getElementById("current").style.color = "gray";

    proj3_data = new Array();
    $.get("/jadrn019/servlet/GetProducts", storeData);

    $('#search_product').on('click', function() {
        window.location = "/jadrn019/search.html?search=" + $('#product_name').val();
    })

    $('input[type=button][class=readmore]').on('click', function() {
        var selSku = $(this).attr('id');

        window.location = "/jadrn019/search.html?search=" + selSku;

    });
});


var timerid = 0;
var images = new Array("/jadrn019/css/jew1.jpg",
    "/jadrn019/css/jew2.jpg",
    "/jadrn019/css/jew3.jpg", "/jadrn019/css/jew7.jpg", "/jadrn019/css/jew5.jpg", "/jadrn019/css/jew6.jpg");
var countimages = 0;

function startTime() {
    if (timerid) {
        timerid = 0;
    }
    var tDate = new Date();
    if (countimages == images.length) {
        countimages = 0;
    }
    if (tDate.getSeconds() % 5 == 0) {
        document.getElementById("img1").src = images[countimages];
    }
    countimages++;
    timerid = setTimeout("startTime()", 800);
}



function storeData(response) {
    var tmpArray = explodeArray(response, ';');
    for (var i = 0; i < tmpArray.length; i++) {
        innerArray = explodeArray(tmpArray[i], '|');
        proj3_data[i] = innerArray;
    }
    for (var i = 0; i < proj3_data.length; i++) {
        list.push(proj3_data[i][0]);
        list_desc.push(proj3_data[i][4]);
        list_detail.push(proj3_data[i][8]);
        list_price.push(proj3_data[i][7]);
    }

    get_product_img();
}


function setupPicChange()

{
    keepTime = setTimeout("get_product_img()", 4000);
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

function get_product_img() {

    var randomNumber = Math.floor(Math.random() * 11) % list.length;
    tmpString = "";
    tmpString += '<table id="prod1" class="image_loading"><tr>';
    tmpString += '<td><img align="middle" src=\'/~jadrn019/upload_imgs/' + list_detail[randomNumber] + '\' alt=\'' + list[randomNumber] + '\'height="100px"  width="100px"/>';
    tmpString += '</td><td><h4>' + list_desc[randomNumber] + "</h4><br /><strong>Price: $" + list_price[randomNumber] + '&nbsp;&nbsp;<input type="button" class="readmore" value="More Info" id="' + list[randomNumber] + '"/></strong></td>';
    tmpString += '</tr></table>';
    var handle = document.getElementById('products_img');



    tmpStrng = "";
    tmpStrng += '<table id="prod2" class="image_loading"><tr>';
    tmpStrng += '<td><img align="middle" src=\'/~jadrn019/upload_imgs/' + list_detail[randomNumber + 1] + '\' alt=\'' + list[randomNumber + 1] + '\'height="100px"  width="100px"/>';
    tmpStrng += '</td><td><h4>' + list_desc[randomNumber + 1] + "</h4><br /><strong>Price: $" + list_price[randomNumber + 1] + '&nbsp;&nbsp;<input type="button" class="readmore" value="More Info" id="' + list[randomNumber + 1] + '"/></strong></td>';
    tmpStrng += '</tr></table>'
    var handle1 = document.getElementById('products_img1');


    setupPicChange();
}
