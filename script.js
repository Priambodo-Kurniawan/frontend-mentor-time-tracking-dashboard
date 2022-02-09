let range = "weekly";
let listData = [];

function renderTask(data, range) {
  // selector
  let taskContainerElement = document.getElementById("item-container");
  taskContainerElement.innerHTML = "";
  let category = "Last Week";
  if (range === "daily") {
    category = "Yesterday";
  } else if (range === "monthly") {
    category = "Last Month";
  }

  for (const task of data) {
    let cardClass = task.title.toLowerCase().split(" ").join("-");
    let detail = task.timeframes[range];
    let template = `<div class="item-card">
      <div class="task-card">
        <div class="task-hero ${cardClass}">
          <img src="./images/icon-${cardClass}.svg" alt="icon work" />
        </div>
        <div style="position: relative">
          <img class="ellipsis-icon" src="./images/icon-ellipsis.svg" alt="ellipsis icon" />
          <div class="task-content">
            <div class="task-category">
              <h6>${task.title}</h6>
              <img src="./images/icon-ellipsis.svg" alt="ellipsis icon" />
            </div>
            <div class="task-hour">
              <h2>${detail.current}hrs</h2>
              <span class="task-hour-prev">${category} - ${detail.previous}hrs</span>
            </div>
          </div>
        </div>
      </div>
      </div>`;

    taskContainerElement.innerHTML += template;
    console.log(task);
  }
}

function changeRange(event, range) {
  document.querySelectorAll(".category").forEach((el) => {
    el.classList.remove("active");
  });
  event.target.classList.add("active");
  renderTask(listData, range);
}

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    renderTask(data, range);
    listData = data;
  });
