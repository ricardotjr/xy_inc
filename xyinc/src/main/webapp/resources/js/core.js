$(function() {

	if ($('.filter').length) {
		
		$('#filters').hide();
		$('.filter').on('click', function () {
			if ($('#filters').is(":visible")) {
				$('#filters').hide();			
			} else {
				$('#filters').show();
			}
		});	
	}
	
	$('.onlyNumber').keypress(function (e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});
	
	$('.decimalNumber').keypress(function (e) {
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57) || e.which != 46 && e.which != 190 && e.which != 188 && e.which != 44) {
			return false;
		}
	});
	
	$('.profile').click(function() {
		$('#alterProfile').modal('show');
	});
	
	$('#formUpdate').validate({
		rules : {
			password : {
				required: true,
				minlength: 8
			},
			newPassword : {
				required: true,
				minlength: 8
			},
			confirmPassword : {
				required: true,
				equalTo: "#newPassword",
				minlength: 8
			}
		},
		messages : {
			password : "Preencha o campo 'Password'!",
			newPassword : "Preencha o campo 'Nova Senha'!",
			confirmPassword : "Preencha o campo 'Confirmar Senha'!"
		},
		submitHandler: function() {
			
			var data = {
				password: $('#password').val(),
				newPassword: $('#newPassword').val()
			};
			
			$.ajax({
	 			   type: "POST",
	 			   url: contextPath + "updatePassword",
	 			   data: data,
	 			   dataType: 'json',
	 			   beforeSend: function() {
	 				   showLoading();
	 			   },
	 			   success: function(data) {
	 				   hideLoading();
	 				   if (data.result == 'success') {
	 					   DockerUtil.mensagenSuccess('Solicitação de troca de senha enviada com sucesso para email ' + $('#email').val());
	 				   } else if (data.result == 'warning' ) {
	 					   DockerUtil.mensagenWarning("Senha atual não confere!");
	 				   } else {
	 					   DockerUtil.mensagenDanger("Ocorreu um erro inesperado tente novamente!");
	 				   }
	 			   },
	 			   error: function() {
	 				   hideLoading();
	 				   DockerUtil.mensagenDanger('Ocorreu um erro inesperado ao realizar a operação!');
	 			   }
			});
		}
	});
});

$(function() {

	$.extend({
		redirectPost: function(location, method, args) {
			var form = '';
			$.each( args, function( key, value ) {
				form += '<input type="hidden" name="'+key+'" value="'+value+'">';
			});
			$('<form action="'+location+'" method="' + method + '">'+form+'</form>').appendTo('body').submit();
		}
	});
	
	$.validator.addMethod("valueNotEquals", function(value, element, arg) {
		  return arg != value;
		 },
		 "Escolha uma opção!");
	
	$.extend( $.fn.dataTable.defaults, {
		responsive: true,
		processing: true,
        serverSide: true,
        searching: false,
        lengthChange: false,
        ordering: false,
        stateSave: true,
        deferRender: true,
        language: {
            "emptyTable":     "Não foram encontrados registros",
            "info":           "",
            "infoEmpty":      "",
            "infoFiltered":   "",
            "infoPostFix":    "",
            "thousands":      "",
            "lengthMenu":     "",
            "loadingRecords": "Carregando...",
            "processing":     "Processando...",
            "search":         "",
            "zeroRecords":    "Não foram encontrados registros",
            "paginate": {
                "first":      "Primeiro",
                "last":       "Ultimo",
                "next":       "Proximo",
                "previous":   "Anterior"
            },
            "aria": {
                "sortAscending":  ": Classificar ascenente",
                "sortDescending": ": Classificar descendente"
            }
        }
	});
	
	$.each(menus, function( key, menu ) {
		if (menu.render) {
			var li = '<li>'
				+		'<a href="' + contextPath + menu.url + '">'
				+		'<i class="' + menu.styleClass +'"></i> ' + menu.menu
				
			if (menu.menus != null && menu.menus != undefined) {
				li = li + '<span class="fa arrow"></span></a>'
				li = li + secondLevel(menu.menus);
			}
				li = li +'</a></li>';
			$("#side-menu").append(li);
		}
		
	});
	
});

$(function() {

    $('#side-menu').metisMenu();
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});

function secondLevel(menus) {
	var ul = '<ul class="nav nav-second-level">';
	$.each(menus, function( key, menu ) {
		if (menu.render) {
			var li = '<li>'
				+		'<a href="' + contextPath + menu.url + '">'
				+		'<i class="' + menu.styleClass +'"></i> ' + menu.menu
				+	'</a>';
				li = li +'</li>';
				ul = ul + li;
		}
	});
	ul = ul + '</ul>';
	
	return ul;
}

function showLoading() {
	$('#loading').modal({
		backdrop: 'static',
		keyboard: false,
		show: true
	});
}
function hideLoading() {
	$('#loading').modal('hide');
}