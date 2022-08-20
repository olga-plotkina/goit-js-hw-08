import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');

const savedMessage = JSON.parse(localStorage.getItem('feedback-form-state'));
let formData = savedMessage ?? {};

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
  const { email, message } = event.currentTarget.elements;

  formData.email = email.value;
  formData.message = message.value;

  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
  console.log(formData);
};

formRef.addEventListener('submit', onFormSubmit);
