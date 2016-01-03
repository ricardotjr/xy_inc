function Util() {}

Util.isEmpty = function(value){
	return (value == null || value == ''|| value === undefined);
};

Util.isNumber = function(numero){
	return !isNaN(numero);
};

Util.isArray = function(value) {
	if (value == null || value === undefined || value.constructor.toString().indexOf("Array") == -1)
		return false;
	else
		return true;
};

Util.isEmptyArray = function(value) {
	
	return value.length == 0;
};

Util.trim = function(str){
	if(!KyrosUtil.isEmpty(str)){
		return str.replace(/^\s+|\s+$/g,"");
	}
	return str;
};

Util.contains = function(array, element){
	if(array == null || array == '' || array === undefined){
		return false;
	}
	var i = array.length;
    while (i--) {
        if (array[i] == element) {
            return true;
        }
    }
    return false;
};

Util.replaceAll = function(string, token, newtoken) {
	while (string.indexOf(token) != -1) {
 		string = string.replace(token, newtoken);
	}
	return string;
};

Util.mensagenSucesso = function mensagem(divId, msg) {

	$('#' + divId).removeClass('alert-info');
	$('#' + divId).removeClass('alert-warning');
	$('#' + divId).removeClass('alert-danger');
	
	$('#' + divId).addClass('alert-success');
	
	$('html, body').animate('slow');
	$('#' + divId + ' span').html(msg);
	$('#' + divId).fadeIn('slow');
	$('#' + divId).delay(6000).fadeOut("slow");
}

Util.toInt = function toInt(value) {
	return isNaN(parseInt(value)) ? 0 : parseInt(value);
}

Util.mensagenInfo = function mensagem(msg) {
	
	$('#modalMessage').removeClass('alert-success');
	$('#modalMessage').removeClass('alert-info');
	$('#modalMessage').removeClass('alert-warning');
	$('#modalMessage').removeClass('alert-danger');
	$('#modalMessage').addClass('alert-info');
	$('#modalMessage span').html('');
	$('html, body').animate('slow');
	$('#modalMessage span').html(msg);
	$('#message').modal('show');
	$('.alert').show();
}

Util.mensagenSuccess= function mensagem(msg) {
	
	$('#modalMessage').removeClass('alert-success');
	$('#modalMessage').removeClass('alert-info');
	$('#modalMessage').removeClass('alert-warning');
	$('#modalMessage').removeClass('alert-danger');
	$('#modalMessage').addClass('alert-success');
	$('#modalMessage span').html('');
	$('html, body').animate('slow');
	if (msg instanceof Array) {
		var messages = '<ul>';
		$.each(msg, function( key, message ) {
			messages += "<li>" + message + "</li>";
		});
		messages += "</ul>";
		$('#modalMessage span').html(messages);
	} else {
		$('#modalMessage span').html(msg);
	}
	$('#message').modal('show');
	$('.alert').show();
}

Util.mensagenWarning = function mensagem(msg) {
	
	$('#modalMessage').removeClass('alert-success');
	$('#modalMessage').removeClass('alert-info');
	$('#modalMessage').removeClass('alert-warning');
	$('#modalMessage').removeClass('alert-danger');
	$('#modalMessage').addClass('alert-warning');
	$('#modalMessage span').html('');
	$('html, body').animate('slow');
	if (msg instanceof Array) {
		var messages = '<ul>';
		$.each(msg, function( key, message ) {
			messages += "<li>" + message + "</li>";
		});
		messages += "</ul>";
		$('#modalMessage span').html(messages);
	} else {
		$('#modalMessage span').html(msg);
	}
	$('#message').modal('show');
	$('.alert').show();
}

Util.mensagenDanger = function mensagem(msg) {
	
	$('#modalMessage').removeClass('alert-success');
	$('#modalMessage').removeClass('alert-info');
	$('#modalMessage').removeClass('alert-warning');
	$('#modalMessage').removeClass('alert-danger');
	$('#modalMessage').addClass('alert-danger');
	$('#modalMessage span').html('');
	$('html, body').animate('slow');
	if (msg instanceof Array) {
		var messages = '<ul>';
		$.each(msg, function( key, message ) {
			messages += "<li>" + message + "</li>";
		});
		messages += "</ul>";
		$('#modalMessage span').html(messages);
	} else {
		$('#modalMessage span').html(msg);
	}
	$('#message').modal('show');
	$('.alert').show();
}
