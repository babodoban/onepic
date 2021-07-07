const startingTournamentID = 1;

const mainTitle = document.querySelector(".main_title");

const picTitles = document.querySelectorAll(".pic_title");

const footer = document.querySelector(".footer");

const imageCount = tournamentInfos[startingTournamentID - 1].roundTotal * 2;

const picArea = document.querySelectorAll(".pic_area"); 

const UNSPLASH_API_KEY =
  "918700288c4f8c1d0a72ec407f5f9a8ef30ebd20cfd9288a3ab70400cd07d81f";

const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=portrait&orientation=portrait&count=${imageCount}`;

const imageUrls = [];


function getPictures(x,callbackfunc) {
  fetch(UNSPLASH_URL)
    .then(response => response.json())
    .then(json => {
      const images = json;
      if (checkUrls(images)) {
        for (var i = images.length - 1; i >= 0; i--) {
          imageUrls.push(images[i].urls.regular);
        }
        savePictures(imageUrls);
      } else {
        getPictures();
      }
    })
    .then(function(){callbackfunc(x);});
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
  if(json[i].urls.regular){
    continue;
  }
  else{
    return false;
  }
}
return true;
}

function findTournamentInfo(tournamentID) {
  return tournamentInfos.find(tournament => tournament.id === tournamentID);
}

function showResult(){
  mainTitle.innerHTML = "WINNER";
  picture.style.backgroundImage = `url(${selectedImages[0]})`;
  picture.style.width = '80vmin';
  picture.style.height = '80vmin';
  picArea.forEach(function(el) {
    if (el.hasChildNodes()) {
      while(el.childElementCount)
      {el.removeChild(el.firstChild);}
      }
    else {
    console.log('no child');
      }
  });
  tournamentName.innerHTML = '';
  picTitles.forEach(function(el) {
  el.innerHTML = '';
  });
  var retry = document.createElement("div"); 
  var label = document.createTextNode("retry"); 
  retry.appendChild(label); 
  document.body.insertBefore(retry,footer);
  retry.style.backgroundColor = "yellow";
  retry.style.width = '20vmin';
  retry.style.height = '5vmin';
  retry.style.position = 'relative';
  retry.style.top = '20px'
  retry.style.margin = 'auto';
  retry.style.textAlign = "center";
  retry.addEventListener("click", onClick02);
}



function startTournament(tournamentID){
  if(tournamentID == 4){
    showResult();  

  }
  else{
    getTournamentPictures(tournamentID);
    startRound(startingRoundID);
    const tournament = findTournamentInfo(tournamentID);
    tournamentName.innerHTML = tournament.name;
    currentTournamentID = tournamentID;
    console.log(`tournament : ${currentTournamentID}`);
    localStorage.removeItem("selectedImages");
    selectedImages = [];
  }
}


function startGame() {
 getPictures(startingTournamentID,startTournament);
 localStorage.removeItem("selectedImages");
}

startGame();
