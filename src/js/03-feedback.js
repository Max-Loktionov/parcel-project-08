import throttle from 'lodash.throttle';


const formEl = document.querySelector('.feedback-form');
const textAreaEl = document.querySelector('.feedback-form textarea');
const inputEl = document.querySelector('.feedback-form input');

let formData = {};
const STORAGE_KEY = 'feedback-form-state';

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
    e.preventDefault();

    const { elements: { email, message }} = e.target;
    
    formData = {
        email: email.value,
        message: message.value
     } 
    
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    console.log(formData);
}


function onFormInput(e) {
    formData[e.target.name] = e.target.value;
   
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}


function getSavedMessage(e) {

    const savedMessage = localStorage.getItem(STORAGE_KEY );
    if (savedMessage) {
        const parcedMessage =JSON.parse(savedMessage)
        console.dir(parcedMessage.message)
       
        inputEl.value = parcedMessage.email;
        textAreaEl.value = parcedMessage.message;
    };  
}

function getSavedEmail(e) {
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
        console.log(savedEmail);
        inputEl.value = savedEmail;
    };
};

getSavedEmail();
getSavedMessage();