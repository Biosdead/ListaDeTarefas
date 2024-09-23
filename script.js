var input = document.querySelector("input");
let btn = document.querySelector('button');

input.addEventListener("keypress",function (event) {
    if (event.key == "Enter") {
        btn.click();
    }
});

window.onload = (event) => {
    carregarDados();
};

// Função para adicionar uma nova tarefa à lista
function addTask() {
    let taskInput = document.getElementById('new-task');
    let taskValue = taskInput.value.trim();
    
    if (taskValue === '') {
        alert('Por favor, insira uma tarefa.');
        return;
    }

    let taskList = document.getElementById('task-list');
    let identificador = gerarIdentificadorUnico();  // Gerar ID único com timestamp

    let li = document.createElement('li');
    li.textContent = taskValue;

    salvarDados(identificador, taskValue);

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remover';
    deleteButton.onclick = function() {
        taskList.removeChild(li);
        apagarDados(identificador);
    };

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    taskInput.value = '';  // Limpar o campo de input após adicionar a tarefa
}

// Função para gerar identificadores únicos
function gerarIdentificadorUnico() {
    return Date.now();  // Usar timestamp para garantir unicidade
}

// Função para salvar dados no localStorage
function salvarDados(id, text) {
    window.localStorage.setItem(id, text);
}

// Função para apagar dados do localStorage
function apagarDados(id) {
    window.localStorage.removeItem(id);
}

// Função para carregar dados salvos do localStorage
function carregarDados() {
    let taskList = document.getElementById('task-list');
    let keys = ordenarTarefas();
    // Verificar todas as chaves no localStorage e carregar as tarefas
    for (let i = 0; i < keys.length; i++) {
            // const key = localStorage.key(i);
            const key = keys[i];
            let li = document.createElement('li');
            li.textContent = localStorage.getItem(key);
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Remover';
            deleteButton.onclick = function() {
                taskList.removeChild(li);
                apagarDados(key);
            };

            li.appendChild(deleteButton);
            taskList.appendChild(li);
        }
}

function ordenarTarefas() {
    var keys = [];
    for (let i = 0; i < window.localStorage.length; i++) {
        keys.push(window.localStorage.key(i));
    }
    keys.sort(function(a, b){return a - b});
    return keys;
}