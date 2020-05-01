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

//get a random house name
const randomHouse = () => {
  return houses[Math.floor(Math.random() * (3 - 0 + 1)) + 0].name;
}

//creates and prints the sorting form
const createForm = () => { 
  domString = `<form class="form-inline cards border" id="submitNameForm">
                <div class="form-group">
                  <label class="sr-only" for="studentName">Name</label>
                  <input type="text" class="form-control mb-2 mr-sm-2" id="studentName" placeholder="Harry Potter">
                  <button type="submit" class="btn btn-primary mb-2" id="submitName">Find Your House!</button>
                </div>
                </form>`;
  printToDom('sorting-form', domString);
  document.getElementById('submitName').addEventListener("click", sortStudents);
}

//creates and prints student cards from array
const createStudentCards = () => { 
  domString = `<form class="form-inline cards border" id="submitNameForm">
                <div class="form-group">
                  <label class="sr-only" for="studentName">Name</label>
                  <input type="text" class="form-control mb-2 mr-sm-2" id="studentName" placeholder="Harry Potter">
                  <button type="submit" class="btn btn-primary mb-2" id="submitName">Find Your House!</button>
                </div>
                </form>`;
  printToDom('sorting-form', domString);
}

//creates the sorting form and existing students in array
const sortStudents = (event) => {
  const studentName = event.target.form.elements.studentName.value;
  if (studentName == '') {
    $('#no-name-dialog').modal('show');
    return
  } else {
    const newStudent = {name: studentName, house: randomHouse(), expelled: false, unique: Date.now()};
    students.push(newStudent);
  }
  return false;
}

// event listener to show form
const sortClick = (id) => {
  document.getElementById(id).addEventListener("click", createForm);
}

const init = () => {
  sortClick("sortButton");
}

init();
