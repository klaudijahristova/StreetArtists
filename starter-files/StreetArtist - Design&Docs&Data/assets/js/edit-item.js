const editBtn = document.querySelectorAll(".edit");

let existingArrayFromItems;
editBtn.forEach((btn) => {
  let previewImage;
  let eventTarget;

  btn.addEventListener("click", (e) => {
    window.location.hash = "addNewItem";
    const titleh1 = document.querySelector(".editH1");
    titleh1.innerHTML = " Edit Item";
    eventTarget = e.target.parentElement.parentElement.parentElement;
    const checkbox = document.querySelector("#checkbox-ANI");
    const title = document.querySelector("#inputTitle");
    const description = document.querySelector("#input-description");
    const type = document.querySelector("#input-type");
    const price = document.querySelector("#input-price");
    const url = document.querySelector("#input-url");
    const cardToEdit = btn.closest(".cards-IP");
    const snapshot = document.querySelector(".snapshot-ANI");
    const checkMarkEdit = document.querySelector(".checkMarkEdit");
    checkMarkEdit.style.display = "none";

    let itemToEdit;
    let cardToEditId = +cardToEdit.id;

    if (!existingArrayFromItems) {
      itemToEdit = items.find((item) => item.id === cardToEditId);
    } else {
      itemToEdit = existingArrayFromItems.find(
        (item) => item.id === cardToEditId
      );
    }
    if (itemToEdit) {
      checkbox.checked = itemToEdit.isPublished;
      title.value = itemToEdit.title;
      description.value = itemToEdit.description;
      type.value = itemToEdit.type;
      price.value = itemToEdit.price;
      url.value = itemToEdit.image;
      const uploadIcon = document.createElement("i");
      uploadIcon.classList = "fa-solid fa-upload camera-ANI fa-3x";
      const message = document.createElement("p");
      message.textContent = "Upload";
      const input = document.createElement("input");
      input.type = "file";
      input.classList = "takeSnapshot";
      input.style.display = "none";
      input.textContent = "Upload";
      const itemData = {
        isPublished: checkbox.checked,
        title: title.value,
        description: description.value,
        type: type.value,
        price: price.value,
        image: url.value,
        id: itemToEdit.id,
      };
      localStorage.setItem("editedItemData", JSON.stringify(itemData));

      console.log(checkbox.checked);
      if (checkbox.checked) {
        checkMarkEdit.style.display = "block";
      } else {
        checkMarkEdit.style.display = "none";
      }

      const saveBtn = document.createElement("button");
      saveBtn.classList =
        "custom-bg-color-04 custom-color-02 addNewItemBtn saveBtn";
      saveBtn.textContent = "Save";
      const editedItemData = JSON.parse(localStorage.getItem("editedItemData"));
      if (editedItemData) {
        const addNewItem = document.querySelector(".addNI");
        addNewItem.style.display = "none";
        if (!document.querySelector(".saveBtn")) {
          const saveWrapper = document.querySelector(".btn-ANI");
          saveWrapper.classList.add("d-flex", "flex-row-reverse");
          saveWrapper.appendChild(saveBtn);
        }
        saveBtn.textContent = "Save";
        saveBtn.addEventListener("click", () => {
          if (itemToEdit) {
            itemToEdit.isPublished = checkbox.checked;
            itemToEdit.title = title.value;
            console.log(itemToEdit.title);
            itemToEdit.description = description.value;
            itemToEdit.type = type.value;
            itemToEdit.price = price.value;
            itemToEdit.image = url.value;
            const cardTitle = eventTarget.querySelector(".card-title-IP");
            cardTitle.textContent = title.value;
            const cardDes = eventTarget.querySelector(".card-text");
            cardDes.textContent = description.value;
            const cardPrice = eventTarget.querySelector(".price-IP");
            cardPrice.textContent = price.value;
            const cardImage = eventTarget.querySelector(".cards-img");
            cardImage.src = itemToEdit.image;
            console.log(cardImage);
          }

          if (!existingArrayFromItems) {
            existingArrayFromItems = items.slice();
          }
          const index = existingArrayFromItems.findIndex(
            (item) => item.id === itemToEdit.id
          );
          if (index !== -1) {
            existingArrayFromItems[index] = itemToEdit;
          }
          localStorage.setItem(
            "newArrayFromItems",
            JSON.stringify(existingArrayFromItems)
          );

          itemToEdit = null;
          checkbox.checked = "";
          title.value = "";
          description.value = "";
          type.value = "";
          price.value = "";
          url.value = "";
          if (previewImage) {
            previewImage.remove();
          }
          window.location.hash = "artistItems";
          location.reload();
          saveBtn.remove();
        });
      }

      const canselBtn = document.querySelector(".canselBtn");
      canselBtn.addEventListener("click", () => {
        checkbox.checked = false;
        checkMarkEdit.style.display = "none";
        title.value = "";
        description.value = "";
        type.value = "";
        price.value = "";
        url.value = "";
        if (previewImage) {
          previewImage.remove();
        }
        titleh1.innerHTML = "Add New Item";
        uploadIcon.remove();
        message.remove();
        window.location.hash = "artistItems";
      });
    }
  });
});
