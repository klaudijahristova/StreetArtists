window.addEventListener("load", () => {
  calculateAndDisplayArtistStats();
});

window.addEventListener("hashchange", () => {
  calculateAndDisplayArtistStats();
});

// Navbar auto-closing
const homeNav = document.querySelector("#home-nav");
const homeNav1 = document.querySelector("#home-nav1");
const homeNav2 = document.querySelector("#home-nav2");
const homeNav3 = document.querySelector("#home-nav3");
const addNIW=document.querySelector(".addNewItemWrapper");
const navItems = document.querySelectorAll(".nav-link");
const barsBtn = document.querySelector(".bars-button");
const navCollapse = document.querySelector("#navbarToggler");
const navCollapse1 = document.querySelector("#navbarToggler1");
const navCollapse2 = document.querySelector("#navbarToggler2");
const navCollapse3 = document.querySelector("#navbarToggler3");

navItems.forEach((item) => {
  item.addEventListener("click", closeMenu);
});

homeNav.addEventListener("click", closeMenu);
homeNav1.addEventListener("click", closeMenu);
homeNav2.addEventListener("click", closeMenu);
homeNav3.addEventListener("click", closeMenu);
addNIW.addEventListener("click", closeMenu);

function closeMenu() {
  if (navCollapse && navCollapse.classList.contains("show")) {
    navCollapse.classList.remove("show");
    barsBtn.setAttribute("aria-expanded", "false");
    barsBtn.classList.add("collapsed");
  }

  if (navCollapse1 && navCollapse1.classList.contains("show")) {
    navCollapse1.classList.remove("show");
    barsBtn.setAttribute("aria-expanded", "false");
    barsBtn.classList.add("collapsed");
  }
  if (navCollapse2 && navCollapse2.classList.contains("show")) {
    navCollapse2.classList.remove("show"); 
    barsBtn.setAttribute("aria-expanded", "false");
    barsBtn.classList.add("collapsed");
  }
  if (navCollapse3 && navCollapse3.classList.contains("show")) {
    navCollapse3.classList.remove("show"); 
    barsBtn.setAttribute("aria-expanded", "false");
    barsBtn.classList.add("collapsed");
  }
}

existingArrayFromItems =
  JSON.parse(localStorage.getItem("newArrayFromItems")) || null;
function calculateAndDisplayArtistStats() {
  const artistName = localStorage.getItem("artist") || null;
  if (artistName) {
    let artisNameWithotSpace = artistName.replace(/\s+/g, "");
    const titleName = document.querySelector(".title-name");
    titleName.textContent = artisNameWithotSpace;
  }

  const artistStats = {
    publishedCount: 0,
    totalIncome: 0,
    dateSoldCount: 0,
  };
  if (existingArrayFromItems) {
    existingArrayFromItems.forEach((item) => {
      const { artist, isPublished, priceSold, dateSold } = item;

      if (artist === artistName) {
        if (isPublished) {
          artistStats.publishedCount++;
          if (dateSold) {
            artistStats.dateSoldCount++;
            artistStats.totalIncome += priceSold;
          }
        }
      }
    });
  }
  if (!existingArrayFromItems) {
    existingArrayFromItems = [...items];

    existingArrayFromItems.forEach((item) => {
      const { artist, isPublished, priceSold, dateSold } = item;

      if (artist === artistName) {
        if (isPublished) {
          artistStats.publishedCount++;
          if (dateSold) {
            artistStats.dateSoldCount++;
            artistStats.totalIncome += priceSold;
          }
        }
      }
    });
    localStorage.setItem(
      "newArrayFromItems",
      JSON.stringify(existingArrayFromItems)
    );
  }

  const totalSold = document.querySelector("#totalSold");
  totalSold.innerHTML = `${artistStats.dateSoldCount}/${artistStats.publishedCount}`;
  const totalIncome = document.querySelector("#totalIncome");
  totalIncome.innerHTML = `${artistStats.totalIncome}`;
}

calculateAndDisplayArtistStats();

const widget = document.querySelector(".widget");
widget.addEventListener("click", () => {
  window.location.hash = "#auction";
});

const byArtist = localStorage.getItem("artist");
const last7 = document.querySelector("#last7");
const last14 = document.querySelector("#last14");
const last30 = document.querySelector("#last30");
const year = document.querySelector("#year");
const ctx = document.getElementById("myChart").getContext("2d");
let myChart;
let timeRange;

last7.addEventListener("click", () => {
  updateChart("last7");
});

last14.addEventListener("click", () => {
  updateChart("last14");
});

last30.addEventListener("click", () => {
  updateChart("last30");
});

year.addEventListener("click", () => {
  updateChart("year");
});

