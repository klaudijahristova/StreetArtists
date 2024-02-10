existingArrayFromItems =
  JSON.parse(localStorage.getItem("newArrayFromItems")) || null;
// Take the artist name from LS
const artistName = localStorage.getItem("artist") || null;
if(artistName){
  let artisNameWithotSpace = artistName.replace(/\s+/g, "");
const titleName = document.querySelector(".title-artist1");
titleName.textContent = artisNameWithotSpace;
}

const cardsWrapper = document.querySelector(".cards-wrapper");
// redering all cards
function renderArtistCard(
  id,
  imgUrl,
  itemTitle,
  date,
  price,
  desc,
  published,
  artist
) {
  const logArtist = localStorage.getItem("artist");
  if (artist && logArtist && logArtist === artist) {
    const cardsIP = document.createElement("div");
    cardsIP.setAttribute("id", id);
    cardsIP.classList.add(
      "mb-3",
      "cards-IP",
      "custom-bg-color-01",
      "position-relative"
    );
    const image = document.createElement("img");
    image.classList.add("card-img-top", "cards-img");
    image.src = `${imgUrl}`;
    const cardMain = document.createElement("div");
    const title = document.createElement("p");
    title.classList.add("card-title-IP", "custom-color-01");
    title.textContent = `${itemTitle}`;
    const dateSold = document.createElement("p");
    dateSold.classList.add("dateSold", "custom-color-04");
    dateSold.textContent = `${date}`;
    const priceElement = document.createElement("span");
    priceElement.classList.add(
      "price-IP",
      "custom-bg-color-03",
      "custom-color-02",
      "roboto"
    );
    priceElement.textContent = `$${price}`;
    const description = document.createElement("p");
    description.classList.add("card-text", "custom-color-01");
    description.textContent = `${desc}`;
    const buttonsWrapper = document.createElement("div");
    buttonsWrapper.classList.add("buttons-wrapper-IP", "custom-bg-color-03");
    const sendAuctionBtn = document.createElement("button");
    sendAuctionBtn.classList.add(
      "buttons-IP",
      "sendToAuction",
      "custom-bg-color-05",
      "custom-color-03",
      "sentToAuction"
    );
    sendAuctionBtn.textContent = "Send to Auction";
    const isPublish = document.createElement("button");
    isPublish.classList.add(
      "buttons-IP",
      "custom-bg-color-08",
      "custom-color-05",
      "publish"
    );
    isPublish.textContent = "Publish";
    const unpublishBtn = document.createElement("button");
    unpublishBtn.classList.add(
      "buttons-IP",
      "custom-bg-color-06",
      "custom-color-03",
      "unpublish"
    );
    unpublishBtn.textContent = "Unpublish";
    const removeBtn = document.createElement("button");
    removeBtn.classList.add(
      "buttons-IP",
      "custom-bg-color-07",
      "custom-color-03",
      "remove"
    );
    removeBtn.textContent = "Remove";
    const editBtn = document.createElement("button");
    editBtn.classList.add(
      "buttons-IP",
      "custom-bg-color-01",
      "custom-color-01",
      "edit"
    );
    editBtn.textContent = "Edit";
    buttonsWrapper.appendChild(sendAuctionBtn);
    if (published) {
      buttonsWrapper.appendChild(unpublishBtn);
    } else {
      buttonsWrapper.appendChild(isPublish);
    }
    buttonsWrapper.appendChild(removeBtn);
    buttonsWrapper.appendChild(editBtn);
    cardMain.appendChild(title);
    cardMain.appendChild(dateSold);
    cardMain.appendChild(priceElement);
    cardMain.appendChild(description);
    cardMain.appendChild(buttonsWrapper);
    cardsIP.appendChild(image);
    cardsIP.appendChild(cardMain);
    cardsWrapper.appendChild(cardsIP);
  }
}
if (existingArrayFromItems) {
  existingArrayFromItems.forEach((item) => {
    renderArtistCard(
      item.id,
      item.image,
      item.title,
      item.dateCreated,
      item.price,
      item.description,
      item.isPublished,
      item.artist
    );
  });
} else {
  items.forEach((item) => {
    renderArtistCard(
      item.id,
      item.image,
      item.title,
      item.dateCreated,
      item.price,
      item.description,
      item.isPublished,
      item.artist
    );
  });
}
// Remove Cards
const removeBtns = document.querySelectorAll(".remove");
removeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cardToRemove = btn.closest(".cards-IP");
    if (cardToRemove) {
      let cardToREmoveId = +cardToRemove.id;
      const confirmationPopup = document.createElement("div");
      confirmationPopup.classList =
        "confirmationPopup d-flex flex-column justify-content-center align-items-center position-absolute top-50 start-50 translate-middle custom-bg-color-03 h-50 rounded custom-color-02 d-block p-2";
      const message = document.createElement("p");
      message.classList = "roboto text-center";
      message.textContent = "Are you sure you want to remove this card?";
      const btnWrapper = document.createElement("div");
      btnWrapper.classList = "d-flex justify-content-center align-items-center";
      const confirmButton = document.createElement("button");
      confirmButton.classList =
        "custom-bg-color-06 custom-color-03 border-0 rounded me-3 roboto";
      confirmButton.textContent = "Confirm";
      confirmButton.addEventListener("click", () => {
        cardToRemove.remove();
        if (existingArrayFromItems) {
          existingArrayFromItems = existingArrayFromItems.filter(
            (item) => item.id !== cardToREmoveId
          );
          existingArrayFromItems.forEach((item, index) => {
            item.id = index;
          });
          localStorage.setItem(
            "newArrayFromItems",
            JSON.stringify(existingArrayFromItems)
          );
          confirmationPopup.remove();
        }
        if (!existingArrayFromItems) {
          existingArrayFromItems = items.filter(
            (item) => item.id !== cardToREmoveId
          );
          existingArrayFromItems.forEach((item, index) => {
            item.id = index;
          });
          localStorage.setItem(
            "newArrayFromItems",
            JSON.stringify(existingArrayFromItems)
          );
          confirmationPopup.remove();
        }
      });
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.classList =
        "custom-bg-color-07 custom-color-03 border-0 rounded roboto";
      cancelButton.addEventListener("click", () => {
        confirmationPopup.remove();
      });
      btnWrapper.appendChild(confirmButton);
      btnWrapper.appendChild(cancelButton);
      confirmationPopup.appendChild(message);
      confirmationPopup.appendChild(btnWrapper);

      cardToRemove.style.position = "relative";

      cardToRemove.appendChild(confirmationPopup);
    }
  });
});
// Function to toggle Publish/Unpublish
function togglePublishUnpublish(btn) {
  const card = btn.closest(".cards-IP");
  const itemId = +card.getAttribute("id");
  let existingItem;
  if (existingArrayFromItems) {
    existingItem = existingArrayFromItems.find((item) => item.id === itemId);
  }
  if (!existingArrayFromItems) {
    existingItem = items.find((item) => item.id === itemId);
  }
  if (btn.classList.contains("publish")) {
    btn.classList.remove("publish", "custom-bg-color-08", "custom-color-05");
    btn.classList.add("unpublish", "custom-bg-color-06", "custom-color-03");
    btn.textContent = "Unpublish";
    if (existingItem) {
      existingItem.isPublished = true;
    }
    if (existingArrayFromItems) {
      existingArrayFromItems = existingArrayFromItems.map((item) => {
        if (item.id === itemId) {
          return existingItem;
        } else {
          return item;
        }
      });
    } else {
      existingArrayFromItems = items.map((item) => {
        if (item.id === itemId) {
          return existingItem;
        } else {
          return item;
        }
      });
    }
  } else if (btn.classList.contains("unpublish")) {
    btn.classList.remove("unpublish", "custom-bg-color-06", "custom-color-03");
    btn.classList.add("publish", "custom-bg-color-08", "custom-color-05");
    btn.textContent = "Publish";
    if (existingItem) {
      existingItem.isPublished = false;
    }
    if (existingArrayFromItems) {
      existingArrayFromItems = existingArrayFromItems.map((item) => {
        if (item.id === itemId) {
          return existingItem;
        } else {
          return item;
        }
      });
    } else {
      existingArrayFromItems = items.map((item) => {
        if (item.id === itemId) {
          return existingItem;
        } else {
          return item;
        }
      });
    }
  }

  localStorage.setItem(
    "newArrayFromItems",
    JSON.stringify(existingArrayFromItems)
  );
}
const toggleButtons = document.querySelectorAll(".publish, .unpublish");

toggleButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    togglePublishUnpublish(btn);
  });
});