/// <reference types="../@types/jquery" />

$(".content-signer").slideUp(0, function () {
  $(".sss").slideDown(0);
});

$("#close").on("click", function () {
  $("aside").animate({ width: "0" }, 1000);
  $("aside").hide(1000);
  $("#openBtn").animate({ left: "0" }, 1000);
});

$("#openBtn").on("click", function () {
  $("aside").show(0, function () {
    $("aside").animate({ width: "250px" }, 1000);
  });
  $("#openBtn").animate({ left: "250px" }, 1000);
});

$(".singerBtn").on("click", function (e) {
  $(".content-signer").slideUp(1000);
  console.log($(e.target).next().height());
  if ($(e.target).next().height() < 193 && $(e.target).next().height() > 144) {
    $(e.target).next().slideUp(1000);
    // console.log();
  } else {
    $(e.target).next().slideDown(1000);
  }
});

const currDate = new Date();

const choosenDate = new Date("2023-10-25");

let x = currDate.getMonth();

// console.log(x);

let y = choosenDate.getMonth() + 1;

// console.log(y);

let calcMonths = Math.abs(x - y);
// console.log(calcMonths - 12);

let days =
  currDate.getDate() - choosenDate.getDate() > 0
    ? currDate.getDate() - choosenDate.getDate()
    : currDate.getDate() - choosenDate.getDate() + 30;
// console.log(days);
let dateEvent = {
  day: days,
  month: Math.abs(calcMonths - 12) * 30,
  hour: Math.abs(currDate.getHours()),
  minite: Math.abs(currDate.getMinutes() - choosenDate.getMinutes()),
  sec: Math.abs(currDate.getSeconds()),
};

let calcYear = currDate.getFullYear() - choosenDate.getFullYear();

let finalDays;

if (calcYear == 1) {
  finalDays = dateEvent.month + dateEvent.day;
} else {
  finalDays = 12 * (calcYear - 1) * 30 + dateEvent.month + dateEvent.day;
}

let hour = 24;
let minite = 60;
let second = 60;
if (localStorage.getItem("min")) {
  minite = localStorage.getItem("min");
}
if (localStorage.getItem("hour")) {
  hour = localStorage.getItem("hour");
}

function timeCount() {
  second--;
  if (second <= 0) {
    second = 60;
    minite--;
    localStorage.setItem("min", JSON.stringify(minite));
    if (minite <= 0) {
      minite = 60;
      hour--;
      if (hour < 0) {
        hour = 24;
      }

      localStorage.setItem("hour", JSON.stringify(hour));
    }
  }

  let cartona = `
    <div
          class="grid md:grid-cols-4 gap-6 w-[75%] mx-auto text-center font-[500] text-[30px] text-white"
        >
          <p class="p-11 border-2 border-white">${
            currDate.getFullYear() < choosenDate.getFullYear()
              ? finalDays
              : -finalDays
          } D</p>
          <p class="p-11 border-2 border-white">${hour} h</p>
          <p class="p-11 border-2 border-white">${minite} m</p>
          <p class="p-11 border-2 border-white">${second} s</p>
    </div>
`;

  document.querySelector(".timer").innerHTML = cartona;
}

setInterval(() => {
  timeCount();
}, 1000);

document.querySelector("textarea").addEventListener("input", function () {
  let str = this.value;
  document.querySelector(".num").innerHTML = 100 - str.length;
  if (100 - str.length <= 0) {
    document.querySelector(".num").innerHTML =
      "your available character finished";
  }
});
