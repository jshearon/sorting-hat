const imageShake = (id) => {
  const element = document.getElementById(id);
    element.classList.remove("image-shake");
    void element.offsetWidth;
    element.classList.add("image-shake");
}

const sortStudents = () => {
  imageShake("sorting-hat");
}

const sortClick = (id) => {
  document.getElementById(id).addEventListener("click", sortStudents)
}

const init = () => {
  sortClick("sortButton");
}

init();
