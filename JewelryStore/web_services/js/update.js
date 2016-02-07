
$(document).ready(function() {
var cart = new shopping_cart("jadrn019");
 $('#count').text(cart.size());
if(cart.size()!=0)
{
  $('#view_cart').show();
}
});
