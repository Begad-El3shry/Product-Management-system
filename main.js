let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let category = document.getElementById("category");
let createBtn = document.getElementById("submit");
let dataBox = document.getElementById("dataBox");
let inputs = document.getElementsByTagName("input");
let showWarning = document.getElementById("warning");
let search = document.getElementById("search");


let products = [];
let currentIndex;
let searchMood = "title";

if (localStorage.getItem("productsList") != null) {
  products = JSON.parse(localStorage.getItem("productsList"));
  displayData();
}

function addProduct() {
  if (
    title.value != "" &&
    price.value != "" &&
    taxes.value != "" &&
    ads.value != "" &&
    discount.value != "" &&
    category.value != ""
  ) {
    let product = {
      titleName: title.value,
      priceAmount: price.value,
      taxesAmount: taxes.value,
      adsAmount: ads.value,
      discountAmonut: discount.value,
      totalPrice: +price.value + +taxes.value + +ads.value - +discount.value,
      category: category.value,
    };

    products.push(product);
    localStorage.setItem("productsList", JSON.stringify(products));
    if (showWarning.classList != "warning hide") {
      showWarning.classList.add("hide");
    }
  } else {
    showWarning.classList.remove("hide");
  }
}

function displayData() {
  let item = "";
  for (let i = 0; i < products.length; i++) {
    item += `
        <tr>
              <td>${i + 1}</td>
              <td>${products[i].titleName}</td>
              <td>${products[i].priceAmount}</td>
              <td>${products[i].taxesAmount}</td>
              <td>${products[i].adsAmount}</td>
              <td>${products[i].discountAmonut}</td>
              <td>${products[i].totalPrice}</td>
              <td>${products[i].category}</td>
              <td><button onclick="getProductInfo(${i})">UPDATE</button></td>
              <td><button onclick="deleteProduct(${i})">DELETE</button></td>
            </tr>
        `;
  }
  dataBox.innerHTML = item;
}

createBtn.onclick = function () {
  if (createBtn.innerHTML == "CREATE") {
    addProduct();
    if (
      title.value != "" &&
      price.value != "" &&
      taxes.value != "" &&
      ads.value != "" &&
      discount.value != "" &&
      category.value != ""
    ) {
      clearForm();
    }
  } else {
    updateProduct();
    if (
      title.value != "" &&
      price.value != "" &&
      taxes.value != "" &&
      ads.value != "" &&
      discount.value != "" &&
      category.value != ""
    ) {
      createBtn.innerHTML = "CREATE";
      clearForm();
    }
  }
  displayData();
};

function clearForm() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("productsList", JSON.stringify(products));
  displayData();
}

function getProductInfo(index) {
  createBtn.innerHTML = "Update";
  title.value = products[index].titleName;
  price.value = products[index].priceAmount;
  ads.value = products[index].adsAmount;
  taxes.value = products[index].taxesAmount;
  discount.value = products[index].discountAmonut;
  category.value = products[index].category;
  currentIndex = index;
  document.documentElement.scrollTop = 0;
}

function updateProduct() {
  if (
    title.value != "" &&
    price.value != "" &&
    taxes.value != "" &&
    ads.value != "" &&
    discount.value != "" &&
    category.value != ""
  ) {
    let product = {
      titleName: title.value,
      priceAmount: price.value,
      taxesAmount: taxes.value,
      adsAmount: ads.value,
      discountAmonut: discount.value,
      totalPrice: +price.value + +taxes.value + +ads.value - +discount.value,
      category: category.value,
    };
    products[currentIndex] = product;
    localStorage.setItem("productsList", JSON.stringify(products));
    if (showWarning.classList != "warning hide") {
      showWarning.classList.add("hide");
    }
  } else {
    showWarning.classList.remove("hide");
  }
}

function searching(value) {
  let item = "";
  for (let i = 0; i < products.length; i++) {
    if (
      searchMood === "title" &&
      products[i].titleName.toLowerCase().includes(value.toLowerCase())
    ) {
      item += `
          <tr>
                <td>${i + 1}</td>
                <td>${products[i].titleName}</td>
                <td>${products[i].priceAmount}</td>
                <td>${products[i].taxesAmount}</td>
                <td>${products[i].adsAmount}</td>
                <td>${products[i].discountAmonut}</td>
                <td>${products[i].totalPrice}</td>
                <td>${products[i].category}</td>
                <td><button onclick="getProductInfo(${i})">UPDATE</button></td>
                <td><button onclick="deleteProduct(${i})">DELETE</button></td>
              </tr>
          `;
    }
    if (
      searchMood === "category" &&
      products[i].category.toLowerCase().includes(value.toLowerCase())
    ) {
      item += `
          <tr>
                <td>${i + 1}</td>
                <td>${products[i].titleName}</td>
                <td>${products[i].priceAmount}</td>
                <td>${products[i].taxesAmount}</td>
                <td>${products[i].adsAmount}</td>
                <td>${products[i].discountAmonut}</td>
                <td>${products[i].totalPrice}</td>
                <td>${products[i].category}</td>
                <td><button onclick="getProductInfo(${i})">UPDATE</button></td>
                <td><button onclick="deleteProduct(${i})">DELETE</button></td>
              </tr>
          `;
    }
  }
  dataBox.innerHTML = item;
}

function getInfo(id) {
  searchMood = id.toLowerCase();
  search.placeholder = `Search by ${id}`;
  search.focus();
  searching(search.value);
  search.scrollBy(0, 400);
}

function showAllData() {
  if (search.value === "") {
    displayData();
    search.scrollBy(0, -400);
  }
}
