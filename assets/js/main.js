// Fase 1:
/*
  ***** Fazer a tarefa aparecer na tela.

Resultado esperado:

Usuário:

    1. digita tarefa
    2. clica em adicionar
    3. tarefa aparece na lista

Dia: 10/05/26 
*/



// Fase 2:
/* 
   ******* Melhorar experiência do usuário.

O que adicionar:

    1. input limpa sozinho
    2. não adiciona vazio
    3. não adiciona repetido

Dia: 11/05/26
*/



// Fase 3
/* 
    ******* Cada tarefa terá botão de excluir.

O que você vai praticar:

    1. filter()
    2. identificação por id
    3. eventos em elementos dinâmicos

Dia: 12/05/26
*/

//Fase 4
/*
    **** Guardar as informações.

O que você vai praticar:

    1. localStorage
    2. JSON.stringify
    3. JSON.parse
    4. filtros com filter()
*/


const inputTarefa = document.querySelector('#display');
const form = document.querySelector('#submit');
const listaTarefas = document.querySelector('#lista-tarefas');
let tarefas = [];




//// Erros e limpezas de input

function validarInput() {
    if (inputTarefa.value.trim() === '') {
        if (!document.querySelector('.error')) {
            const li = document.createElement('li');
            li.classList.add('error');
            li.innerText = `adicione algo valido!`;
            listaTarefas.appendChild(li);
        }

        return false
    } else {
        return;
    }
}

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}





//// Add tarefas ao Array

function addArray() {
    tarefas.push({
        nome: inputTarefa.value
    });
}


//// Add tarefas ao localStorage


function guardaInfo() {
    const info = JSON.stringify(tarefas);
    localStorage.setItem('tarefas', info);
}

function devolveInfo() {
    const guardaTarefa = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(guardaTarefa);
    tarefas.push(...listaDeTarefas);

    for (let tarefa of listaDeTarefas) {
        adicionarTarefa(tarefa.nome)
    }
}





//// Add tarefas e remove

function adicionarTarefa(nome) {
    const li = document.createElement('li');
    const remove = document.createElement('button');
    li.textContent = nome;
    remove.innerHTML = 'Remove';
    remove.classList.add('remover');
    remove.classList.add('btn');

    li.appendChild(remove);
    listaTarefas.appendChild(li);
    li.classList.add('element');

    return li;
}

function removeTarefa() {
    listaTarefas.addEventListener('click', e => {
        const btn = e.target

        if (btn.classList.contains('remover')) {
           const li = btn.parentElement;
           const valorDaTarefaRemovida = li.firstChild.textContent;
           const armazenaRemovido = tarefas.filter(tarefa => {
                return tarefa.nome !== valorDaTarefaRemovida;
           });

           tarefas = armazenaRemovido;

           btn.parentElement.remove();
            guardaInfo();
        }
    });
}



//// Eventos
form.addEventListener('submit', function (event) {
    event.preventDefault();



    if (validarInput() !== false) {
        addArray();
        guardaInfo();
        adicionarTarefa(inputTarefa.value);
        limpaInput();


        if (document.querySelector('.error')) {
            const error = document.querySelector('.error');
            error.remove();
        }
    }

});



removeTarefa();
devolveInfo();