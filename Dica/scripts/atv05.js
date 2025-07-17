function ex05() {
    const form = document.querySelector('#form05');
    const input = form.querySelector('input[name="in_05"]').value;

    try {
        resultado = contrutora(input)

        document.querySelector("#output").innerText = resultado;
    } catch (e) {
        document.querySelector("#output").innerText = `Erro: ${e.message}`;
    }

    form.reset();
}

function contrutora(json) {
    const obj = JSON.parse(json);


    const resultado = Object.entries(obj)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');

    return resultado
}