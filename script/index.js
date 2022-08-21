let user = document.getElementById('user');
let password = document.getElementById('password');
let reset = document.getElementById('reset');
let save = document.getElementById('save');
let createUsers = document.getElementById('createUsers');
if (sessionStorage.getItem("username") && sessionStorage.getItem("password")) {
    window.location.replace('./pages/commerce.html');
} //Si ya tenemos el sessionStorage, entonces directamente reconecta a la página principal
//Guardado de usuarios
class User {
    constructor(user, password) {
        this.user = user;
        this.password = password;
    }
} //Clase que genera usuarios
let saveUsers = [];
let userM;
let login;
let passwordS;
createUsers.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Crear usuario',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Usuario">
        <input type="password" id="password" class="swal2-input" placeholder="Contraseña">`,
        confirmButtonText: 'Registrar',
        focusConfirm: false,
        preConfirm: () => {
            login = Swal.getPopup().querySelector('#login').value;
            passwordS = Swal.getPopup().querySelector('#password').value;
            if (!login || !passwordS) {
                Swal.showValidationMessage(`Por favor, ingresa un usuario y una contraseña`);
            }
            else {
                userM = new User(login, passwordS);
                saveUsers.push(userM);
                localStorage.setItem("users", JSON.stringify(saveUsers));
            } //Guarda el user en el localStorage
            return { login: login, password: passwordS };
        }
    }).then((result) => {
        Swal.fire(`
          Usuario: ${result.value.login},
          Contraseña: ${result.value.password}
        `.trim()
        )
    })
}); //Creación de usuarios con SweetAlert
let userN;
let passwordN;
user.addEventListener('input', () => {
    userN = user.value;
})
password.addEventListener('input', () => {
    passwordN = password.value;
}) //Guarda valores de los inputs
save.addEventListener('click', (e) => {
    e.preventDefault();
    let findUser = saveUsers.filter(el => userN == el.user && passwordN == el.password);
    let nombre = "";
    saveUsers.forEach(el => {
        el.user == userN ? nombre = userN : null; //Si el.user es igual a userN, entonces que el nombre sea igual, si no, nulo
    });
    let passwordX = "";
    saveUsers.forEach(el => {
        el.password == passwordN ? passwordX = passwordN : null; //Lo mismo pero con la contraseña
    })
    if (nombre && passwordX) {
        Swal.fire({
            icon: "success",
            text: "Inicio de sesión guardado",
            confirmButtonText: "<a class='botonS inicioButtonLogin' href='./pages/commerce.html'>IR A INICIO</a>",
        });
        sessionStorage.setItem("username", nombre);
        sessionStorage.setItem("password", passwordX)
    } //Se guarda en el sessionStorage
    else {
        Swal.fire({
            icon: "error",
            text: "No se encuentra el usuario"
        });
    } //Si no se encuentra en el array, da un error
})
if (localStorage.getItem("users")) {
    saveUsers = JSON.parse(localStorage.getItem("users"));
} //Cada vez que iniciemos la página, automaticamente se guardan los usuarios previos