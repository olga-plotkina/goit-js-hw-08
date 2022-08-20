import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');

const savedMessage = JSON.parse(localStorage.getItem('feedback-form-state'));
const formData = savedMessage ?? {};

if (savedMessage) {
  formRef.elements.email.value = savedMessage.email ? savedMessage.email : '';
  formRef.elements.message.value = savedMessage.message
    ? savedMessage.message
    : '';
}

const onFormInput = event => {
  formData[event.target.name] = event.target.value;
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

formRef.addEventListener('input', throttle(onFormInput, 500));

const onFormSubmit = event => {
  event.preventDefault();
  const formElements = event.currentTarget.elements;

  for (let i = 0; i < formElements.length; i++) {
    if (formElements[i].tagName.toUpperCase() === 'BUTTON') {
      continue;
    }
    if (!formElements[i].value) {
      alert('Усі поля мають бути заповнені!');
      return;
    }
  }

  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(formData);
};

formRef.addEventListener('submit', onFormSubmit);
