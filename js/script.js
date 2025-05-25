document.addEventListener("DOMContentLoaded", () => {
  const times = document.querySelectorAll(".times p");
  const container = document.querySelector(".times");
  const trackItems = document.querySelectorAll(".track-item");
  let data = [];
  let activeElement = document.querySelector(".times p.active") || times[1];

  // Initial mark
  activeElement.classList.add("active");

  // Load JSON data
  fetch("data.json")
    .then((response) => response.json())
    .then((json) => {
      data = json;
      updateUI(activeElement.textContent.toLowerCase());
    });

  // Hover logic + UI update on mouse over
  times.forEach((p) => {
    p.addEventListener("mouseenter", () => {
      times.forEach((el) => el.classList.remove("active"));
      p.classList.add("active");
      activeElement = p;

      // Update UI with button text
      updateUI(p.textContent.toLowerCase());
    });
  });

  container.addEventListener("mouseleave", () => {
    times.forEach((el) => el.classList.remove("active"));
    activeElement.classList.add("active");
  });

  function updateUI(period) {
    data.forEach((item, index) => {
      const track = trackItems[index];
      const time = track.querySelector(".time");
      const previous = track.querySelector(".previous");

      const current = item.timeframes[period].current;
      const prev = item.timeframes[period].previous;

      time.textContent = `${current}hrs`;

      let label = "";
      if (period === "daily") label = "Yesterday";
      else if (period === "weekly") label = "Last Week";
      else if (period === "monthly") label = "Last Month";

      previous.textContent = `${label} - ${prev} hrs`;
    });
  }
});
