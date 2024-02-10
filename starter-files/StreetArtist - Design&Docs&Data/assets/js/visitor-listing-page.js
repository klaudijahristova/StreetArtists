// Icon to go to auction Page
const auctionIcon1 = document.querySelector("#auctionIcon1");
auctionIcon1.addEventListener("click", () => {
  isNavigatingFromAuctionIcon = true;
  window.location.hash = "#auction";
});

// Rendering Cards
const mainHLP = document.querySelector(".main-HLP");
let evenOrOdd = 0;

if (!existingArrayFromItems) {
  existingArrayFromItems = [...items];
  existingArrayFromItems.forEach((item) => {
    if (item.isPublished) {
      createCardElement(item);
  
    }
  });
}

if (existingArrayFromItems) {
  existingArrayFromItems.forEach((item) => {
    if (item.isPublished) {
      createCardElement(item);

    }
  });
}

// Filters
const byTitle = document.querySelector("#byTitle");
const selectElement = document.getElementById("byArtist");
const minPrice = document.querySelector("#minPrice");
const maxPrice = document.querySelector("#maxPrice");
const selectByType = document.querySelector("#byType");

// Select Artist
function populateOptionsForArtist() {
  const apiUrl = "https://jsonplaceholder.typicode.com/users";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = user.name;
        option.value = user.name;
        selectElement.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
populateOptionsForArtist();

// Select Type
const addedOptions = {};

items.forEach((item) => {
  if (!addedOptions[item.type]) {
    const option = document.createElement("option");
    option.textContent = item.type;
    option.value = item.type;
    selectByType.appendChild(option);
    addedOptions[item.type] = true;
  }
});
let filterValues;

const offcanvasBTN=document.querySelector("#offcanvasBTN");
const offcanvasRight=document.querySelector("#offcanvasRight");
offcanvasBTN.addEventListener("click",()=>{
offcanvasRight.classList.add("show");
offcanvasRight.setAttribute("aria-modal", "true");
offcanvasRight.setAttribute("role", "dialog");
})
const btnClose=document.querySelector(".btn-close")
btnClose.addEventListener("click", ()=>{
  offcanvasRight.classList.remove('show');
  offcanvasRight.removeAttribute('aria-modal');
  offcanvasRight.removeAttribute('role');
})
const submitBtn = document.querySelector(".bg-submitBtn");
submitBtn.addEventListener("click", () => {
  offcanvasRight.classList.remove('show');
  offcanvasRight.removeAttribute('aria-modal');
  offcanvasRight.removeAttribute('role');
  filterValues = {
    byTitle: byTitle.value,
    selectArtist: selectElement.value,
    minPrice: parseFloat(minPrice.value),
    maxPrice: parseFloat(maxPrice.value),
    selectByType: selectByType.value,
  };

  console.log(filterValues);
  localStorage.setItem("filterValues", JSON.stringify(filterValues));
  filterValues = JSON.parse(localStorage.getItem("filterValues"));

  let filteredItems = existingArrayFromItems.filter((item) => {
    const condition1 = filterValues.byTitle
      ? item.title.toLowerCase().includes(filterValues.byTitle.toLowerCase())
      : true;
    console.log("Condition 1:", condition1);

    const condition2 = filterValues.selectArtist
      ? item.artist === filterValues.selectArtist
      : true;
    console.log("Condition 2:", condition2);
    const condition3 = filterValues.minPrice
      ? item.price >= filterValues.minPrice
      : true;
    console.log("Condition 3:", condition3);
    const condition4 = filterValues.maxPrice
      ? item.price <= filterValues.maxPrice
      : true;
    console.log("Condition 4:", condition4);
    const condition5 = filterValues.selectByType
      ? item.type === filterValues.selectByType
      : true;
    console.log("Condition 5:", condition5);

    return condition1 && condition2 && condition3 && condition4 && condition5;
  });

  console.log("Filtered Items:", filteredItems);

  mainHLP.innerHTML = "";

  filteredItems.forEach((item) => {
    createCardElement(item);
  });
 

});

// Function to create a card element
function createCardElement(item) {
  const card = document.createElement("div");
  card.classList =
    "card w-100 rounded-0 card-HLP custom-bg-color-01 position-relative";
  const image = document.createElement("img");
  image.classList = "card-img-top w-100 rounded-0 img-HLP";
  image.src = `${item.image}`;
  const cardBody = document.createElement("div");
  cardBody.classList = "card-body rounded-0 border-0 p-0 body-HLP";
  const artistNameCard = document.createElement("p");
  artistNameCard.classList =
    "artist-name-card reenie-beanie custom-color-01 mb-0";
  artistNameCard.textContent = `${item.artist}`;
  const priceCardHLP = document.createElement("span");
  priceCardHLP.classList =
    "position-absolute price-card-HLP custom-bg-color-03 custom-color-02 roboto mb-0";
  priceCardHLP.textContent = `$${item.price}`;
  const cardTitle = document.createElement("p");
  cardTitle.classList = "title-card-HLP roboto custom-color-01 mb-0";
  cardTitle.textContent = `${item.title}`;
  const cardText = document.createElement("p");
  cardText.classList = "card-text-HLP mb-0 roboto custom-color-01";
  cardText.textContent = `${item.description}`;
  if (evenOrOdd % 2 === 0) {
    card.classList =
      "card w-100 rounded-0 card-HLP custom-bg-color-03 position-relative";
    artistNameCard.classList =
      "artist-name-card reenie-beanie custom-color-02 mb-0";
    priceCardHLP.classList =
      "position-absolute price-card-HLP custom-bg-color-01 custom-color-01 roboto mb-0";
    cardTitle.classList = "title-card-HLP roboto custom-color-02 mb-0";
    cardText.classList = "card-text-HLP mb-0 roboto custom-color-02";
  }
  cardBody.appendChild(artistNameCard);
  cardBody.appendChild(priceCardHLP);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  card.appendChild(image);
  card.appendChild(cardBody);
  mainHLP.appendChild(card);
  evenOrOdd++;
}

