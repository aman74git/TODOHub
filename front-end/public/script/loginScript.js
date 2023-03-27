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

const loginDebounce = debounce(300);
const passDebounce = debounce(300);

function checkinputBox([e, len]) {
  return String(e.target.value).trim().length >= len;
}

let notEmptyEmailField = false;
let notEmptyPassField = false;

loginEmailBox.addEventListener('input', async (e) => {
  const valid = await loginDebounce(checkinputBox, [e, 5]);
  if (valid) {
    notEmptyEmailField = true;
    if (notEmptyPassField && loginSubmitBtn.classList.contains('disabled')) {
      loginSubmitBtn.classList.remove('disabled');
    }
  } else {
    notEmptyEmailField = false;
    if (!loginSubmitBtn.classList.contains('disabled'))
      loginSubmitBtn.classList.add('disabled');
  }
});

loginPasswordBox.addEventListener('input', async (e) => {
  const valid = await loginDebounce(checkinputBox, [e, 8]);
  if (valid) {
    notEmptyPassField = true;
    if (
      notEmptyEmailField &&
      loginSubmitBtn.classList.contains('disabled')
    ) {
      loginSubmitBtn.classList.remove('disabled');
    }
  } else {
    notEmptyPassField = false;
    if (!loginSubmitBtn.classList.contains('disabled'))
      loginSubmitBtn.classList.add('disabled');
  }
});
