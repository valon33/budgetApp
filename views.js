const Dom = {
    type: ".add__type",
    description: ".add__description",
    value: ".add__value"
};

const img = "ImgSVGcancel-circle.svg";

export const getInput = () => {
    return {
        type: document.querySelector(".add__type").value,
        description: document.querySelector(".add__description").value,
        value: parseFloat(document.querySelector(".add__value").value)
    };
};

const formatNumber = (n, type) => {
    const num = n.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    const number = num * 1;
    type === "inc" ? `+ ${number}` : `- ${number}`;
    return num;
};

export const addListItem = (obj, type) => {
    let html, element;
    if (type === "inc") {
        element = document.querySelector(".income__list");
        html = ` <div class="item" id="inc-%id%">
      <div class="item__description">%description%</div>
      <div class="box__value">
      <div class="item__value item__value-income">+ %value%</div>
      <div class="item__delete">
      <svg class="icon-box-delete">
      <use xlink:href="Img/sprite.svg#icon-cancel-circle"></use>
      </svg>
      </div>
      </div>
      </div>`;
    } else if (type === "exp") {
        element = document.querySelector(".expenses__list");
        html = `<div class="item" id="exp-%id%">
  <div class="item__description">%description%</div>
  <div class="box__value">
  <div class="item__value item__value-expense">- %value%</div>
  <div class="item__percentage">21%</div>
  <div class="item__delete">
  <svg class="icon-box-delete">
  <use xlink:href="Img/sprite.svg#icon-cancel-circle"></use>
  </svg>
  </div>
  </div>
  </div>`;
    }

    let newHtml = html.replace("%id%", obj.id);
    newHtml = newHtml.replace("%description%", obj.description);
    newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));

    element.insertAdjacentHTML("beforeend", newHtml);
};

export const deleteListItem = id => {
    const el = document.getElementById(id);
    el.parentNode.removeChild(el);
};

export const clearFields = () => {
    const fields = document.querySelectorAll(
        `${Dom.description}, ${Dom.value}`
    );
    fields.forEach(cur => {
        cur.value = "";
    });
    fields[0].focus();
};

export const displayBudget = obj => {
    document.querySelector(".budget__value").textContent = formatNumber(
        obj.budget
    );
    document.querySelector(".budget__income--value").textContent = formatNumber(
        obj.totalInc
    );
    document.querySelector(
        ".budget__expenses--value"
    ).textContent = formatNumber(obj.totalExp);

    const expensesPercentage = document.querySelector(
        ".budget__expenses--percentage"
    );
    obj.percent > 0
        ? (expensesPercentage.textContent = `${obj.percent}%`)
        : (expensesPercentage.textContent = "---");
};

export const displayPercentages = percentages => {
    const fields = document.querySelectorAll(".item__percentage");
    fields.forEach((cur, i) => {
        cur.textContent = percentages[i] > 0 ? `${percentages[i]}%` : `---`;
    });
};

export const displayMonth = () => {
    const now = new Date();

    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    const day = now.getDay();

    const date = now.getDate();

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const month = now.getMonth();

    const year = now.getFullYear();

    document.querySelector(
        ".budget__title--month"
    ).textContent = `${date} ${months[month]} ${year} (${days[day]})`;
};
