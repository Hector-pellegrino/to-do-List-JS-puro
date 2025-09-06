const input = document.getElementById('taskInput');
const ul = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('taskList')) ?? [];

class Task {
    constructor(tarefa, estado, id) {
        this.tarefa = tarefa;
        this.estado = estado;
        this.id = id;
    }

    changestate() {
      if(this.estado !== 'feito') {
        this.estado = 'feito'
      } else {
        this.estado = 'Não feito'
      }
    }
}

function setLocalStorage() {
  localStorage.setItem('taskList', JSON.stringify(tasks));
}

function changeBetweenSelected(div, task) {
    const checkbox = div.children[0]; // checkbox
    const text = div.children[1]; // paragrafo

    function verifyState(estado) {
      if (estado !== 'feito') {
        task.estado = 'feito';
        text.classList.add('selected');
        text.classList.remove('no_selected');
        setLocalStorage();
      } else {
        task.estado = 'Não feito';
          text.classList.remove('selected');
          text.classList.add('no_selected');
          setLocalStorage();
      }
    }
    checkbox.addEventListener('click', () => verifyState(task.estado));
}

function createRemoveButton(li) {
    const div = li.children[0];
    const removerBotao = document.createElement('button');
    removerBotao.textContent = 'Remover';
    function remover() {
        const removeTask = div.id;

        tasks.forEach((task) => {
            if (removeTask === `task_${task.id}`) {
                tasks.pop(task);
              }
              alert(`Tarefa '${task.tarefa}' está sendo removida`)
            })
          setLocalStorage();
          ul.removeChild(li);
    }
    removerBotao.addEventListener('click', remover);

    li.appendChild(removerBotao);
}

function createElements(task) {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class= "conteinerLi" id= "task_${task.id}">
        <input type="checkbox" name="" id="">
        <p>${task.tarefa}</p>
      </div>
    `;
    createRemoveButton(li);
    ul.appendChild(li);
    changeBetweenSelected(li.children[0], task);
}

function addTask() {
    if (input.value !== '') {
        const currentTask = new Task(
            `${input.value}`,
            'Não feito',
            tasks.length
        );
        createElements(currentTask);
        tasks.push(currentTask);
        setLocalStorage();
        input.value = '';
    } else {
        alert('Por favor, insira uma tarefa.');
    }
}

tasks.forEach(task =>  {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class= "conteinerLi" id= "task_${task.id}">
        <input type="checkbox" id="checkbox_${task.id}" >
        <label for="checkbox_${task.id}" id="value_${task.id}">${task.tarefa}</label>
      </div>
    `;

    const checkbox = li.children[0].children[0];
    const text = li.children[0].children[1];
    if (task.estado === 'feito') {
        checkbox.checked = true;
        text.classList.add('selected');
        text.classList.remove('no_selected');
    } else {
        checkbox.checked = false;
        text.classList.add('no_selected');
        text.classList.remove('selected');
    }

    createRemoveButton(li);
    const div = li.children[0]
    changeBetweenSelected(div, task);
    ul.appendChild(li);
  }
)
