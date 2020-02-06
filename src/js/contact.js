import "core-js/modules/es6.promise";
import "core-js/modules/es6.array.iterator";
import 'whatwg-fetch';

function contactFunctions () {

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
    document.querySelector('.' + fieldName + ' .error').textContent = errorMsg;
    showDomElem(document.querySelector('.' + fieldName + ' .error'));
  }

  function initializeForm(event) {
    if (event) {
      event.preventDefault();
    }
    document.getElementById("contact-form").reset();
    clearMsgs();
  }

  function clearMsgs() {
    hideDomElem(document.querySelector('.success'));
    hideDomElem(document.querySelector('.failure'));
    Object.keys(fields).forEach(fieldName => {
      document.querySelector('.' + fieldName + ' .error').textContent = '';
      hideDomElem(document.querySelector('.' + fieldName + ' .error'));
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
    const nameElem = document.querySelector('.name input'),
      emailElem = document.querySelector('.email input'),
      phoneElem = document.querySelector('.phone input'),
      messageElem = document.querySelector('.message textarea');
    const name = nameElem.value || null,
      email = emailElem.value || null,
      phone = phoneElem.value || null,
      message = messageElem.value  || null;

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
      showDomElem(document.querySelector('.success'));
    } else {
      showDomElem(document.querySelector('.failure'));
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
      
      fetch(mailAPIUrl, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          showDomElem(document.querySelector('.success'));
        })
        .catch(error => {
          console.log(error);
          showDomElem(document.querySelector('.failure'));
        });
    }
  }
  
  function showDomElem(elem) {
    elem.style.display = 'block';
  }

  function hideDomElem(elem) {
    elem.style.display = 'none';
  }

  const mailAPIUrl = 'https://apis.randelldawson.com/email';
  document.querySelector('.buttons .button-submit')
    .addEventListener('click',sendEmail);
  document.querySelector('.buttons .button-reset')
    .addEventListener('click', initializeForm);
  initializeForm();
}

export default contactFunctions;
