jQuery(document).ready(function($) {
	var dataTable = $('#dataGridImage').DataTable( {
		ajax: {
        	url: contextPath + "secure/image/list",
        	type: 'POST',
        	data: function(data) {
        		data.imageName = $('#imageName').val();
        	}
        },
        columns: [
                  	{ data: "image" },
                  	{ data: "path" },
                  	{ data: "system.system" }
                 ],
	    columnDefs: [
	                {
	               	 targets: 3,
	               	 data: null,
	               	 width: '50px',
	               	 className: 'center',
	               	 defaultContent: '<a href="javascript://" class="remover"><span class="fa fa-times" aria-hidden="true"></span></a>'	
	                }
	            ]
    });
	
	$('#dataGridImage tbody').on( 'click', 'a', function () {
        var data = dataTable.row( $(this).parents('tr') ).data();
        $('#modalId').val(data.id);
        if ($(this).hasClass('remover')) {
        	$('#deleteItem').html('');
        	$('#deleteItem').html(data.image);
        	$('#delete').modal('show');
        }
    });
	
	$('#formImage').validate({
		rules : {
			imageName : {
				required: true,
				maxlength: 50
			},
			pathImage : {
				required: true,
				maxlength: 500
			},
			systemId : {
				required: true,
				valueNotEquals: "selecione"
			}
		},
		messages : {
			imageName : "Preencha o campo 'Nome da Imagem'!",
			pathImage : "Preencha o campo 'Caminho da Imagem'!",
			systemId : { valueNotEquals : "Preencha o campo 'Sistema'!" }
		},
		submitHandler: function() {
			var data = {
				imageName: $('#imageName').val(),
				pathImage: $('#pathImage').val(),
				systemId: $('#systemId').val()
			};
			$.ajax({
 			   type: "POST",
 			   url: contextPath + "secure/image/save",
 			   data: data,
 			   dataType: 'json',
 			   beforeSend: function() {
 				   showLoading();
 			   },
 			   success: function(data) {
 				   hideLoading();
 				   if (data.result == 'success') {
 					   $('#formImage').trigger("reset");
 					   DockerUtil.mensagenSuccess('Imagem cadastrada com sucesso!');
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
			   url: contextPath + "secure/image/delete",
			   data: data,
			   dataType: 'json',
			   beforeSend: function() {
				   showLoading();
			   },
			   success: function(data) {
				   hideLoading();
				   if (data.result == 'success') {
					   dataTable.ajax.reload();
					   DockerUtil.mensagenSuccess('Imagem excluida com sucesso!');
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
