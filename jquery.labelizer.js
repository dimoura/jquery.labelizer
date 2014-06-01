(function($){
  $.fn.labelizer = function(){
    // private
    function span(el){
      // create span
      var span = $(document.createElement('span')).css({
        position:   'absolute',
        display:    'none',
        height:     el.height(),
        lineHeight: el.outerHeight() + 'px',
        fontFamily: el.css('font-family'),
        left:       el.offset().left
      }).addClass('labelizer-input').text(el.attr('placeholder'));

      // save attributes
      el.data('labelizer-placeholder', el.attr('placeholder'));
      if(!el.data('labelizer-fontSize')){
        el.data('labelizer-fontSize', span.css('font-size'));
      }

      // insert
      el.before(span);
      return span;
    }

    return this.each(function(){
      var $el = $(this),
          $span = span($el);

      $el.on('focus', function(){
        $el.attr('placeholder', '');
        $span.show().stop().animate({
          fontSize:   $el.data('labelizer-fontSize'),
          lineHeight: '100%',
          top:        $el.offset().top - $span.height(),
        }, 200);
      });

      $el.on('blur', function(){
        $span.stop().animate({
          top:        $el.offset().top,
          fontSize:   0,
          lineHeight: $el.outerHeight()
        }, 100, function(){
          $span.hide().css('marginTop', '');
          $el.attr('placeholder', $el.data('labelizer-placeholder'));
        });
      });
    });
  }
}(jQuery));
