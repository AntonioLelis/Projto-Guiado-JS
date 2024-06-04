let taskList;

function loadtasks() {
    let list = localStorage.getItem('taskList');

    taskList = list ? JSON.parse(list) : [];

    updateTask();
}

function addTask(event) {
    event.preventDefault();
    let description = document.getElementById('description');
    if (description.value == '') {
        showMessage();
    } else {
        taskList.push(description.value);
        description.value = '';
        localStorage.setItem('taskList', JSON.stringify(taskList));
        updateTask();
    }
}

function closeMessage() {
    let alert = document.getElementById('alert');
    alert.style.display = 'none';
}

function showMessage() {
    let message_type = document.getElementById('message_type');
    message_type.innerText = 'Erro: ';

    let message = document.getElementById('message');
    message.innerText = 'Você precisa descrever a nova tarefa.';

    let alert = document.getElementById('alert');
    alert.style.display = 'block';

    setTimeout(() => {
        closeMessage();
    }, 4000);
}

function updateTask() {
    let divTasks = document.getElementById('task');
    divTasks.innerHTML = '';

    if (taskList.length > 0) {
        let newOl = document.createElement('ol');

        taskList.forEach((task, index) => {
            let newLi = document.createElement('li');
            newLi.innerText = task;

            let removeButton = document.createElement('button');
            removeButton.innerText = 'X';
            removeButton.className = 'removeButton';
            removeButton.onclick = function () {
                removeTask(index);
            };

            newLi.appendChild(removeButton);
            newOl.appendChild(newLi);
        });

        divTasks.appendChild(newOl);
    } else {
        let p = document.createElement('p');
        p.innerText = 'Insira a primeira tarefa para começar...';
        divTasks.appendChild(p);
    }

    let botaoEscolherTarefa = document.getElementById('botaoEscolherTarefa');
    botaoEscolherTarefa.disabled = taskList.length === 0;
}

function removeTask(index) {
    taskList.splice(index, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTask();
}

function removeAll() {
    taskList = [];
    localStorage.setItem('taskList', JSON.stringify(taskList));
    updateTask();
}

function escolherTarefaAleatoria() {
    if (taskList.length > 0) {
        let indiceAleatorio = Math.floor(Math.random() * taskList.length);
        let tarefaEscolhida = taskList[indiceAleatorio];
        alert('Tarefa escolhida: ' + tarefaEscolhida);
        taskList.splice(indiceAleatorio, 1);
        localStorage.setItem('taskList', JSON.stringify(taskList));
        updateTask();
    } else {
        alert('Não há tarefas para escolher.');
    }
}
