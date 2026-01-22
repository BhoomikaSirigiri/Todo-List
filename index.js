let Task = document.getElementById('task');
let Item = document.getElementById('item');
let AddBtn = document.getElementById('addbtn');
let taskvalue = '';

Task.addEventListener('input', () => {
    taskvalue = Task.value;
});

AddBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let tasks = JSON.parse(localStorage.getItem('taskvalue') || '[]');

    let taskObj = { id: tasks.length + 1, task: taskvalue };
    tasks.push(taskObj);
    localStorage.setItem('taskvalue', JSON.stringify(tasks));

    let row = document.createElement('div');
    row.className =
        'flex justify-between items-center bg-white text-purple-600 p-3 rounded-md font-bold m-3';

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    let para = document.createElement('p');
    para.textContent = taskvalue;
    para.className = 'flex-1 mx-3';

    let delbtn = document.createElement('button');
    delbtn.textContent = 'Delete';
    delbtn.className = 'bg-red-500 text-white p-2 rounded';

    // ✔ checkbox only marks (no delete)
    checkbox.addEventListener('change', () => {
        para.classList.toggle('line-through');
        para.classList.toggle('opacity-50');
    });

    // ✔ delete only when button clicked
    delbtn.addEventListener('click', () => {
        row.remove();
        let updatedTasks = tasks.filter(t => t.id !== taskObj.id);
        localStorage.setItem('taskvalue', JSON.stringify(updatedTasks));
    });

    row.appendChild(checkbox);
    row.appendChild(para);
    row.appendChild(delbtn);
    Item.appendChild(row);

    Task.value = '';
    taskvalue = '';
});
