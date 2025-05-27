function ex04() {
    const form = document.querySelector('#form04');
    const input = form.querySelector('input[name="in_04"]').value;
    const valores = input.split(' ').map(Number);
    const resultado = resolve04(...valores);

    if (resultado.length > 0) {
        document.querySelector("#output").innerText = resultado.join('\n');
    } else {
        document.querySelector("#output").innerText = 'Nenhum número perfeito.';
    }
    
    form.reset();
}

function resolve04(...valores) {
    return valores.filter(filter_perfeito);
}

const filter_perfeito = (val) => {
    let soma = 0;
    for (let i = 1; i < val; i++) {
        if (val % i === 0) soma += i;
    }
    return soma === val;
};
