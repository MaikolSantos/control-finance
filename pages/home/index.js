function openModal() {
  const buttonsOpenModal = [
    ...document.querySelectorAll("[data-modal-control]"),
  ];

  buttonsOpenModal.map((button) => {
    button.addEventListener("click", () => {
      createModalInsertValue();
    });
  });

}
openModal();

function renderValues(listItems) {
  const listValues = document.querySelector(".list__values");

  listValues.innerHTML = "";

  listItems.map((item) => {
    listValues.innerHTML += `
        <li class="item-list item__value" data-filter-id="${
          item.categoryID
        }" id="${item.id}">
          <span>
            ${item.value.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <div class="item__buttons flex align-center">
            <button class="button button-greylow" data-category-id="${
              item.categoryID
            }">${valuesCategory[item.categoryID - 1]}</button>
            ${buttonTrash(item.id)}
          </div>
        </li>
      `;
  });

  const notValue = document.querySelector("#div__new__value");

  if (notValue) notValue.remove();

  removeValues();
  sumValues()
}
renderValues(insertedValues);

function removeValues() {
  const buttons = [...document.querySelectorAll(".button-trash")];

  buttons.map((button) => {
    button.addEventListener("click", () => {
      const listValues = document.querySelector(".list__values");
      
      let index = Number(button.id.replace("value_", "")) - 1;
      button.closest("li").remove();
      insertedValues.splice(index, 1);

      if (!listValues.children.length) {
        const mainBody = document.querySelector(".main__body");
        mainBody.appendChild(createDivNewValue());
      }

      sumValues();
    });
  });
}

function sumValues() {
  const values = [...document.querySelectorAll(".item__value > span")];

  const divTotal = document.querySelector("#total__values");

  const total = values.reduce((previous, current) => {
    let currentValue = +current.innerText.replace("R$", "").replace(",", ".");

    if (!currentValue)
      currentValue = +current.innerText
        .replace("R$", "")
        .replace(",", ".")
        .replace(".", "");

    return previous + currentValue;
  }, 0);

  divTotal.innerText = total.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
sumValues();

function filterValues() {
  const filters = document.querySelector(".main__filters");

  filters.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      document.querySelector(".list__values").innerHTML = "";

      const newValues = insertedValues.filter((value) => {
        return +e.target.dataset.filterId === value.categoryID;
      });

      if(newValues.length === 0) {
        const mainBody = document.querySelector(".main__body");
        mainBody.appendChild(createDivNewValue());
      } else {
        renderValues(newValues);
        sumValues()
      }

      if(e.target.innerText === 'Todos') {
        renderValues(insertedValues);
        const notValue = document.querySelector("#div__new__value");

        if (notValue) notValue.remove();
      }
      
    }
  });
}
filterValues();


