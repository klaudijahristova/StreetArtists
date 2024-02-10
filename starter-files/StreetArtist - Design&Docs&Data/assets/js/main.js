const landingPage = document.querySelector("#landingPage");
landingPage.style.display = "none";

function handleSectionVisibility() {
  const hash = location.hash;

  document.querySelectorAll("section").forEach((section) => {
    if (`#${section.id}` !== hash) {
      section.style.display = "none";
    } else {
      section.style.display = "block";
    }
    if (section.id === "landingPage" && !hash) {
      landingPage.style.display = "block";
    }
  });
}

window.addEventListener("hashchange", handleSectionVisibility);
window.addEventListener("load", handleSectionVisibility);
handleSectionVisibility();

function populateOptions() {
  const apiUrl = "https://jsonplaceholder.typicode.com/users";

  const selectElement = document.getElementById("choose");

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
populateOptions();

const select = document.querySelector("#choose");

select.addEventListener("change", () => {
  const selectedName = select.options[select.selectedIndex].text;
  localStorage.setItem("artist", selectedName);
  window.location.hash = "#artist";
  location.reload();
});

const visitorWrapper=document.querySelector('.visitor-wrapper');

visitorWrapper.addEventListener('click', ()=>{
  window.location.hash = "#visitor";
})

