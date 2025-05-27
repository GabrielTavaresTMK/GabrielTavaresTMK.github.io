function ex02() {
    const form = document.querySelector('#form02');
    const input = form.querySelector('input[name="in_02"]').value;
    const valores = input.split(' ').map(Number);
    const resultado = resolve02(...valores);
    document.querySelector("#output").innerText = `Média: ${resultado}`;
    form.reset();
}

const resolve02 = (...pars) => {
    const soma = pars.reduce((acc, val) => acc + val, 0);
    return (soma / pars.length).toFixed(2);
};
