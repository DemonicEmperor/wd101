let id = (value) => {
  return document.getElementById(value);
};

let classes = (value) => {
  return document.getElementsByClassName(value);
};
let entries = [];
let uname = id("name"),
  email = id("email"),
  password = id("password"),
  date = id("date"),
  erroricon = classes("error"),
  correcticon = classes("correct"),
  errormsg = id("errormsg"),
  form = id("form"),
  checkbox = id("checkbox"),
  tableBody = id("table-body");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let errors = [];
  emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (uname.value === "") {
    errors.push("Please enter your name");
    erroricon[0].style.opacity = 1;
    correcticon[0].style.opacity = 0;
  } else if (uname.value.length < 3) {
    errors.push("Name must be at least 3 characters long");
    erroricon[0].style.opacity = 1;
    correcticon[0].style.opacity = 0;
  } else {
    errormsg.innerHTML = "";
    erroricon[0].style.opacity = 0;
    correcticon[0].style.opacity = 1;
  }

  if (email.value === "") {
    errors.push("Please enter your email address");
    erroricon[1].style.opacity = 1;
    correcticon[1].style.opacity = 0;
  } else if (!emailregex.test(email.value)) {
    errors.push("Please enter a valid email address");
    erroricon[1].style.opacity = 1;
    correcticon[1].style.opacity = 0;
  } else {
    errormsg.innerHTML = "";
    erroricon[1].style.opacity = 0;
    correcticon[1].style.opacity = 1;
  }

  if (password.value === "") {
    errors.push("Please enter your password");
    erroricon[2].style.opacity = 1;
    correcticon[2].style.opacity = 0;
  } else if (password.value.length < 8) {
    errors.push("Password must be at least 8 characters long");
    erroricon[2].style.opacity = 1;
    correcticon[2].style.opacity = 0;
  } else {
    erroricon[2].style.opacity = 0;
    correcticon[2].style.opacity = 1;
  }

  let dob = new Date(date.value);
  let today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  let mon = today.getMonth() - dob.getMonth();

  if (mon < 0 || (mon === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  if (date.value === "") {
    errors.push("Please enter your date of birth");
  } else if (date.value > today) {
    errors.push("Please enter a valid date of birth");
  } else if (age < 18 || age > 55) {
    errors.push("Age must be between 18 and 55");
  }

  errormsg.innerHTML = errors.join("<br>");
  if (errors.length === 0) {
    const entry = {
      Name: uname.value,
      Email: email.value,
      Password: password.value,
      Date: date.value,
      AcceptedTermsAndCondition: checkbox.checked,
    };
    entries.push(entry);
    localStorage.setItem("User-Entries", JSON.stringify(entries));
    let tableData = [];
    Object.values(entry).forEach((value) => {
      tableData.push(
        `<td class="border-2 border-gray-300 px-4 py-2">${value}</td>`
      );
    });
    let tableRow = `<tr>${tableData.join("")}</tr>`;
    tableBody.innerHTML += tableRow;
    form.reset();
    for (let i = 0; i < Math.max(erroricon.length, correcticon.length); i++) {
      if (erroricon[i]) erroricon[i].style.opacity = 0;
      if (correcticon[i]) correcticon[i].style.opacity = 0;
    }
  }
});
