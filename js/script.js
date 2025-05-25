const times = document.querySelectorAll(".times p");
const container = document.querySelector(".times");

// Inicially mark as active the first element with the "active" class.
let activeElement = document.querySelector(".times p.active") || times[1];
activeElement.classList.add("active");

times.forEach((p) => {
  p.addEventListener("mouseenter", () => {
    // Drop active
    times.forEach((el) => el.classList.remove("active"));
    // add actual active
    p.classList.add("active");
    // save like new active
    activeElement = p;
  });
});

container.addEventListener("mouseleave", () => {
  // keep the last hovered element as active
  times.forEach((el) => el.classList.remove("active"));
  activeElement.classList.add("active");
});
