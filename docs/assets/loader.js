$(document).ready(function() {
  $.ajax({
    url: 'https://cdn.rawgit.com/liqueurdetoile/DotObjectArray/b5751e68/README.md',
    dataType: 'text',
    success: function(data) {       
      var converter = new showdown.Converter();      
      
      $(".wrapper").html(converter.makeHtml(data));
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
      
      $("h1").nextAll().wrapAll('<div id="content"></div>');
      $("h1").addClass('header');
      $("h1").prevAll().css('text-align','center');
      
    },
    error: function() {
      $(".wrapper").html('unable to load data. Please try again later.');
    },
    complete: function() {
      $('.loader').fadeOut(function() { $('.loader').remove() });
    }
  });
});