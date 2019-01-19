const pic_left = document.querySelector(".pic_left"),
  pic_right = document.querySelector(".pic_right");

function loadPictures(roundID) {
      pic_left.style.backgroundImage = `url(${
        tournamentImages[(2*roundID)-2]
      })`;
      pic_right.style.backgroundImage = `url(${
        tournamentImages[(2*roundID)-1]
      })`;
        return;
    }

