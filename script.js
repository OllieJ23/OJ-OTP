"use strict";

// UI COMPONENTS
const mainContainer = document.querySelector(".main-container");
const otpTextBox = document.querySelector(".generated-code");
const refreshBtn = document.querySelector(".refresh");
const allInputs = document.querySelectorAll(".input");
const input1 = document.querySelector(".input-1");
const input2 = document.querySelector(".input-2");
const input3 = document.querySelector(".input-3");
const input4 = document.querySelector(".input-4");
const btnVerify = document.getElementById("submit");
//

let OTP = [];

// 1. GENERATE RANDOM OTP
const generateOTP = function () {
  OTP = [];
  for (let i = 0; i < 4; i++) {
    const number = Math.floor(Math.random() * 9);
    OTP.push(number);
  }
  otpTextBox.innerText = OTP.join("");
};
generateOTP();

// 2. MAKE SURE INPUTS ARE ONLY 1 CHARACTER / DIGIT

// 3. Focus one element at a time
input1.addEventListener("input", function () {
  input1.blur();
  input2.focus();
});

input2.addEventListener("input", function () {
  input2.blur();
  input3.focus();
});

input3.addEventListener("input", function () {
  input3.blur();
  input4.focus();
});

input4.addEventListener("input", function () {
  input4.blur();
  btnVerify.classList.remove("hidden");
});

// 4. VERIFY BUTTON

btnVerify.addEventListener("click", function (e) {
  const inputs = [Number(input1.value), Number(input2.value), Number(input3.value), Number(input4.value)];

  // Remove all validation classes first

  btnVerify.classList.remove("valid-btn", "invalid-btn");
  allInputs.forEach((input) => input.classList.remove("valid-input", "invalid-input"));

  // Check Input Length
  const maxLength = 1;
  const areInputsValid = [...allInputs].every((input) => input.value.length === maxLength);

  if (!areInputsValid) {
    allInputs.forEach((input) => input.classList.remove("valid-input", "invalid-input"));
  }

  // Convert inputs to string then compares with OTP
  if (JSON.stringify(inputs) === JSON.stringify(OTP)) {
    allInputs.forEach((input) => input.classList.add("valid-input"));
    mainContainer.classList.add("valid-container");
    btnVerify.classList.add("valid-btn");
    btnVerify.textContent = "Verified!";
  } else {
    allInputs.forEach((input) => input.classList.add("invalid-input"));

    btnVerify.classList.add("invalid-btn");
    btnVerify.textContent = "Try Again!";
  }
});

/// LISTEN FOR PASTE
input1.addEventListener("paste", function (e) {
  e.preventDefault();
  const pasteData = e.clipboardData.getData("text/plain");
  const splitData = pasteData.split("");

  for (let i = 0; i < splitData.length; i++) {
    const currentInput = document.querySelector(`.input-${i + 1}`);
    if (currentInput) {
      currentInput.value = splitData[i];
    }
  }

  if (input1.value && input2.value && input3.value && input4.value) {
    btnVerify.classList.remove("hidden");
  } else {
    console.error("No value present");
  }
});

/// REFRESH FUNCTION

refreshBtn.addEventListener("click", function () {
  allInputs.forEach((input) => (input.value = ""));
  btnVerify.classList.remove("valid-btn", "invalid-btn");
  allInputs.forEach((input) => input.classList.remove("valid-input", "invalid-input"));
  otpTextBox.innerText = "";
  generateOTP();
  mainContainer.classList.remove("valid-container");

  btnVerify.textContent = "Verify";
});

/// ARROW KEYS

allInputs.forEach((input) => {
  input.addEventListener("keydown", function (e) {
    // Arrow Move Left
    if (e.key === "ArrowLeft") {
      const curInput = e.target;
      const index = Array.from(allInputs).indexOf(curInput);

      if (index > 0) {
        const newInput = allInputs[index - 1];
        newInput.focus();
      }
    }

    if (e.key === "ArrowRight") {
      const curInput = e.target;
      const index = Array.from(allInputs).indexOf(curInput);

      if (index < allInputs.length - 1) {
        const newInput = allInputs[index + 1];
        newInput.focus();
      }
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
  });
});
