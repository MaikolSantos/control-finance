function createModalInsertValue() {
  const body = document.querySelector("body");

  const modalWrapper = document.createElement("section");
  modalWrapper.classList = "modal__wrapper";

  const modal = document.createElement("div");
  modal.classList = "modal";

  const modalHeader = createModalHeader();
  const modalBody = createModalBody();

  modal.append(modalHeader, modalBody);

  modalWrapper.append(modal);

  body.append(modalWrapper);

  createNewValue(modalWrapper)

  return modalWrapper;
}

function createTitle() {
  const title = document.createElement("h2");
  title.classList = "title-2-bold";
  title.innerText = "Registro de valor";

  return title;
}

function createClosedModal() {
  const closedModal = document.createElement("button");
  closedModal.classList = "button button-greylow";
  closedModal.innerText = "X";
  closedModal.addEventListener("click", () => {
    closedModal.closest(".modal__wrapper").remove();
  });

  return closedModal;
}

function createModalHeader() {
  const modalHeader = document.createElement("header");
  modalHeader.classList = "modal__header";

  const title = createTitle();
  const closedModal = createClosedModal();

  modalHeader.append(title, closedModal);

  return modalHeader;
}

function createForm() {
  const form = document.createElement("form");
  form.classList = "form__insert__value";

  const label = document.createElement("label");
  label.classList = "text-1-medium";
  label.innerText = "Valor";

  const input = document.createElement("input");
  input.classList = "input";
  input.type = "text";
  input.placeholder = "R$ 0,00";
  input.addEventListener("keydown", (e) => {
    Number(e.key) ||
    e.key === "," ||
    e.key === "." ||
    e.key === "Backspace" ||
    e.key === "Shift" ||
    e.key === '0'
      ? ""
      : setTimeout(() => {
          input.value = input.value.slice(0, -1);
        }, 100);
  });

  form.append(label, input);

  return form;
}

function createDescription() {
  const description = document.createElement("p");
  description.classList = "text-1-regular color-grey-2";
  description.innerText =
    "Digite o valor e em seguida aperte no botão referente ao tipo do valor";

  return description;
}

function createTypes() {
  const types = document.createElement("ul");
  types.classList = "types";

  const legend = document.createElement("legend");
  legend.innerText = "Tipo de valor";

  const entry = document.createElement("li");
  const buttonEntry = document.createElement("button");
  buttonEntry.classList = "button button-outline";
  buttonEntry.innerText = "Entrada";
  buttonEntry.dataset.categoryId = 1
  entry.appendChild(buttonEntry);

  const exit = document.createElement("li");
  const buttonExit = document.createElement("button");
  buttonExit.classList = "button button-outline";
  buttonExit.innerText = "Saída";
  buttonExit.dataset.categoryId = 2
  exit.appendChild(buttonExit);

  types.append(legend, entry, exit);

  types.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const buttons = [...types.querySelectorAll("button")];
      buttons.map((button) => {
        button.removeAttribute("data-actived");
      });
      e.target.setAttribute("data-actived", "");
    }
  });

  return types;
}

function createButtons() {
  const buttons = document.createElement("div");
  buttons.classList = "buttons";

  const cancel = document.createElement("button");
  cancel.classList = "button button-greylow";
  cancel.innerText = "Cancelar";
  cancel.addEventListener("click", () => {
    cancel.closest(".modal__wrapper").remove();
  });

  const insert = document.createElement("button");
  insert.classList = "button button-primary";
  insert.innerText = "Inserir Valor";
  insert.addEventListener("click", () => {
    cancel.closest(".modal__wrapper").remove();
  });

  buttons.append(cancel, insert);

  return buttons;
}

function createModalBody() {
  const modalBody = document.createElement("div");
  modalBody.classList = "modal__body";

  const description = createDescription();
  const form = createForm();
  const types = createTypes();
  const buttons = createButtons();

  modalBody.append(description, form, types, buttons);

  return modalBody;
}

function createNewValue(modalWrapper) {
  const button = document.querySelector('.modal .button-primary')
  
  button.addEventListener('click', () => {
    const newValue = {}

    newValue.value = parseFloat(modalWrapper.querySelector('.input').value)
    newValue.categoryID = parseFloat(modalWrapper.querySelector('[data-actived]').dataset.categoryId)

    
    if(newValue.value && newValue.categoryID) {
      newValue.id = insertedValues.length + 1
      insertedValues.push(newValue)
      renderValues(insertedValues)
    }
  })
}

