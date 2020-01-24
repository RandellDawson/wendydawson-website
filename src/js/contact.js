$(document).ready(function () {

  const fields = {
    name: {
      regex: /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/,
      required: true,
      errorMsg: '*This is not a valid name.'
    },
    email: {
      regex: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      required: true,
      errorMsg: '*This is not a valid email address.'
    },
    phone: {
      regex: /^\+?(\d[\d\-\+\(\) ]{5,}\d$)/,
      required: false,
      errorMsg: '*This is not a valid phone number.'
    },
    message: {
      regex: /.{20}/,
      required: true,
      errorMsg: '*Message must contain at least 20 characters.'
    }
  };

  function displayError(fieldName, errorMsg) {
    $('.' + fieldName + ' .error').text(errorMsg);
    $('.' + fieldName + ' .error').show();
  }

  function initializeForm(event) {
    if (event) {
      event.preventDefault();
    }
    $("#contact-form")[0].reset();
    clearMsgs();
  }

  function clearMsgs() {
    $('.success').hide();
    $('.failure').hide();
    Object.keys(fields).forEach(fieldName => {
      $('.' + fieldName + ' .error').text('');
      $('.' + fieldName + ' .error').hide();
    });
  }

  function validateField(fieldName, fieldVal) {
    if (fields[fieldName].required && !fieldVal) {
      displayError(fieldName, '*This is a required field.');
      return false;
    }
    if (fieldVal && !fields[fieldName].regex.test(fieldVal)) {
      displayError(fieldName, fields[fieldName].errorMsg);
      return false;
    }
    return true;
  }

  function validateForm(form) {
    clearMsgs();
    const name = $('.name input', form).val() || null,
      email = $('.email input', form).val() || null,
      phone = $('.phone input', form).val() || null,
      message = $('.message textarea', form).val() || null;

    let validForm = true;
    [{ name }, { email }, { phone }, { message }].forEach(field => {
      const prop = Object.keys(field)[0];
      const value = field[prop];
      if (!validateField(prop, value)) {
        validForm = false;
      }
    });

    return validForm ? { name, email, phone, message } : false;
  }

  function showMsg(response) {
    if (response.success) {
      initializeForm();
      $('.success').show();
    } else {
      $('.failure').show();
      console.log(response.error);
    }
  }

  function sendEmail(event) {
    event.preventDefault();
    let validForm = validateForm();

    if (validForm) {
      const { name, email, phone, message } = validForm;
      const data = {
        name,
        email,
        phone,
        message,
        mailer: "w",
      };
      ;
      $.ajax({
        type: "POST",
        url: mailAPIUrl,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: showMsg
      });
    }
  }

  const mailAPIUrl = 'https://apis.randydawson.com/email';
  $('.buttons .button-submit').click(sendEmail);
  $('.buttons .button-reset').click(initializeForm);
  initializeForm();
});