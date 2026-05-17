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
const todos = document.querySelector('#filtro-todos');
const pendentes = document.querySelector('#filtro-pendentes');
const concluidos = document.querySelector('#filtro-concluidas');
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
        nome: inputTarefa.value,
        estado: false
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
        adicionarTarefa(tarefa.nome, tarefa.estado);
    }
}





//// Add tarefas e remove

function adicionarTarefa(nome, estado) {
    const check = document.createElement('input');
    const texto = document.createElement('span');
    const li = document.createElement('li');
    const remove = document.createElement('button');

    check.type = 'checkbox';
    check.classList.add('check');

    if (estado) {
        check.checked = true;
        li.classList.add('marcado');

    }

    texto.innerHTML = nome;


    remove.innerHTML = 'Remove';
    remove.classList.add('remover');
    remove.classList.add('btn');

    li.appendChild(check);
    li.appendChild(texto)
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
            const valorDaTarefaRemovida = li.querySelector('span').textContent;
            const armazenaRemovido = tarefas.filter(tarefa => {
                return tarefa.nome !== valorDaTarefaRemovida;
            });

            tarefas = armazenaRemovido;

            btn.parentElement.remove();
            guardaInfo();
        }
    });
}

function marcadoComoConcluido() {
    listaTarefas.addEventListener('change', e => {
        const ev = e.target;

        if (ev.classList.contains('check')) {
            const pai = ev.parentElement;

            pai.classList.toggle('marcado');
            const marcado = pai.querySelector('span').textContent;

            tarefas.forEach(element => {
                if (element.nome === marcado) {
                    element.estado = pai.classList.contains('marcado');
                    guardaInfo();
                }

            });
        }
    });


}





//// Add para a área de concluído e pendente
todos.addEventListener('click', e => {
    listaTarefas.innerHTML = '';
    tarefas.forEach(element => {
        adicionarTarefa(element.nome, element.estado)
    });
});




pendentes.addEventListener('click', e => {
    const tarefasPendentes = tarefas.filter(tarefa => {
        return tarefa.estado === false;

    });

    listaTarefas.innerHTML = '';
    tarefasPendentes.forEach(element => {
        adicionarTarefa(element.nome, element.estado)
    });
});




concluidos.addEventListener('click', e => {
    const tarefasConcluidas = tarefas.filter(tarefa => {
        return tarefa.estado === true;

    });

    listaTarefas.innerHTML = '';
    tarefasConcluidas.forEach(element => {
        adicionarTarefa(element.nome, element.estado)
    });
});







//// Eventos
form.addEventListener('submit', function (event) {
    event.preventDefault();



    if (validarInput() !== false) {
        addArray();
        guardaInfo();
        adicionarTarefa(inputTarefa.value, tarefas[tarefas.length - 1].estado);
        limpaInput();


        if (document.querySelector('.error')) {
            const error = document.querySelector('.error');
            error.remove();
        }
    }

});

marcadoComoConcluido()
removeTarefa();
devolveInfo();