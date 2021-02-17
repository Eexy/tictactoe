const nextBtn = document.querySelectorAll('.next');
const previousBtn = document.querySelectorAll('.previous-link');
const main = document.querySelector('main');
const pawnSelectors = document.querySelectorAll('.pawn-selector');

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

pawnSelectors.forEach((selector) => {
    selector.addEventListener('click', () => {
        const element = document.querySelector('.board');
        if(selector.getAttribute('id') === "cross-selector"){
            new Tictactoe(element, ['cross.svg', 'circle.svg']);
        }else{
            new Tictactoe(element, ['circle.svg', 'cross.svg']);
        }
    });
})

nextBtn.forEach((btn) => {
    btn.addEventListener('click', next)
})

previousBtn.forEach((btn) => {
    btn.addEventListener('click', previous);
})

