//prints strings to the specified div id
const printToDom = (divId, textString) => {
  document.getElementById(divId).innerHTML = textString;
}

//activates then removes the css image shake class
const imageShake = () => {
  const element = document.getElementById('sorting-hat');
    element.classList.remove("image-shake");
    void element.offsetWidth;
    element.classList.add("image-shake");
}

//create and destroy modal to announce new house
const houseAnnounceModal = (newHouse) => {
  $('#house-announce-dialog').modal('show');  
  printToDom('announce-house', newHouse + '!');
  imageShake();  
  document.querySelector('#announce-house').classList.add("fade-in");
  setTimeout( function() {
    $('#house-announce-dialog').modal('hide');
  }, 4000);
}

//get a random house name
const randomHouse = () => {
  return houses[Math.floor(Math.random() * houses.length)].name;
}

//creates and prints the sorting form
const createForm = () => { 
  domString = `<form class="form-inline cards" id="submitNameForm">
                <div class="form-group">
                  <label class="sr-only" for="studentName">Name</label>
                  <input type="text" class="form-control mb-2 mr-sm-2" id="studentName" placeholder="First Year's Name">
                  <button type="button" class="btn btn-primary mb-2" id="submitName">Let the sorting begin!</button>
                </div>
                </form>`;
  printToDom('sorting-form', domString);
  document.getElementById('submitName').addEventListener("click", addStudent);
}

//creates and prints student cards from array
const createStudentCards = () => { 
  let studentCards = `<h3 class="subtitles">Students At Hogwarts</h3>`;
  let evilStudentCards = `<h3 class="subtitles">Voldemort's Army</h3>`;
  let uniqueIds = [];
  for (let i=0; i < students.length; i++) {
    let house = houses.find(house => house.name === students[i].house);
    if (!students[i].expelled) {
      studentCards += `<div class="card text-center d-flex flex-column justify-content-between ${house.color}">
                      <div>
                        <h4 class="card-title text-white">${students[i].name}</h4>
                      </div>
                      <div class="card-body">
                        <img src="${house.crest}" class="align-middle">
                      </div>
                      <div>
                          <button type="button" class="btn btn-outline-light mb-2 expel" id="${students[i].uniqueId}">Expelliarmus!</button>
                      </div>
                    </div>`;
      uniqueIds.push(students[i].uniqueId);
    } else {
      evilStudentCards += `<div class="card text-center d-flex flex-column justify-content-between bg-dark darkmark">
                      <div>
                        <h4 class="card-title text-secondary">${students[i].name}</h4>
                      </div>
                      <div class="card-body">
                        <img src="darkmark.png" class="darkmark-img align-middle">
                      </div>
                      <div>
                        <h3 class="text-secondary">Agent of Evil</h3>
                      </div>
                    </div>`;
    }
  }
  //print out cards
  printToDom('student-cards', studentCards);
  printToDom('evil-students', evilStudentCards);
  //create event listeners for new cards
  for (let i=0; i < uniqueIds.length; i++) {
    document.getElementById(uniqueIds[i]).addEventListener("click", expelStudent);
  }
}

//adds new student to array, shows modal, then hides modal
const addStudent = (event) => {
  const studentName = event.target.form.elements.studentName.value;
  if (studentName == '') {
    $('#no-name-dialog').modal('show');
    return
  } else {
    const randomHouseName = randomHouse();
    const newStudent = {name: studentName, house: randomHouseName, expelled: false, uniqueId: Date.now()};
    students.push(newStudent);
    createStudentCards();
    houseAnnounceModal(randomHouseName);
  }
  return false;
}

const expelStudent = (event) => {
  //change expelled to true for selected student
  const i = students.findIndex(student => student.uniqueId == event.target.id);
  students[i].expelled = true;
  //print out cards again
  createStudentCards();
}

// event listener to show form
const sortClick = (id) => {
  document.getElementById(id).addEventListener("click", createForm);
}

const compare = (a, b) => {
  lastNameA = a.name.split(" ")[1].toLowerCase();
  lastNameB = b.name.split(" ")[1].toLowerCase();
  return lastNameA == lastNameB ? 0 : lastNameA > lastNameB ? 1 : -1;
}

//function to sort array by student last name 
const sortByName = () => {
  students.sort(compare);
  createStudentCards();
}

// event listener for sort-by-name button
const sortNameClick = () => {
  document.getElementById("sort-by-name").addEventListener("click", sortByName);
}

//event listener for expel buttons
const expelButtonClicks = () => {
  document.addEventListener('click', function (event) {
    if ( event.target.classList.contains( 'expel' ) ) {
        expelStudent();
    }
}, false);
}


const init = () => {
  sortClick("sortButton");
  sortNameClick();
  createStudentCards();
}

init();
