
const generatedTasks = document.getElementById('generatedTasks');
const taskCount = document.getElementById('taskCount');
const taskMessage = document.getElementById('taskMessage');
const saveTasksBtn = document.getElementById('saveTasksBtn');
function saveTasksToStorage() {
    const tasks = generatedTasks.querySelectorAll('.generated-task');
    const tasksData = [];

    tasks.forEach(function (task) {
        tasksData.push({
            title: task.querySelector('.task-title').textContent,
            assignee: task.querySelector('.task-assignee').textContent,
            deadline: task.querySelector('.task-deadline').textContent,
            priority: task.querySelector('.task-priority').textContent,
            completed: task.querySelector('.task-check').checked
        });
    });

    localStorage.setItem('generatedTasks', JSON.stringify(tasksData));
}

function loadTasksFromStorage() {
    const savedTasks = localStorage.getItem('generatedTasks');

    if (savedTasks === null) {
        return;
    }

    const tasksData = JSON.parse(savedTasks);

    generatedTasks.innerHTML = '';

    tasksData.forEach(function (data) {
        const task = document.createElement('article');
        task.className = 'generated-task';

        task.innerHTML = `
            <input type="checkbox" class="task-check">

            <div class="generated-task-info">
                <h3 class="task-title"></h3>
                <p>Assigned to: <span class="task-assignee"></span></p>
                <p>Deadline: <span class="task-deadline"></span></p>
            </div>

            <span class="priority task-priority"></span>

            <div class="task-actions">
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        task.querySelector('.task-title').textContent = data.title;
        task.querySelector('.task-assignee').textContent = data.assignee;
        task.querySelector('.task-deadline').textContent = data.deadline;

        const priorityElement = task.querySelector('.task-priority');
        priorityElement.textContent = data.priority;
        priorityElement.classList.add(data.priority.toLowerCase());

        task.querySelector('.task-check').checked = data.completed;

        generatedTasks.appendChild(task);
    });
}

function updateGeneratedTasks() {
    const tasks = generatedTasks.querySelectorAll('.generated-task');
    let remaining = 0;

    tasks.forEach(function (task) {
        const checkbox = task.querySelector('.task-check');

        if (checkbox.checked) {
            task.classList.add('is-complete');
        } else {
            task.classList.remove('is-complete');
            remaining++;
        }
    });

    taskCount.textContent = remaining + ' of ' + tasks.length + ' remaining';
}


generatedTasks.addEventListener('change', function (event) {
    if (event.target.classList.contains('task-check')) {
        updateGeneratedTasks();
        saveTasksToStorage();

        taskMessage.textContent = 'Task status saved successfully!';
    }
});


generatedTasks.addEventListener('click', function (event) {
    const task = event.target.closest('.generated-task');

    if (!task) return;

    // Delete Task
    if (event.target.classList.contains('delete-btn')) {
        const confirmed = confirm('Are you sure you want to delete this task?');

        if (confirmed) {
            task.remove();
            updateGeneratedTasks();
            saveTasksToStorage();
            taskMessage.textContent = 'Task deleted successfully.';
        }
    }

    // Edit Task
    if (event.target.classList.contains('edit-btn')) {
        const titleElement = task.querySelector('.task-title');
        const assigneeElement = task.querySelector('.task-assignee');
        const deadlineElement = task.querySelector('.task-deadline');
        const priorityElement = task.querySelector('.task-priority');

        const newTitle = prompt('Enter task name:', titleElement.textContent);
        if (newTitle === null) return;

        if (newTitle.trim() === '') {
            alert('Task name cannot be empty.');
            return;
        }

        const newAssignee = prompt(
            'Enter assigned person:',
            assigneeElement.textContent
        );
        if (newAssignee === null) return;

        const newDeadline = prompt(
            'Enter deadline:',
            deadlineElement.textContent
        );
        if (newDeadline === null) return;

        const newPriority = prompt(
            'Enter priority: High, Medium, or Low',
            priorityElement.textContent
        );
        if (newPriority === null) return;

        const priority = newPriority.trim().toLowerCase();
        const allowedPriorities = ['high', 'medium', 'low'];

        if (!allowedPriorities.includes(priority)) {
            alert('Please enter High, Medium, or Low.');
            return;
        }

        titleElement.textContent = newTitle.trim();
        assigneeElement.textContent = newAssignee.trim() || 'Unassigned';
        deadlineElement.textContent = newDeadline.trim() || 'Not specified';

        priorityElement.textContent =
            priority.charAt(0).toUpperCase() + priority.slice(1);

        priorityElement.classList.remove('high', 'medium', 'low');
        priorityElement.classList.add(priority);
        taskMessage.textContent = 'Task updated successfully.';
        updateGeneratedTasks();
        saveTasksToStorage();

    }
});

// Demo save button: no database connection yet
saveTasksBtn.addEventListener('click', function () {
    taskMessage.textContent =
        'Demo only: tasks are updated on this page, but are not saved permanently yet.';
});

updateGeneratedTasks();
const addTaskBtn = document.getElementById('addTaskBtn');
const addTaskForm = document.getElementById('addTaskForm');
const saveNewTaskBtn = document.getElementById('saveNewTaskBtn');
const cancelNewTaskBtn = document.getElementById('cancelNewTaskBtn');

addTaskBtn.addEventListener('click', function () {
    addTaskForm.style.display = 'block';
});

cancelNewTaskBtn.addEventListener('click', function () {
    addTaskForm.style.display = 'none';
});

saveNewTaskBtn.addEventListener('click', function () {
    const title = document.getElementById('newTaskTitle').value.trim();
    const assignee = document.getElementById('newTaskAssignee').value.trim();
    const deadline = document.getElementById('newTaskDeadline').value;
    const priority = document.getElementById('newTaskPriority').value;

    if (!title || !assignee || !deadline) {
        alert('Please fill in all task details.');
        return;
    }

    const task = document.createElement('article');
    task.className = 'generated-task';

    task.innerHTML = `
        <input type="checkbox" class="task-check">

        <div class="generated-task-info">
            <h3 class="task-title"></h3>
            <p>Assigned to: <span class="task-assignee"></span></p>
            <p>Deadline: <span class="task-deadline"></span></p>
        </div>

        <span class="priority task-priority"></span>

        <div class="task-actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    task.querySelector('.task-title').textContent = title;
    task.querySelector('.task-assignee').textContent = assignee;
    task.querySelector('.task-deadline').textContent = deadline;

    const priorityElement = task.querySelector('.task-priority');
    priorityElement.textContent = priority;
    priorityElement.classList.add(priority.toLowerCase());

    generatedTasks.appendChild(task);

    document.getElementById('newTaskTitle').value = '';
    document.getElementById('newTaskAssignee').value = '';
    document.getElementById('newTaskDeadline').value = '';
    document.getElementById('newTaskPriority').value = 'Medium';

    addTaskForm.style.display = 'none';

    updateGeneratedTasks();
    saveTasksToStorage();
    taskMessage.textContent = 'New task added successfully!';
});

loadTasksFromStorage();
updateGeneratedTasks();




