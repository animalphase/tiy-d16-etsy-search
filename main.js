console.log('hi');
console.log(jQuery);
/* reading on JSONP :
    http://stackoverflow.com/questions/2067472/what-is-jsonp-all-about */


var $g_searchResultsContentArea = $('.search-results');
var $searchBox = $('#search-box');
var $searchButton = $('#search-button');


$searchButton.on('click', startSearch);

// to be a CLICK EVENT on search submit button
function startSearch(e) {
  console.log(e);
  $searchButton.prop('disabled', true);
  $searchButton.html('Searching…');
  // change to pull in e.target, and to pull in search
  var searchTerm = $searchBox.val();
  if(searchTerm === '') {
    searchTerm = 'butts';
  }
  var formattedTerm = searchTerm.split(' ').join('+');
  var searchURL = 'https://api.etsy.com/v2/listings/active.js?api_key=r1c1d6tcwev6mwp1lny8m1p6&keywords=' +
                  searchTerm +
                  '&includes=Images,Shop';
  var searchQuery = {
    type: 'GET',
    url: searchURL,
    dataType: 'jsonp'
  };
  $.ajax(searchQuery).then(renderSearchResults);

  $g_searchResultsContentArea.html('');
  $g_searchResultsContentArea.prepend('<div class="cp-spinner cp-pinwheel"></div>');
}


function renderSearchResults(data, status, xhr) {
  var results = data.results;
  console.log(results);

  $g_searchResultsContentArea.html('');
  results.forEach(function(item, i, array) {
    var $currentLink = $('<a>');
    $currentLink.addClass('item-link');

    $currentLink.append(  '<div class="item-thumbnail-container">' +
                            '<img src="' + item.Images[0].url_fullxfull +'">' +
                          '</div>');

    $currentLink.append(  '<div class="item-caption">' +
                            '<div class="item-title">' + item.title + '</div>' +
                            '<div class="item-seller-info">' +
                              '<div class="item-shop-name">' + item.Shop.shop_name + '</div>' +
                              '<div class="item-price">' + item.price + '</div>' +
                            '</div>' +
                          '</div>');
    $currentLink.attr('href', item.url);
    $currentLink.attr('title', item.description);

    $g_searchResultsContentArea.append($currentLink);
    $searchButton.prop('disabled', false);
    $searchButton.html('Search');
  });
}




// do the jQuery
$(function () {

  // startSearch();

});










//
