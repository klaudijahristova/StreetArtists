const artistName2 = localStorage.getItem("artist") || null;
if (artistName2) {
  let artisNameWithotSpace2 = artistName2.replace(/\s+/g, "");
  const titleName2 = document.querySelector(".title-artist2");
  titleName2.textContent = artisNameWithotSpace2;
}

const popupPicture = document.querySelector(".snapshot");
if (popupPicture.innerHTML === "") {
  popupPicture.innerHTML = ` <img
  src="./StreetArtist - Design&Docs&Data/images/fa-solid_camera.png"
  alt="camera"
  class="camera-ANI"
/>
<p class="takeSnapshot">Take a snapshot</p>`;
}
const checkboxANI = document.querySelector("#checkbox-ANI");
const inputTitle = document.querySelector("#inputTitle");
const inputDescription = document.querySelector("#input-description");
const inputType = document.querySelector("#input-type");
const inputPrice = document.querySelector("#input-price");
const inputUrl = document.querySelector("#input-url");
const addNewItemBtn = document.querySelector(".addNI");
const canselBtn = document.querySelector(".canselANI");
const checkMark = document.querySelector(".checkMark");
const snapshotANI = document.querySelector(".snapshot-ANI");
const camera = document.querySelector(".camera-ANI");
const takeSnapshot = document.querySelector(".takeSnapshot");
let previewImage;

checkMark.style.display = "none";
checkboxANI.addEventListener("change", function () {
  if (checkboxANI.checked) {
    checkMark.style.display = "block";
  } else {
    checkMark.style.display = "none";
  }
});
const optionsForType = {};
items.forEach((item) => {
  if (!optionsForType[item.type]) {
    const option = document.createElement("option");
    option.value = item.type;
    option.textContent = item.type;
    inputType.appendChild(option);
    optionsForType[item.type] = true;
  }
});

existingArrayFromItems = JSON.parse(localStorage.getItem("newArrayFromItems"));
if (!existingArrayFromItems) {
  existingArrayFromItems = [...items];
}

let idOfTheCard = +existingArrayFromItems.length + 1;
canselBtn.addEventListener("click", () => {
  checkboxANI.checked = false;
  checkMark.style.display = "none";
  inputTitle.value = "";
  inputDescription.value = "";
  inputType.value = "";
  inputPrice.value = "";
  inputUrl.value = "";
  if (newImage) {
    newImage.remove();
  }
  if(previewImage){
    previewImage.remove();
  }
  if(snapshotANI.innerHTML===""){
    snapshotANI.innerHTML=`<img
    src="./StreetArtist - Design&Docs&Data/images/fa-solid_camera.png"
    alt="camera"
    class="camera-ANI"
  />
  <p class="takeSnapshot">Take a snapshot</p>`;
  }
  window.location.hash = "#artistItems";
});

function Card(isPublishArg, titleArg, descArg, typeArg, priceArg, imgUrl) {
  this.isPublished = isPublishArg;
  this.title = titleArg;
  this.description = descArg;
  this.type = typeArg;
  this.price = priceArg;
  this.image = imgUrl;
  this.dateCreated = new Date().toString();
  this.dateSold = false;
  this.isAuctioning = false;
  this.id = idOfTheCard;
  this.dateSold = false;
  this.priceSold = false;
  this.artist = artistName2;
}

if (window.location.hash === "#popup") {
  localStorage.setItem("CurentValues", JSON.stringify(newCard));
}

