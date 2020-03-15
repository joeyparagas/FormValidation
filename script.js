const form = document.getElementById('form'),
  username = document.getElementById('username'),
  email = document.getElementById('email'),
  password = document.getElementById('password'),
  password2 = document.getElementById('password2');

//
// FUNCTIONS
//
// Show error msg 
function showError(input, message) {
  const formControl = input.parentElement;
  // search for <small> inside "form-control" class instead of entire document
  const small = formControl.querySelector('small');
  formControl.className = 'form-control error';
  small.innerText = message;
}

// Show success msg 
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Get the ID name of the tag
function getFieldName(input) {
  // Grabs 1st letter (.charAt(0)) and makes it uppercase and adds 
  // remaining letters starting at 2nd letter (.slice(1))
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Validate email
function checkEmail(input) {
  // uses regular expression found at:
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // y.test(x) = input.value is tested against variable re if it matches
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid.')
  }
}

// Check required fields using array of inputs
function checkRequired(inputArr) {
  // use forEach to check each input value
  inputArr.forEach(function (input) {
    // .trim() trims whitespace off
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

// check input length
function checkLength(input, min, max) {

  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters.`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be smaller than ${max} characters.`);
  } else {
    showSuccess(input);
  }
}

// Check if pw matches
function checkPass(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `Passwords do not match`)
  }
}

//
// EVENT LISTENERS
//
// Upon submittion, run function
form.addEventListener('submit', function (e) {
  // since we aren't really submitting, you prevent default action
  e.preventDefault();

  // Error checking msg: List all inputs in an array rather than calling function on each input
  checkRequired([username, email, password, password2]);
  // Run function to check min & max length of username & pw
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPass(password, password2)
})