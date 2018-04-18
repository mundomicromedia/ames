var ColaboraView = function(idioma) {

    this.initialize = function() {
        this.el = $('<div/>');
        this.el.on('mousedown', '.capturarImagenBtn', this.capturarImagen);
        this.el.on('mousedown', '.capturarImagenGaleriaBtn', this.capturarImagenGaleria);
        this.el.on('mousedown', '.enviarColaboraBtn', this.enviarColabora);
        this.el.on('mousedown', '.abrir_categorias', this.abrirCategorias);
        this.el.on('mousedown', '.abrir_subcategorias', this.abrirSubcategorias);
    };

    this.render = function() {
    	
    	var datos = Array();
    	
    	//cogemos las categorias
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=29&idioma="+idioma,
            success:  function(respuesta){ 
            	datos = $.parseJSON(respuesta);
            	var categorias = datos['categorias'];
            	var nuevo_html_categorias = '';
            	$.each(categorias, function( index, value ) {
            		var valor = categorias[index]['id'];
            		var texto = categorias[index]['texto'];
            		
            		nuevo_html_categorias+="<div class='categoria_dialog'>";
            		nuevo_html_categorias+="<div class='categoria_dialog_nombre'>";
            		nuevo_html_categorias+="<div class='categoria_dialog_nombre_texto'>";
            		nuevo_html_categorias+=texto;
            		nuevo_html_categorias+="</div>";
            		nuevo_html_categorias+="</div>";
            		nuevo_html_categorias+="<div class='categoria_dialog_radio'>";
            		nuevo_html_categorias+="<div class='categoria_dialog_radio_texto'>";
            		nuevo_html_categorias+="<input id='categoria_"+valor+"' onclick='javascript:seleccionar_categoria("+valor+", \""+texto+"\");' value='"+valor+"' name='radio_categoria' type='radio' />";
            		nuevo_html_categorias+="</div>";
            		nuevo_html_categorias+="</div>";
            		nuevo_html_categorias+="</div>";
            		
        		});
            	$('#div_categorias_dialog').html(nuevo_html_categorias);
            }
        });
    	
    	var datos = Array();
    	
    	//registramos contador de visitas a esta pagina
    	$.ajax({
            async:false,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=19&pagina=colabora",
            success:  function(respuesta){ 
            }
        });
    	
    	
    	datos['traduccion_colabora_con_tu_concejo'] = primeraLetraMayuscula(array_traducciones[17]);
    	datos['traduccion_escribe_tu_cometario'] = primeraLetraMayuscula(array_traducciones[18]);
    	datos['traduccion_texto_introductorio'] = primeraLetraMayuscula(array_traducciones[33]);
    	datos['traduccion_texto_eliminar'] = primeraLetraMayuscula(array_traducciones[37]);

    	datos['traduccion_selecciona_una_categoria'] = array_traducciones[47];
    	datos['traduccion_selecciona_una_subcategoria'] = array_traducciones[48];
    	
        this.el.html(ColaboraView.template(datos));
        return this;
    };
    
    this.capturarImagen = function(event) {
    	capturePhotoCamara();
    };
    
    this.capturarImagenGaleria = function(event) {
    	capturePhotoGaleria();
    };
    
    this.abrirCategorias = function(event) {
    	$('#link_dialog_categorias').click();
    };
    this.abrirSubcategorias = function(event) {
    	$('#link_dialog_subcategorias').click();
    };
    
    this.enviarColabora = function(event) {
    	
        var id_categoria_seleccionada = $('#id_categoria_seleccionada').val();
        var id_subcategoria_seleccionada = $('#id_subcategoria_seleccionada').val();
    	
        
        if(id_categoria_seleccionada==''){
        	var este_texto_selecciona_una_categoria = $('#traduccion_selecciona_una_categoria').val();
        	toastr.warning(este_texto_selecciona_una_categoria);
        	return;
        }
        if(id_subcategoria_seleccionada==''){
        	var este_texto_selecciona_una_subcategoria = $('#traduccion_selecciona_una_subcategoria').val();
        	toastr.warning(este_texto_selecciona_una_subcategoria);
        	return;
        }
        
    	var nombres_imagenes = '';
    	var este_id_usuario_registrado = $('#id_usuario_registrado').val();
    	var texto = $('#texto').val();
    	
    	for (var i = 1; i <= 10; i++) {
    		var este_nombre_imagen = $('#foto_data_'+i).val();
    		if(este_nombre_imagen!=''){
    			
    			nombres_imagenes+=este_nombre_imagen+"##";
                
                $('#texto').val("");
                $('#foto_data_'+i).val("");
                $('#div_foto_'+i).hide();
    		}
    	}
    	
    	$.ajax({
            async:true,   
            type: 'POST',  
            url: url_servicios,
            data: "id_servicio=4&nombres_imagenes="+nombres_imagenes+"&texto="+texto+"&este_id_usuario_registrado="+este_id_usuario_registrado+"&id_categoria="+id_categoria_seleccionada+"&id_subcategoria="+id_subcategoria_seleccionada,
            success:  function(respuesta){ 
            }
        });
    	
    	$('#id_categoria_seleccionada').val("-1");
    	$('#id_subcategoria_seleccionada').val("-1");
    	
    	$('#texto_categoria_seleccionada').html(primeraLetraMayuscula(array_traducciones[47]));
    	$('#texto_subcategoria_seleccionada').html(primeraLetraMayuscula(array_traducciones[48]));
    	
        toastr.success(primeraLetraMayuscula(array_traducciones[19]));
    };
    
    

    this.initialize();

}

ColaboraView.template = Handlebars.compile($("#colabora-tpl").html());