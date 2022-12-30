// ---------- Funções ----------
function criaElemento (itemAtual) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const quantidadeItem = document.createElement('strong');
    quantidadeItem.innerHTML = itemAtual.quantidade;
    quantidadeItem.dataset.id = itemAtual.id;
    novoItem.appendChild(quantidadeItem);

    novoItem.innerHTML += itemAtual.nome;
    listaItens.appendChild(novoItem);

    novoItem.appendChild(deletaItem(quantidadeItem));
};

function atualizaElemento (itemAtual) {
    let itemAtualizado = document.querySelector(`[data-id='${itemAtual.id}']`);
    console.log(itemAtualizado);
    itemAtualizado.innerHTML = itemAtual.quantidade;
};

function deletaItem (quantidadeItem) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerHTML = 'X';

    elementoBotao.addEventListener('click', (evento) => {
        const elementoPai = evento.target.parentNode;
        const elementoIrmao = evento.target.previousElementSibling;
        const indiceElementoIrmao = listaLocalStorage.indexOf(elementoIrmao.id);

        if (listaLocalStorage.length === 1){
            listaLocalStorage.length = 0;
        } else if (listaLocalStorage.length > 1) {
            listaLocalStorage.splice(indiceElementoIrmao, 1);
        }
        
        localStorage.setItem('itens', JSON.stringify(listaLocalStorage));
        elementoPai.classList.add('deletar');
        
        setTimeout(() => {
            elementoPai.remove();
        }, 500);
        
    });

    return elementoBotao;
}

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

    const existe = listaLocalStorage.find((elemento) => {
        return elemento.nome === nome.value;
    });

    let itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value
    };

    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual, existe);
        listaLocalStorage[existe.id] = itemAtual;
    } else {
        itemAtual.id = nome.value;

        criaElemento(itemAtual); 
        listaLocalStorage.push(itemAtual);
    };

    localStorage.setItem('itens', JSON.stringify(listaLocalStorage));
    
    nome.value = "";
    quantidade.value = "";
})
