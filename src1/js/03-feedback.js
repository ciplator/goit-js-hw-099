import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageText = form.querySelector('textarea[name="message"]');

const storageKey = "feedback-form-state";

const saveStateToStorage = () => {
  const state = {
    email: emailInput.value,
    message: messageText.value,
  };

  localStorage.setItem(storageKey, JSON.stringify(state));
};

const loadStateFromStorage = () => {
  const storedState = localStorage.getItem(storageKey);

  if (storedState) {
    const state = JSON.parse(storedState);
    emailInput.value = state.email;
    messageText.value = state.message;
  }
};

const clearStorageAndForm = () => {
  localStorage.removeItem(storageKey);
  emailInput.value = "";
  messageText.value = "";
};

const logFormValues = () => {
  const state = {
    email: emailInput.value,
    message: messageText.value,
  };
  console.log(state);
};

const throttledSaveState = throttle(saveStateToStorage, 500);


form.addEventListener('input', throttledSaveState);
form.addEventListener('submit', (e) => {
  e.preventDefault();
  logFormValues();
  clearStorageAndForm();
});

loadStateFromStorage();
