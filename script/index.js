//JSON & Storage
let user = document.getElementById('user');
let password = document.getElementById('password');
let reset = document.getElementById('reset');
let save = document.getElementById('save');

if (((sessionStorage.getItem('username') == null) || (sessionStorage.getItem('username') == "")) && ((sessionStorage.getItem('password') == null) || (sessionStorage.getItem('password') == "")) || ((sessionStorage.getItem('username') != null) || (sessionStorage.getItem('username') != "")&& sessionStorage.getItem('password') == null) || ((sessionStorage.getItem('username') == null || sessionStorage.getItem('username') == "") && (sessionStorage.getItem('password') != null) || (sessionStorage.getItem('password') != ""))){
    let userN;
    let passwordN;
    user.addEventListener('input',()=>{
        userN = user.value;
        sessionStorage.setItem('username',userN);
    })
    password.addEventListener('input',(e) =>{
        passwordN = password.value;
        sessionStorage.setItem('password',passwordN);
    })
    reset.addEventListener('click',e =>{
        sessionStorage.clear();
    })
}else{
    user.value = sessionStorage.getItem('username');
    password.value = sessionStorage.getItem('password');
    reset.addEventListener('click',e =>{
        sessionStorage.clear();
    })
}