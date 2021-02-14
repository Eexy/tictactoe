const nextBtn = document.querySelectorAll('.next');
const previousBtn = document.querySelectorAll('.previous-link');
const main = document.querySelector('main');

let currentPage = 0;

function translate(){
    const ratio = 1 / 3;
    main.style.transform = `translateY(${-currentPage * (100 * ratio)}%)`;
}

function previous(){
    currentPage = (currentPage > 0) ? --currentPage : currentPage;
    translate();
}

function next(){
    currentPage = (currentPage < 2) ? ++currentPage : currentPage;
    translate();
}

nextBtn.forEach((btn) => {
    btn.addEventListener('click', next)
})

previousBtn.forEach((btn) => {
    btn.addEventListener('click', previous);
})

