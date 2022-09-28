function curry(func) {

  return function curried(...args) {
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function(...args2) {
        return curried.apply(this, args.concat(args2));
      }
    }
  };

}
func(arg)(arg1, arg2)(arg1, arg2)()
const createElement = curry((tag, cls) => {
  const elem = document.createElement(tag);
  cls = [].concat(cls);
  for(let clsName of cls) {
    elem.classList.add(clsName);
  }

  return elem;
});

const createDiv = createElement('div');
const createP = createElement('p');
const createButton = createElement('button');
const createInput = createElement('input');

const msgContainer = createDiv('msg-block-container');

const message = createDiv('msg-block');

msgContainer.appendChild(message);




const newAlert = (string = "") => {
  const alertContainer = createDiv('alert');
  const textContainer = createDiv('text-container');
  const buttonContainer = createDiv('button-container');

  const title = `Сообщение от сайта ${window.location.href}`;

  const titleContainer = createP('title');
  titleContainer.textContent = title;
  const messageContainer = createP('message');
  messageContainer.textContent = string;

  textContainer.append(titleContainer, messageContainer);

  const button = createButton(['alert-button', 'executable']);
  button.textContent = "OK";

  button.addEventListener('click', removeInterface);

  buttonContainer.append(button);

  alertContainer.appendChild(textContainer);
  alertContainer.appendChild(buttonContainer);

  modalInterface(alertContainer);
}

const newPrompt = (title) => {
  const textContainer = createDiv(['text-container', 'msg-block-item']);
  const inputContainer = createDiv(['input-container', 'msg-block-item']);
  const buttonContainer = createDiv(['button-container', 'msg-block-item']);

  const titleContainer = createP('title');
  titleContainer.textContent = title;
  textContainer.appendChild(titleContainer);

  const input = createInput('prompt-input');
  inputContainer.appendChild(input);

  okButton = createButton(['ok-button', 'executable']);
  okButton.textContent = 'OK';
  cancelButton = createButton(['cancel-button', 'executable']);
  cancelButton.textContent = "Cancel";

  cancelButton.addEventListener('click', removeInterface);

  buttonContainer.append(okButton, cancelButton);

  modalInterface(textContainer, inputContainer, buttonContainer);

  return new Promise((resolve, reject) => {
    okButton.addEventListener('click', (e) => {
      resolve(input.value);
      removeInterface(e);
    });
  });

};

const newConfirm = (title) => {
  const textContainer = createDiv(['text-container', 'msg-block-item']);
  const buttonContainer = createDiv(['button-container', 'msg-block-item']);

  const titleContainer = createP('title');
  titleContainer.textContent = title;
  textContainer.appendChild(titleContainer);

  okButton = createButton(['ok-button', 'executable']);
  okButton.textContent = 'OK';
  cancelButton = createButton(['cancel-button', 'executable']);
  cancelButton.textContent = "Cancel";
  buttonContainer.append(okButton, cancelButton);

  modalInterface(textContainer, buttonContainer);

  return new Promise((resolve, reject) => {
    okButton.addEventListener('click', (e) => {
      resolve(true);
      removeInterface(e);
    });

    cancelButton.addEventListener('click', (e) => {
      resolve(false);
      removeInterface(e);
    });
  });
};

const modalInterface = (...elem) => {
  let container = msgContainer.cloneNode(true);
  let block = container.firstChild;

  container.addEventListener('click', removeInterface);
  container.classList.add('executable');

  block.append(...elem);

  document.body.appendChild(container);
  document.body.style.overflow = "hidden";
}

const removeInterface = (e) => {
  if(!(e.target.classList.contains('executable'))) return;

  document.querySelector(".msg-block-container")?.remove();
  document.body.style.overflow = "";
};


newConfirm("meow").then(console.log);