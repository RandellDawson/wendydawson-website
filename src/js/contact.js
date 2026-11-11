function contactFunctions() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const submit = form.querySelector(".button-submit");
  const success = form.querySelector(".success");
  const failure = form.querySelector(".failure");
  const rules = {
    name: { required: true, valid: value => value.length >= 2, message: "*Please enter your name." },
    email: { required: true, valid: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), message: "*Please enter a valid email address." },
    phone: { required: false, valid: value => /^[+\d() .-]{7,}$/.test(value), message: "*Please enter a valid phone number." },
    message: { required: true, valid: value => value.length >= 20, message: "*Message must contain at least 20 characters." }
  };

  function clearMessages() {
    success.style.display = "none";
    failure.style.display = "none";
    for (const name of Object.keys(rules)) {
      const error = form.querySelector(`.${name} .error`);
      error.textContent = "";
      error.style.display = "none";
    }
  }

  function validate() {
    let valid = true;
    for (const [name, rule] of Object.entries(rules)) {
      const value = form.elements[name].value.trim();
      const error = form.querySelector(`.${name} .error`);
      if ((rule.required && !value) || (value && !rule.valid(value))) {
        error.textContent = rule.message;
        error.style.display = "block";
        valid = false;
      }
    }
    return valid;
  }

  form.addEventListener("reset", () => {
    clearMessages();
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();
    clearMessages();
    if (!validate()) return;

    submit.disabled = true;
    try {
      const body = new URLSearchParams(new FormData(form));
      const response = await fetch(form.getAttribute("action") || window.location.pathname, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
      });
      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
      form.reset();
      success.style.display = "block";
    } catch (error) {
      console.error(error);
      failure.style.display = "block";
    } finally {
      submit.disabled = false;
    }
  });

  clearMessages();
}

export default contactFunctions;
