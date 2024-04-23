const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");

const listColumns = document.querySelectorAll(".drag-item-list");
const backlogList = document.getElementById("backlog-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

let updatedOnLoad = false;

let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

let draggedItem;
let dragging = false;
let currentColumn;

const filterArray = (array) => {
    const filteredArray = array.filter(item => item !== null);
    return filteredArray;
};

const updateItem = (id, column) => {
    const selectedArray = listArrays[column];
    const selectedColumnEl = listColumns[column].children;

    if (!dragging) {
        if (!selectedColumnEl[id].textContent) {
            delete selectedArray[id];
        } else {
            selectedArray[id] = selectedColumnEl[id].textContent;
        }

        updateDOMContent();
    }
};

const addToColumn = (column) => {
    const itemText = addItems[column].textContent;
    const selectedArray = listArrays[column];
    selectedArray.push(itemText);
    addItems[column].textContent = "";
    updateDOMContent();
};

const showInputBox = (column) => {
    addBtns[column].style.visibility = "hidden";
    saveItemBtns[column].style.display = "flex";
    addItemContainers[column].style.display = "flex";
};

const hideInputBox = (column) => {
    addBtns[column].style.visibility = "visible";
    saveItemBtns[column].style.display = "none";
    addItemContainers[column].style.display = "none";

    addToColumn(column);
};

const rebuildArrays = () => {
    backlogListArray = Array.from(backlogListArray.children).map(item => item.textContent);
    progressListArray = Array.from(progressListArray.children).map(item => item.textContent);
    completeListArray = Array.from(completeListArray.children).map(item => item.textContent);
    onHoldListArray = Array.from(onHoldListArray.children).map(item => item.textContent);

    updateDOMContent();
};

const dragEnter = (column) => {
    listColumns[column].classList.add("over");
    currentColumn = column;
};

const dropItem = (event) => {
    event.preventDefault();

    listColumns.forEach(column => column.classList.remove("over"));

    const parent = listColumns[currentColumn];
    parent.appendChild(draggedItem);

    dragging = false;

    rebuildArrays();
};

const allowItemDrop = (event) => {
    event.preventDefault();
};

const dragItem = (event) => {
    draggedItem = event.target;
    dragging = true;
};

const createItemEl = (columnEl, column, item, idx) => {
    const listEl = document.createElement("li");
    listEl.classList.add("drag-item");
    listEl.textContent = item;
    listEl.draggable = true;
    listEl.setAttribute("ondragstart", "dragItem(event)");
    listEl.contentEditable = true;
    listEl.id = idx;
    listEl.setAttribute("onfocusout", `updateItem(${idx}, ${column})`);

    columnEl.appendChild(listEl);
};

const getSavedColumns = () => {
    if (localStorage.getItem("backlogItems")) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);
    } else {
        backlogListArray = ["Start JavaScript Revision", "Start NodeJs Revision"];
        progressListArray = ["Finish JavaScript Project", "Do Some NodeJs Projects"];
        completeListArray = ["Done 1 JS Project"];
        onHoldListArray = ["Something Someting"];
    }
};

const updateDOMContent = () => {
    if (!updatedOnLoad) {
        getSavedColumns();
    }

    backlogList.textContent = "";
    backlogListArray.forEach((backlogItem, idx) => createItemEl(backlogList, 0, backlogItem, idx));
    backlogListArray = filterArray(backlogListArray);

    progressList.textContent = "";
    progressListArray.forEach((progressItem, idx) => createItemEl(progressList, 1, progressItem, idx));
    progressListArray = filterArray(progressListArray);

    completeList.textContent = "";
    completeListArray.forEach((completeItem, idx) => createItemEl(completeList, 2, completeItem, idx));
    completeListArray = filterArray(completeListArray);

    onHoldList.textContent = "";
    onHoldListArray.forEach((onHoldItem, idx) => createItemEl(onHoldList, 3, onHoldItem, idx));
    onHoldListArray = filterArray(onHoldListArray);

    updatedOnLoad = true;
    updateSavedColumns();
};

getSavedColumns();

const updateSavedColumns = () => {
    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    const arrayNames = ["backlog", "progress", "complete", "onHold"];

    listArrays.forEach((listArray, idx) => localStorage.setItem(`${arrayNames[idx]}Items`, JSON.stringify(listArray)));
};

updateSavedColumns();
updateDOMContent();