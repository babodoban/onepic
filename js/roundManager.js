const picture = document.querySelector(".picture");

const pic_left = document.querySelector(".pic_left"),
  pic_right = document.querySelector(".pic_right");

const selectedImages = [];

let nextRound = 0;

function loadPictures(roundID) {
      pic_left.style.backgroundImage = `url(${
        tournamentImages[(2*roundID)-2]
      })`;
      pic_right.style.backgroundImage = `url(${
        tournamentImages[(2*roundID)-1]
      })`;
      nextRound = roundID + 1;
      console.log(nextRound);
      return;
    }

function persistPictures() {
  const stringImages = JSON.stringify(selectedImages);
  localStorage.setItem("selectedImages", stringImages);
  console.log(nextRound);
  loadPictures(nextRound);
}

function savePicture(text) {
  selectedImages.push(text);
  persistPictures();
}

function onClick(event) {
  event.preventDefault();
  const target = event.target;
  const selectedBackgroundImage = target.style.backgroundImage;
  const selectedImage = selectedBackgroundImage.slice(5,-2);
  console.log(selectedImage);
  savePicture(selectedImage);
}

picture.addEventListener("click", onClick);