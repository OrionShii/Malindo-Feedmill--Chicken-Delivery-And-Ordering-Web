$(window).load(function(){
    $('.preloader').fadeOut(1000);
});

$(function() {
    new WOW().init();
    $('.templatemo-nav').singlePageNav({
    	offset: 70
    });

    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
})