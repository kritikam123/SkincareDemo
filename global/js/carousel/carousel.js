let slideIndex = 1;
let slideTimer;

document.addEventListener("DOMContentLoaded", function() {
    showSlides(slideIndex);
    startAutoSlide();
});

function plusSlides(n) {
    clearTimeout(slideTimer);   
    showSlides(slideIndex += n);
    startAutoSlide();           
}

function currentSlide(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex = n);
    startAutoSlide();
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].classList.add("active");
    if (dots.length > 0) {
        dots[slideIndex - 1].className += " active";
    }
}

function startAutoSlide() {
    slideTimer = setTimeout(function() {
        plusSlides(1);
    }, 2000); 
}