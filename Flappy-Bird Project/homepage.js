const loginform = document.getElementById('loginform');
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const error = document.getElementById('error');

let players = localStorage.getItem('players');
players = JSON.parse(players);
let user;

const setCurrentUser = (userName, password, heighscore) => {
    let currentUser = {
        userName: userName,
        password: password,
        heighscore: heighscore
    };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}
const checkform = (event) => {
    event.preventDefault();
    for (let p of players) {
        if (p.userName === inputName.value && p.email === inputEmail.value) {
            user = p;
        }
        if (user) {
            setCurrentUser(inputName.value, inputEmail.value, p.heighscore);
            window.location.href = './Instructions.html';
        }
        else {
            error.textContent = 'Not a member yet!';
        }
    }
}
loginform.addEventListener('submit', checkform);

