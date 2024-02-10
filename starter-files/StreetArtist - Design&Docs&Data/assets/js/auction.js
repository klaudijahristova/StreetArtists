const sentToAuctionButtons = document.querySelectorAll(".sentToAuction");
let cardInAuction = JSON.parse(localStorage.getItem("cardInAuction")) || false;
let auction = false;
let yourBid = JSON.parse(localStorage.getItem("yourBid")) || null;
let auctionsBitsHTML = localStorage.getItem("auctionsBitsHTML") || "";
const inLive = document.querySelector(".a-resault");

if (cardInAuction) {
  const showTheAuctionCard = document.querySelector(".showTheAuctionCard");
  const cardIA = document.createElement("div");
  cardIA.setAttribute("id", `${cardInAuction.id}`);
  cardIA.classList.add(
    "mb-3",
    "cards-IP",
    "custom-bg-color-01",
    "position-relative"
  );
  const image = document.createElement("img");
  image.classList.add("card-img-top", "cards-img");
  image.src = `${cardInAuction.image}`;
  const cardMain = document.createElement("div");
  const title = document.createElement("p");
  title.classList.add("card-title-IP", "custom-color-01");
  title.textContent = `${cardInAuction.title}`;
  const dateSold = document.createElement("p");
  dateSold.classList.add("dateSold", "custom-color-04");
  dateSold.textContent = "";
  const priceElement = document.createElement("span");
  priceElement.classList.add(
    "price-IP",
    "custom-bg-color-03",
    "custom-color-02",
    "roboto",
    "pe-5"
  );
  priceElement.textContent = `$${cardInAuction.price}`;
  const description = document.createElement("p");
  description.classList.add("card-text", "custom-color-01");
  description.textContent = `${cardInAuction.description}`;
  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.classList.add("buttons-wrapper-IP", "custom-bg-color-03");
  const inputWrapper = document.createElement("div");
  inputWrapper.classList = "d-flex justify-content-center pt-2";
  const inputBit = document.createElement("input");
  inputBit.setAttribute("type", "number");
  inputBit.setAttribute("id", "yourBit");
  inputBit.setAttribute("placeholder", "Your Bit Amount");
  inputBit.classList = "me-2 yourBit";
  const btnSubmit = document.createElement("button");
  btnSubmit.textContent = "Submit";
  btnSubmit.classList = "amountSubmit";
  inputWrapper.appendChild(inputBit);
  inputWrapper.appendChild(btnSubmit);
  buttonsWrapper.appendChild(inputWrapper);
  cardMain.appendChild(title);
  cardMain.appendChild(dateSold);
  cardMain.appendChild(priceElement);
  cardMain.appendChild(description);
  cardMain.appendChild(buttonsWrapper);
  cardIA.appendChild(image);
  cardIA.appendChild(cardMain);
  showTheAuctionCard.appendChild(cardIA);

  if (yourBid) {
    const displayYourBit = document.createElement("p");
    displayYourBit.classList =
      "px-3 py-2 custom-bg-color-03 text-center custom-color-06 currentBidValue";
    displayYourBit.textContent = yourBid;
    let splitValue = yourBid.split(" ");
    let onlyBidValue = splitValue[1];
    inLive.textContent = onlyBidValue;

    console.log(inLive.textContent);
    document
      .querySelector(".auction-card-placeholder")
      .appendChild(displayYourBit);
  }
  if (auctionsBitsHTML) {
    document.querySelector(".auction-card-placeholder").innerHTML =
      auctionsBitsHTML;
      
  
    const regex = /You (\d+\$)/; 

    for (const item of auctionsBitsHTML) {
      const match = item.match(regex);
      if (match) {
        const desiredValue = match[1];
        inLive.textContent = desiredValue;
      }
     
    }
  }
}

sentToAuctionButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let auction = JSON.parse(localStorage.getItem("auction"));
    if (auction) {
      alert("Please wait until the auction is done!");
      window.location.hash = "#artistItems";
      return;
    }
    const auctionCardId = +e.target.closest(".cards-IP").id;
    let existingArrayFromItems =
      JSON.parse(localStorage.getItem("newArrayFromItems")) || null;
    let targetCard;

    if (existingArrayFromItems) {
      targetCard = existingArrayFromItems.find(
        (card) => card.id === auctionCardId
      );
    } else {
      targetCard = items.find((card) => card.id === auctionCardId);
    }

    if (!targetCard) {
      return;
    }

    let cardInAuction = {
      id: Number(targetCard.id),
      title: targetCard.title,
      artist: targetCard.artist,
      description: targetCard.description,
      type: targetCard.type,
      image: targetCard.image,
      price: targetCard.price / 2,
      dateCreated: targetCard.dateCreated,
      isPublished: targetCard.isPublished,
      isAuctioning: true,
      dateSold: targetCard.dateSold,
      priceSold: targetCard.priceSold,
    };

    localStorage.setItem("cardInAuction", JSON.stringify(cardInAuction));

    auction = true;
    localStorage.setItem("auction", JSON.stringify(auction));
    window.location.hash = "#auction";
    location.reload();
    localStorage.removeItem("yourBid");
    localStorage.removeItem("auctionsBitsHTML");
  });
});

function startCountdown() {
  const intervalId = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      updateTimer();
      localStorage.setItem("countdown", countdown);
    } else {
      clearInterval(intervalId);
      countdown = 0;
      clearAuctionPage();
      clearCountdown();

      if (cardInAuction) {
        updateAuctionCardWhenCountdownReachesZero(bitValue);
      }
    }
  }, 1000);
}

