document.addEventListener("DOMContentLoaded", () => {
  const times = document.querySelectorAll(".times p");
  const container = document.querySelector(".times");
  const trackItems = document.querySelectorAll(".track-item");
  let data = [];
  // Active period defining which data is displayed (click to change)
  let activePeriod = (
    document.querySelector(".times p.active") || times[1]
  ).textContent.toLowerCase();

  // Mark the initial asset
  setActiveClass(activePeriod);

  // Load JSON and update UI with active period
  fetch("data.json")
    .then((response) => response.json())
    .then((json) => {
      data = json;
      updateUI(activePeriod);
    });

  // On mouse over, only change visual class (no data change)
  times.forEach((p) => {
    p.addEventListener("mouseenter", () => {
      times.forEach((el) => el.classList.remove("active"));
      p.classList.add("active");
    });

    // When clicked, change the active period and update UI with data
    p.addEventListener("click", () => {
      activePeriod = p.textContent.toLowerCase();
      setActiveClass(activePeriod);
      updateUI(activePeriod);
    });
  });

  // When the mouse leaves the container, return to the permanent active class and update UI if necessary
  container.addEventListener("mouseleave", () => {
    setActiveClass(activePeriod);
    updateUI(activePeriod);
  });

  // Function for updating the UI with the data of the selected period
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

  // Function to manage active visual classes
  function setActiveClass(period) {
    times.forEach((el) => {
      if (el.textContent.toLowerCase() === period) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }
});