const uploadIcon = document.createElement("i");
const message = document.createElement("p");
const trashcan = document.createElement("i");
function handleViewportChange(matches) {
  if (matches) {
    camera.style.display = "block";
    takeSnapshot.style.display = "block";
    snapshotANI.setAttribute("href", "#popup");
    uploadIcon.remove();
    message.remove();
    trashcan.remove();
  } else {
    camera.style.display = "none";
    takeSnapshot.style.display = "none";
    snapshotANI.removeAttribute("href");

    uploadIcon.classList = "fa-solid fa-upload camera-ANI fa-3x";

    message.textContent = "Upload";
    const input = document.createElement("input");
    input.type = "file";
    input.classList = "takeSnapshot";
    input.style.display = "none";
    input.textContent = "Upload";
    snapshotANI.appendChild(uploadIcon);
    snapshotANI.appendChild(message);

    input.addEventListener("change", (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        if (previewImage) {
          previewImage.remove();
        }
        previewImage = document.createElement("img");
        previewImage.src = URL.createObjectURL(selectedFile);
        previewImage.style.maxWidth = "300px";
        previewImage.style.maxHeight = "200px";
        previewImage.style.marginTop = "-120px";
        previewImage.style.zIndex = "1";
        snapshotANI.appendChild(previewImage);
        inputUrl.value = previewImage.src;
      }
    });

    uploadIcon.addEventListener("click", () => {
      input.click();
    });

    snapshotANI.appendChild(uploadIcon);
    snapshotANI.appendChild(message);
    snapshotANI.appendChild(input);

    trashcan.classList =
      "fa-regular fa-trash-can position-absolute top-25 end-25 fa-2x";
      snapshotANI.appendChild(trashcan);
    trashcan.addEventListener("click", () => {
      if (previewImage) {
        previewImage.remove();
      }
      inputUrl.value = "";
    });
  }
}

const mediaQuery = window.matchMedia("(max-width: 426px)");
handleViewportChange(mediaQuery.matches);

addNewItemBtn.addEventListener("click", () => {
  let isPublished = checkboxANI.checked;
  let title = inputTitle.value;
  let description = inputDescription.value;
  let type = inputType.value;
  let priceV = inputPrice.value;
  let url = inputUrl.value;
  let dateCreated = new Date().toString();
  console.log(isPublished);

  let newCard = new Card(isPublished, title, description, type, priceV, url);
  localStorage.setItem("NewCard", JSON.stringify(newCard));

  if (existingArrayFromItems) {
    existingArrayFromItems.push(newCard);
  }
  if (!existingArrayFromItems) {
    existingArrayFromItems = [...items];
    existingArrayFromItems.push(newCard);
  }

  localStorage.setItem(
    "newArrayFromItems",
    JSON.stringify(existingArrayFromItems)
  );

  idOfTheCard++;
  checkboxANI.checked = false;
  inputTitle.value = "";
  inputDescription.value = "";
  inputType.value = "";
  inputPrice.value = "";
  inputUrl.value = "";
  if (newImage) {
    newImage.remove();
  }
  window.location.hash = "artistItems";
  cardsWrapper.innerHTML = "";
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

  location.reload();
});

const capturedImage = document.querySelector(".capture-image");
const takePictureBtn = document.querySelector(".icon-CIP");

const newImage = document.createElement("img");

async function captureImage() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    const video = document.createElement("video");
    capturedImage.appendChild(video);
    const videoWidth = capturedImage.clientWidth;
    const videoHeight = capturedImage.clientHeight;
    let valuesNewCard = JSON.parse(localStorage.getItem("CurentValues"));

    video.width = videoWidth;
    video.height = videoHeight;
    video.srcObject = stream;
    video.play();
    const canvas = document.createElement("canvas");
    canvas.width = videoWidth;
    canvas.height = videoHeight;
    const context = canvas.getContext("2d");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    stream.getVideoTracks()[0].stop();
    let imageDataUrl = canvas.toDataURL("image/jpeg");
    newImage.src = imageDataUrl;
    newImage.style.maxWidth = "300px";
    newImage.style.maxHeight = "200px";
    newImage.style.marginTop = "50px";
    window.location.hash = "#addNewItem";
    video.remove();

    if (valuesNewCard) {
      checkboxANI.checked = valuesNewCard.isPublished;
      inputTitle.value = valuesNewCard.title;
      inputDescription.value = valuesNewCard.description;
      inputType.value = valuesNewCard.type;
      inputPrice.value = valuesNewCard.price;
    }

    inputUrl.value = imageDataUrl;
    popupPicture.innerHTML = "";
    popupPicture.appendChild(newImage);
  } catch (error) {
    console.error("Error capturing image:", error);
  }
}

takePictureBtn.addEventListener("click", captureImage);
