
var account = [];

class accountData {
     
    constructor(username, password){
        this.username = username;
        this.password = password;
    }
    
    
}


function login() {
    const username = document.querySelector('#Username').value;  // Lấy giá trị từ input
    const password = document.querySelector('#password').value;  // Lấy giá trị từ input

   
   
    const user = account.find(acc => acc.username == username && acc.password == password);

    if (user) {
        window.location.href = "/index2.html";
    } else {
        const chooseError = document.querySelector('.text-red');
        chooseError.innerHTML = '<div class="text-red"><p class="paragraph">Incorrect username or password.</p></div>';
        
    }

}

function signup() {
    const username = document.querySelector('#signupname').value;  // Lấy giá trị từ input
    const password = document.querySelector('#signuppassword').value;

    
   
    const user = account.find(acc => acc.username == username);

   
    if (!user) {
        account.push(new accountData(username, password));
       
        displaylogin();
    } else {
        const chooseError = document.querySelector('.text-red1');
        chooseError.innerHTML = '<div class="text-red1"><p class="paragraph">account name readly exist.</p></div>';
        
    }

}

account.push(new accountData("user1", "password1"));
account.push(new accountData("user2", "password2"));

function displaySignup() {
    
    document.getElementById("login-visibale").style.visibility = "hidden";
    document.getElementById("signup-visibale").style.visibility = "visible";
     


}

function displaylogin() {
     
    document.getElementById("signup-visibale").style.visibility = "hidden";
    document.getElementById("login-visibale").style.visibility = "visible";
    
}

