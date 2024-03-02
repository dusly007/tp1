// Récupération des éléments du DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const clearAllButton = document.getElementById('clearAll');

// Ajouter une tâche
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;
        
        // Ajout des boutons de suppression et de modification
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.className = 'deleteTask';
        deleteButton.addEventListener('click', deleteTask);
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Modifier';
        editButton.className = 'editTask';
        editButton.addEventListener('click', editTask);
        
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasksToLocalStorage(); // Enregistrer la tâche dans le stockage local
    }
}

// Supprimer une tâche
function deleteTask(event) {
    const taskItem = event.target.parentElement;
    taskList.removeChild(taskItem);
    saveTasksToLocalStorage(); // Mise à jour du stockage local après la suppression
}

// Modifier une tâche
function editTask(event) {
    const taskItem = event.target.parentElement;
    const newText = prompt('Modifier la tâche :', taskItem.textContent);
    if (newText !== null && newText.trim() !== '') {
        taskItem.textContent = newText.trim();
        saveTasksToLocalStorage(); // Mise à jour du stockage local après la modification
    }
}

// Effacer toutes les tâches
function clearAllTasks() {
    taskList.innerHTML = '';
    localStorage.removeItem('tasks');
}

// Enregistrer les tâches dans le stockage local
function saveTasksToLocalStorage() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Charger les tâches depuis le stockage local au chargement de la page
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task;
            
            // Ajout des boutons de suppression et de modification
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.className = 'deleteTask';
            deleteButton.addEventListener('click', deleteTask);
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Modifier';
            editButton.className = 'editTask';
            editButton.addEventListener('click', editTask);
            
            li.appendChild(deleteButton);
            li.appendChild(editButton);
            
            taskList.appendChild(li);
        });
    }
}

// Ajouter des écouteurs d'événements
addTaskButton.addEventListener('click', addTask);
clearAllButton.addEventListener('click', clearAllTasks);

// Charger les tâches depuis le stockage local au chargement de la page
window.addEventListener('load', loadTasksFromLocalStorage);
