jQuery(document).ready(function($) {
	var dataTable = $('#dataGridUser').DataTable( {
		ajax: {
        	url: contextPath + "secure/user/list",
        	type: 'POST',
        	data: function(data) {
        		data.userName = $('#userName').val();
        	}
        },
        columns: [
                  	{ data: "id" },
                  	{ data: "email" },
                  	{ data: "profile" }
                 ],
	    columnDefs: [
	                {
	               	 targets: 3,
	               	 data: null,
	               	 width: '50px',
	               	 className: 'center',
	               	 defaultContent: '<a href="javascript://" class="edit"><span class="fa fa-edit" aria-hidden="true"></span></a>&nbsp;<a href="javascript://" class="remover"><span class="fa fa-times" aria-hidden="true"></span></a>'	
	                }
	            ]
    });
	
	$('#dataGridUser tbody').on( 'click', 'a', function () {
        var data = dataTable.row( $(this).parents('tr') ).data();
        $('#modalId').val(data.id);
        if ($(this).hasClass('edit')) {
        	$.redirectPost(contextPath + 'secure/user/manage', 'POST', {id: data.id});
        } else if ($(this).hasClass('remover')) {
        	$('#deleteItem').html('');
        	$('#deleteItem').html(data.system);
        	$('#delete').modal('show');
        }
    });
	
	$('#formUser').validate({
		rules : {
			systemName : {
				required: true,
				maxlength: 50
			}
		},
		messages : {
			systemName : "Preencha o campo 'Nome do Sistema'!",
		},
		submitHandler: function() {
			var data = {
					systemName: $('#systemName').val()
			};
			$.ajax({
 			   type: "POST",
 			   url: contextPath + "secure/system/save",
 			   data: data,
 			   dataType: 'json',
 			   beforeSend: function() {
 				   showLoading();
 			   },
 			   success: function(data) {
 				   hideLoading();
 				   if (data.result == 'success') {
 					   $('#formSystem').trigger("reset");
 					   DockerUtil.mensagenSuccess('Sistema cadastrado com sucesso!');
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
			   url: contextPath + "secure/user/delete",
			   data: data,
			   dataType: 'json',
			   beforeSend: function() {
				   showLoading();
			   },
			   success: function(data) {
				   hideLoading();
				   if (data.result == 'success') {
					   dataTable.ajax.reload();
					   DockerUtil.mensagenSuccess('Usuário excluido com sucesso!');
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
