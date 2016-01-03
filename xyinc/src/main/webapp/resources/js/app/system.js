jQuery(document).ready(function($) {
	var dataTable = $('#dataGridSystem').DataTable( {
		ajax: {
        	url: contextPath + "secure/system/list",
        	type: 'POST',
        	data: function(data) {
        		data.systemName = $('#systemName').val();
        	}
        },
        columns: [
                  	{ data: "system" },
                 ],
	    columnDefs: [
	                {
	               	 targets: 1,
	               	 data: null,
	               	 width: '50px',
	               	 className: 'center',
	               	 defaultContent: '<a href="javascript://" class="remover"><span class="fa fa-times" aria-hidden="true"></span></a>'	
	                }
	            ]
    });
	
	$('#dataGridSystem tbody').on( 'click', 'a', function () {
        var data = dataTable.row( $(this).parents('tr') ).data();
        $('#modalId').val(data.id);
        if ($(this).hasClass('remover')) {
        	$.ajax({
 			   type: "POST",
 			   url: contextPath + "secure/system/used",
 			   data: { id: data.id},
 			   dataType: 'json',
 			   beforeSend: function() {
 				   showLoading();
 			   },
 			   success: function(data) {
 				   hideLoading();
 				   if (data.result == 'success') {
 					  $('#deleteItem').html('');
 			        	$('#deleteItem').html(data.system);
 			        	$('#delete').modal('show');
 				   } else if (data.result == 'warning' ) {
  					   DockerUtil.mensagenWarning("Este sistema esta sendo utilizado por uma imagem, exclua a imagem para excluir o sistema!");
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
	
	$('#formSystem').validate({
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
			   url: contextPath + "secure/system/delete",
			   data: data,
			   dataType: 'json',
			   beforeSend: function() {
				   showLoading();
			   },
			   success: function(data) {
				   hideLoading();
				   if (data.result == 'success') {
					   dataTable.ajax.reload();
					   DockerUtil.mensagenSuccess('Sistema excluida com sucesso!');
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
