registerSubmitBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const email = registerEmailBox.value;
  const password = registerPasswordBox.value;

  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      location.href = '/login';
    } else {
      showInvalidCredential('User already exists');
    }
  } catch (err) {
    showInvalidCredential('User already exists');
  }
});

function showInvalidCredential(msg) {
  const errEle = document.createElement('div');
  errEle.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">${msg}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;
  navbarComp.insertAdjacentElement('afterend', errEle);
}
