// Check name
function isNameValid(name) {
  if (!name) {
    document.getElementById("name-alert").innerHTML =
      "You must fill this field!";
    return false;
  } else {
    document.getElementById("name-alert").innerHTML = "";
    return true;
  }
}

// Check phone -> not null and the length must be 10-12 digits
function isPhoneValid(phone) {
  let phoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;
  if (!phone) {
    document.getElementById("phone-alert").innerHTML =
      "You must fill this field!";
    return false;
  } else if (!phoneRegex.test(phone)) {
    document.getElementById("phone-alert").innerHTML =
      "You must enter a valid Vietnamese phone number";
    return false;
  } else {
    document.getElementById("phone-alert").innerHTML = "";
    return true;
  }
}

// Check email -> not null and match the email regex
function isEmailValid(email) {
  let emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email) {
    document.getElementById("email-alert").innerHTML =
      "You must fill this field!";
    return false;
  } else if (!emailRegex.test(email)) {
    document.getElementById("email-alert").innerHTML =
      "You must enter a valid email";
    return false;
  } else {
    document.getElementById("email-alert").innerHTML = "";
    return true;
  }
}

// Check password -> not null
function isPasswordValid(password) {
  let passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!password) {
    document.getElementById("pass-alert").innerHTML =
      "You must fill this field!";
    return false;
  } else if (!passwordRegex.test(password)) {
    document.getElementById("pass-alert").innerHTML =
      "The password must be 8-20 characters and must contain at least one lowercase, one uppercase, one special character, and one number";
    return false;
  } else {
    document.getElementById("pass-alert").innerHTML = "";
    return true;
  }
}
