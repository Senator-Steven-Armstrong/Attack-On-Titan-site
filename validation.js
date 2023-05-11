const email = document.getElementById("mail")
const nameInput = document.getElementById("name")
const subject = document.getElementById("subject")

function validateForm(){
    validateEmail(email)
    checkIfEmpty(nameInput)
    checkIfEmpty(subject)
}

function validateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (input.value.match(validRegex)) {
      input.style.border = "solid green 0.2vw"
      input.placeholder = "Your email adress..."
      return true;
  
    }else{
      input.style.border = "solid red 0.2vw"
      input.placeholder = "Invalid email adress"
  
      return false;
    }
}

function checkIfEmpty(element){
    if(element.value == ""){
      element.style.border = "solid red 0.2vw"
      element.placeholder = "Space can't be empty"
    }else{
      element.style.border = "solid green 0.2vw"
      element.placeholder = "Your name..."
    }
}