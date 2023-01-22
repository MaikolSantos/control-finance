function createDivNewValue(text) {
  const divNewValue = document.createElement('div')
  divNewValue.id = 'div__new__value'

  divNewValue.addEventListener("click", () => {
    createModalInsertValue();
  })

  const title = document.createElement('h2')
  title.classList = 'title-2-bold color-grey-1'
  title.innerText = `${text || 'Nenhum valor cadastrado'}`

  const p = document.createElement('p')
  p.classList = 'text-1-medium color-grey-2'
  p.innerText = 'Registrar novo valor'

  divNewValue.append(title, p)

  return divNewValue
}
