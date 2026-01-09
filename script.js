const courses = document.querySelectorAll(".course");
let approved = JSON.parse(localStorage.getItem("approved")) || [];

function update() {
  courses.forEach(course => {
    const id = course.dataset.id;
    const prereq = course.dataset.prereq;

    if (approved.includes(id)) {
      course.classList.add("approved");
    } else {
      course.classList.remove("approved");
    }

    if (prereq && !approved.includes(prereq)) {
      course.classList.add("locked");
    } else {
      course.classList.remove("locked");
    }
  });
}

courses.forEach(course => {
  course.addEventListener("click", () => {
    const id = course.dataset.id;
    if (!id || course.classList.contains("locked")) return;

    if (approved.includes(id)) {
      approved = approved.filter(r => r !== id);
    } else {
      approved.push(id);
    }

    localStorage.setItem("approved", JSON.stringify(approved));
    update();
  });
});

update();
