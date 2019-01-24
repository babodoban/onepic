
const tournamentName = document.querySelector(".tournament");
const tournamentImages = [];
const startingRoundID =   1;
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
  roundTotal : 4
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
}


function startRound(roundID){
	loadPictures(roundID);
}

function startTournament(tournamentID){
  getTournamentPictures(tournamentID);
  startRound(startingRoundID);
}
