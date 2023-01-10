// Show Note Menu

var target = document.getElementsByClassName("container")[0];

target.addEventListener("click", (event) => {
   let clicked = event.target;
   if (clicked.classList.contains("pop-up__target")) {
      var popUp = clicked.nextElementSibling.firstElementChild;
      popUp.classList.toggle("pop-up__active");
   }
});

// Remove Note Menu

var asd = document.getElementsByClassName("content")[0];

asd.addEventListener("click", (e) => {
   console.log(e.target);

   var x = e.target.classList.contains("pop-up__active");
   var y = e.target.parentNode.classList.contains("pop-up__active");
   if (e.target.nextElementSibling != null) {
      z =
         e.target.nextElementSibling.firstElementChild.classList.contains(
            "pop-up__active"
         );
   } else {
      z = false;
   }
   if (x === false && y === false && z === false) {
      if (document.querySelector(".pop-up__active")) {
         document
            .querySelector(".pop-up__active")
            .classList.remove("pop-up__active");
      }
   }
});

// Call Note Form

var noteBtn = document.getElementById("note-btn");
var noteForm = document.getElementsByClassName("form-container")[0];
var clsBtn = document.getElementsByClassName("fa-xmark")[0];

noteBtn.addEventListener("click", () => {
   noteForm.classList.add("form-container__display");
});

clsBtn.addEventListener("click", () => {
   noteForm.classList.remove("form-container__display");
});

// Add Note Content To LocalStorage

var submit = document.getElementById("note_submit");
submit.addEventListener("click", addNote);

var notesArray = localStorage.getItem("notes")
   ? JSON.parse(localStorage.getItem("notes"))
   : [];

function addNote(event) {
   var titleValue = document.getElementById("title_value").value;
   var descriptionValue = document.getElementById("description_value").value;
   var bgColorValue = document.getElementById("bg_value").value;
   var textColorValue = document.getElementById("color_value").value;
   var dateValue = dateOfCreation();
   var idValue = Math.random();

   var noteObj = {
      title: titleValue,
      description: descriptionValue,
      bgColor: bgColorValue,
      textColor: textColorValue,
      date: dateValue,
      id: idValue,
   };

   if (titleValue == "" || descriptionValue == "") {
      event.preventDefault();
      return window.alert("Please fill all fields!");
   }
   if (bgColorValue === textColorValue) {
      event.preventDefault();
      return window.alert("Colors must be different!");
   }

   notesArray.push(noteObj);
   localStorage.setItem("notes", JSON.stringify(notesArray));

   titleValue.value = "";
   descriptionValue.value = "";
}
console.log(notesArray);

// Date

function dateOfCreation() {
   var date = new Date();
   var year = date.getFullYear();

   const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
   ];
   var month = months[date.getMonth()];

   var day = date.getDate();

   var result = `${day} ${month} ${year}`;
   return result;
}

// Create Note Section

function createNote(title, description, bgColor, textColor, date, id) {
   var contentSection = document.getElementById("contentSection");

   var item = document.createElement("div");
   item.classList.add("item");

   var div = document.createElement("div");
   div.classList.add("notes");
   div.setAttribute("id", `${id}`);

   div.style.backgroundColor = `${bgColor}`;
   div.style.color = `${textColor}`;

   var heading = document.createElement("h3");
   heading.innerHTML = `${title}`;

   var paragraph = document.createElement("p");
   paragraph.innerHTML = `${description}`;

   var childDiv = document.createElement("div");
   childDiv.classList.add("notes-bottom");
   childDiv.innerHTML = `                  
      <div>${date}</div>
      <div>
         <sup class="pop-up__target">...</sup>
         <div class="pop-up">
            <ul class="pop-up__list" style="color:${bgColor};background-color:${textColor};">
               <li onClick="deleteNote(${id})"><i class="fa-solid fa-trash"></i> Delete</li>
            </ul>
         </div>
      </div>`;

   // <li>
   //    <i class="fa-solid fa-pen-to-square"></i> Edit
   // </li>

   div.appendChild(heading);
   div.appendChild(paragraph);
   div.appendChild(childDiv);

   item.appendChild(div);

   contentSection.appendChild(item);
}

// Display Notes

function displayNotes() {
   for (var i = notesArray.length - 1; i >= 0; i--) {
      createNote(
         notesArray[i].title,
         notesArray[i].description,
         notesArray[i].bgColor,
         notesArray[i].textColor,
         notesArray[i].date,
         notesArray[i].id
      );
   }
}
displayNotes();

// Delete Notes

function deleteNote(num) {
   let notes = notesArray;
   let index = notes.findIndex((element) => element.id === num);
   if (index > -1) {
      notes.splice(index, 1);
   }
   localStorage.setItem("notes", JSON.stringify(notes));
   location.reload();
}

// Moving Notes

const grid = new Muuri(".content", {
   dragEnabled: true,
   // dragAxis: 'y'
});
