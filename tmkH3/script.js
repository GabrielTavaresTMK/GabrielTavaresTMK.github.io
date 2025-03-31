let firstCard = null;
let secondCard = null;
let lockBoard = false;

document.addEventListener("DOMContentLoaded", () => {
    let theme = localStorage.getItem("selectedTheme");
    if (!theme) {
        alert("Nenhum tema selecionado! Voltando para a seleção.");
        window.location.href = "selecao.html";
        return;
    }
    startGame(theme);
});

function startGame(theme) {
    let images = [];
    for (let i = 1; i <= 4; i++) {
        images.push(`${theme}0${i}.png`, `${theme}0${i}.png`);
    }
    images.sort(() => Math.random() - 0.5);

    let gameBoard = document.getElementById("gameBoard");
    gameBoard.innerHTML = "";

    for (let imgSrc of images) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.dataset.value = imgSrc;

        let img = document.createElement("img");
        img.src = imgSrc;  
        card.appendChild(img);

        card.onclick = function () { flipCard(card); };
        gameBoard.appendChild(card);
    }
}

function flipCard(card) {
    if (lockBoard || card.classList.contains("revealed")) return;

    card.classList.add("revealed");
    let img = card.querySelector("img");
    img.style.display = "block";

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        lockBoard = true;

        if (firstCard.dataset.value === secondCard.dataset.value) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            resetBoard();
        } else {
            setTimeout(() => {
                firstCard.classList.remove("revealed");
                secondCard.classList.remove("revealed");
                firstCard.querySelector("img").style.display = "none";
                secondCard.querySelector("img").style.display = "none";
                resetBoard();
            }, 1000);
        }
    }
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}
