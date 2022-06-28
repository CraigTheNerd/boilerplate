const errorMessage = document.querySelector(".error-wrapper");

const nameEl = document.querySelector('#name');
const emailEl = document.querySelector('#email');
const phoneEl = document.querySelector('#phone');
const messageEl = document.querySelector('#message');

const form = document.querySelector('#signup');

//  First Name Regex
//  preg_match("/^(([A-Za-z\D\-]){2,255})$/gm", $firstName)
//  preg_match("/^(([A-Za-z\D\-]){2,255})$/m", $firstName)

const checkName = () => {

    let valid = false;

    const minName = 2,
        maxName = 255;

    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, 'Name cannot be blank.');
    } else if (!isBetween(name.length, minName, maxName)) {
        showError(nameEl, `Name must be between ${minName} and ${maxName} characters.`)
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();
    if (!isRequired(email)) {
        showError(emailEl, 'Email cannot be blank.');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid.')
    } else {
        showSuccess(emailEl);
        valid = true;
    }
    return valid;
};



// const checkPhone = () => {
//     let valid = false;
//
//
//     const phone = phoneEl.value.trim();
//
//     if (!isRequired(phone)) {
//         showError(phoneEl, 'Contact number cannot be blank.');
//     } else if (!isPhoneValid(phone)) {
//         showError(phoneEl, 'Please enter a valid contact number');
//     } else {
//         showSuccess(phoneEl);
//         valid = true;
//     }
//
//     return valid;
// };


const checkPhone = () => {
    let valid = false;


    const phone = phoneEl.value.trim();

    if (!isRequired(phone)) {
        showError(phoneEl, 'Contact number cannot be blank.');
    } else if (!isPhoneValid(phone)) {
        showError(phoneEl, 'Please enter a valid contact number');
    } else {
        showSuccess(phoneEl);
        valid = true;
    }

    return valid;
};


const checkMessage = () => {

    let valid = false;

    const minMessage = 1,
        maxMessage = 2400;

    const message = messageEl.value.trim();

    if (!isRequired(message)) {
        showError(messageEl, 'Message cannot be blank.');
    } else if (!isBetween(message.length, minMessage, maxMessage)) {
        showError(messageEl, `Message must be between ${minMessage} and ${maxMessage} characters.`)
    } else {
        showSuccess(messageEl);
        valid = true;
    }
    return valid;
};

//  First Name Regex
//  preg_match("/^(([A-Za-z\D\-]){2,255})$/gm", $firstName)
//  preg_match("/^(([A-Za-z\D\-]){2,255})$/m", $firstName)

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};


const isPhoneValid = (phone) => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
};


const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    // get the form-field element
    const formField = input.parentElement;
    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    const formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}


// form.addEventListener('submit', function (e) {


form.addEventListener('submit', function (e) {

    // prevent the form from submitting
    e.preventDefault();

    // validate fields
    let isNameValid = checkName(),
        isEmailValid = checkEmail(),
        isPhoneValid = checkPhone(),
        isMessageValid = checkMessage();

    let isFormValid = isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isMessageValid;

    // submit to the server if the form is valid
    if (isFormValid) {

        sendMail();


        //  Submit the Form here
        // Prevent form from submitting when send button is clicked
        // submitBtn.onclick = (e)=> {
        //     //  Prevent form from submitting and reloading the page
        //     e.preventDefault();
        // }

        //  When submit button is clicked call sendMail function
        // submitBtn.addEventListener('click', sendMail);

        //  When submit button is clicked call sendMail function
        // submitBtn.addEventListener('click', sendMail);

//  Function to send email
        function sendMail() {

            //  As soon as send button is clicked
            //  Show the user some feedback that the request is being processed
            errorMessage.style.display = "block";
            errorMessage.innerHTML = "" +
                '<div class="error-message error-busy">\n' +
                '<span class="busy-icon">\n' +
                '<i class="fas fa-cog"></i>\n' +
                '</span>\n' +
                '<p class="error-busy-text">\n' +
                'Processing...\n' +
                '</p>\n' +
                '</div>';

            //  Make connection to processing script
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'php/mail.php', true);

            xhr.onload = function() {

                if(xhr.readyState === XMLHttpRequest.DONE) {

                    if(xhr.status == '200') {
                        let data = xhr.responseText;
                        if(data == '<div class="error-message error-pass"><div class="pass-icon"><i class="fas fa-check-circle"></i></div><p class="error-pass-text">Message Sent.</p></div>') {
                            errorMessage.innerHTML = data;
                            setTimeout(() => {
                                grecaptcha.reset(captcha1);
                                document.querySelector("form").reset();
                                document.querySelector(".error-wrapper").style.display = 'none';
                                const formFields = document.getElementsByClassName('form-field');
                                for (var i=0; i<formFields.length; i++) {
                                    formFields[i].classList.remove('success');
                                }
                                const emailField = document.querySelector(".form-field-email");
                                emailField.classList.remove('success');
                                const phoneField = document.querySelector(".form-field-phone");
                                phoneField.classList.remove('success');

                            }, 5000);
                        } else {
                            errorMessage.innerHTML = data;
                            // setTimeout(() => {
                            //     document.querySelector("form").reset();
                            //     grecaptcha.reset(captcha1).preventDefault();
                            //     // document.querySelector(".error-wrapper").style.display = 'none';
                            //     // grecaptcha.reset(captcha1);
                            //
                            //
                            //     // document.getElementById("captcha1").reset();
                            //     // document.querySelector(".error-fail").style.display = "none";
                            //     // document.querySelector(".content-text").style.display = "block";
                            // }, 3000);
                        }
                    }
                }
            }
            let formData = new FormData(form);
            xhr.send(formData);
        }


    }
});


const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'phone':
            checkPhone();
            break;
        case 'message':
            checkMessage();
            break;
    }
}));

