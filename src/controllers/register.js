// Toggle SignIn - SignUp
function toggleLogin() {
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "block";
}

function toggleRegister() {
  document.getElementById("register").style.display = "block";
  document.getElementById("login").style.display = "none";
}

// Register
document.getElementById("sign_up").onclick = (e) => {
  e.preventDefault();
  // get user data from the form
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let password = document.getElementById("password").value;
  let gender = document.querySelector('input[name="gender"]:checked').value;

  // check validation
  let validation = true;
  validation &=
    isNameValid(name) &
    isPhoneValid(phone) &
    isEmailValid(email) &
    isPasswordValid(password);

  if (!validation) {
    return;
  }

  let new_user = new User();
  new_user = { ...new_user, name, phone, email, password, gender };
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Users/signup",
    method: "POST",
    data: new_user,
  });
  promise
    .then((res) => {
      console.log(res.data.message);
      Toastify({
        text: "✅ Account registered successfully!",
        duration: 3000,
        close: true,
        stopOnFocus: true, // Prevents dismissing of toast on hover
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
      }).showToast();
      document.querySelector("#register form").reset();
      // Chuyển hướng sau 5 giây
      setTimeout(function () {
        window.location.href = "index.html";
      }, 3000);
    })
    .catch((err) => {
      console.log(err);
      Toastify({
        text: `❌ ${err.message}`,
        duration: 3000,
        close: true,
        stopOnFocus: true, // Prevents dismissing of toast on hover
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #e57373, #f44336)",
      }).showToast();
      document.querySelector("#register form").reset();
    });
};

// Login
document.getElementById("sign_in").onclick = () => {
  alert("Login page is still in progress. Please visit later!");
};
