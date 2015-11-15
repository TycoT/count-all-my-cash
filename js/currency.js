$(document).ready(function(){

	var denominations = [
							{
								value: "0.05",
								bankroll: 40
							},
							{
								value: "0.10",
								bankroll: 50
							},
							{
								value: "0.25",
								bankroll: 40
							},
							{
								value: "1.00",
								bankroll: 20
							},
							{
								value: "2.00",
								bankroll: 25
							},
							{
								value: "5.00",
								bankroll: 40
							},
							{
								value: "10.00",
								bankroll: 50
							},
							{
								value: "20.00",
								bankroll: 25
							},
							{
								value: "50.00",
								bankroll: null
							},
							{
								value: "100.00",
								bankroll: null
							}
						];

	var cardHTMLString = 
	'<div class="row valign-wrapper"> '+
		'<div class="col s12 m6" style="margin:auto"> '+
			'<div class="card"> '+
				'<div class="card-content black-text center-align" style="padding:5px;"> '+
					'<span class="card-title black-text currency-value" style="font-size:30px">$0.05</span> '+
					'<span> X </span> '+
					'<span class="grey-text counter-container" style="font-size:30px"> 0 </span> '+
				'</div>'+
				'<div class="center-align bankroll-container">'+
					'<span> Bankroll amount: <span class="bankroll-amount">placeholder</span> </span> '+
				'</div>'+
				'<div class="card-action valign-wrapper" style="padding:10px"> '+
					'<div style="margin:auto;"> '+
						'<span class="input-number-bankroll-decrement">––</span> '+
						'<span class="input-number-decrement">–</span> '+
						'<input class="input-number" type="text" value="0" min="0" max="1000" style="width: 173px;width: 80px;padding: 0 12px;vertical-align: top;text-align: center;outline: none;border: 1px solid #ccc;height: 40px;user-select: none;height: 38px;"> '+
						'<span class="input-number-increment">+</span> '+
						'<span class="input-number-bankroll-increment">++</span> '+
					'</div> '+
				'</div> '+
			'</div> '+
		'</div> '+
	'</div>';
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
		c.denom = denominations[i].value;
		c.bankroll = denominations[i].bankroll;
		c.container = $(cardHTMLString); 
		$titleContainer = c.container.find(".card-title");
		c.titleContainer = $titleContainer;
		$counterContainer = c.container.find(".counter-container"); 
		c.counterContainer = $counterContainer;
		$inputContainer = c.container.find(".input-number");
		c.inputContainer = $inputContainer;
		$decrementButton = c.container.find(".input-number-decrement");
		c.decrementButton = $decrementButton;
		$bankRollContainer = c.container.find(".bankroll-container");
		c.bankRollContainer = $bankRollContainer;
		$bankRollDecrementButton = c.container.find(".input-number-bankroll-decrement");
		c.bankRollDecrementButton = $bankRollDecrementButton;
		$incrementButton = c.container.find(".input-number-increment");
		c.incrementButton = $incrementButton;
		$bankRollIncrementButton = c.container.find(".input-number-bankroll-increment");
		c.bankRollIncrementButton = $bankRollIncrementButton;
		$bankRollAmount = c.container.find(".bankroll-amount");
		c.bankRollAmount = $bankRollAmount;
		if(denominations[i] >= 5.00) {
			c.type = "note";
		}
		else {
			c.ty = "coin";
		}

		// UI stuff
		c.titleContainer.html(c.denom);
		c.bankRollAmount.html(c.bankroll);
		console.log(c.bankRollAmount);
		// default input to 0 
		c.inputContainer.val(0);


		// remove any demonimations without a bankroll.
		if( c.bankroll === null ) { 
			c.bankRollContainer.remove();
			c.bankRollIncrementButton.remove();
			c.bankRollDecrementButton.remove();
		}
		

		attachHanlders(c);


		// append elements to the dom
		$(".currency-container").append(c.container);
		
		
		// push to coins array
		currencyContainer.push(c);
	}

	var customCardHTMLString = 
	'<div class="row valign-wrapper"> '+
		'<div class="col s12 m6" style="margin:auto"> '+
			'<div class="card"> '+
				'<div class="card-content black-text center-align" style="padding:5px;"> '+
					'<span class="card-title black-text currency-value" style="font-size:30px">Custome Amount: </span> '+
					'<span class="grey-text counter-container" style="font-size:30px"> 0 </span> '+
				'</div>'+
				'<div class="card-action valign-wrapper" style="padding:10px"> '+
					'<div style="margin:auto;"> '+
						'<input class="input-number" type="text" value="0" min="0" max="1000" style="width: 173px;width: 80px;padding: 0 12px;vertical-align: top;text-align: center;outline: none;border: 1px solid #ccc;height: 40px;user-select: none;height: 38px;"> '+
					'</div> '+
				'</div> '+
			'</div> '+
		'</div> '+
	'</div>';

	var customCard = new Currency();
	customCard.container = $(customCardHTMLString); 
	$titleContainer = customCard.container.find(".card-title");
	customCard.titleContainer = $titleContainer;
	$counterContainer = customCard.container.find(".counter-container"); 
	customCard.counterContainer = $counterContainer;
	$inputContainer = customCard.container.find(".input-number");
	customCard.inputContainer = $inputContainer;

	attachHanlders(customCard); // fix this.

	$(".currency-container").append(customCard.container);

	currencyContainer.push(c);

	//add the custom card here
	// add html
	// custom amount: (#counter container here, will be green when edited)
	// no bankroll
	// no buttons, just the input box
	// add input change handler
	// append to html
	// push to currenct container. 	


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
				c.counterContainer.text(0);
				c.counterContainer.addClass("grey-text"); 
				c.counterContainer.removeClass("green-text"); 
				c.inputContainer.val(0);
			}
		}
		
	});

	// sort buttons 
	$('#asc').parent().addClass("green accent-3"); // by default ascending
	$('.sortBtn').click(function(){
		var ascendingBool = true; //by default will be ascending
		// test if ascending - find the first currecny value and compare with first element of the denomination array
		if (denominations[0] == $(".currency-value").first().html()) {
			ascendingBool = true;
		}
		else{
			ascendingBool = false;
		}

		if ( this.id == "asc" && !ascendingBool || this.id == "desc" && ascendingBool ){
			// we ascend it.
			var container = $(".currency-container").children().detach();
			// looping from the back
			for ( var i = container.length; i >= 0; i-- ) {
				$(".currency-container").append(container[i]);
			}

			// change the background of the button
			if( !ascendingBool ){
				$('#asc').parent().addClass("green accent-3");
				$('#desc').parent().removeClass("green accent-3");
			}
			else {
				$('#desc').parent().addClass("green accent-3");
				$('#asc').parent().removeClass("green accent-3");
			}
		}
	});



	/////////////////////////////////////////////////////////////////////////
	//	functions
	/////////////////////////////////////////////////////////////////////////


	function calcTotal() {
		//currencyContainer loop
		for ( var i = 0; i < currencyContainer.length; i++ ) {
			var c = currencyContainer[i];
			c.count = c.inputContainer.val();
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
		
		// when user focuses a input box, we want to save the input val before any changes.
		// we revert to this value when the user tries to input a non-number
		var prevInput;
		obj.inputContainer.focus(function() {
			prevInput = obj.inputContainer.val();
		});

		// When user enters a custom number in the input box
		obj.inputContainer.change(function() {
			// set ui count
			var countElement = obj.counterContainer;
			var input = parseInt(obj.inputContainer.val());
			var isInt = /^\+?\d+$/.test(input);
			
			if ( isInt ) {
				countElement.html(input);
				//count color handler
				countColorHandler(obj);
				// calculate total.
				calcTotal();	
			} 
			else {
				obj.inputContainer.val(prevInput);
			}
			
		});

		//if mobile, when user focus on input, we remove the fixed footer, to allow more space
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		
			var $footer = $("#footer-container");

			obj.inputContainer.focus(function() {
				$footer.attr("style","");
				$(".temp").css("display", "none");
			});

			obj.inputContainer.focusout(function() {
				$footer.attr("style","position:fixed;width:100%;bottom:0px");
				$(".temp").css("display", "inline-block");
			});
		}

		// attach event click handler for decrement button
		obj.bankRollDecrementButton.click(function() {
			var number = 0;
			var input = parseInt(obj.inputContainer.val());
			var isInt = /^\+?\d+$/.test(input);
			if ( input > obj.bankroll  &&  isInt) {
				number = input - obj.bankroll;
			}

			obj.inputContainer.val(number);
		
			obj.counterContainer.text(number);
			countColorHandler(obj);
			calcTotal();
		});

		obj.decrementButton.click(function() {
			var number = 0;
			var input = parseInt(obj.inputContainer.val());
			var isInt = /^\+?\d+$/.test(input);
			if ( input > 0  &&  isInt) {
				number = input - 1;
			}

			obj.inputContainer.val(number);
		
			obj.counterContainer.text(number);
			countColorHandler(obj);
			calcTotal();
		});

		// attach event click handler for increment button
		obj.incrementButton.click(function() {
			var number = 0;
			var input = parseInt(obj.inputContainer.val());
			var isInt = /^\+?\d+$/.test(input);
			if ( input >= 0  &&  isInt) {
				number = input + 1;
			}

			obj.inputContainer.val(number);

			obj.counterContainer.text(number);
			countColorHandler(obj);
			calcTotal();
		});

		obj.bankRollIncrementButton.click(function() {
			var number = 0;
			var input = parseInt(obj.inputContainer.val());
			var isInt = /^\+?\d+$/.test(input);
			if ( input >= 0  &&  isInt) {
				number = input + obj.bankroll;
			}

			obj.inputContainer.val(number);
		
			obj.counterContainer.text(number);
			countColorHandler(obj);
			calcTotal();
		});
	}

	function countColorHandler(obj){
		var countElement = obj.counterContainer;

		if(countElement.html() === 0 || countElement.html() === "0") { 
			countElement.addClass("grey-text"); 

			countElement.removeClass("green-text"); 
			countElement.removeClass("text-accent-3");
		}
		else {
			countElement.addClass("green-text text-accent-3"); 

			countElement.removeClass("grey-text");
		}
	}


	$('.button-collapse').sideNav();
	$('select').material_select();
});