function updateChart(timeRange) {
  if (myChart) {
    myChart.destroy();
  }

  const chartData = getDataForChart(timeRange);

  let chartType = "bar";

  if (timeRange === "year") {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setFullYear(today.getFullYear() - 1);

    const filteredItems = existingArrayFromItems.filter((item) => {
      const dateSold = new Date(item.dateSold);
      return (
        item.artist === byArtist &&
        item.isPublished === true &&
        item.priceSold &&
        dateSold >= startDate &&
        dateSold <= today
      );
    });

    const data = {};

    filteredItems.forEach((item) => {
      const dateSold = new Date(item.dateSold);
      const monthKey = formatDate(dateSold, "YYYY-MM");

      if (data[monthKey]) {
        data[monthKey] += item.priceSold;
      } else {
        data[monthKey] = item.priceSold;
      }
    });

    const months = Object.keys(data);
    const salesData = Object.values(data);

    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        datasets: [
          {
            label: "Amount",
            data: salesData,
            backgroundColor: "rgba(161, 106, 94)",
            borderColor: "rgba(161, 106, 94)",
            borderWidth: 1,
            hoverBackgroundColor: " #d44c2e",
          },
        ],
      },
      options: {
        indexAxis: "y",
        barPercentage: 0.5,
        scales: {
          x: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
        },
      },
    });
  } else {
    const days = Array.from({ length: Object.keys(chartData).length }, (_, i) =>
      (i + 1).toString()
    );
    const data = Object.values(chartData);

    myChart = new Chart(ctx, {
      type: chartType,
      data: {
        labels: days,
        datasets: [
          {
            label: "Items Sold",
            data: data,
            backgroundColor: "rgba(161, 106, 94)",
            borderColor: "rgba(161, 106, 94)",
            borderWidth: 1,
            hoverBackgroundColor: " #d44c2e",
          },
        ],
      },
      options: {
        indexAxis: "y",
        barPercentage: 0.5,
        scales: {
          x: {
            grid: {
              display: false,
            },
            beginAtZero: true,
          },
          y: {
            grid: {
              display: false,
            },
            beginAtZero: true,
            ticks: {
              callback: function (value, index, values) {
                
                return (parseInt(value, 10) + 1).toString().padStart(2, "0");
              },
            },
          },
        },
      },
    });
  }
}

function getDataForChart(timeRange) {
  const today = new Date();
  const startDate = new Date(today);

  if (timeRange === "last7") {
    startDate.setDate(today.getDate() - 6);
  } else if (timeRange === "last14") {
    startDate.setDate(today.getDate() - 13);
  } else if (timeRange === "last30") {
    startDate.setDate(today.getDate() - 30);
  } else if (timeRange === "year") {
    startDate.setFullYear(today.getFullYear() - 1);
  }

  const filteredItems = existingArrayFromItems.filter((item) => {
    const dateSold = new Date(item.dateSold);
    return (
      item.artist === byArtist &&
      item.isPublished === true &&
      item.priceSold &&
      dateSold >= startDate &&
      dateSold <= today
    );
  });

  if (timeRange === "year") {
    const data = {};

    filteredItems.forEach((item) => {
      const dateSold = formatDate(new Date(item.dateSold), "YYYY-MM");
      if (data[dateSold]) {
        data[dateSold] += item.priceSold;
      } else {
        data[dateSold] = item.priceSold;
      }
    });

    for (let i = 1; i <= 12; i++) {
      const monthLabel = i < 10 ? `0${i}` : `${i}`;
      if (!data[`${today.getFullYear()}-${monthLabel}`]) {
        data[`${today.getFullYear()}-${monthLabel}`] = 0;
      }
    }
    return data;
  } else {
    const data = {};

    const currentDate = new Date(startDate);
    while (currentDate <= today) {
      const dateLabel = formatDate(currentDate, "YYYY-MM-DD");
      data[dateLabel] = 0;
      currentDate.setDate(currentDate.getDate() + 1);
    }

    filteredItems.forEach((item) => {
      const dateSold = formatDate(new Date(item.dateSold), "YYYY-MM-DD");
      data[dateSold] += item.priceSold;
    });
    return data;
  }
}

function formatDate(date, format) {
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  if (format === "YYYY-MM") {
    options.month = "2-digit";
  }
  return date.toLocaleDateString(undefined, options);
}

const buttons = document.querySelectorAll(".chart-button");

function handleButtonClick(event) {
  const buttonId = event.target.id;

  buttons.forEach((button) => {
    button.classList.remove("custom-bg-color-04");
  });

  document.getElementById(buttonId).classList.add("custom-bg-color-04");

  updateChart(buttonId);
}
buttons.forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});
last7.click();
