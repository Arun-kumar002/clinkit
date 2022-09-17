let form = document.querySelector("form");
let warning = document.querySelector("#warning")
let signup = document.querySelector("#signup")
let login = document.querySelector("#login")
let section = document.querySelector("#model")

let signupbtn = document.querySelector(".signupbtn")
let logoutbtn = document.querySelector(".logoutbtn")
let otpblock = document.querySelector(".otpblock")

let close = document.querySelector(".close")
let sinclose = document.querySelector(".singclose")

otpblock.style.display = 'none'

sinclose.addEventListener("click", () => {
    model.style.display = 'none';
})

close.addEventListener("click", () => {
    login_section.style.display = 'none'
})

otpblock.children[0].children[0].children[0].addEventListener("click", () => {
    otpblock.style.display = 'none'
})

// !sign up validation and number transfer is done here
signupbtn.addEventListener("click", () => {
    model.style.display = 'flex'
    form.addEventListener("submit", e => {
        e.preventDefault();
        let user = e.target[0].value;
        let email = e.target[1].value;
        let password = e.target[2].value;
        let conform = e.target[3].value;
        let phoneno = e.target[4].value;

        if (user == '') {
            e.target[0].placeholder = 'Enter the Valid User Name'
            e.target[0].style.background = 'lightpink'
        } else if (email == '') {
            e.target[0].placeholder = 'User Name'
            e.target[0].style.background = 'white'

            e.target[1].placeholder = 'Enter the Valid Email'
            e.target[1].style.background = 'lightpink'
        } else if (password == '') {
            e.target[1].placeholder = 'Email'
            e.target[1].style.background = 'white'

            e.target[2].placeholder = 'Enter the Valid Password'
            e.target[2].style.background = 'lightpink'
        } else if (password != conform) {
            e.target[2].placeholder = 'Email'
            e.target[2].style.background = 'white'

            e.target[3].value = ''
            e.target[3].style.background = 'lightpink'
        } else if (phoneno == '' || phoneno.length < 10 || phoneno.length > 10) {
            e.target[3].placeholder = 'Confirm Password'
            e.target[3].style.background = 'white'

            e.target[4].placeholder = 'Number should have only 10 digits'
            e.target[4].style.background = 'lightpink'
            e.target[4].value = ''
        } else {
            e.target[4].placeholder = 'Phone Number'
            e.target[4].style.background = 'white'

            let c = sessionStorage.length;

            let user = { phoneno: phoneno, pwd: password }
            window.sessionStorage.setItem(`user${c + 1}`, JSON.stringify(user))

            model.style.display = 'none'

            signupbtn.style.display = 'none';
            otpblock.style.display = 'flex'

            async function sendnumber() {
                let res = await fetch("http://localhost:4001/",
                    {
                        method: "POST",
                        headers: { "content-Type": 'application/json' },
                        body: JSON.stringify({ number: phoneno })
                    })
            }
            sendnumber()
        }
    })
})


// !otp verification block starts here

otpblock.children[0].children[1].children[2].addEventListener("click", () => {
    if(otpblock.children[0].children[1].children[1].value == 5488){
        otpblock.style.display = 'none'
        login_section.style.display = 'flex'
        // console.log(otpblock.children[0].children[1].children[1].value)
    }else {
        otpblock.children[0].children[1].children[1].value = ''
        otpblock.children[0].children[1].children[1].style.background = 'lightpink'
    }
})


// ! login validation 
logoutbtn.addEventListener("click", (e) => {
    let login_section = document.querySelector("#login_section");
    let loginForm = document.querySelector("#login_form");
    let wrongwarning = document.querySelector(".wrongwarning")

    loginForm.children[1].value = ''
    loginForm.children[2].value = ''
    wrongwarning.innerHTML = ''

    if (e.target.innerHTML == "Login") {

        loginForm.addEventListener("submit", e => {
            e.preventDefault()
            let loginphone = e.target[0].value;
            let loginpass = e.target[1].value;
            let c = sessionStorage.length;

            for (let i = 1; i < c + 1; i++) {
                console.log(i)
                let localData = window.sessionStorage.getItem(`user${i}`);
                console.log(localData)
                let parse = JSON.parse(localData);
                console.log(parse)
                if (parse.phoneno == loginphone && parse.pwd == loginpass) {
                    console.log('authontigated');
                    logoutbtn.innerHTML = 'Logout';
                    signupbtn.style.display = 'none';
                    login_section.style.display = 'none'

                } else if (!(parse.phoneno == loginphone && parse.pwd == loginpass)) {
                    wrongwarning.innerHTML = 'Please Enter Correct Login Details'
                    wrongwarning.style.color = 'red'
                    // login_section.style.display = 'none'
                    logoutbtn.innerHTML = 'Login';
                    signupbtn.style.display = 'flex';
                }
            };
        });

        login_section.style.display = 'flex'

    } else if (e.target.innerHTML == "Logout") {
        login_section.style.display = 'none'
        logoutbtn.innerHTML = 'Login';
        signupbtn.style.display = 'flex';
    }




})

console.log(window.sessionStorage.length);

