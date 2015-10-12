(function($){
  $(function(){

	  $('.button-collapse').sideNav();

	  var denominations = ["0.05","0.10","0.25","1.00","2.00", "5.00","10.00","20.00","50.00","100.00"];

	  var cardHTMLString = '<div class="row valign-wrapper"><div class="col s12 m6" style="margin:auto"><div class="card  z-depth-5"><div class="card-content black-text center-align" style="padding:5px"><span class="card-title black-text currency-value" style="font-size:30px">$0.05</span><span> X </span> <span class="grey-text" style="font-size:30px"> 0 </span></div><div class="card-action valign-wrapper" style="padding:10px"><div style="margin:auto;"><span class="input-number-decrement">–</span><input class="input-number" type="text" value="0" min="0" max="1000" style="width: 173px;width: 80px;padding: 0 12px;vertical-align: top;text-align: center;outline: none;border: 1px solid #ccc;height: 40px;user-select: none;height: 38px;"><span class="input-number-increment">+</span></div></div></div></div></div>';

	 	 // array of coin objects
		var currencyContainer = [];	

		function Currency() {
			this.type = null;
			this.denom = 0;
			this.count = 0;
			this.total = 0.00;
			this.container = null;
		}
		

		// for each denomination defined 
		for ( var i = 0; i < denominations.length; i++ ) {
			var c = new Currency();
			c.denom = denominations[i];
			c.container = makeDom(cardHTMLString);
			c.titleContainer = c.container.childNodes[0].childNodes[0].childNodes[0].childNodes[0];  
			c.counterContainer = c.container.childNodes[0].childNodes[0].childNodes[0].childNodes[3];
			c.inputContainer = c.container.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1];
			c.decrementButton = c.container.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0];
			c.incrementButton = c.container.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2];

			if(denominations[i] >= 2.00) {
				c.type = "note";
			}
			else {
				c.type = "coin";
			}

			// UI stuff
			c.titleContainer.innerHTML = c.denom;
			// default input to 0 
			c.inputContainer.value = parseInt(0);

			attachHanlders(c);


			// append elements to the dom
			if( c.type == "coin" ){
				$(".coin-container").append(c.container);
			}
			else {
				$(".note-container").append(c.container);
			}
			
			
			// push to coins array
			currencyContainer.push(c);
		}

		//add clear button
		var clearBtn = document.getElementById("clear-button");

		document.addEventListener("click", function(){
			clearBtn.childNodes[1].style.display = "inline-block";
			clearBtn.childNodes[3].style.display = "none";
			clearBtn.setAttribute("class", "waves-effect waves-light btn-large green accent-3");
		});

		clearBtn.addEventListener("click", function(event) {

			try {
		        event.stopPropagation();
		    }
		    catch(err) {
		        // IE does it this way
		        window.event.cancelBubble=true;
		    }

			//toogle clear
			if ( this.childNodes[1].style.display != "none" ){
				this.childNodes[1].style.display = "none";
				this.childNodes[3].style.display = "inline-block";
				this.setAttribute("class", "waves-effect waves-light btn-large red");
			}
			else{
				this.childNodes[1].style.display = "inline-block";
				this.childNodes[3].style.display = "none";
				this.setAttribute("class", "waves-effect waves-light btn-large green accent-3");

				//clear total
				$("#total-display").html(parseFloat(0.00).toFixed(2));

				//reset all inputs
				for ( var i = 0; i < currencyContainer.length; i++ ) {
					var c = currencyContainer[i];
					c.counterContainer.innerHTML = 0;
					c.counterContainer.setAttribute("class", "grey-text"); 
					c.inputContainer.value = 0;
				}
			}
			
		});
		


		/////////////////////////////////////////////////////////////////////////
		//	functions
		/////////////////////////////////////////////////////////////////////////

		function makeDom(some_html) {
			var d = document.createElement('div');
			d.innerHTML = some_html;
			return d.firstChild;
		}

		function calcTotal() {
			//currencyContainer loop
			for ( var i = 0; i < currencyContainer.length; i++ ) {
				var c = currencyContainer[i];
				c.count = c.inputContainer.value;
				c.total = ( Math.round( ( parseFloat( c.denom ) * parseFloat( c.count)) * 100 ) / 100 );
			}

			showTotal();
		}

		function showTotal() {
			var total = 0.00;
			//currencyContainer
			for ( var i = 0; i < currencyContainer.length; i++ ) {
				total += currencyContainer[i].total;
			}

			console.log(total);
			$("#total-display").html(parseFloat(Math.round(total * 100) / 100).toFixed(2));

		}

		function attachHanlders(obj){
			// attach event change handler - on change it will update the counter
			obj.inputContainer.addEventListener("change", function() {
				// set ui count
				var countElement = obj.counterContainer;
				countElement.innerHTML = parseInt(this.value);
				//count color handler
				countColorHandler(obj);
				// calculate total.
				calcTotal();
			});

			obj.inputContainer.addEventListener("focus", function() {
				var footer = document.getElementById("footer-container");
				footer.setAttribute("style","");
				$(".temp").css("display", "none");
			});

			obj.inputContainer.addEventListener("focusout", function() {
				var footer = document.getElementById("footer-container");
				footer.setAttribute("style","position:fixed;width:100%;bottom:0px");
			});

			// attach event click handler for decrement button
			obj.decrementButton.addEventListener("click", function() {
				obj.inputContainer.value = parseInt(obj.inputContainer.value) - 1;
				obj.counterContainer.innerHTML = obj.inputContainer.value;
				countColorHandler(obj);
				calcTotal();
			});

			// attach event click handler for increment button
			obj.incrementButton.addEventListener("click", function() {
				obj.inputContainer.value = parseInt(obj.inputContainer.value) + 1;
				obj.counterContainer.innerHTML = obj.inputContainer.value;
				countColorHandler(obj);
				calcTotal();
			});
		}

		function countColorHandler(obj){
			var countElement = obj.counterContainer;

			if(countElement.innerHTML === 0 || countElement.innerHTML === "0") { 
				countElement.setAttribute("class", "grey-text"); 
			}
			else {
				countElement.setAttribute("class", "green-text text-accent-3"); 
			}
		}



  }); // end of document ready
})(jQuery); // end of jQuery name space