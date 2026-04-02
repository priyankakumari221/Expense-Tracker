let slideIndex = 0;
let slides = document.querySelectorAll(".slide");

function nextSlide(){

slides[slideIndex].classList.remove("active");

slideIndex++;

slides[slideIndex].classList.add("active");

}

function startApp(){

window.location.href="index1.html";

}