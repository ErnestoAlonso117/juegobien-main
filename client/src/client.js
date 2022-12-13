

const writeEvent = (text) => {
    //<ul> element
    const parent = document.querySelector('#events');

    //<li> element
    const el = document.createElement('li');
    el.innerHTML = text;

    parent.appendChild(el);
};
const onFormSubmitted = (e) => {
    e.preventDefault();
    const input = document.querySelector('#chat');
    const text = input.value;
    input.value = '';

    sock.emit('message', text);
};

const addButtonListeners = () => {
    ['GuardiaImperial', 'Tyranido', 'GuerreroTau', 'GuerreroKai', 'MarineDelCaos'].forEach((id) =>{
        const button = document.getElementById(id);
        button.addEventListener('click', () => {
            sock.emit('turn', id);
        });
    });
};

writeEvent('<h1>Bienvenido al Piedra Papel Tijera Lagarto Spock pero de Warhammer Online<h1>');

const sock = io();
sock.on('message', writeEvent);

document.querySelector('#chatform').addEventListener('submit', onFormSubmitted);

addButtonListeners();