// ---------- Funções ----------
function criaElemento (nome, quantidade) {
    const novoItem = document.createElement('li');
    const negrito = document.createElement('strong');

    negrito.textContent = quantidade;
    novoItem.appendChild(negrito);
    novoItem.innerHTML += nome;
    novoItem.classList.add('item');
    listaItens.appendChild(novoItem);

    let itemAtual = {
        'nome': nome,
        'quantidade': quantidade
    };

    listaLocalStorage.push(itemAtual);
    localStorage.setItem('item', JSON.stringify(listaLocalStorage));
}

// ---------- Lógica ----------
const form = document.querySelector('#novo__item');
const listaItens = document.querySelector('#lista');
const listaLocalStorage = [];

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let nome = evento.target.elements['nome'];
    let quantidade = evento.target.elements['quantidade'];

    criaElemento(nome.value, quantidade.value);    
    
    nome.value = "";
    quantidade.value = "";
})
