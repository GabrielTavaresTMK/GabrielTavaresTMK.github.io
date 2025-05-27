function ex01() {
    const form = document.querySelector('#form01');
    const input = form.querySelector('input[name="in_01"]').value;
    const valores = input.split(' ')
    const resultado = resolve01(...valores);
    document.querySelector("#output").innerText = `Média: ${resultado}`;
    form.reset();
}

function resolve01() {
    let soma = 0;
    for (let i = 0; i < arguments.length; i++) {
        soma += parseInt(arguments[i]);
    }
    return (soma / arguments.length).toFixed(2);
}
