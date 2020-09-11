window.onload = function() {
	handleClientLoad();
	let params = (new URL(document.location)).searchParams;
	beerID = params.get("beerID");
  };


  /** 	beers[x]
	 	0: bottleID
		1: Type selection (won't be using)
		2: Type
		3: Brew Date
		4: Bottle Date
		5: ABV
		6: IBU */


var beers = null;
var beerID;

function checkBeer() {
	var beerID = document.getElementById("bottle-number").value;
	showInfo(beerID);
  }

function showInfo(beerID) {
	if (beers == null){
		invalidBeer();
		return;
	}

	beer = getBeerFromList(beerID);

	try {
		document.getElementById("beer-id").textContent = beer[0];
		document.getElementById("beer-type").textContent = beer[2];
		document.getElementById("brew-date").textContent = beer[3];
		document.getElementById("bottle-date").textContent = beer[4];
		document.getElementById("beer-abv").textContent = beer[5];
		document.getElementById("beer-ibu").textContent = beer[6];
		document.getElementById("beer-grumpiness").textContent = "60%";
		

		document.getElementById("invalid-id").style.display = "none";
		document.getElementById("bottle-number").value = beerID;
		document.getElementById("beer-info").style.display = "block";

	}
	catch {
		invalidBeer();
		return;
	}
	
}

function invalidBeer() {
	document.getElementById("invalid-id").style.display = "block";
}

function getBeerFromList(beerID){
	console.log("beers length: " + beers.length)
	for (i=0;beers.length;i++){
		if (beers[i][0] == beerID){
			return beers[i];
		}
	}
}


function makeApiCall() {
	var params = {
	  spreadsheetId: '1Nh8siutK83G30aEiYI6uAKxxHkuDZaWzAr4HeizdQWo',
	  range: 'A5:I300'
	};

	var request = gapi.client.sheets.spreadsheets.values.get(params);
	request.then(function(response) {
	  beers = response.result.values;
	  if (beerID > ""){
		showInfo(beerID);
	}
	}, function(reason) {
	  console.error('error: ' + reason.result.error.message);
	});
  }

function initClient() {
	var API_KEY = 'AIzaSyB_r3gnFI9sAczguWpW5gj7ATgZgBp79oY';

	gapi.client.init({
        'apiKey': API_KEY,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
      }).then(function() {
        makeApiCall();
      });
  }

  function handleClientLoad(){
	gapi.load('client', initClient);
}