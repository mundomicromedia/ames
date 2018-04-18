var ColaborainicioView = function() {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.ir_a_colabora_login', this.ir_a_colabora_login);
        this.el.on('mousedown', '.ir_a_colabora_registrarse', this.ir_a_colabora_registrarse);
    };

    this.render = function() {
    	var datos = Array();
    	
    	datos['traduccion_colabora_con_tu_concejo'] = primeraLetraMayuscula(array_traducciones[17]);
    	datos['traduccion_login'] = primeraLetraMayuscula(array_traducciones[26]);
    	datos['traduccion_registrarse'] = primeraLetraMayuscula(array_traducciones[27]);
    	
        this.el.html(ColaborainicioView.template(datos));
        return this;
    };
    
    this.ir_a_colabora_login = function(event) {
    	ir_a_opcion('#colaboralogin');
    };
    
    this.ir_a_colabora_registrarse = function(event) {
    	ir_a_opcion('#colaboraregistrarse');
    };
    

    this.initialize();
}

ColaborainicioView.template = Handlebars.compile($("#colaborainicio-tpl").html());