
const tournamentName = document.querySelector(".tournament");
let tournamentImages = [];
const startingRoundID =   1;
let currentTournamentID = 0;
const tournamentInfos = [
{
  id : 1,
  name : "Quarter Finals",
  roundTotal : 4
},
{
  id : 2,
  name : "Semi Finals",
  roundTotal : 2
},
{
  id : 3,
  name : "Final",
  roundTotal : 1
}
]

function getTournamentPictures(tournamentID){
	const savedGameImages = localStorage.getItem("gotImages");
	const gameImages = JSON.parse(savedGameImages);
	if(tournamentID == startingTournamentID){
	for (var i = gameImages.length - 1; i >= 0; i--) {
		tournamentImages.push(gameImages[i]);
	}
}
  else{
    const savedSelectedImages = localStorage.getItem("selectedImages")
    tournamentImages = JSON.parse(savedSelectedImages);
  }
}


function startRound(roundID){
	loadPictures(roundID);
}
