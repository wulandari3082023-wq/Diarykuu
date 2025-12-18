const loginCard = document.getElementById("loginCard");
const diaryCard = document.getElementById("diaryCard");
const diaryList = document.getElementById("diaryList");

// Auto login jika sudah login
if (localStorage.getItem("isLogin") === "true") {
  showDiary();
}

function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if (user && pass) {
    localStorage.setItem("isLogin", "true");
    showDiary();
  } else {
    alert("Username dan password harus diisi!");
  }
}

function logout() {
  localStorage.removeItem("isLogin");
  location.reload();
}

function showDiary() {
  loginCard.classList.add("hidden");
  diaryCard.classList.remove("hidden");
  loadDiary();
}

function saveDiary() {
  const text = document.getElementById("diaryText").value;
  const imageInput = document.getElementById("imageInput");

  if (!text) {
    alert("Diary tidak boleh kosong!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const diary = {
      text: text,
      image: reader.result
    };

    const diaries = JSON.parse(localStorage.getItem("diaries")) || [];
    diaries.push(diary);
    localStorage.setItem("diaries", JSON.stringify(diaries));

    document.getElementById("diaryText").value = "";
    imageInput.value = "";
    loadDiary();
  };

  if (imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    reader.onload();
  }
}

function loadDiary() {
  diaryList.innerHTML = "";
  const diaries = JSON.parse(localStorage.getItem("diaries")) || [];

  diaries.forEach((diary, index) => {
    const div = document.createElement("div");
    div.className = "card diary-item";

    div.innerHTML = `
      <p>${diary.text}</p>
      ${diary.image ? `<img src="${diary.image}">` : ""}
      <button class="delete" onclick="deleteDiary(${index})">Hapus</button>
    `;

    diaryList.appendChild(div);
  });
}

function deleteDiary(index) {
  const diaries = JSON.parse(localStorage.getItem("diaries"));
  diaries.splice(index, 1);
  localStorage.setItem("diaries", JSON.stringify(diaries));
  loadDiary();
}
