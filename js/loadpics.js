const UNSPLASH_API_KEY =
  "918700288c4f8c1d0a72ec407f5f9a8ef30ebd20cfd9288a3ab70400cd07d81f";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=portrait&orientation=portrait&count=2`;
const pic_left = document.querySelector(".js_pic_left"),
	pic_right = document.querySelector(".js_pic_right");

function loadPictures() {
  const savedImages = localStorage.getItem("pics");
  if (savedImages === null) {
    getPictures();
  } else {
    const parsedImages = JSON.parse(savedImages);
      pic_left.style.backgroundImage = `url(${
        parsedImages.url1
      })`;
      pic_right.style.backgroundImage = `url(${
        parsedImages.url2
      })`;
    }
    return;
  }
  

function getPictures() {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(json => {
      const images = json;
      if (images[0].urls && images[0].urls.full && images[1].urls && images[1].urls.full) {
        const fullUrl1 = images[0].urls.full;
        const fullUrl2 = images[1].urls.full;
        savePictures(fullUrl1,fullUrl2);
      } else {
        getPictures();
      }
    });
  return;
}

function savePictures(imageUrl1,imageUrl2) {
  const savedImage = localStorage.getItem("pics");
  if (savedImage !== null) {
    localStorage.removeItem("pics");
  }
  const imageObject = {
    url1: imageUrl1,
    url2: imageUrl2
  };
  localStorage.setItem("pics", JSON.stringify(imageObject));
  loadPictures();
  return;
}

function initApp() {
  loadPictures();
  return;
}

initApp();