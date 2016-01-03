jQuery(document).ready(function($) {
	var dataTable = $('#dataGridServer').DataTable( {
		ajax: {
        	url: contextPath + "secure/server/list",
        	type: 'POST',
        	data: function(data) {
        		data.serverName = $('#serverName').val();
        	}
        },
        columns: [
                  	{ data: "server" },
                  	{ data: "ip" },
                  	{ data: "rootUser" }
                 ],
	    columnDefs: [
	                {
	               	 targets: 3,
	               	 data: null,
	               	 width: '50px',
	               	 className: 'center',
	               	 defaultContent: '<a href="javascript://" class="edit"><span class="fa fa-edit" aria-hidden="true"></span></a><a href="javascript://" class="remover"><span class="fa fa-times" aria-hidden="true"></span></a>'	
	                }
	            ]
    });
	
	$('#dataGridServer tbody').on( 'click', 'a', function () {
        var data = dataTable.row( $(this).parents('tr') ).data();
        $('#modalId').val(data.id);
        if ($(this).hasClass('remover')) {
        	$('#deleteItem').html('');
        	$('#deleteItem').html(data.server);
 			$('#delete').modal('show');
        } else if ($(this).hasClass('edit')) {
        	$.redirectPost(contextPath + 'secure/server/manage', 'GET', {id: data.id});
        }
    });
	
	$('#formServer').validate({
		rules : {
			serverName : {
				required: true,
				maxlength: 50
			},
			ip : {
				required: true,
				maxlength: 15
			},
			rootUser : {
				required: true,
				maxlength: 20
			}, 
			sshKey :  {
				required: true,
			}
		},
		messages : {
			serverName : "Preencha o campo 'Nome do Servidor'!",
			ip : "Preencha o campo 'IP do Servidor'!",
			rootUser : "Preencha o campo 'Usuário Administrador do Servidor'!",
			sshKey : "Preencha o campo 'Chave Pública do Servidor'!",
		},
		submitHandler: function() {
			var data = {
					id: $('#serverId').val(),
					serverName: $('#serverName').val(),
					ip: $('#ip').val(),
					rootUser: $('#rootUser').val(),
					sshKey: $('#sshKey').val()
			};
			$.ajax({
 			   type: "POST",
 			   url: contextPath + "secure/server/save",
 			   data: data,
 			   dataType: 'json',
 			   beforeSend: function() {
 				   showLoading();
 			   },
 			   success: function(data) {
 				   hideLoading();
 				   if (data.result == 'success') {
 					  if (!DockerUtil.isEmpty($('#serverId').val())) {
 						  $('#serverId').val('');
 						  $('#serverName').val('');
 						  $('#ip').val('');
 						  $('#rootUser').val('');
 						  $('#sshKey').val('');
 						  DockerUtil.mensagenSuccess('Servidor cadastrado com sucesso!');
 					  } else {
 						  $('#formServer').trigger("reset");
 						  DockerUtil.mensagenSuccess('Servidor cadastrado com sucesso!');
 					  }
 				   } else if (data.result == 'warning' ) {
 					   DockerUtil.mensagenWarning(data.messages);
 				   } else {
 					   DockerUtil.mensagenDanger(data.messages);
 				   }
 			   },
 			   error: function() {
 				   hideLoading();
 				   DockerUtil.mensagenDanger('Ocorreu um erro inesperado ao realizar a operação!');
 			   }
 		   });
        }
	});
	
	$('#find').click(function() {
		dataTable.ajax.reload();
	});
	
	$('#btnExcluir').click(function() {
		var data = {
				id: $('#modalId').val()	
			};
		$.ajax({
			   type: "POST",
			   url: contextPath + "secure/server/delete",
			   data: data,
			   dataType: 'json',
			   beforeSend: function() {
				   showLoading();
			   },
			   success: function(data) {
				   hideLoading();
				   if (data.result == 'success') {
					   dataTable.ajax.reload();
					   DockerUtil.mensagenSuccess('Servidor excluida com sucesso!');
				   } else if (data.result == 'warning' ) {
 					   DockerUtil.mensagenWarning(data.messages);
 				   } else {
					   DockerUtil.mensagenDanger(data.messages);
				   }
			   },
			   error: function() {
				   hideLoading();
				   DockerUtil.mensagenDanger('Ocorreu um erro inesperado ao realizar a operação!');
			   }
		   });
	});
});
