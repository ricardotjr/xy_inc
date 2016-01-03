<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<spring:url value="/resources/bootstrap-3.3.5/css/bootstrap.min.css" var="bootstrapCss" />
<spring:url value="/resources/metisMenu-1.1.3/metisMenu.min.css" var="metisMenuCss"/>
<spring:url value="/resources/css/core.css" var="coreCss"/>
<spring:url value="/resources/font-awesome-4.3.0/css/font-awesome.css" var="fontAwesomeCSS"/>
<spring:url value="/resources/datatables-1.10.7/css/jquery.dataTables.min.css" var="dataTablesBootstrapCSS" />
<spring:url value="/resources/datatables-1.10.7/css/dataTables.responsive.css" var="dataTablesResponsiveCSS" />

<spring:url value="/resources/jquery-2.1.4/jquery-2.1.4.min.js" var="jqueryJs" />
<spring:url value="/resources/bootstrap-3.3.5/js/bootstrap.min.js" var="bootstrapJs" />
<spring:url value="/resources/metisMenu-1.1.3/metisMenu.min.js" var="metisMenuJs"/>
<spring:url value="/resources/jquery-validation-1.13.1/jquery.validate.min.js" var="jqueryValidateJS" />
<spring:url value="/resources/js/Util.js" var="utilJs" />
<spring:url value="/resources/js/core.js" var="coreJs" />
<spring:url value="/resources/datatables-1.10.7/js/jquery.dataTables.min.js" var="dataTablesJs" />
<spring:url value="/resources/datatables-1.10.7/js/dataTables.bootstrap.js" var="dataTablesBootstrapJs" />
<spring:url value="/resources/datatables-1.10.7/js/dataTables.responsive.js" var="dataTablesResponsiveJs" />
<spring:url value="/" var="urlContext"/>

<html lang="pt-br">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Ricardo Teixeira Júnior">
	<link href="${bootstrapCss}" rel="stylesheet" />
	<link href="${metisMenuCss}" rel="stylesheet" />
	<link href="${coreCss}" rel="stylesheet" />
	<link href="${fontAwesomeCSS}" rel ="stylesheet" />
	<link href="${dataTablesBootstrapCSS}" rel ="stylesheet" />
	<link href="${dataTablesResponsiveCSS}" rel ="stylesheet" />
</head>
<body>
	<div id="wrapper">
		<nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="${urlContext}secure/home">Home</a>
			</div>
			
			<ul class="nav navbar-top-links navbar-right">
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i>${USER_SESSION.fullname}&nbsp;<i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="javascript://" class="profile"><i class="fa fa-user fa-fw"></i> Perfil</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="${urlContext}logout"><i class="fa fa-sign-out fa-fw"></i> Sair</a>
                        </li>
                    </ul>
                </li>
            </ul>
            
			<div class="navbar-default sidebar" role="navigation">
			
				<div class="sidebar-nav navbar-collapse">
					<ul class="nav" id="side-menu">
						
						<li class="sidebar-search">
							<div class="input-group custom-search-form">
								<input type="text" class="form-control" placeholder="Pesquisar...">
								<span class="input-group-btn">
									<button class="btn btn-default" type="button">
										<i class="fa fa-search"></i>
									</button>
								</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</nav>
		<script type="text/javascript">
			var contextPath = '${urlContext}';
			var menus = eval('${MENU_SESSION}');
		</script>
		
		<script src="${jqueryJs}"></script>
		<script src="${bootstrapJs}"></script>
		<script src="${metisMenuJs}"></script>
		<script src="${jqueryValidateJS}"></script>
		<script src="${utilJs}"></script>
		<script src="${coreJs}"></script>
		<script src="${dataTablesJs}"></script>
		<script src="${dataTablesBootstrapJs}"></script>
		<script src="${dataTablesResponsiveJs}"></script>
		<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="loading" id="loading">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
			            <h1>Processando...</h1>
			        </div>
			        <div class="modal-body">
			            <div class="progress">
	    					<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:100%"></div>
	    				</div>
			        </div>
				</div>
			</div>
		</div>
		<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="message" id="message">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-body">
			            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"><span aria-hidden="true">&times;</span></button>
			        </div>
			        <div class="modal-body">
			        	<div id="modalMessage" class="alert alert-dismissible fade in">
			        		<span></span>
			        	</div>
			        </div>
				</div>
			</div>
		</div>
		<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="delete" id="delete">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
			            <button type="button" class="close" data-dismiss="modal" aria-label="Fechar"><span aria-hidden="true">&times;</span></button>
			            <h4 class="modal-title">Exclusão</h4>
			        </div>
			        <div class="modal-body">
		        		<span>Deseja excluir o registro '<span id="deleteItem"></span>' ?</span>
			        </div>
			        <div class="modal-footer">
			        	<input type="hidden" id="modalId"/>
        				<button type="button" id="btnExcluir" class="btn btn-primary" data-dismiss="modal">Excluir</button>
			        	<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
			        </div>
				</div>
			</div>
		</div>
		<div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="alterProfile" id="alterProfile">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
			            <h4 class="modal-title">Alterar Dados</h4>
			        </div>
			        <div class="modal-body">
						<form role="form" id="formUpdate">
							<div class="form-group">
								<label>Usuário</label>
								<p class="form-control-static">${USER_SESSION.id}</p>
							</div>
							<div class="form-group">
								<label>Email</label>
								<input class="form-control" id="email" value="${USER_SESSION.email}" readonly="readonly">
							</div>
							<div class="form-group">
								<label>Senha Atual:</label>
								<input class="form-control" id="password" type="password">
							</div>
							<div class="form-group">
								<label>Nova Senha:</label>
								<input class="form-control" id="newPassword" type="password">
							</div>
							<div class="form-group">
								<label>Confirmar Nova Senha:</label>
								<input class="form-control" id="confirmPassword" type="password">
							</div>
						</form>
			        </div>
			        <div class="modal-footer">
			        	<button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
			        	<button type="button" class="btn btn-primary">Atualizar</button>
			        </div>
				</div>
			</div>
		</div>
		<div id="page-wrapper">
			<jsp:include page="${content}" />
        </div>
		<hr>
		<footer>
			<p>&copy; Copyright 2015</p>
		</footer>
	</div>
</body>
</html>