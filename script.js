document.addEventListener("DOMContentLoaded", loadData);

function save() {
  const name = document.getElementById("tb1").value.trim();
  const age = document.getElementById("tb2").value.trim();
  const email = document.getElementById("emailId").value.trim();
  const course = document.getElementById("courses").value;
  const genderElems = document.getElementsByName("gender");
  let gender = "";

  for (let radio of genderElems) {
    if (radio.checked) {
      gender = radio.value;
      break;
    }
  }

  if (!name || !age || !email || !gender || !course) {
    alert("Please fill all the fields properly!");
    return;
  }

  const entry = { name, age, gender, course, email };

  let allEntries = JSON.parse(localStorage.getItem("students")) || [];
  allEntries.push(entry);
  localStorage.setItem("students", JSON.stringify(allEntries));

  addToTable(entry, allEntries.length - 1);

  document.getElementById("tb1").value = "";
  document.getElementById("tb2").value = "";
  document.getElementById("emailId").value = "";
  document.getElementById("courses").selectedIndex = 0;
  genderElems.forEach(r => r.checked = false);
}

function addToTable(entry, index) {
  const table = document.getElementById("tbl2");
  const row = table.insertRow(-1);

  row.innerHTML = `
    <td>${entry.name}</td>
    <td>${entry.age}</td>
    <td>${entry.course}</td>
    <td>${entry.gender}</td>
    <td>${entry.email}</td>
    <td><button onclick="deleteItem(${index})">Delete</button></td>
  `;
}

function loadData() {
  const allEntries = JSON.parse(localStorage.getItem("students")) || [];
  allEntries.forEach((entry, index) => addToTable(entry, index));
}

function deleteItem(index) {
  let allEntries = JSON.parse(localStorage.getItem("students")) || [];
  allEntries.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(allEntries));

  document.getElementById("tbl2").innerHTML = `
    <tr id="lastrow">
      <th>NAME</th>
      <th>AGE</th>
      <th>COURSE</th>
      <th>GENDER</th>
      <th>EMAIL</th>
      <th>ACTION</th>
    </tr>
  `;
  loadData();
}
