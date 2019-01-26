const picture = document.querySelector(".picture");

const pic_left = document.querySelector(".pic_left"),
  pic_right = document.querySelector(".pic_right");

let selectedImages = [];

let currentRound = 0;

function loadPictures(roundID) {
      pic_left.style.backgroundImage = `url(${
        tournamentImages[(2*roundID)-2]
      })`;
      pic_right.style.backgroundImage = `url(${
        tournamentImages[(2*roundID)-1]
      })`;
      currentRound = roundID;
      console.log(`round : ${currentRound}`);
      return;
    }

function persistPictures() {
  const currentTournament = findTournamentInfo(currentTournamentID);
    const stringImages = JSON.stringify(selectedImages);
    localStorage.setItem("selectedImages", stringImages);
   if(currentTournament.roundTotal === currentRound){
      startTournament(currentTournamentID+1);
      currentRound = 1;
   }
   else{
    loadPictures(currentRound + 1);
  }
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