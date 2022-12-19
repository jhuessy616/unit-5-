console.log("home page works");

async function displayAllTodoList() {
  const url = "http://localhost:4000/todo/";
  const list = document.getElementById("list");

  const response = await fetch(url);
  const data = await response.json();
  console.log(data.db);

  let listItems = data.db;
  listItems.forEach((listItem) => {
    // create the element
    const todoListItemElement = document.createElement("li");
    // alter the innerText
    //   ! Use this for grabbing them all. 
    // todoListItemElement.innerText = listItem.item;
    //  INNER HTML
    todoListItemElement.innerHTML = `<a href="/page2.html?id=${listItem.todo_id}"> ${listItem.item}</a>`;
    // attach this to the parent
    list.append(todoListItemElement);
  });
}

displayAllTodoList();

