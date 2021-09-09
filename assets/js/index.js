$(document).ready(function () {
    $('.introduce-sub').slideUp(0)
    $('.introduce-title').one('animationend', function (e) {
        $('.introduce-sub').slideDown(700)
    })
//LOADING TO BLOCK
    $('.overlay-loading span').one('animationend',function() {
        setTimeout(()=> {
            $('.overlay').animate({
                left: '-100%',
                opacity: 0
            },1000)
        },1000)
        $('.introduce-title').css({
            'animation':  'slideDown 0.7s forwards  1.5s ease-in-out,'
             + 'textShadow 1s infinite 1s ease'});
    })
//END 
});