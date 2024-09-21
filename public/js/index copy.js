const transactionBtn = document.querySelector(".transaction__btn");
const transactionList = document.querySelector(".transaction__content");
const tableRowsData = document.querySelector(".table-row-data");
const search = document.getElementById("search");

const sortPriceChevron = document.getElementById("sort-price");

transactionBtn.addEventListener("click", getData);
search.addEventListener("input", (e) => searchData(e));
sortPriceChevron.addEventListener("click", sortPrice);

async function getData() {
  const { data } = await axios.get("http://localhost:3000/transactions");
  // console.log(data);
  transactionBtn.classList.toggle("hidden");
  transactionList.classList.toggle("hidden");
  let result = "";
  data.forEach((item) => {
    result += ` <tr>
    <td>${item.id}</td>
    <td class=${item.type === "افزایش اعتبار" ? "green" : "red"}>${
      item.type
    }</td>
    <td>${item.price}</td>
    <td>${item.refId}</td>
    <td>${new Date(item.date).toLocaleString("fa-IR")}</td>
    </tr>`;
  });
  tableRowsData.innerHTML = result;
}

async function searchData(e) {
  console.log(e.target.value);
  const query = e.target.value;
  const { data } = await axios.get(
    `http://localhost:3000/transactions?refId_like=${query}`
  );
  let result = "";
  data.forEach((item) => {
    result += ` <tr>
    <td>${item.id}</td>
    <td class=${item.type === "افزایش اعتبار" ? "green" : "red"}>${
      item.type
    }</td>
    <td>${item.price}</td>
    <td>${item.refId}</td>
    <td>${new Date(item.date).toLocaleString("fa-IR")}</td>
    </tr>`;
  });
  tableRowsData.innerHTML = result;
}

async function sortPrice() {
  sortPriceChevron.classList.add("desc")
  if (sortPriceChevron.classList=== "desc") {
   return  { data } = await axios.get(
      "http://localhost:3000/transactions?_sort=price&_order=desc"
    );
  } else if (sortPriceChevron.classList === "asc")
    {
   return ({ data } = await axios.get(
     "http://localhost:3000/transactions?_sort=price&_order=asc"
   ));
  }
  let result = "";
  data.forEach((item) => {
    result += ` <tr>
    <td>${item.id}</td>
    <td class=${item.type === "افزایش اعتبار" ? "green" : "red"}>${
      item.type
    }</td>
    <td>${item.price}</td>
    <td>${item.refId}</td>
    <td>${new Date(item.date).toLocaleString("fa-IR")}</td>
    </tr>`;
  });
  tableRowsData.innerHTML = result;
}
