
/* Login Start */

$(function() {

    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

});

/* Login End */






//PARALLAX_SCRIPT START


(function($) {


    $.fn.parallax = function(options) {

        var windowHeight = $(window).height();


        // Establish default settings
        var settings = $.extend({
            speed        : 0.15
        }, options);


        // Iterate over each object in collection
        return this.each( function() {

        // Save a reference to the element
        var $this = $(this);


        // Set up Scroll Handler
        $(document).scroll(function(){


    var scrollTop = $(window).scrollTop();
            var offset = $this.offset().top;
            var height = $this.outerHeight();


    // Check if above or below viewport
if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
return;
}


var yBgPosition = Math.round((offset - scrollTop) * settings.speed);


                // Apply the Y Background Position to Set the Parallax Effect
    $this.css('background-position', 'center ' + yBgPosition + 'px');
                
        });
        });
    }
}(jQuery));

//PARALLAX_SCRIPT END


