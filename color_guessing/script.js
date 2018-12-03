var header = document.querySelector("h1");
var barItems = document.querySelectorAll(".bar-item");
var barDropDowns = document.querySelectorAll("#bar .dropdown-item");
var squares = document.querySelectorAll(".square");
var message = document.querySelector("#message");
var colorDisplay = document.querySelector("#colorDisplay");
var btnReset = document.querySelector("#reset");
var inputTheme = document.querySelector("#themeColor");

var colors = [], themeColor = "#0EB3AC", colorTarget;

var difficulties = {
  Easy: 3,
  Medium: 6,
  Hard: 9
};
var curDifficulty = "Easy";

window.addEventListener("load", function () {
  updateTheme(themeColor);
  initColors(curDifficulty);
});

btnReset.addEventListener("click", function () {
  initColors(curDifficulty);
  message.textContent = "";
});

inputTheme.addEventListener("change", function () {
  themeColor = this.value;
  updateTheme(themeColor);
});

barItems.forEach(function (item) {
    item.addEventListener("mouseover", function () {
      this.style.color = "#ffffff";
      this.style.backgroundColor = themeColor;
    });

    item.addEventListener("mouseout", function () {
      if (this.textContent !== curDifficulty){
        this.style.color = themeColor;
        this.style.backgroundColor = "#ffffff";
      }
    });
});

barDropDowns.forEach(function (item) {
  item.addEventListener("click", function () {
    if (curDifficulty !== this.textContent) {
      curDifficulty = this.textContent;
      initColors(curDifficulty);

      for (var i = 0; i < squares.length; i++){
        if (!colors[i]) {
          squares[i].style.display = "none";
        } else {
          squares[i].style.display = "block";
        }
      }

      message.textContent = "";
      updateTheme(themeColor);
    }
  });
});

squares.forEach(function (elem) {
  elem.addEventListener("click", function () {
    var clickedColor = this.style.backgroundColor;
    if (clickedColor === colorTarget.rgb()) {
      message.textContent = "Correct!";
      changeColors(colorTarget);
    } else {
      message.textContent = "Try again!";
      this.style.backgroundColor = "#141414";
    }
  });
});

function initColors (level) {
  var num = difficulties[level];
  colors = generateColors(num);
  colorTarget = pickColor(num);
  colorDisplay.textContent = colorTarget.rgb().toUpperCase();
  for (var i = 0; i < num; i++) {
    squares[i].style.backgroundColor = colors[i].rgb();
  }
}

function generateColors (num) {
  var arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(new Color());
  }
  return arr;
}

function Color () {
  this.r = Math.floor(Math.random() * 256);
  this.g = Math.floor(Math.random() * 256);
  this.b = Math.floor(Math.random() * 256);
  this.rgb = function () {
    return "rgb(" + this.r + ", " + this.g + ", " + this.b + ")";
  };
  this.hex = function () {
    var r = this.r.toString(16);
    var g = this.g.toString(16);
    var b = this.b.toString(16);
    if (this.r < 16) r = "0" + r;
    if (this.g < 16) g = "0" + g;
    if (this.b < 16) b = "0" + b;
    var value = "#" + r + g + b;
    return value.toUpperCase();
  };
}

function pickColor (num) {
  return colors[Math.floor(Math.random() * num)];
}

function changeColors (colorObj) {
  themeColor = colorObj.rgb();
  updateTheme(colorObj.rgb());
  inputTheme.value = colorObj.hex();
  var num = difficulties[curDifficulty];
  for (var i = 0; i < num; i++) {
    squares[i].style.backgroundColor = colorObj.rgb();
  }
}

function updateTheme (color) {
  header.style.backgroundColor = color;
  barItems.forEach(function (item) {
    item.style.color = color;
  });
  barDropDowns.forEach(function (item) {
    if (item.textContent === curDifficulty) {
      item.style.color = "#ffffff";
      item.style.backgroundColor = color;
    } else {
      item.style.color = color;
      item.style.backgroundColor = "#ffffff";
    }
  });
  message.style.color = color;
}