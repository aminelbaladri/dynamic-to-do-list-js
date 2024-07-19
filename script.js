document.addEventListener('DOMContentLoaded', function (){
    loadTasks();
    const addButton = document.getElementById('add-task-btn')
    const taskInput = document.getElementById('task-input')
    const taskList = document.getElementById('task-list')

    function addTask (){
        let taskText = taskInput.value.trim()
        if (taskText === ''){
            alert('Please enter a task')
        }else{
            let li = document.createElement('li')
            li.textContent = taskText
            
            let removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-btn');

            removeButton.onclick = function() {
                li.remove();
                saveTasks();
            };
            li.appendChild(removeButton);
            taskList.appendChild(li);
            saveTasks();
            taskInput.value = '';
        }
    }
    function addTask(taskText, save = true) {
     if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); 
    }
   loadTasks();
    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
    addTask();
});