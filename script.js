// Array para armazenar as tarefas
let taskList;

// Carrega as tarefas do armazenamento local e atualiza a lista de tarefas na tela
function loadtasks() {
    // Obtém a lista de tarefas do localStorage
    let list = localStorage.getItem('taskList');
    // Converte a lista de volta para um array ou cria um novo se não existir
    taskList = list ? JSON.parse(list) : [];
    // Atualiza a lista de tarefas na tela
    updateTask();
}

// Adiciona uma nova tarefa à lista após a submissão do formulário
function addTask(event) {
    // Previne o comportamento padrão do formulário
    event.preventDefault();
    // Obtém o valor do campo de descrição da tarefa
    let description = document.getElementById('description');
    // Verifica se o campo de descrição está vazio
    if (description.value == '') {
        // Mostra uma mensagem de erro se estiver vazio
        showMessage();
    } else {
        // Adiciona a nova tarefa ao array com o estado de 'não concluído'
        taskList.push({ description: description.value, completed: false });
        // Limpa o campo de descrição
        description.value = '';
        // Salva a nova lista de tarefas no localStorage
        localStorage.setItem('taskList', JSON.stringify(taskList));
        // Atualiza a lista de tarefas na tela
        updateTask();
    }
}

// Fecha a mensagem de alerta
function closeMessage() {
    // Obtém o elemento de alerta
    let alert = document.getElementById('alert');
    // Esconde o elemento de alerta
    alert.style.display = 'none';
}

// Exibe uma mensagem de erro quando a descrição da tarefa está vazia
function showMessage() {
    // Obtém o elemento para o tipo de mensagem
    let message_type = document.getElementById('message_type');
    // Define o texto do tipo de mensagem
    message_type.innerText = 'Erro: ';
    // Obtém o elemento para a mensagem
    let message = document.getElementById('message');
    // Define o texto da mensagem
    message.innerText = 'Você precisa descrever a nova tarefa.';
    // Obtém o elemento de alerta
    let alert = document.getElementById('alert');
    // Mostra o elemento de alerta
    alert.style.display = 'block';
    // Define um temporizador para fechar a mensagem após 4 segundos
    setTimeout(() => {
        closeMessage();
    }, 4000);
}

// Atualiza a lista de tarefas na tela
function updateTask() {
    // Obtém o elemento que contém as tarefas
    let divTasks = document.getElementById('task');
    // Limpa o conteúdo atual do elemento
    divTasks.innerHTML = '';
    // Verifica se há tarefas na lista
    if (taskList.length > 0) {
        // Cria uma nova lista ordenada
        let newOl = document.createElement('ol');
        // Itera sobre cada tarefa no array
        taskList.forEach((task, index) => {
            // Cria um novo item de lista
            let newLi = document.createElement('li');
            // Define o texto do item com a descrição da tarefa
            newLi.innerText = task.description;
            // Cria um novo botão para marcar a tarefa como concluída
            let completeButton = document.createElement('button');
            // Define o texto do botão
            completeButton.innerText = '✓';
            // Define a classe do botão
            completeButton.className = 'completeButton';
            // Adiciona um evento de clique que chama a função para alternar a conclusão da tarefa
            completeButton.onclick = function () {
                toggleTaskCompletion(index);
            };
            // Cria um novo botão para remover a tarefa
            let removeButton = document.createElement('button');
            // Define o texto do botão
            removeButton.innerText = 'X';
            // Define a classe do botão
            removeButton.className = 'removeButton';
            // Adiciona um evento de clique que chama a função para remover a tarefa
            removeButton.onclick = function () {
                removeTask(index);
            };
            // Insere o botão de conclusão antes do texto da tarefa
            newLi.insertBefore(completeButton, newLi.childNodes[0]);
            // Adiciona o botão de remoção ao item de lista
            newLi.appendChild(removeButton);
            // Aplica o estilo de riscado se a tarefa estiver concluída
            if (task.completed) {
                newLi.style.textDecoration = 'line-through';
            }
            // Adiciona o item de lista à lista ordenada
            newOl.appendChild(newLi);
        });
        // Adiciona a lista ordenada ao elemento de tarefas
        divTasks.appendChild(newOl);
    } else {
        // Cria um novo parágrafo se não houver tarefas
        let p = document.createElement('p');
        // Define o texto do parágrafo
        p.innerText = 'Insira a primeira tarefa para começar...';
        // Adiciona o parágrafo ao elemento de tarefas
        divTasks.appendChild(p);
    }
    // Obtém o botão para escolher uma tarefa aleatória
    let botaoEscolherTarefa = document.getElementById('botaoEscolherTarefa');
    // Desabilita o botão se não houver tarefas
    botaoEscolherTarefa.disabled = taskList.length === 0;
}

// Alterna o estado de conclusão de uma tarefa
function toggleTaskCompletion(index) {
    // Alterna o estado de 'concluído' da tarefa
    taskList[index].completed = !taskList[index].completed;
    // Salva a lista atualizada no localStorage
    localStorage.setItem('taskList', JSON.stringify(taskList));
    // Atualiza a lista de tarefas na tela
    updateTask();
}

// Remove uma tarefa específica da lista
function removeTask(index) {
    // Remove a tarefa do array pelo índice
    taskList.splice(index, 1);
    // Salva a lista atualizada no localStorage
    localStorage.setItem('taskList', JSON.stringify(taskList));
    // Atualiza a lista de tarefas na tela
    updateTask();
}

// Remove todas as tarefas da lista
function removeAll() {
    // Limpa o array de tarefas
    taskList = [];
    // Salva a lista vazia no localStorage
    localStorage.setItem('taskList', JSON.stringify(taskList));
    // Atualiza a lista de tarefas na tela
    updateTask();
}

// Escolhe uma tarefa aleatória da lista e exibe em um alerta
function escolherTarefaAleatoria() {
    // Verifica se há tarefas na lista
    if (taskList.length > 0) {
        // Gera um índice aleatório
        let indiceAleatorio = Math.floor(Math.random() * taskList.length);
        // Obtém a tarefa escolhida pelo índice aleatório
        let tarefaEscolhida = taskList[indiceAleatorio];
        // Exibe a descrição da tarefa escolhida em um alerta
        alert('Tarefa escolhida: ' + tarefaEscolhida.description);
        // Salva a lista atualizada no localStorage
        localStorage.setItem('taskList', JSON.stringify(taskList));
        // Atualiza a lista de tarefas na tela
        updateTask();
    }
}
