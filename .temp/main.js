'use strict';

// Carousel interval def
$('.carousel').carousel({
  interval: 7000
});

// Signin toggling :) && email field validation
$(document).ready(function () {
  $('#sign-menu-button').on('click', function () {
    $('#herotool').toggleClass('hidden');
  });

  // Just a simple validation of required fields :)
  $('#sign-button').on('click', function (event) {
    event.preventDefault();
    var email = $('#sign-email'),
        pass = $('#sign-password');
    var edata = email.val(),
        pdata = pass.val();

    if (validate(edata) && pdata) {
      email.val('').attr("placeholder", "Email or Username").parent().removeClass('has-error').addClass('has-success');
      pass.val('').attr("placeholder", "Password").parent().removeClass('has-error').addClass('has-success');
      alert('You are about to send form data for identifying. User: ' + edata + ' with password: ' + pdata);
    } else if (!pdata && !validate(edata)) {
      pass.parent().addClass('has-error');
      email.parent().addClass('has-error');
      pass.attr("placeholder", "Please fill in password here");
      email.val('').attr("placeholder", "Please put correct email or user name");
    } else if (!validate(edata)) {
      email.parent().addClass('has-error');
      email.val('').attr("placeholder", "Please put correct email or user name");
    } else if (!pdata) {
      pass.parent().addClass('has-error');
      pass.attr("placeholder", "Please fill in password here");
    }
  });
});

function validate(data) {
  var common = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  var strict = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
  var name = /^[a-zA-Z0-9]+$/;

  if (name.test(data)) return true;
  if (strict.test(data)) return true; // Preventing dummies
  if (common.test(data)) return true; // Not preventing dummies
  return false;
}