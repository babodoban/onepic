const picture = document.querySelector(".picture");

let selectedPictures = [];

function reloadPictures() {
	localStorage.removeItem("pics");
	initApp();
}

function persistPictures() {
  const stringPictures = JSON.stringify(selectedPictures);
  localStorage.setItem("savedPictures", stringPictures);
  reloadPictures();
}

function savePicture(text) {
  const pictureObject = {
    id: selectedPictures.length + 1,
    value: text
  };
  selectedPictures.push(pictureObject);
  persistPictures();
}

function onClick(event) {
  event.preventDefault();
  const target = event.target;
  const selectedPicture = target.style.backgroundImage;
  savePicture(selectedPicture);
}

picture.addEventListener("click", onClick);