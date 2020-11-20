window.onload = function() {
	handleClientLoad();
	let params = (new URL(document.location)).searchParams;
	capColor = params.get("cap_color");
	if (capColor != null){
		console.log("capColor: " + capColor);
		updateText("Getting beer info...");
	}
  };

var capColor;

  /** 	beers[x]
	 	0: bottleID (Don't use anymore)
		1: Type selection (won't be using)
		2: Type
		3: Brew Date
		4: Bottle Date
		5: ABV
		6: IBU
		7: Grumpiness
		8: Cap Color */

function showInfo(capColor) {
	if (beers == null){
		updateText("Something went wrong.");
		return;
	}

	try {
		beer = getBeerFromList(capColor);
		document.getElementById("beer-type").textContent = beer[2];
		document.getElementById("brew-date").textContent = beer[3];
		document.getElementById("bottle-date").textContent = beer[4];
		document.getElementById("cap-color").textContent = beer[8];
		document.getElementById("beer-abv").textContent = beer[5];
		document.getElementById("beer-ibu").textContent = beer[6];
		document.getElementById("beer-grumpiness").textContent = beer[7];

		document.getElementById("beer-info").style.display = "block";
		document.getElementById("main-text").style.display = "none";
	}
	catch {
		updateText("Something went wrong.");
		return;
	}
	
}

function updateText(text) {
	document.getElementById("main-text").textContent = text
}

function getBeerFromList(capColor){
	for (i=0;beers.length;i++){
		if (beers[i][8].toLowerCase() == capColor.toLowerCase()){
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
	  if (capColor > ""){
		showInfo(capColor);
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