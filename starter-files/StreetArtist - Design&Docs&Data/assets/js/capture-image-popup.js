const artistName3 = localStorage.getItem("artist") || null;
if(artistName3){
    let artisNameWithotSpace3=artistName3.replace(/\s+/g, '');
    const titleName3 = document.querySelector(".title-artist3");
    titleName3.textContent =artisNameWithotSpace3;
}