function updateAuctionCardWhenCountdownReachesZero(bitValue) {
  if (cardInAuction) {
    cardInAuction.priceSold = bitValue;
    cardInAuction.isAuctioning = false;
    cardInAuction.dateSold = new Date();
    auction = false;

    localStorage.setItem("cardInAuction", JSON.stringify(cardInAuction));
    localStorage.setItem("auction", JSON.stringify(auction));
    if (existingArrayFromItems) {
      existingArrayFromItems = existingArrayFromItems.map((item) => {
        if (item.id === cardInAuction.id) {
          return cardInAuction;
        }
        return item;
      });
    } else {
      existingArrayFromItems = items.map((item) => {
        if (item.id === cardInAuction.id) {
          return cardInAuction;
        }
        return item;
      });
    }
  }
  localStorage.setItem(
    "newArrayFromItems",
    JSON.stringify(existingArrayFromItems)
  );
}

const cardPrice = cardInAuction.price;
let auctionsBits;

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("amountSubmit")) {
    const amountSubmitButton = e.target;
    if (isNavigatingFromAuctionIcon) {
      amountSubmitButton.disabled = false;
      const card = e.target.closest(".cards-IP");
      auctionsBits = document.querySelector(".auction-card-placeholder");
      if (card) {
        let bitValue = parseFloat(card.querySelector(".yourBit").value);
        if (bitValue < cardPrice) {
          alert(
            `Your bid can not be smaller than $${cardPrice}, That is already half the price.`
          );
          return;
        }

        const displayYourBit = document.createElement("p");
        displayYourBit.classList =
          "px-3 py-2 custom-bg-color-03 text-center custom-color-06 currentBidValue";
        displayYourBit.textContent = `You ${bitValue}$`;
        inLive.textContent = bitValue;
        auctionsBits.appendChild(displayYourBit);

        cardInAuction.priceSold = bitValue;

        card.querySelector(".yourBit").value = "";
        localStorage.setItem(
          "yourBid",
          JSON.stringify(displayYourBit.textContent)
        );
        auctionsBitsHTML = auctionsBits.innerHTML;
        localStorage.setItem("auctionsBitsHTML", auctionsBitsHTML);
        const formData = new FormData();
        formData.set("amount", bitValue);

        fetch("https://projects.brainster.tech/bidding/api", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.isBidding) {
              const responseBidAmount = bitValue + 50;
              setTimeout(() => {
                countdown += 60;
                extraTime += 60;
                auctionsBits.innerHTML += `<p class="custom-bg-color-04 text-white px-3 py-2 text-center currentBidValue">${responseBidAmount}$</p>`;
                inLive.textContent = responseBidAmount;
                auctionsBitsHTML = auctionsBits.innerHTML;
                localStorage.setItem("auctionsBitsHTML", auctionsBitsHTML);
              }, 1500);
            } else {
              amountSubmitButton.disabled = true;
              setTimeout(() => {
                auctionsBits.innerHTML += `<p class="custom-bg-color-06 text-white px-3 py-2 text-center">You won the auction! Please wait antil the time is over!</p>`;
                updateAuctionCardWhenCountdownReachesZero(bitValue);
              }, 3000);
            }
          });
      }
    } else {
      amountSubmitButton.disabled = true;
      alert("Only Visitors can biding!");
    }
  }
});

const auctionCardPlaceholder = document.querySelector(
  ".auction-card-placeholder"
);
let countdown = localStorage.getItem("countdown");
displayYourBit = JSON.parse(localStorage.getItem("yourBid"));

cardInAuction = JSON.parse(localStorage.getItem("cardInAuction")) || false;

if (countdown && countdown > 0) {
  countdown = parseInt(countdown);
} else {
  countdown = 120;
}
const timerElement = document.getElementById("countdown-timer");

function updateTimer() {
  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;
  timerElement.textContent = `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}
let extraTime = 0;
function startCountdown() {
  const intervalId = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      updateTimer();
      localStorage.setItem("countdown", countdown);
    } else {
      clearInterval(intervalId);
      countdown = 0;
      clearAuctionPage();
      clearCountdown();

      if (cardInAuction) {
        updateAuctionCardWhenCountdownReachesZero(bitValue);
      }

      if (cardInAuction) {
        fetch("your_server_endpoint", {
          method: "POST",
          body: JSON.stringify({ bidAmount: yourBidAmount }),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.isBidding) {
              if (bitValue !== cardPrice) {
                countdown += 60;
                updateTimer();
                startCountdown();
              }
            }
          })
          .catch((error) => {
            console.error("Error while checking bidding status: " + error);
          });
      }
    }
  }, 1000);
}

if (cardInAuction) {
  startCountdown();
}

function clearAuctionPage() {
  const showTheAuctionCard = document.querySelector(".showTheAuctionCard");
  showTheAuctionCard.innerHTML = "";

  const auctionCardPlaceholder = document.querySelector(
    ".auction-card-placeholder"
  );
  auctionCardPlaceholder.innerHTML = "";
  localStorage.removeItem("cardInAuction");
  localStorage.removeItem("yourBid");
  localStorage.removeItem("auctionsBitsHTML");
  inLive.textContent=0;
}

function clearCountdown() {
  const timerElement = document.getElementById("countdown-timer");
  timerElement.textContent = "";
}
