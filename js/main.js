var template = $("#template").html();
var productRow = $("#productRow");
var collection = $("[data-collection]");
window.onload = function () {
  collection.parent().removeClass('active');
  $.ajax({
    url : "shop.json",
    method : "get",
    dataType : "json"
  })
  .done( function (res) {
    displayCollection(res);
    collection.on('click', function () {
      displayCollection.call(this, res);
    });
  });
}

$(".back-to-top").click(function () {
  $("html, body").animate({scrollTop: 0}, 1000);
});


function displayCollection(res) {
  productRow.html("");
  event.preventDefault();
  var col = $(this).data('collection');
      if (col === "male" || col ==="female") {
        var colFilter = res.filter( function (el) {
         return el.colection === col;
       });
       displayProduct(colFilter);
      }else if (col ==="newCol" || col ==="popular" || col ==="action"){
        collection.parent().removeClass('active');
        $(this).parent().addClass('active');
        var colFilter = res.filter(function (el) {
          return el[col];
        });
        displayProduct(colFilter);
      } else {
        displayProduct(res);
      }
  };
function displayProduct(filter) {
  var text = "";
  filter.forEach(function (e) {
    text =  template.replace("{{imgSrc}}", e.imgSrc)
                    .replace("{{altTitle}}", e.productTitle +" "+ e.model)
                    .replace("{{title}}", e.productTitle)
                    .replace("{{model}}", e.model)
                    .replace("{{price}}", e.price);
   productRow.append(text);
 })
};
