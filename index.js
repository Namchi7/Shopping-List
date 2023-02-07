const newListName = document.querySelector("#list-name");
const listAddBtn = document.querySelector("#add-btn");
const deleteAllBtn = document.querySelector("#delete-all");
const allListGoHere = document.querySelector("#shopping-lists");

const allList = {
  allLists: [
    {
      listName: "List Name",
      items: [
        {
          item: "Item 1",
          quantity: "qty",
        },
        {
          item: "Name",
          quantity: "qty",
        },
      ],
    },
    {
      listName: "List Name",
      items: [
        {
          item: "Item 1",
          quantity: "qty",
        },
        {
          item: "Name",
          quantity: "qty",
        },
      ],
    },
  ],
};

const listObj = {
  listName: "List Name",
  items: [
    {
      item: "Item 1",
      quantity: "qty",
    },
    {
      item: "Name",
      quantity: "qty",
    },
  ],
};

const itemObj = {
  item: "Name",
  quantity: "qty",
};

function checkWhiteSpaceString(str) {
  if (str !== null && str !== "" && /^\s*$/.test(str) === false) return false;
  else return true;
}

function saveLists(lists) {
  localStorage.setItem("Shopping Lists", JSON.stringify(lists));
  showAllLists();
}

function removeList(lists) {
  const listDeleteBtn = document.querySelectorAll("#delete-list");

  listDeleteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const listIndex = deleteBtn.parentElement.parentElement.id;

      lists.allLists.splice(listIndex, 1);

      saveLists(lists);
    });
  });
}

function removeItem(lists) {
  const itemDeleteBtn = document.querySelectorAll("#delete-item");

  itemDeleteBtn.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", () => {
      const itemIndex = deleteBtn.parentElement.parentElement.id;
      const listIndex =
        deleteBtn.parentElement.parentElement.parentElement.parentElement.id;
      lists.allLists[listIndex].items.splice(itemIndex, 1);
      //   localStorage.setItem("Shopping Lists", JSON.stringify(lists));
      saveLists(lists);
    });
  });
}

function saveEditedItem(lists) {
  const itemSaveBtn = document.querySelectorAll("#item-save-btn");

  itemSaveBtn.forEach((saveBtn) => {
    saveBtn.addEventListener("click", () => {
      const itemIndex = saveBtn.parentElement.parentElement.id;
      const listIndex =
        saveBtn.parentElement.parentElement.parentElement.parentElement.id;
      console.log(listIndex, itemIndex);
      const edits = saveBtn.parentElement.parentElement.children;

      lists.allLists[listIndex].items[itemIndex].item = edits[0].innerText;
      lists.allLists[listIndex].items[itemIndex].quantity = edits[1].innerText;

      saveLists(lists);
    });
  });
}

function editListItem(lists) {
  const itemEditBtn = document.querySelectorAll("#edit-item");

  itemEditBtn.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      editBtn.parentElement.parentElement.children[0].setAttribute(
        "contentEditable",
        true
      );
      editBtn.parentElement.parentElement.children[1].setAttribute(
        "contentEditable",
        true
      );

      editBtn.parentElement.innerHTML = `<input type="submit" value="Save" class="item-save-btn" id="item-save-btn">`;

      saveEditedItem(lists);
    });
  });
}

function saveListName(lists) {
  const saveListBtn = document.querySelectorAll("#save-list-name");

  saveListBtn.forEach((saveBtn) => {
    saveBtn.addEventListener("click", () => {
      const listName = saveBtn.parentElement.children[0];
      const listIndex = saveBtn.parentElement.parentElement.id;

      lists.allLists[listIndex].listName = listName.innerText;

      saveLists(lists);
    });
  });
}

function editListName(lists) {
  const editListBtn = document.querySelectorAll("#edit-list");

  editListBtn.forEach((editBtn) => {
    editBtn.addEventListener("click", () => {
      const listName = editBtn.parentElement.children[0];

      listName.setAttribute("contentEditable", "true");
      editBtn.outerHTML = `<img src="./images/Save.svg" alt="Save" class="edit" id="save-list-name">`;

      saveListName(lists);
    });
  });
}

function renderItems(items) {
  let listOfItems = ``;

  items.forEach((item, index) => {
    const itemTemplate = `  <div class="list-item" id="${index}">
                                    <span class="item-name">${item.item}</span>
                                    <span class="qty">${item.quantity}</span>
                                    <div class="action">
                                        <img src="./images/Edit.svg" alt="Edit" class="edit" id="edit-item">
                                        <img src="./images/Delete.svg" alt="Delete" class="delete" id="delete-item">  
                                    </div>
                                </div> `;
    listOfItems += itemTemplate;
  });

  return listOfItems;
}

