"use strict";

let form = document.querySelector(".form");
let bill = document.querySelector(".amount__input");
let billInValidMsg = document.querySelector(".error--amount");
let count = document.querySelector(".count__input");
let countInvalidMsg = document.querySelector(".error--count");
let customTip = document.querySelector(".tip--custom");
let tip = document.querySelector(".tip");
let tipPerPersonLabel = document.querySelector(".tip-amount__value");
let totalAmountPerPersonLabel = document.querySelector(".total-amount__value");
let tipInvalidMsg = document.querySelector(".error--tip");
let tipPercentage;
let isBillInValid,
  isCountInValid,
  isTipInValid = false;
let selectedTip = "default";
let btnSubmit = document.querySelector(".btn--submit");
let btnReset = document.querySelector(".btn--reset");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!isFormValid()) return;
  bill.blur();
  customTip.blur();
  count.blur();
  btnReset.removeAttribute("disabled");
  let totalBill = Number(bill.value);
  let noOfPeople = Number(count.value);

  let tipPerPerson = Number((tipPercentage * totalBill) / noOfPeople).toFixed(
    2
  );
  tipPerPersonLabel.textContent = `${tipPerPerson}`;

  let totalAmountPerPerson = Number(
    (totalBill + tipPercentage * totalBill) / noOfPeople
  ).toFixed(2);
  totalAmountPerPersonLabel.textContent = `${totalAmountPerPerson}`;
});

function isFormValid() {
  if (Number(bill.value) < 0) {
    billInValidMsg.textContent = "Can't be negative";
    bill.blur();
    bill.classList.add("invalid");
    isBillInValid = true;
  } else if (Number(bill.value) === 0) {
    billInValidMsg.textContent = "Can't be zero";
    bill.blur();
    bill.classList.add("invalid");
    isBillInValid = true;
  } else {
    isBillInValid = false;
  }

  if (Number(count.value) < 0) {
    countInvalidMsg.textContent = "Can't be negative";
    count.blur();
    count.classList.add("invalid");
    isCountInValid = true;
  } else if (Number(count.value) === 0) {
    countInvalidMsg.textContent = "Can't be zero";
    count.blur();
    count.classList.add("invalid");
    isCountInValid = true;
  } else {
    isCountInValid = false;
  }

  if (selectedTip === "default") {
    if (!tipPercentage) {
      tipInvalidMsg.textContent = "Tip% not selected";
      isTipInValid = true;
    } else {
      isTipInValid = false;
    }
  } else if (selectedTip === "custom") {
    tipPercentage = Number(customTip.value) / 100;
    if (!tipPercentage) {
      tipInvalidMsg.textContent = "Tip% not selected";
      isTipInValid = true;
    } else if (tipPercentage < 0) {
      tipInvalidMsg.textContent = "Can't be negative";
      customTip.blur();
      customTip.classList.add("invalid");
      isTipInValid = true;
    } else if (tipPercentage > 1) {
      tipInvalidMsg.textContent = "Should be in (0-100)";
      customTip.classList.add("invalid");
      customTip.blur();
      isTipInValid = true;
    } else {
      tipInvalidMsg.textContent = "";
      customTip.classList.remove("invalid");
      isTipInValid = false;
    }
  }

  if (!isBillInValid && !isCountInValid && !isTipInValid) {
    return true;
  } else return false;
}

tip.addEventListener("click", function (e) {
  if (e.target.classList.contains("tip__per")) {
    document.querySelectorAll(".tip__per").forEach((el) => {
      el.classList.remove("selected");
    });
    tipInvalidMsg.textContent = "";
    e.target.classList.add("selected");
    selectedTip = "default";
    tipPercentage = e.target.dataset.tip;
  }
});

customTip.addEventListener("focus", function () {
  selectedTip = "custom";
  document.querySelectorAll(".tip__per").forEach((el) => {
    el.classList.remove("selected");
  });
  tipInvalidMsg.textContent = "";
  tipPercentage = undefined;
});

bill.addEventListener("focus", function () {
  billInValidMsg.textContent = "";
  bill.classList.remove("invalid");
});

count.addEventListener("focus", function () {
  countInvalidMsg.textContent = "";
  count.classList.remove("invalid");
});

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(form);
  form.dispatchEvent(new Event("submit"));
});

btnReset.addEventListener("click", function () {
  bill.value = "";
  count.value = "";
  tipPercentage = undefined;
  selectedTip = "default";
  customTip.value = "";
  tipPerPersonLabel.textContent = "$0.00";
  totalAmountPerPersonLabel.textContent = "$0.00";
  document.querySelectorAll(".tip__per").forEach((el) => {
    el.classList.remove("selected");
  });
  btnReset.setAttribute("disabled", "");
});
