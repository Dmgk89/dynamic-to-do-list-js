
// Wait for the DOM content to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage when the page loads
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Don't save again during loading
    }

    // Save tasks to Local Storage
    function saveTasks() {
        const tasks = Array.from(taskList.children).map(item => item.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task to the list
    function addTask(taskText = null, save = true) {
        // Use the provided text or the input field value
        if (!taskText) {
            taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task!');
                return;
            }
        }

        // Create a new <li> element for the task
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Create a "Remove" button for the task
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';

        // Attach a click event to the remove button
        removeButton.onclick = function () {
            taskList.removeChild(taskItem);
            saveTasks(); // Update Local Storage
        };

        // Append the remove button to the task item
        taskItem.appendChild(removeButton);

        // Append the task item to the task list
        taskList.appendChild(taskItem);

        // Save tasks to Local Storage (only if not loading tasks)
        if (save) {
            saveTasks();
        }

        // Clear the input field after adding a task
        taskInput.value = '';
    }

    // Add an event listener to the "Add Task" button
    addButton.addEventListener('click', () => addTask());

    // Allow tasks to be added using the "Enter" key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
