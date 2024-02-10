let isNavigatingFromAuctionIcon = false;

const auctionIcon=document.querySelector('#auctionIcon');
auctionIcon.addEventListener('click', ()=>{
  isNavigatingFromAuctionIcon = true;
    window.location.hash = "#auction";
})

const sliderTrackOne = document.querySelector(".slider-track1");
const sliderTrackTwo = document.querySelector(".slider-track2");

items.forEach((item) => {
  const slide = document.createElement("div");
  slide.classList.add("slide");
  let image = document.createElement('img');
  image.classList.add("slide-img")
  image.src = `${item.image}`
  slide.appendChild(image);
  sliderTrackOne.appendChild(slide);
  image.addEventListener('click',()=>{
    window.location.hash = "#visitorListing";
  })
});

items.forEach((item) => {
  const slide2 = document.createElement("div");
  slide2.classList.add("slide");
  let image2 = document.createElement('img');
  image2.classList.add("slide-img")
  image2.src = `${item.image}`
  slide2.appendChild(image2);
  sliderTrackTwo.appendChild(slide2);
  image2.addEventListener('click',()=>{
    window.location.hash = "#visitorListing";
  })
});

const artistOneImage= document.querySelector('.artist1-img');

