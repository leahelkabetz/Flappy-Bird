
const players = JSON.parse(localStorage.getItem('players'));
//names
const NfirstPlace = document.getElementById('NfirstPlace');
const NsecondPlace = document.getElementById('NsecondPlace');
const NthirdPlace = document.getElementById('NthirdPlace');
const NfourthPlace = document.getElementById('NfourthPlace');
const NfifthPlace = document.getElementById('NfifthPlace');
//scores
const SfirstPlace = document.getElementById('SfirstPlace');
const SsecondPlace = document.getElementById('SsecondPlace');
const SthirdPlace = document.getElementById('SthirdPlace');
const SfourthPlace = document.getElementById('SfourthPlace');
const SfifthPlace = document.getElementById('SfifthPlace');

let winners = [];
players.forEach(e => {
    winners.push({ heighscore: e.heighscore, userName: e.userName });
});
winners.sort((a, b) => {
    return b.heighscore - a.heighscore;
});

let place=0;
while (place < 5) {
    if (place == 0) {
        NfirstPlace.textContent = winners[0].userName;
        SfirstPlace.textContent = winners[0].heighscore;
    }
    else if (place == 1) {
        NsecondPlace.textContent = winners[1].userName;
        SsecondPlace.textContent = winners[1].heighscore;
    }
    else if (place == 2) {
        NthirdPlace.textContent = winners[2].userName;
        SthirdPlace.textContent = winners[2].heighscore;
    }
    else if (place == 3) {
        NfourthPlace.textContent = winners[3].userName;
        SfourthPlace.textContent = winners[3].heighscore;
    }
    else {
        NfifthPlace.textContent = winners[4].userName;
        SfifthPlace.textContent = winners[4].heighscore;
    }

    place++;
}

