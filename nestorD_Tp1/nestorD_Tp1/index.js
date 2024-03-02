// Fonction pour gérer la connexion et la redirection vers la page d'accueil
function connectAndRedirect() {
    // Récupérer les informations d'identification saisies par l'utilisateur
    const username = document.getElementById('uname').value;
    const password = document.getElementById('psw').value;
    
    // Vérifier si les informations d'identification sont valides (vous pouvez implémenter votre propre logique ici)
    const isValidCredentials = validateCredentials(username, password);
    
    // Si les informations d'identification sont valides, rediriger vers la page d'accueil
    if (isValidCredentials) {
        window.location.href = 'accueil.html';
    } else {
        // Afficher un message d'erreur ou effectuer une action en cas d'informations d'identification invalides
        alert('Nom d\'utilisateur ou mot de passe incorrect.');
    }
}

// Fonction de validation des informations d'identification (exemple de fonction, à remplacer par votre propre logique)
function validateCredentials(username, password) {
    // Exemple de logique de validation simple (à remplacer par votre propre logique)
    return username === 'utilisateur' && password === 'motdepasse';
}

// Récupération des éléments du DOM
const userStorage = 'user_';
const passwordStorage = 'password_';

function Register(){
    var RegisterUser = document.getElementById("uname").value;
    var RegisterPassword = document.getElementById("psw").value;
    var RegisterPasswordRepeat = document.getElementById("psw-repeat").value;

    if (RegisterPassword == RegisterPasswordRepeat){
        localStorage.setItem(userStorage + RegisterUser, RegisterUser);
        localStorage.setItem(passwordStorage + RegisterUser, RegisterPassword);
        document.getElementById('id01').style.display='none';
        alert("Inscription réussie !");
    }
    else{
        alert("Vos mots de passe ne sont pas identiques !");
    }
}

function LogIn(){
    var logInUser = document.getElementById("unameLogIn").value;
    var logInPassword = document.getElementById("pswLogIn").value;

    var storedPassword = localStorage.getItem(passwordStorage + logInUser);

    if (storedPassword !== null && storedPassword === logInPassword){
        alert("Connexion réussie !");
        window.location.replace("accueil.html");
    }
    else{
        alert("Identifiant ou mot de passe incorrect !");
    }
}
