// Get DOM elements
const addForm = document.getElementById("add-form");
const addFormInput = document.getElementById("add-form-input");
const pairListTextArea = document.getElementById("pair-list");
const sortByNameButton = document.getElementById("btn-sort-name");
const sortByValueButton = document.getElementById("btn-sort-value");
const deleteButton = document.getElementById("btn-del");
const showXMLButton = document.getElementById("btn-show");

// Initialize data array
let resArr = [];

// Event listeners
addForm.addEventListener("submit", onAddFormSubmit);
sortByNameButton.addEventListener("click", onSortName);
sortByValueButton.addEventListener("click", onSortValue);
pairListTextArea.addEventListener("change", onPairListChange);
deleteButton.addEventListener("click", onDel);
showXMLButton.addEventListener("click", onShow);
/**
 * Update buttons based on the state of the pair list.
 */
function onPairListChange() {
  if (resArr.length === 0) {
    sortByNameButton.disabled = true;
    sortByValueButton.disabled = true;
    deleteButton.disabled = true;
  } else if (resArr.length === 1) {
    deleteButton.disabled = false;
    sortByNameButton.disabled = true;
    sortByValueButton.disabled = true;
  } else {
    sortByNameButton.disabled = false;
    sortByValueButton.disabled = false;
    deleteButton.disabled = false;
  }
}

/**
 * Add a new pair to the list.
 * @param {string} listItemToAdd - The new pair to add to the list.
 */
function addToList(listItemToAdd) {
  const itemToAdd = {
    name: listItemToAdd.split("=")[0].trim(),
    value: listItemToAdd.split("=")[1].trim(),
  };
  resArr.push(itemToAdd);
}

/**
 * Render the list of pairs to the DOM.
 */
function renderForm() {
  const textToScreen = resArr.map((pair) => `${pair.name} = ${pair.value}`);
  pairListTextArea.value = textToScreen.join("\n");
}
/**
 * Sort the pair list by name.
 */
function onSortName() {
  resArr.sort((a, b) => a.name.localeCompare(b.name));
  renderForm();
}

/**
 * Sort the pair list by value.
 */
function onSortValue() {
  resArr.sort((a, b) => a.value.localeCompare(b.value));
  renderForm();
}

/**
 * Delete the last pair from the list.
 */
function onDel() {
  if (resArr.length === 0) {
    alert("Error: the list of pairs is empty");
    return;
  }

  resArr.pop();
  onPairListChange();
  renderForm();
}

/**
 * Convert the list of pairs to XML and render it to the DOM.
 */
function onShow() {
  const xmlToScreen = resArr.map(
    (pair) => `<name>${pair.name}</name>=<value>${pair.value}</value>`
  );
  pairListTextArea.value = xmlToScreen.join("\n");
}

/**
 * Handle the submission of the "add pair" form.
 * @param {Event} e - The submit event object.
 */
function onAddFormSubmit(e) {
  e.preventDefault();

  if (!addFormInput.value) {
    alert("Error: no input");
    return;
  }

  if (!addFormInput.value.includes("=")) {
    alert("Error: no '='");
    return;
  }

  addToList(addFormInput.value);
  onPairListChange();
  renderForm();
  addFormInput.value = "";
}
