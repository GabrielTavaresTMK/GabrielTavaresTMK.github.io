const container = document.getElementById("container");
const items = document.querySelectorAll(".item");
const tamanhoInput = document.getElementById("tamanho");

const MIN_TAMANHO = 50;
const MAX_TAMANHO = 200;

// Função para aplicar o valor final com limites (ao sair do campo ou confirmar)
function aplicarTamanhoFinal() {
  let valor = parseInt(tamanhoInput.value);

  if (isNaN(valor)) return;

  if (valor < MIN_TAMANHO) valor = MIN_TAMANHO;
  if (valor > MAX_TAMANHO) valor = MAX_TAMANHO;

  tamanhoInput.value = valor;

  const size = valor + "px";
  items.forEach(item => {
    item.style.width = size;
    item.style.aspectRatio = "1 / 1";

    // só define height manualmente se não for stretch
    if (document.getElementById("alignItems").value !== "stretch") {
      item.style.height = size;
    }
  });
}

// Eventos para aplicar tamanho após digitação
tamanhoInput.addEventListener("blur", aplicarTamanhoFinal);
tamanhoInput.addEventListener("change", aplicarTamanhoFinal);

// Cores
document.querySelectorAll(".cor").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".cor").forEach(c => c.classList.remove("ativo"));
    btn.classList.add("ativo");
    const cor = btn.dataset.cor;
    items.forEach(item => {
      item.style.backgroundColor = cor;
    });
  });
});

// Formato
document.querySelectorAll(".formato").forEach(f => {
  f.addEventListener("click", () => {
    document.querySelectorAll(".formato").forEach(fm => fm.classList.remove("ativo"));
    f.classList.add("ativo");

    const tipo = f.dataset.formato;
    if (tipo === "circulo") {
      items.forEach(item => item.style.borderRadius = "50%");
    } else {
      items.forEach(item => item.style.borderRadius = "0");
    }
  });
});

// Flexbox opções
document.getElementById("flexDirection").addEventListener("change", e => {
  container.style.flexDirection = e.target.value;
});

document.getElementById("justifyContent").addEventListener("change", e => {
  container.style.justifyContent = e.target.value;
});

document.getElementById("alignItems").addEventListener("change", e => {
  const value = e.target.value;
  container.style.alignItems = value;

  items.forEach(item => {
    const size = tamanhoInput.value + "px";
    if (value === "stretch") {
      item.style.height = ""; // deixa o CSS cuidar
    } else {
      item.style.height = size;
    }
  });
});
