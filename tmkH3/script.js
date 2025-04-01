let primeiraCarta = null;
let segundaCarta = null;
let lockboard = false;

function iniciarJogo(tema) {
  localStorage.setItem("tema", tema);
  window.location.href = "memoria.html";
}

window.onload = function() {
  if (window.location.pathname.includes("memoria.html")) {
    let tema = localStorage.getItem("tema");
    if (!tema) {
      alert("Nenhum tema selecionado! Voltando para a seleção.");
      window.location.href = "selecao.html";
      return;
    }
    configurarJogo(tema);
  }
};

function configurarJogo(tema) {
  let imagens = [];
  // 4 pares (8 cartas total)
  for (let i = 1; i <= 4; i++) {
    imagens.push(`${tema}0${i}.png`, `${tema}0${i}.png`);
  }
  imagens.sort(() => Math.random() - 0.5);
  
  let tabuleiro = document.getElementById("tabuleiro");
  tabuleiro.innerHTML = "";
  
  for (let i = 0; i < imagens.length; i++) {
    let carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.valor = imagens[i];

    let img = document.createElement("img");
    img.src = imagens[i];
    img.alt = "Imagem da carta";
    
    carta.appendChild(img);
    carta.onclick = function() { virarCarta(carta); };
    tabuleiro.appendChild(carta);
  }
}

function virarCarta(carta) {
  if (lockboard || carta.classList.contains("revelada")) return;
  
  carta.classList.add("revelada");
  
  if (!primeiraCarta) {
    primeiraCarta = carta;
  } else {
    segundaCarta = carta;
    lockboard = true;
    
    if (primeiraCarta.dataset.valor === segundaCarta.dataset.valor) {
      primeiraCarta.classList.add("pares");
      segundaCarta.classList.add("pares");
      reiniciarJogo();
    } else {
      setTimeout(() => {
        primeiraCarta.classList.remove("revelada");
        segundaCarta.classList.remove("revelada");
        reiniciarJogo();
      }, 1000);
    }
  }
}

function reiniciarJogo() {
  primeiraCarta = null;
  segundaCarta = null;
  lockboard = false;
}
