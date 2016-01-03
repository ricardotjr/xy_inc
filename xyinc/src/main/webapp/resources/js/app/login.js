jQuery(document).ready(function($) {
	$('#validation').fadeOut("slow");
	var msg = $('#message').val();
	if (!DockerUtil.isEmpty(msg)) {
		DockerUtil.mensagenAlerta("validation", msg);
	}
	
	$('#login').submit(function() {
		var username = $('#username').val();
		var password = $('#password').val();
		
		if (DockerUtil.isEmpty(username)) {
			DockerUtil.mensagenAlerta("validation", "Preencha o campo 'Usuário'!");
			return false;
		}
		if (DockerUtil.isEmpty(password)) {
			DockerUtil.mensagenAlerta("validation", "Preencha o campo 'Senha'!");
			return false;
		}
		return true;
	});
});