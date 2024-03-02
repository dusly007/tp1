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
        
        // Ajout des boutons pour gérer la tâche
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complété';
        completeButton.className = 'completeTask';
        completeButton.addEventListener('click', toggleCompleteTask);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.className = 'deleteTask';
        deleteButton.addEventListener('click', deleteTask);
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Modifier';
        editButton.className = 'editTask';
        editButton.addEventListener('click', editTask);
        
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
        li.appendChild(editButton);
        
        taskList.appendChild(li);
        taskInput.value = '';
        saveTasksToLocalStorage(); // Enregistrer la tâche dans le stockage local
    }
}

// Basculer l'état de la tâche entre complétée et non complétée
function toggleCompleteTask(event) {
    const taskItem = event.target.parentElement;
    taskItem.classList.toggle('completed');
    saveTasksToLocalStorage(); // Mise à jour du stockage local après le basculement de l'état
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
        tasks.push({
            text: task.textContent,
            completed: task.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Charger les tâches depuis le stockage local au chargement de la page
function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }
            
            // Ajout des boutons pour gérer la tâche
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complété';
            completeButton.className = 'completeTask';
            completeButton.addEventListener('click', toggleCompleteTask);
            
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.className = 'deleteTask';
            deleteButton.addEventListener('click', deleteTask);
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Modifier';
            editButton.className = 'editTask';
            editButton.addEventListener('click', editTask);
            
            li.appendChild(completeButton);
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
