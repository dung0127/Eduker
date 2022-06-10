
(function () {

    $.toast({
        heading: 'Welcome back, '+ localStorage.getItem("username") + '!',
        text: 'You can continue shopping.',
        bgColor: ' #43d477 ',
        textColor: 'white',
        hideAfter: 4000,
        position: 'bottom-right',
        icon: 'success'
    });
})(jQuery)
