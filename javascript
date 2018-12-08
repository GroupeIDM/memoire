<script src = "https://apis.google.com/js/client.js?onload=gapiLoad"> </ script>

<script>
function gapiLoad () {
	gapi.client.setApiKey ('YOUR_API_KEY'); // clé api client api-wide
	getGoogleContactEmails (fonction (résultat) {
		console.log (résultat);
	});
}

fonction getGoogleContactEmails (rappel) {
  var oauth_clientKey = 'YOUR_OAUTH_KEY'; // remplace par votre clé API oauth client
	var firstTry = true;
	fonction connect (immédiate, rappel) {
	    var config = {
	        'client_id': oauth_clientKey,
	        "scope": "https://www.google.com/m8/feeds",
	        'immédiat': immédiat,
	    };

	    gapi.auth.authorize (config, function () {
			var authParams = gapi.auth.getToken ();
	        $ .ajax ({
	            url: "https://www.google.com/m8/feeds/contacts/default/full?max-results=10000",
	            dataType: 'jsonp',
	            type: "GET",
	            données: authParams,
	            succès: fonction (données) {
	                var analyseur = new DOMParser ();
	 				xmlDoc = parser.parseFromString (data, "text / xml");
	 				var entries = xmlDoc.getElementsByTagName ('flux') [0] .getElementsByTagName ('entry');
	 				var contacts = [];
	 				pour (var i = 0; i <entry.length; i ++) {
	 					nom_variable = entrées [i] .getElementsByTagName ('titre') [0] .innerHTML;
	 					var emails = entrées [i] .getElementsByTagName ('email');
	 					pour (var j = 0; j <emails.length; j ++) {
	 					  var email = emails [j] .attributes.getNamedItem ('address'). value;
	 					  contacts.push ({name: name, email: email});
	 					}
	 				}
	 				rappel (contacts);
	            },
	            erreur: fonction (données) {
	            	si (premier essai)
						connecter (faux, rappel);
					firstTry = false;
	            }
	        })
	    });
	}
	connect (true, rappel);
}
</ script>
