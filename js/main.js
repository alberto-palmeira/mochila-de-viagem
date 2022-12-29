// ---------- Funções ----------
function criaElemento (itemAtual) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const quantidadeItem = document.createElement('strong');
    quantidadeItem.innerHTML = itemAtual.quantidade;
    novoItem.appendChild(quantidadeItem);

    novoItem.innerHTML += itemAtual.nome;
    listaItens.appendChild(novoItem);
};

// ---------- Lógica ----------
const form = document.querySelector('#novo__item');
const listaItens = document.querySelector('#lista');
const listaLocalStorage =  JSON.parse(localStorage.getItem('itens')) || [];

listaLocalStorage.forEach((elemento) => {
    criaElemento(elemento);
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let nome = evento.target.elements['nome'];
    let quantidade = evento.target.elements['quantidade'];

    let itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    };
    
    criaElemento(itemAtual); 

    listaLocalStorage.push(itemAtual);
    localStorage.setItem('itens', JSON.stringify(listaLocalStorage));
    
    nome.value = "";
    quantidade.value = "";
})
