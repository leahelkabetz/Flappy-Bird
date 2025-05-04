const signUpForm = document.getElementById('signUpForm');
const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const inputPassword = document.getElementById('inputPassword');
const inputPasswordAuthentication = document.getElementById('inputPasswordAuthentication');

/*div הרשאה ל */
const errorname = document.getElementById('errorname');
const erroremail = document.getElementById('erroremail');
const errorphone = document.getElementById('errorphone');
const errorpassword = document.getElementById('errorpassword');
const errorPasswordAuthentication = document.getElementById('errorPasswordAuthentication');
const errorAlreadyRegistered = document.getElementById('errorAlreadyRegistered');

/*בדיקת תקינות שם*/
const checkname = (name) => {
    if (!name || name.length < 2 || name.length > 20) {
        errorname.textContent = 'error in your name.'
        return false;
    }
    return true;
}
/*בדיקת תקינות אימייל*/
const checkemail = (email) => {
    const shtrudel = email.includes('@')
    const index = email.indexOf('@')
    const point = email.includes('.', index + 1)
    if (!(shtrudel && point)) {
        erroremail.textContent = 'error in your email.'
        return false
    }
    return true;
}
/*בדיקת תקינות סיסמה*/
const checkpassword = (password) => {
    if (!password || password.length < 7) {
        errorpassword.textContent = 'error in your password.'
        return false;
    }
    const string = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < password.length; i++) {
        if (string.indexOf(password[i]) == -1) {
            errorpassword.textContent = 'error in your password.'
            return false;
        }
    }
    return true;
}
/*בדיקת תקינות אימות הסיסמא*/
const checkPasswordAuthentication = (PasswordAuthentication, password) => {
    if (!PasswordAuthentication || PasswordAuthentication != password) {
        errorPasswordAuthentication.textContent = 'error in your PasswordAuthentication.';
        return false;
    }
    return true;
}
let isAlreadyRegistered = false;
const checkform = (event) => {
    event.preventDefault();
    const resultname = checkname(inputName.value);
    const resultemail = checkemail(inputEmail.value);
    const resultpassword = checkpassword(inputPassword.value);
    const resultPasswordAuthentication = checkPasswordAuthentication(inputPasswordAuthentication.value, I = inputPassword.value);
    if (resultname && resultemail && resultpassword && resultPasswordAuthentication) {
        let players = localStorage.getItem('players');
        players = JSON.parse(players);
        if (!players) {
            players = [];
        }
        for (let p of players) {
            if (p.userName === inputName.value && p.email === inputEmail.value) {
                errorAlreadyRegistered.textContent = "You are already registered for the game. Click here to connect!";
                isAlreadyRegistered = true;
            }
        }
        if (!isAlreadyRegistered) {
            //create user
            const userName = {
                userName: inputName.value,
                email: inputEmail.value,
                password: inputPassword.value,
                PasswordAuthentication: inputPasswordAuthentication.value,
                heighscore: 0
            }

            //push the user to the arr
            players.push(userName);

            //convert the arr to string
            const playersstring = JSON.stringify(players);//להחליף למחרוזת

            //set the stringArr in the local storage
            localStorage.setItem("players", playersstring);//להחזיר ללוקל

            window.location.href = './homepage.html';//יכול להשלח להתחברות
        }

    }
}

signUpForm.addEventListener('submit', checkform);
