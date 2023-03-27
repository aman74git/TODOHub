function debounce(ms) {
  let timer;
  return async function (callback, param) {
    return new Promise((resolve, reject) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        resolve(callback(param));
      }, ms);
    });
  };
}

let isValidEmail = false;
let isValidPassword = false;
let isPasswordMatched = false;
// email validation function
function validateEmailRegex(email) {
  const re =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return re.test(email);
}
const emailDebounce = debounce(300);
registerEmailBox.addEventListener('input', async (e) => {
  const isValid = await emailDebounce(validateEmailRegex, e.target.value);
  if (isValid) {
    emailHelpBox.innerHTML = '<i class="bi bi-check2-all"></i> Valid ';
    emailHelpBox.style.color = 'green';
    isValidEmail = true;
    if (isValidPassword && isPasswordMatched)
      if (registerSubmitBtn.classList.contains('disabled'))
        registerSubmitBtn.classList.remove('disabled');
  } else {
    isValidEmail = false;
    emailHelpBox.innerHTML =
      '<i class="bi bi-exclamation-circle-fill"></i> Invalid';
    emailHelpBox.style.color = 'red';
    if (!registerSubmitBtn.classList.contains('disabled'))
      registerSubmitBtn.classList.add('disabled');
  }
});

//password validation function
function validatePasswordRegex(password) {
  const re_min8 = /^(.+){8,}/;
  const re_min_1small = /.*[a-z].*/;
  const re_min_1caps = /.*[A-Z].*/;
  const re_min_1num = /.*[0-9].*/;
  const re_min_1symbol = /.*[!@#$%^&*()_+-=:;"'|\{\[\]\}?,\.].*/;

  const res = [
    re_min8.test(password),
    re_min_1small.test(password),
    re_min_1caps.test(password),
    re_min_1num.test(password),
    re_min_1symbol.test(password),
  ];
  return res;
}
const passDebounce = debounce(300);

let enteredConfirmedPass = false;
registerPasswordBox.addEventListener('input', async (e) => {
  const res = await passDebounce(validatePasswordRegex, e.target.value);
  if (enteredConfirmedPass) await confirmPassEL(confirmPassBox); // update the confirm and current matches or not

  passHelpBox.classList.remove('d-none');

  const checkerTextBoxes = Array.from(passHelpBox.getElementsByTagName('div'));
  let matchCnt = 0;

  for (i in res) {
    if (res[i]) {
      checkerTextBoxes[i].style.color = 'green';
      matchCnt++;
    } else checkerTextBoxes[i].style.color = 'red';
  }

  if (matchCnt === checkerTextBoxes.length) {
    isValidPassword = true;
    if (isValidEmail && isPasswordMatched)
      if (registerSubmitBtn.classList.contains('disabled'))
        registerSubmitBtn.classList.remove('disabled');
  } else {
    isValidPassword = false;
    if (!registerSubmitBtn.classList.contains('disabled'))
      registerSubmitBtn.classList.add('disabled');
  }
});

// check confirm password

const confirmPassDebounce = debounce(300);
const validConfirmPass = (password) => {
  return password === registerPasswordBox.value;
};
const confirmPassEL = async (ele) => {
  enteredConfirmedPass = true;
  if (registerPasswordBox.value === '' || !registerPasswordBox.value)
    confirmPassHelpBox.innerText = '';
  const res = await confirmPassDebounce(validConfirmPass, ele.value);
  if (res) {
    confirmPassHelpBox.innerText = 'confirm password matches';
    confirmPassHelpBox.style.color = 'green';
    isPasswordMatched = true;
    if (isValidEmail && isValidPassword)
      if (registerSubmitBtn.classList.contains('disabled'))
        registerSubmitBtn.classList.remove('disabled');
  } else {
    confirmPassHelpBox.innerText = 'confirm password donot match';
    confirmPassHelpBox.style.color = 'red';
    isPasswordMatched = false;
    if (!registerSubmitBtn.classList.contains('disabled'))
      registerSubmitBtn.classList.add('disabled');
  }
};
confirmPassBox.addEventListener('input', (e) => confirmPassEL(e.target));
