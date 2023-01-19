const newTask = document.querySelector('.task-input');
const add = document.querySelector('.add');
const list = document.querySelector('.lists');
const reload = document.querySelector('.fa-arrows-rotate');

const completed = false; let
  index = 1;
let listArr = [];

const showTasks = () => {
  const storedData = localStorage.getItem('data');
  if (storedData === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(storedData);
    index = listArr.length + 1;
  }

  let newLiTag = '';
  listArr.forEach((element) => {
    if (element.completed === true) {
      newLiTag += `<li>
       <div class="left">
       <input type="checkbox" id="check${element.index}" onclick="completeTask(${element.index});" checked>
       <input type="text" class="task" id="task${element.index}" value="${element.description}" readonly>
       </div>
       <div class="right">
       <i class="fa-solid fa-pen-to-square edit " id="edit${element.index}" onclick="editTask(${element.index});"></i>
       <i class="fa-solid fa-floppy-disk save hide" id="save${element.index}" onclick="saveTask(${element.index});"></i>
       <i class="fa-solid fa-trash delete" id="del" onclick="deleteTask(${element.index});"></i>       
</div>
       </li><hr>`;
    } else {
      newLiTag += `<li>
       <div class="left">
       <input type="checkbox" id="check${element.index}" onclick="completeTask(${element.index});">
       <input type="text" class="task" id="task${element.index}" value="${element.description}" readonly>
       </div>
       <div class="right">
       <i class="fa-solid fa-pen-to-square edit " id="edit${element.index}" onclick="editTask(${element.index});"></i>
       <i class="fa-solid fa-floppy-disk save hide" id="save${element.index}" onclick="saveTask(${element.index});"></i>
       <i class="fa-solid fa-trash delete" id="del" onclick="deleteTask(${element.index});"></i>       
</div>
       </li><hr>`;
    }
  });
  list.innerHTML = newLiTag;
  newTask.focus();
};

reload.addEventListener('click', () => {
  showTasks();
});

window.editTask = (index) => {
  const saveBtn = document.getElementById(`edit${index}`);
  const editBtn = document.getElementById(`save${index}`);

  saveBtn.style.display = 'none';
  editBtn.style.display = 'block';

  const specTask = document.getElementById(`task${index}`);

  specTask.removeAttribute('readonly');
  const { length } = specTask.value;
  specTask.setSelectionRange(length, length);
  specTask.focus();
};

window.saveTask = (index) => {
  const saveBtn = document.getElementById(`edit${index}`);
  const editBtn = document.getElementById(`save${index}`);

  saveBtn.style.display = 'block';
  editBtn.style.display = 'none';

  const specTask = document.getElementById(`task${index}`);
  const storedData = localStorage.getItem('data');
  listArr = JSON.parse(storedData);
  listArr[index - 1].description = specTask.value;

  localStorage.setItem('data', JSON.stringify(listArr));
  showTasks();
};

function addT() {
  const storedData = localStorage.getItem('data');

  if (storedData === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(storedData);
    index = listArr.length + 1;
  }

  const task = { description: newTask.value, completed, index };

  listArr.push(task);
  localStorage.setItem('data', JSON.stringify(listArr));
  return showTasks();
}

add.addEventListener('click', () => { addT(); });

window.completeTask = (index) => {
  for (let i = 0; i < listArr.length; i += 1) {
    if (listArr[i].index === index) {
      if (listArr[i].completed === false) {
        listArr[i].completed = true;
        localStorage.setItem('data', JSON.stringify(listArr));
      } else {
        listArr[i].completed = false;
      }
      localStorage.setItem('data', JSON.stringify(listArr));
    }
  }
  showTasks();
};

window.deleteTask = (index) => {
  const storedData = localStorage.getItem('data');
  const listArr = JSON.parse(storedData);
  listArr.splice(index - 1, 1);
  for (let i = 0; i < listArr.length; i += 1) {
    listArr[i].index = i + 1;
  }
  localStorage.setItem('data', JSON.stringify(listArr));
  showTasks();
};

window.onload = showTasks();

const clearCompleted = document.querySelector('.clear');

clearCompleted.addEventListener('click', () => {
  const storedData = localStorage.getItem('data');
  let listArr = JSON.parse(storedData);
  listArr = listArr.filter((element) => element.completed === false);
  for (let i = 0; i < listArr.length; i += 1) {
    listArr[i].index = i + 1;
  }
  localStorage.setItem('data', JSON.stringify(listArr));
  showTasks();
});