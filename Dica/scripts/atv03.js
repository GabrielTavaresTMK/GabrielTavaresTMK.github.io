function ex03() {
    const form = document.querySelector('#form03');
    const input = form.querySelector('input[name="in_03"]').value;
    const valores = input.split(' ').map(Number);
    const resultado = resolve03(...valores);
    document.querySelector("#output").innerText = resultado.join('\n');
    form.reset();
}

function resolve03(...valores) {
    return valores.map(isEven);
}

function isEven(val) {
    return val % 2 === 0 ? `PAR` : `ÍMPAR`;
}
