let itemName = document.getElementById("itemName"), // اسم المنتج
  currentNum = document.getElementById("currentNum"), // العدد المتبقي
  firstPri = document.getElementById("firstPri"), // سعر شراء المنتج
  secondPri = document.getElementById("secondPri"), // سعر بيع المنتج
  allBuyPri = document.getElementById("allBuyPri"), // إظهار مجموع سعر الشراء للمنتجات المتبقية
  allSellPri = document.getElementById("allSellPri"), //إظهار مجموع سعر البيع للمنتجات المتبقية
  ItemProfite = document.getElementById("ItemProfite"), // إظهار مقدار ربح العنصر
  totalProfite = document.getElementById("totalProfite"), // إظهار مجموع ربح العناصر المتبقية
  submit = document.getElementById("submit"),
  tBody = document.getElementById("tBody"),
  updateMode = "حفظ المنتج",
  updateTemp,
  myPage = document.getElementById("myPage"),
  warnMsg = document.getElementById("warnMsg"),
  btnMsg = document.getElementById("btnMsg");

/////////////////////↓ warn ♠ message ↓\\\\\\\\\\\\\\\\\\\\\
function warnMe() {
  warnMsg.style.display = "none";
  myPage.style.overflow = "auto";
  itemName.focus();
}
/////////////////////clear data\\\\\\\\\\\\\\\\\\\\\
function clearData() {
  itemName.value = "";
  currentNum.value = "";
  firstPri.value = "";
  secondPri.value = "";
  allBuyPri.value = "";
  ItemProfite.value = "";
  totalProfite.value = "";
  getAllBuyPri();
  getAllSellPri();
  getSingaleProf();
}

/////////////////////Get total buy price of all products\\\\\\\\\\\\\\\\\\\\\
function getAllBuyPri() {
  let result = +currentNum.value * +firstPri.value;
  if (currentNum.value != "" && firstPri.value != "") {
    allBuyPri.innerHTML = result;
    allBuyPri.style.boxShadow = "#0f0 1px 1px 6px, #0f0 -1px -1px 6px";
  } else {
    allBuyPri.innerHTML = "";
    allBuyPri.style.boxShadow = "none";
  }
}

/////////////////////Get total sell price of all products\\\\\\\\\\\\\\\\\\\\\
function getAllSellPri() {
  let result = +currentNum.value * +secondPri.value;
  if (currentNum.value != "" && secondPri.value != "") {
    allSellPri.innerHTML = result;
    allSellPri.style.boxShadow = "#0f0 1px 1px 6px, #0f0 -1px -1px 6px";
  } else {
    allSellPri.innerHTML = "";
    allSellPri.style.boxShadow = "none";
  }
}

/////////////////////Get profite of single and all products\\\\\\\\\\\\\\\\\\\\\
function getSingaleProf() {
  let result = +secondPri.value - +firstPri.value;
  totalResult = +currentNum.value * result;
  if (firstPri.value != "" && secondPri.value != "") {
    ItemProfite.innerHTML = result;
    totalProfite.innerHTML = totalResult;
    ItemProfite.style.boxShadow = "#0f0 1px 1px 6px, #0f0 -1px -1px 6px";
    totalProfite.style.boxShadow = "#0f0 1px 1px 6px, #0f0 -1px -1px 6px";
  } else {
    ItemProfite.innerHTML = "";
    ItemProfite.style.boxShadow = "none";
    totalProfite.innerHTML = "";
    totalProfite.style.boxShadow = "none";
  }
}

/////////////////////Create product\\\\\\\\\\\\\\\\\\\\\
let arrProduct, objProduct;
if (localStorage.saveProduct != null) {
  arrProduct = JSON.parse(localStorage.saveProduct);
} else {
  arrProduct = [];
}

submit.onclick = function () {
  objProduct = {
    itemName: itemName.value,
    itemStay: currentNum.value,
    itemBuy: +currentNum.value * +firstPri.value,
    itemSell: +currentNum.value * +secondPri.value,
    itemBin: +secondPri.value - +firstPri.value,
    itemsBin: +currentNum.value * (+secondPri.value - +firstPri.value),
  };
  if (
    itemName.value != "" &&
    currentNum.value != "" &&
    firstPri.value != "" &&
    secondPri.value != ""
  ) {
    if (updateMode === "حفظ المنتج") {
      arrProduct.push(objProduct);
    } else {
      updateMode = "حفظ المنتج";
      arrProduct[updateTemp] = objProduct;
    }
    clearData();
  } else {
    // warn message commands
    warnMsg.style.display = "grid";
    btnMsg.focus();
    myPage.style.overflow = "hidden";
  }
  submit.innerHTML = updateMode;
  localStorage.setItem("saveProduct", JSON.stringify(arrProduct));

  /// Call Funs \\\1
  showData();
}; // End submit function

/////////////////////Show products\\\\\\\\\\\\\\\\\\\\\
showData();
function showData() {
  let table;
  for (let i = 0; i < arrProduct.length; i++) {
    table += `
        <tr>
            <td>${i + 1}</td>
            <td>${arrProduct[i].itemName}</td>
            <td>${arrProduct[i].itemStay}</td>
            <td>${arrProduct[i].itemBuy}</td>
            <td>${arrProduct[i].itemSell}</td>
            <td>${arrProduct[i].itemBin}</td>
            <td>${arrProduct[i].itemsBin}</td>
            <td><button onclick="updateProduct(${i})" id="update">تعديل</button></td>
            <td><button onclick="deleteItem(${i})" id="delete">حــذف</button></td>
        </tr>
        `;
  }
  tBody.innerHTML = table;
  if (arrProduct.length > 0) {
    document.getElementById("deleteAll").innerHTML = `
              <button id="deleteAllBtn" onclick="deleteAll()"> حذف الكل </button>
              <button id="printBtn" onclick="window.print()"> طباعة </button>
          `;
  } else {
    document.getElementById("deleteAll").innerHTML = "";
  }
}

/////////////////////delete product\\\\\\\\\\\\\\\\\\\\\
function deleteItem(i) {
  arrProduct.splice(i, 1);
  localStorage.saveProduct = JSON.stringify(arrProduct);
  showData();
}

function deleteAll() {
  let conf = confirm("هل انت متأكد من حذف جميع العناصر؟");
  if (conf) {
    arrProduct.splice(0);
    localStorage.clear();
  }
  showData();
}

/////////////////////update product\\\\\\\\\\\\\\\\\\\\\
function updateProduct(i) {
  itemName.value = arrProduct[i].itemName;
  currentNum.value = arrProduct[i].itemStay;
  firstPri.value = arrProduct[i].itemBuy / arrProduct[i].itemStay;
  secondPri.value = arrProduct[i].itemSell / arrProduct[i].itemStay;

  updateTemp = i;
  updateMode = "تعديل المنتج";
  submit.innerHTML = updateMode;
  /// Call Funs \\\
  getAllBuyPri();
  getAllSellPri();
  getSingaleProf();
}
