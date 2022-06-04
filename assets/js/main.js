// Capturar o evento de submit do formulário
const form = document.querySelector('#form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);

    if (!peso) {
        setResult('Peso inválido!', 'danger');
        return;
    }
    if (!altura) {
        setResult('Altura inválida!', 'danger');
        return;
    }

    const imc = getImc(peso, altura);
    const classImc = getClassImc(imc);
    const msg = `Seu IMC é: ${imc} (${classImc[0]})`;

    setResult(msg, classImc[1]);
});

function createP () {
    const p = document.createElement('p');
    return p;
}

function setResult (msg, colorValue) {
    const result = document.querySelector('#result');
    result.innerHTML = '';

    const p = createP();
    p.classList.add('result' ,colorValue);
    p.innerHTML = msg;
    result.appendChild(p);
}

function getImc (peso, altura) {
    return (peso / (altura ** 2)).toFixed(2);
}

function getClassImc (imc) {
    const classification = ['Abaixo do peso', 'Peso normal', 'Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];
    const color = ['success', 'warning', 'danger', 'very-danger'];

    if (imc >= 40)   return [classification[5], color[3]];
    if (imc >= 35)   return [classification[4], color[2]];
    if (imc >= 30)   return [classification[3], color[2]];
    if (imc >= 25)   return [classification[2], color[1]];
    if (imc >= 18.5) return [classification[1], color[0]];
    if (imc < 18.5)  return [classification[0], color[1]];
}