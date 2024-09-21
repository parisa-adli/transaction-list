const transactionBtn = document.querySelector(".transaction__btn");
const transactionList = document.querySelector(".transaction__content");
const tableRowsData = document.querySelector(".table-row-data");
const search = document.getElementById("search");
const searchDiv = document.querySelector(".nav-header__search");
const sortPriceChevron = document.getElementById("sort-price");
const sortDateChevron = document.getElementById("sort-date");

transactionBtn.addEventListener("click", getData);
search.addEventListener("input", (e) => searchData(e));
sortPriceChevron.addEventListener("click", sortPrice);
sortDateChevron.addEventListener("click", sortDate);

function fillTable(data) {
  let result = "";
  data.forEach((item) => {
    result += ` <tr>
    <td>${item.id}</td>
    <td class=${item.type === "افزایش اعتبار" ? "green" : "red"}>${
      item.type
    }</td>
    <td>${item.price}</td>
    <td>${item.refId}</td>
    <td>${
      new Date(item.date).toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
      " ساعت " +
      new Date(item.date).toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    }</td>
    </tr>`;
  });
  tableRowsData.innerHTML = result;
}

async function getData() {
  const { data } = await axios.get("http://localhost:3000/transactions");
  // console.log(data);
  transactionBtn.classList.toggle("hidden");
  transactionList.classList.toggle("hidden");
  searchDiv.classList.toggle("hidden");
  fillTable(data);
}

async function searchData(e) {
  console.log(e.target.value);
  const query = e.target.value;
  const { data } = await axios.get(
    `http://localhost:3000/transactions?refId_like=${query}&_sort=price&_order=asc`
  );
  fillTable(data);
}

async function sortPrice() {
  const query = "";
  sortPriceChevron.classList.toggle("rotation-sort");
  const isSort = [...sortPriceChevron.classList].find(
    (c) => c === "rotation-sort"
  );
  if (isSort) {
    const { data } = await axios.get(
      "http://localhost:3000/transactions?refId_like=&_sort=price&_order=desc"
    );
    fillTable(data);
  } else {
    const { data } = await axios.get(
      "http://localhost:3000/transactions?refId_like=&_sort=price&_order=asc"
    );
    fillTable(data);
  }
}

async function sortDate() {
  sortDateChevron.classList.toggle("rotation-sort");
  const isSort = [...sortDateChevron.classList].find(
    (c) => c === "rotation-sort"
  );
  if (isSort) {
    const { data } = await axios.get(
      "http://localhost:3000/transactions?_sort=price&_order=desc"
    );
    fillTable(data);
  } else {
    const { data } = await axios.get(
      "http://localhost:3000/transactions?_sort=price&_order=asc"
    );
    fillTable(data);
  }
}
