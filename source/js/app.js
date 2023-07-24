var $ = document;
const listed = $.querySelector('#listed');
const colorBox = $.querySelectorAll('.color-box');
const btnSave = $.querySelector('#btn-save');
const noteInput = $.querySelector('#input-field');
const btnDelete = $.querySelector('#btn-delete');
let noteArr = [];

window.addEventListener('load', getLocalStorage);
btnSave.addEventListener('click', noteGenerator);
btnDelete.addEventListener('click', deleteValue);
noteInput.addEventListener('keydown', createNoteWithEnter);

function noteGenerator() {
  let inputValue = noteInput.value;

  let noteObj = {
    id: noteArr.length + 1,
    title: inputValue,
    color: noteInput.style.backgroundColor,
  };

  noteArr.push(noteObj);
  setLocalStorage(noteArr);
  createNote(noteArr);
}

function deleteValue() {
  noteInput.value = '';
  noteInput.style.backgroundColor = '#fff';
}

function createNote(arr) {
  listed.innerHTML = '';
  arr.forEach(function (item) {
    let newNoteDiv = $.createElement('div');
    let newNoteP = $.createElement('p');
    newNoteDiv.style.backgroundColor = item.color;
    newNoteDiv.classList.add('card', 'shadow-sm', 'rounded');
    newNoteP.classList.add('card-text', 'p-3');
    newNoteP.innerHTML = item.title;
    newNoteDiv.append(newNoteP);
    listed.append(newNoteDiv);
    newNoteDiv.addEventListener('click', function () {
      // Remove note from both listed element and local storage
      newNoteDiv.remove();
      noteArr = noteArr.filter((note) => note.id !== item.id);
      setLocalStorage(noteArr);
    });
  });
}

function createNoteWithEnter(e) {
  if (e.keyCode == 13) {
    createNote();
    noteInput.value = '';
  }
}

colorBox.forEach(function (color) {
  color.addEventListener('click', function (e) {
    let mainColor = window.getComputedStyle(e.target, null).getPropertyValue('background-color');
    noteInput.style.backgroundColor = mainColor;
  });
});

function setLocalStorage(arr) {
  localStorage.setItem('notes', JSON.stringify(arr));
}

function getLocalStorage() {
  let localstorageNote = JSON.parse(localStorage.getItem('notes'));
  if (localstorageNote) {
    noteArr = localstorageNote;
  } else {
    noteArr = [];
  }
  createNote(noteArr);
}
