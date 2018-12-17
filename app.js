var calculadora = {

	display: document.getElementById("display"),
	valorDisplay: "0",
	operacion: "",
	valor1: 0,
	valor2: 0,
	valorn: 0,
	resultado: 0,
  auxTeclaIgual: false,

	init: (function(){
		this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
	}),


	asignarEventosFormatoBotones: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onclick = this.eventoAchicaBoton;
			x[i].onmouseleave = this.eventoVuelveBoton;
		};
	},

	eventoAchicaBoton: function(event){
		calculadora.AchicaBoton(event.target);
	},

	eventoVuelveBoton: function(event){
		calculadora.AumentaBoton(event.target);
	},

	//Formato de botones

	AchicaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "27%";
			elemento.style.height = "60px";
		} else if(x=="mas") {
			elemento.style.width = "87%";
			elemento.style.height = "97%";
		} else {
		elemento.style.width = "20%";
		elemento.style.height = "60px";
		}
	},

	AumentaBoton: function(elemento){
		var x = elemento.id;
		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
			elemento.style.width = "29%";
			elemento.style.height = "62.91px";
		} else if(x=="mas") {
			elemento.style.width = "90%";
			elemento.style.height = "100%";
		} else {
		elemento.style.width = "22%";
		elemento.style.height = "62.91px";
		}
	},


	asignarEventosaFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarDisplay();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.nada("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},


	borrarDisplay: function(){

	  this.valorDisplay = "0";
		this.operacion = "";
		this.valor1 = 0;
		this.valor2 = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.valorn = 0;
		this.updateDisplay();
	},

	cambiarSigno: function(){
		if (this.valorDisplay !="0") {
			var aux;
			if (this.valorDisplay.charAt(0)=="-") {
				aux = this.valorDisplay.slice(1);
			}	else {
				aux = "-" + this.valorDisplay;
			}
		this.valorDisplay = "";
		this.valorDisplay = aux;
		this.updateDisplay();
		}
	},

	ingresoDecimal: function(){
		if (this.valorDisplay.indexOf(".")== -1) {
			if (this.valorDisplay == ""){
				this.valorDisplay = this.valorDisplay + "0.";
			} else {
				this.valorDisplay = this.valorDisplay + ".";
			}
			this.updateDisplay();
		}
	},

	ingresoNumero: function(valor){
		if (this.valorDisplay.length < 8) {

			if (this.valorDisplay=="0") {
				this.valorDisplay = "";
				this.valorDisplay = this.valorDisplay + valor;
			} else {
				this.valorDisplay = this.valorDisplay + valor;
			}
		this.updateDisplay();
		}
	},

	ingresoOperacion: function(oper){
		this.valor1 = parseFloat(this.valorDisplay);
		this.valorDisplay = "";
		this.operacion = oper;
		this.auxTeclaIgual = false;
		this.updateDisplay();
	},

	verResultado: function(){

		if(!this.auxTeclaIgual){
      this.valor2 = parseFloat(this.valorDisplay);
			this.valorn = this.valor2;

			this.realizarOperacion(this.valor1, this.valor2, this.operacion);

		} else {
		this.realizarOperacion(this.valor1, this.valorn, this.operacion);
		}

		this.valor1 = this.resultado;

		this.valorDisplay = "";


		if (this.resultado.toString().length < 9){
			this.valorDisplay = this.resultado.toString();
		} else {
			this.valorDisplay = this.resultado.toString().slice(0,8) + "...";
		}


		this.auxTeclaIgual = true;
		this.updateDisplay();

	},

	realizarOperacion: function(valor1, valor2, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(valor1 + valor2);
			break;
			case "-":
				this.resultado = eval(valor1 - valor2);
			break;
			case "*":
				this.resultado = eval(valor1 * valor2);
			break;
			case "/":
				this.resultado = eval(valor1 / valor2);
			break;
		}
	},

	updateDisplay: function(){
		this.display.innerHTML = this.valorDisplay;
	}

};

calculadora.init();
