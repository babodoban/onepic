const startingTournamentID = 1;

const imageCount = tournamentInfos[startingTournamentID].roundTotal * 2;

const UNSPLASH_API_KEY =
  "918700288c4f8c1d0a72ec407f5f9a8ef30ebd20cfd9288a3ab70400cd07d81f";

const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=portrait&orientation=portrait&count=${imageCount}`;

const imageUrls = [];


function getPictures() {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(json => {
      const images = json;
      if (checkUrls(images)) {
        for (var i = images.length - 1; i >= 0; i--) {
          imageUrls.push(images[i].urls.full);
        }
        savePictures(imageUrls);
      } else {
        getPictures();
      }
    });
  return;
}

function savePictures(imageUrls) {
  const savedImages = localStorage.getItem("gotImages");
  if (savedImages !== null) {
    localStorage.removeItem("gotImages");
  }
  localStorage.setItem("gotImages", JSON.stringify(imageUrls));
  return;
}

function checkUrls(json){
for (var i = json.length - 1; i >= 0; i--) {
  if(json[i].urls.full){
    continue;
  }
  else{
    return false;
  }
}
return true;
}

function startTournament(tournamentID){
  getTournamentPictures(tournamentID);
  startRound(startingRoundID);
  const tournament = tournamentInfos.find(tournament => tournament.id === tournamentID);
  tournamentName.innerHTML = tournament.name;
}

function startGame() {
 getPictures();
 startTournament(startingTournamentID);
}

startGame();