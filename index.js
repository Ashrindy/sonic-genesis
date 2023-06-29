const sonicOneBtn = document.getElementById("soniconebtn");
const sonicTwoBtn = document.getElementById("sonictwobtn");
const sonicThreeBtn = document.getElementById("sonicthreebtn");
const sonicCdBtn = document.getElementById("soniccdbtn");
const minimizeBtn = document.getElementById("minimizeBtn");
const exitBtn = document.getElementById("exitBtn");
const select = document.getElementById("select");
const path = document.getElementById("pth");
const body = document.getElementById("body");
const menuBtn = document.getElementById("menuBtn");
const menuDiv = document.getElementById("menuDiv");
const { shell, ipcRenderer } = require("electron");
const fs = require("fs");

maindir = process.env.APPDATA + "\\.sgenesis";

var sd = {
  s1: "Empty",
  s2: "Empty",
  s3: "Empty",
  scd: "Empty",
};

path.addEventListener("click", function (event) {
  if (select.value == "s1") {
    shell.showItemInFolder(sd.s1);
  }
  if (select.value == "s2") {
    shell.showItemInFolder(sd.s2);
  }
  if (select.value == "s3") {
    shell.showItemInFolder(sd.s3);
  }
});

sonicOneBtn.onmouseenter = function () {
  document.getElementById("onetitle").classList.add("onetitlehovered");
};

sonicOneBtn.onmouseleave = function () {
  document.getElementById("onetitle").classList.remove("onetitlehovered");
};

sonicTwoBtn.onmouseenter = function () {
  document.getElementById("twotitle").classList.add("twotitlehovered");
};

sonicTwoBtn.onmouseleave = function () {
  document.getElementById("twotitle").classList.remove("twotitlehovered");
};

sonicThreeBtn.onmouseenter = function () {
  document.getElementById("threetitle").classList.add("threetitlehovered");
};

sonicThreeBtn.onmouseleave = function () {
  document.getElementById("threetitle").classList.remove("threetitlehovered");
};

if (fs.existsSync(maindir)) {
  if (fs.existsSync(maindir + "/config.json")) {
    fs.readFile(maindir + "\\config.json", "utf-8", (err, jsonString) => {
      if (err) {
        console.log("file read failed:", err);
        return;
      }
      try {
        sd = JSON.parse(jsonString);
        dropdownchange();
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    fs.writeFileSync(maindir + "/config.json", JSON.stringify(sd));
  }
} else {
  fs.mkdirSync(maindir);
  if (fs.existsSync(maindir + "/config.json")) {
    fs.readFile(maindir + "\\config.json", "utf-8", (err, jsonString) => {
      if (err) {
        console.log("file read failed:", err);
        return;
      }
      try {
        sd = JSON.parse(jsonString);
        dropdownchange();
      } catch (err) {
        console.log(err);
      }
    });
  } else {
    fs.writeFileSync(maindir + "/config.json", JSON.stringify(sd));
  }
}

function sonicBtn(path) {
  try {
    if (path != "") {
      if (path != "Empty") {
        shell.openPath(path);
      } else {
        console.error("Path is null");
        if (menuDiv.classList[1] == "menudivclicked") {
          if (path == sd.s1) {
            select.value = "s1";
            dropdownchange();
          }
          if (path == sd.s2) {
            select.value = "s2";
            dropdownchange();
          }
          if (path == sd.s3) {
            select.value = "s3";
            dropdownchange();
          }
        } else {
          if (path == sd.s1) {
            select.value = "s1";
            dropdownchange();
          }
          if (path == sd.s2) {
            select.value = "s2";
            dropdownchange();
          }
          if (path == sd.s3) {
            select.value = "s3";
            dropdownchange();
          }
          menuDiv.classList.add("menudivclicked");
        }
      }
    } else {
      console.error("Path is null");
      if (menuDiv.classList[1] == "menudivclicked") {
        if (path == sd.s1) {
          select.value = "s1";
          dropdownchange();
        }
        if (path == sd.s2) {
          select.value = "s2";
          dropdownchange();
        }
        if (path == sd.s3) {
          select.value = "s3";
          dropdownchange();
        }
      } else {
        if (path == sd.s1) {
          select.value = "s1";
          dropdownchange();
        }
        if (path == sd.s2) {
          select.value = "s2";
          dropdownchange();
        }
        if (path == sd.s3) {
          select.value = "s3";
          dropdownchange();
        }
        menuDiv.classList.add("menudivclicked");
      }
    }
  } catch (err) {
    console.error("Path is null");
    if (menuDiv.classList[1] == "menudivclicked") {
      if (path == sd.s1) {
        select.value = "s1";
        dropdownchange();
      }
      if (path == sd.s2) {
        select.value = "s2";
        dropdownchange();
      }
      if (path == sd.s3) {
        select.value = "s3";
        dropdownchange();
      }
    } else {
      if (path == sd.s1) {
        select.value = "s1";
        dropdownchange();
      }
      if (path == sd.s2) {
        select.value = "s2";
        dropdownchange();
      }
      if (path == sd.s3) {
        select.value = "s3";
        dropdownchange();
      }
      menuDiv.classList.add("menudivclicked");
    }
  }
}

function dropdownchange() {
  if (select.value == "s1") {
    path.innerText = sd.s1;
  }
  if (select.value == "s2") {
    path.innerText = sd.s2;
  }
  if (select.value == "s3") {
    path.innerText = sd.s3;
  }
  console.info(select.value);
}

menuBtn.addEventListener("click", function (event) {
  if (menuDiv.classList[1] == "menudivclicked") {
    menuDiv.classList.remove("menudivclicked");
  } else {
    menuDiv.classList.add("menudivclicked");
  }
});

minimizeBtn.addEventListener("click", function (event) {
  ipcRenderer.invoke("m-win");
});

exitBtn.addEventListener("click", function (event) {
  /* body.classList.add("bodyexit"); */
  ipcRenderer.invoke("m-exit");
});

sonicOneBtn.addEventListener("click", function (event) {
  sonicBtn(sd.s1);
});

sonicTwoBtn.addEventListener("click", function (event) {
  sonicBtn(sd.s2);
});

sonicThreeBtn.addEventListener("click", function (event) {
  sonicBtn(sd.s3);
});

function importData() {
  let input = document.createElement("input");
  input.type = "file";
  input.onchange = (_) => {
    let files = Array.from(input.files);
    if (select.value == "s1") {
      sd.s1 = files[0].path;
      dropdownchange();
    }
    if (select.value == "s2") {
      sd.s2 = files[0].path;
      dropdownchange();
    }
    if (select.value == "s3") {
      sd.s3 = files[0].path;
      dropdownchange();
    }
    fs.writeFile(maindir + "/config.json", JSON.stringify(sd), (err) => {
      if (err) {
        console.error(err);
      }
    });
    console.log(JSON.stringify(sd));
  };
  input.click();
}
