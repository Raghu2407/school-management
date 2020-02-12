$(document).ready(function () {
    $(".carousel.carousel-slider").carousel({
        fullWidth: true,
        indicators: false,
    });
    setInterval(function () {
        $(".carousel").carousel("next");
    }, 3000);



    $(".carousels.carousel-sliders").carousel();

    $(".modal").modal();
    $('.parallax').parallax();
    $('.scrollspy').scrollSpy({
        activeClass: "active",
        scrollOfffset: 10,
    });
    $('.sidenav').sidenav();
    $('.tabs').tabs();
    $('.materialboxed').materialbox();
});

$('.slider').owlCarousel({
    items: 3,
    singleItem: true,
    nav: true,
    dots: false,
    loop: true,
    autoPlay: 3000
});

$(window).scroll(function () {
    $('.navbar').removeClass('nav-display');
    if ($(document).scrollTop() > 1) {
        $('.navbar').addClass('navbar-fixed');

    } else {
        $('.navbar').removeClass('navbar-fixed');
        $('.navbar').addClass('nav-display');
    }
});

var owl = $('.owl-carousel');
owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true
});
$('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [1000])
})
$('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
})

$("#typed").typed({
    strings: ["VPS<span class='blue-text text-darken-4'> B.Ed</span> College Ramdurg."],
    typeSpeed: 200,
    startDelay: 0,
    // backSpeed: 0,
    // backDelay: 1000,
    loop: false,
    cursorChar: "",
    contentType: 'html'
});

// When the user scrolls the page, execute myFunction
window.onscroll = function () { myFunction() };

function myFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(function (registration) {
            console.log('Registered:', registration);
        })
        .catch(function (error) {
            console.log('Registration failed: ', error);
        });
}

//notification
Notification.requestPermission(function (status) {
    console.log('Notification permission status:', status);
});



function displayNotification() {
    if (Notification.permission == 'granted') {
        navigator.serviceWorker.getRegistration().then(function (reg) {
            var options = {
                body: 'Here is a notification body!',
                icon: 'images/example.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                },
                actions: [
                    {
                        action: 'explore', title: 'Explore this new world',
                        icon: 'images/checkmark.png'
                    },
                    {
                        action: 'close', title: 'Close notification',
                        icon: 'images/xmark.png'
                    },
                ]
            };
            reg.showNotification('Hello world!', options);
        });
    }
}