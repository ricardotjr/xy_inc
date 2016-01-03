jQuery(document).ready(function($) {
	var dataTable = $('#dataGridParameter').DataTable( {
		ajax: {
        	url: contextPath + "secure/parameters/list",
        	type: 'POST',
        	data: function(data) {
        		data.id = $('#id').val();
        		data.parameterName = $('#parameterName').val();
        	}
        },
        columns: [
                  	{ data: "parameterIdentifier.id" },
                  	{ data: "parameterIdentifier.tpParameter" },
                  	{ data: "parameter" },
                  	{ data: "status" }
                 ],
	    columnDefs: [
	                {
	               	 targets: 4,
	               	 data: null,
	               	 width: '50px',
	               	 className: 'center',
	               	 defaultContent: '<a href="javascript://" class="editar"><span class="fa fa-edit" aria-hidden="true"></span></a>'	
	                }
	            ]
    });
	
	$('#dataGridParameter tbody').on( 'click', 'a', function () {
        var data = dataTable.row( $(this).parents('tr') ).data();
        $('#modalId').val(data.parameter);
        if ($(this).hasClass('editar')) {
        	$.redirectPost(contextPath + 'secure/parameters/manage', 'GET', {id: data.id});
        }
    });
	
	$('#formParameter').validate({
		rules : {
			id : {
				required: true,
				valueNotEquals: " "
			},
			parameterName : {
				required: true,
				maxlength:1000
			},
			status: {
				required: true,
			}
		},
		messages : {
			id : { valueNotEquals : "Preencha o campo 'Identificador do Sistema'!" },
			parameterName : "Preencha o campo 'Valor do Parametro'!",
			status : "Preencha o campo 'Status do Parametro'!"
		},
		submitHandler: function() {
			var data = {
				id: $('#id').val(),
				idParameter: $('#idParameter').val(),
				parameterName: $('#parameterName').val(),
				status: $('#status').val(),
				observation: $('#observation').val()
			};
			$.ajax({
 			   type: "POST",
 			   url: contextPath + "secure/parameters/save",
 			   data: data,
 			   dataType: 'json',
 			   beforeSend: function() {
 				   showLoading();
 			   },
 			   success: function(data) {
 				   hideLoading();
 				   if (data.result == 'success') {
 					   
 					  if (!DockerUtil.isEmpty($('#idParameter').val())) {
 						  $('#idParameter').val('');
 						  $('#id').val(' ')
 						  $('#id').prop('disabled', true);
 						  $('#parameterName').val('');
 						  $('#status').val('INATIVO');
 						  $('#observation').val('');
 						  DockerUtil.mensagenSuccess('Parametro cadastrado com sucesso!');
 					  } else {
 						  $('#formServer').trigger("reset");
 						  DockerUtil.mensagenSuccess('Parametro cadastrado com sucesso!');
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
});