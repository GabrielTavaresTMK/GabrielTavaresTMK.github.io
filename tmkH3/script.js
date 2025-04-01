let primeiraCarta = null;
let segundaCarta = null;
let lockBoard = false;

document.addEventListener("DOMContentLoaded", () => {
    let tema = localStorage.getItem("temaSelecionado");
    if (!tema) {
        alert("Nenhum tema selecionado! Voltando para a seleção.");
        window.location.href = "selecao.html";
        return;
    }
    iniciarJogo(tema);
});

function iniciarJogo(tema) {
    let imagens = [];
    for (let i = 1; i <= 4; i++) {
        imagens.push(`${tema}0${i}.png`, `${tema}0${i}.png`);
    }
    imagens.sort(() => Math.random() - 0.5);

    let tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = "";

    for (let imgSrc of imagens) {
        let carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.valor = imgSrc;

        let img = document.createElement("img");
        img.src = imgSrc;
        carta.appendChild(img);

        carta.onclick = function () { virarCarta(carta); };
        tabuleiro.appendChild(carta);
    }
}

function virarCarta(carta) {
    if (lockBoard || carta.classList.contains("virada")) return;

    carta.classList.add("virada");
    let img = carta.querySelector("img");
    img.style.display = "block";

    if (!primeiraCarta) {
        primeiraCarta = carta;
    } else {
        segundaCarta = carta;
        lockBoard = true;

        if (primeiraCarta.dataset.valor === segundaCarta.dataset.valor) {
            primeiraCarta.classList.add("pares");
            segundaCarta.classList.add("pares");
            resetarJogo();
        } else {
            setTimeout(() => {
                primeiraCarta.classList.remove("virada");
                segundaCarta.classList.remove("virada");
                primeiraCarta.querySelector("img").style.display = "none";
                segundaCarta.querySelector("img").style.display = "none";
                resetarJogo();
            }, 1000);
        }
    }
}

function resetarJogo() {
    primeiraCarta = null;
    segundaCarta = null;
    lockBoard = false;
}