function toggleView() {
  const listView = document.querySelectorAll("#list-view");
  console.log(listView);

  listView.forEach((view) => {
    view.addEventListener("click", () => {
      const allChild = view.parentElement.parentElement.children;

      if (view.getAttribute("alt") === "Shrink") {
        for (let i = 1; i < allChild.length; i++) {
          allChild[i].style.display = "none";
        }

        view.setAttribute("alt", "Expand");

        view.setAttribute("src", "./images/Expand.svg");
      } else if (view.getAttribute("alt") === "Expand") {
        allChild[1].style.display = "flex";

        for (let i = 2; i < allChild.length; i++) {
          allChild[i].style.display = "grid";
        }

        view.setAttribute("alt", "Shrink");

        view.setAttribute("src", "./images/Shrink.svg");
      }
      console.log(view.parentElement.parentElement.children);
    });
  });
}

function showAllLists() {
  const lists = JSON.parse(localStorage.getItem("Shopping Lists")) || [];

  allListGoHere.innerHTML = "";

  if (lists.allLists.length !== 0) {
    lists.allLists.forEach((list, index) => {
      const listTemplate =
        `  <div class="list" id="${index}">
                                <div class="shopping-list-name">
                                    <span class="list-title">${list.listName}</span>
                                    <img src="./images/Edit.svg" alt="" class="edit" id="edit-list">
                                    <img src="./images/Delete.svg" alt="" class="delete" id="delete-list">
                                    <img src="./images/Shrink.svg" alt="Shrink" class="list-view" id="list-view">
                                </div>
                                <hr>
                                <div class="list-item-headers">
                                    <span class="item-h">Item Name</span>
                                    <span class="qty-h">Quantity</span>
                                    <span class="action-h">Action</span>
                                </div>
                                <div class="list-items">` +
        renderItems(list.items) +
        `     
                                    <div class="add-list-item">
                                        <input type="text" class="item-name" id="add-item-name" placeholder="Enter item name...">
                                        <input type="text" class="qty" id="add-qty" placeholder="Qty?...">
                                        <input type="submit" value="Add" class="add-btn" id="item-add-btn">                        
                                    </div>                     
                                </div>
                            </div>`;

      allListGoHere.insertAdjacentHTML("beforeend", listTemplate);
    });

    addItemInList();
    editListItem(lists);
    editListName(lists);
    removeItem(lists);
    removeList(lists);
    toggleView();
  } else {
    allListGoHere.innerHTML = `<p style="text-align: center;">No Lists Present</p>`;
  }
}

function addItemInList() {
  const itemAddBtn = document.querySelectorAll("#item-add-btn");

  itemAddBtn.forEach((addBtn) => {
    addBtn.addEventListener("click", () => {
      const addHere = addBtn.parentElement;

      const itemName = addHere.children[0].value;
      //   const itemQty = addHere.children[1].value;

      const lists = JSON.parse(localStorage.getItem("Shopping Lists")) || [];

      const listIndex = parseInt(addHere.parentElement.parentElement.id);

      itemObj.item = itemName;
      itemObj.quantity = addHere.children[1].value;

      lists.allLists[listIndex].items.push(itemObj);

      if (checkWhiteSpaceString(itemName) === false) {
        saveLists(lists);

        addHere.children[0].value = "";
        addHere.children[1].value = "";
      }
      //   showAllLists();
    });
  });
}

function addNewList() {
  if (checkWhiteSpaceString(newListName.value) === false) {
    const lists = JSON.parse(localStorage.getItem("Shopping Lists")) || {
      allLists: [],
    };

    listObj.listName = newListName.value;
    listObj.items = [];

    lists.allLists.push(listObj);

    console.log(lists);
    saveLists(lists);

    showAllLists();

    newListName.value = "";
  }
}

listAddBtn.addEventListener("click", () => {
  addNewList();
});

newListName.addEventListener("keydown", (k) => {
  if (k.key === "Enter") {
    addNewList();
  }
});

deleteAllBtn.addEventListener("click", () => {
  let lists = JSON.parse(localStorage.getItem("Shopping Lists"));
  lists.allLists = [];
  saveLists(lists);
});

showAllLists();
