jQuery(document).ready(function($) {
	
	var dataTable = $('#dataGridContainer').DataTable( {
		ajax: {
        	url: contextPath + "secure/container/list",
        	type: 'POST',
        	data: function(data) {
        		data.containerName = $('#containerName').val();
        		data.cdContainerName = $('#cdContainerName').val();
        		data.server = $('#serverId').val();
        		data.system = $('#systemId').val();
        		data.image = $('#imageId').val();
        		data.status = $('#statusId').val();
        	}
        },
        columns: [
                  	{
                	  className: 'details-control',
                	  data: null,
                	  defaultContent: ''
                  	},
                  	{ data: "container" },
                  	{ data: "cdContainer" },
                  	{ data: "status.containerStatus" },
                  	{ data: "server" },
                  	{ data: "image" },
                  	{ data: "system" },
                 ],
	    columnDefs: [
	                {
	               	 targets: 7,
	               	 data: null,
	               	 width: '50px',
	               	 className: 'center',
	               	 defaultContent: '<a href="javascript://" class="edit"><span title="Editar" class="fa fa-edit" aria-hidden="true"></span></a>&nbsp;<a href="javascript://" class="action"><span class="fa" aria-hidden="true"></span></a>'	
	                }
	            ],
	    createdRow: function ( row, data, index ) {
	    	if (data.status.id == 1) {
	    		$('td', row).eq(3).addClass('text-danger');
	    		$('td', row).eq(7).find('.action').find('span').addClass('fa-play');
	    		$('td', row).eq(7).find('.action').find('span').attr('title', data.status.containerStatus);
	    	} else if (data.status.id == 2) {
	    		$('td', row).eq(3).addClass('text-success');
	    		$('td', row).eq(7).find('.action').find('span').addClass('fa-stop');
	    		$('td', row).eq(7).find('.action').find('span').attr('title', data.status.containerStatus);
	    	} else if (data.status.id == 3) {
	    		$('td', row).eq(3).addClass('text-warning');
	    		$('td', row).eq(7).find('.action').find('span').addClass('fa-cloud');
	    		$('td', row).eq(7).find('.action').removeAttr('href');
	    		$('td', row).eq(7).find('.action').find('span').attr('title', data.status.containerStatus);
	    	} else if (data.status.id == 4) {
	    		$('td', row).eq(3).addClass('text-warning');
	    		$('td', row).eq(7).find('.action').find('span').addClass('fa-bug');
	    		$('td', row).eq(7).find('.action').removeAttr('href');
	    		$('td', row).eq(7).find('.action').find('span').attr('title', data.status.containerStatus);
	    	}
	    }
    });
	
	$('#dataGridContainer tbody').on( 'click', 'a', function () {
        var data = dataTable.row( $(this).parents('tr') ).data();
        $('#modalId').val(data.id);
        if ($(this).hasClass('action')) {
        	switch (data.status.id) {
				case 1: 
					var dataObject = {
		        		id: data.id,
		        		newStatus: 4
		        	};
		        	$.ajax({
		 			   type: "POST",
		 			   url: contextPath + "secure/container/changeAction",
		 			   data: dataObject,
		 			   dataType: 'json',
		 			   beforeSend: function() {
		 				   showLoading();
		 			   },
		 			   success: function(data) {
		 				   hideLoading();
		 				   if (data.result == 'success') {
		 					   dataTable.ajax.reload();
		 					   DockerUtil.mensagenSuccess('Solicitação enviado com sucesso!');
		 				   } else {
		 					   DockerUtil.mensagenDanger('Ocorreu um erro inesperado ao enviar solicitação!');
		 				   }
		 			   },
		 			   error: function() {
		 				   hideLoading();
		 				   DockerUtil.mensagenDanger('Ocorreu um erro inesperado ao realizar a operação!');
		 			   }
		 		   }); 
					break;
				case 2: 
					var dataObject = {
		        		id: data.id,
		        		newStatus: 3
		        	};
		        	$.ajax({
		 			   type: "POST",
		 			   url: contextPath + "secure/container/changeAction",
		 			   data: dataObject,
		 			   dataType: 'json',
		 			   beforeSend: function() {
		 				   showLoading();
		 			   },
		 			   success: function(data) {
		 				   hideLoading();
		 				   if (data.result == 'success') {
		 					   dataTable.ajax.reload();
		 					   DockerUtil.mensagenSuccess('Solicitação enviado com sucesso!');
		 				   } else {
		 					   DockerUtil.mensagenDanger('Ocorreu um erro inesperado ao enviar solicitação!');
		 				   }
		 			   },
		 			   error: function() {
		 				   hideLoading();
		 				   DockerUtil.mensagenDanger('Ocorreu um erro inesperado ao realizar a operação!');
		 			   }
		 		   });
					break;
				case 3: DockerUtil.mensagenInfo("Desligando, Aguarde ..."); break;
				case 4: DockerUtil.mensagenInfo("Carregando, Aguarde ..."); break;
			}
        } else if ($(this).hasClass('edit')) {
        	$.redirectPost(contextPath + 'secure/container/manage', 'GET', {id: data.id});
        }
    });
	
	$('#dataGridContainer tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = dataTable.row( tr );
 
        if ( row.child.isShown() ) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );
	
	$('#systemId').change(function() {
		var data = {
			systemId: $(this).val()	
		};
		$.ajax({
			   type: "POST",
			   url: contextPath + "secure/container/listImages",
			   data: data,
			   dataType: 'json',
			   beforeSend: function() {
				   showLoading();
			   },
			   success: function(data) {
				   hideLoading();
				   if (data != null) {
					   $('#imageId').html('');
					   $('#imageId').append('<option value="">--Selecione--</option>');
					   $.each(data, function( key, image ) {
						   $('#imageId').append('<option value="' + image.id + '">' + image.image + '</option>'); 
					   });
				   } else {
					   DockerUtil.mensagenDanger('Ocorreu um erro inesperado ao buscar as imagens!');
				   }
			   },
			   error: function() {
				   hideLoading();
				   DockerUtil.mensagenDanger('Ocorreu um erro inesperado ao realizar a operação!');
			   }
		   });
	});
	
	$('#formContainer').validate({
		rules : {
			containerName : {
				required: true,
				maxlength: 20
			},
			serverId : {
				required: true,
				valueNotEquals: " "
			},
			imageId : {
				required: true,
				valueNotEquals: " "
			},
			listVols : {
				required: true,
				valueNotEquals: " "
			},
			listPorts : {
				required: true,
				valueNotEquals: " "
			}
		},
		messages : {
			containerName : "Preencha o campo 'Nome do Container'!",
			serverId : { valueNotEquals : "Preencha o campo 'Servidor'!" },
			imageId : { valueNotEquals : "Preencha o campo 'Imagem'!" },
			listVols : { valueNotEquals : "Preencha o campo 'Volume'!" },
			listPorts : { valueNotEquals : "Preencha o campo 'Porta'!" }
		},
		submitHandler: function() {
			var listVols = new Array();
			var listPorts = new Array();
			$('#listVols').find("option").each(function(){
				listVols.push($(this).val());
			});
			$('#listPorts').find("option").each(function(){
				listPorts.push($(this).val());
			});
			var data = {
				id: $('#containerId').val(),
				containerName: $('#containerName').val(),
				serverId: $('#serverId').val(),
				imageId: $('#imageId').val(),
				ports: listPorts,
				volumes: listVols
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

	$('.addPort').click(function() {
		var port = $('#port').val();
		if (port.contains(':') && DockerUtil.isNumber(port.split(':')[0]) && DockerUtil.isNumber(port.split(':')[1])) {
			add('listPorts', port);
		}
	});
	
	$('.delPort').click(function() {
		del('listPorts');
	});
	
	$('.addVol').click(function() {
		var volume = $('#volume').val();
		if (DockerUtil.isNumber(volume)) {
			add('listVols', volume);
		}
	});
	
	$('.delVol').click(function() {
		del('listVols');
	});
	
	$('.portDocker').keypress(function (e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) && e.which != 58) {
			return false;
		}
	});
});

function format ( data ) {
    var table = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Volumes:</td>'+
            '<td>';
    if (data.volumes) {
    	$.each(data.volumes, function(i, volume) {
    		table += volume + ' ';
    	});
    }
    table += '</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Portas:</td>'+
            '<td>';
    if (data.ports) {
	    $.each(data.ports, function(i, port) {
	    	table += port + ' ';
	    });
    }
    table +='</td>'+
        '</tr>'+
    '</table>';
    
    return table;
}

function add(element, desc) {
	$('#' + element).append($('<option>', desc).text(desc)); 
}

function del(element) {
	$('#' + element).find("option:selected").remove();
}