(function($){
  $(function(){

	  $('.button-collapse').sideNav();

	  var denominations = ["0.05","0.10","0.25","1.00","2.00", "5.00","10.00","20.00","50.00","100.00"];

	  var cardHTMLString = '<div class="row valign-wrapper"><div class="col s12 m6" style="margin:auto"><div class="card  z-depth-5"><div class="card-content black-text center-align" style="padding:5px"><span class="card-title black-text currency-value" style="font-size:30px">$0.05</span><span> X </span> <span class="grey-text" style="font-size:30px"> 0 </span></div><div class="card-action valign-wrapper" style="padding:10px"><div style="margin:auto;"><span class="input-number-decrement">–</span><input class="input-number" type="text" value="0" min="0" max="1000" style="width: 173px;width: 80px;padding: 0 12px;vertical-align: top;text-align: center;outline: none;border: 1px solid #ccc;height: 40px;user-select: none;height: 38px;"><span class="input-number-increment">+</span></div></div></div></div></div>';

	 	 // array of coin objects
		var coins = [];	

		function Currency() {
			this.type = null;
			this.denom = 0;
			this.count = 0;
			this.total = 0.00;
			this.container = null;
		}
		

		// coins
		for ( var i = 0; i < denominations.length; i++ ) {
			var coin = new Currency();
			coin.denom = denominations[i];
			coin.container = makeDom(cardHTMLString);
			coin.titleContainer = coin.container.childNodes[0].childNodes[0].childNodes[0].childNodes[0];  
			coin.counterContainer = coin.container.childNodes[0].childNodes[0].childNodes[0].childNodes[3];
			coin.inputContainer = coin.container.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1];
			console.log(coin.inputContainer); //stopped hjere, add individual click handlers for the number + - controls
			if(denominations[i] >= 2.00) {
				coin.type = "note";
			}
			else {
				coin.type = "coin";
			}

			//UI stuff
			coin.titleContainer.innerHTML = coin.denom;
			// default input to 0 and add a hanlder for change
			coin.inputContainer.value = 0;
			coin.inputContainer.addEventListener("change", function(){
				// set ui count
				var countElement = this.parentNode.parentNode.parentNode.parentNode.childNodes[0].childNodes[3];
			  countElement.innerHTML = this.value;
			  if(countElement.innerHTML == 0){
			  	countElement.setAttribute("class", "grey-text"); 
			  }
			  else {
			  	countElement.setAttribute("class", "green-text text-accent-3"); 
				}
				// calculate total.
				calcTotal();

				//coin.total = ( Math.round( ( parseFloat( coin.denom ) * parseFloat( this.value)) * 100 ) / 100 );
			});

			// append elements to the dom
			if( coin.type == "coin" ){
				$(".coin-container").append(coin.container);
			}
			else {
				$(".note-container").append(coin.container);
			}
			
			
			// push to coins array
			coins.push(coin);
		}

		function makeDom(some_html) {
			var d = document.createElement('div');
			d.innerHTML = some_html;
			return d.firstChild;
		}

		function calcTotal() {
			//coins
			for ( var i = 0; i < coins.length; i++ ) {
				var coin = coins[i];
				coin.count = coin.counterContainer.innerHTML;
				coin.total = ( Math.round( ( parseFloat( coin.denom ) * parseFloat( coin.count)) * 100 ) / 100 );
				console.log(coin);
			}

			showTotal();
		}

		function showTotal() {
			var total = 0.00;
			//coins
			for ( var i = 0; i < coins.length; i++ ) {
				total += coins[i].total;
			}

			console.log(total);
			$("#total-display").html(parseFloat(Math.round(total * 100) / 100).toFixed(2));

		}



  }); // end of document ready
})(jQuery); // end of jQuery name space