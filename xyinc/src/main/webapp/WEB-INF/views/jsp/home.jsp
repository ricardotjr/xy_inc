<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<spring:url value="/resources/js/app/container.js" var="containerJs" />
<spring:url value="/" var="urlContext"/>
<spring:url value="/resources/images/details_open.png" var="openPNG"/>
<spring:url value="/resources/images/details_close.png" var="closePNG"/>
<style type="text/css">
td.details-control {
    background: url('${openPNG}') no-repeat center center;
    cursor: pointer;
}
tr.shown td.details-control {
    background: url('${closePNG}') no-repeat center center;
}
</style>
<div class="col-sm-12">
	<h1 class="page-header">Container Docker</h1>
</div>
<div class="col-sm-12">
	<div class="row">
		<div class="filter" style="float: left">
			<a href="javascript://"><span class="fa fa-filter" aria-hidde="true"></span>&nbsp;Filtrar</a>
		</div>
		<div style="float: right">
			<a href="${urlContext}secure/container/manage?id=" class="btn btn-default">Novo Container</a>
		</div>
	</div>
	<div id="filters">
		<div class="row">
			<div class="row">
				<div class="col-sm-4">
					<label>Nome do Container:</label>
					<input type="text" id="containerName" maxlength="20" class="form-control" placeholder="Nome Container">
				</div>
				<div class="col-sm-4">
					<label>Código do Container:</label>
					<input type="text" id="cdContainerName" maxlength="30" class="form-control" placeholder="Código Container">
				</div>
				<div class="col-sm-4">
					<label>Servidor:</label>
					<select class="form-control" id="serverId" name="serverId">
						<option  value="" selected="selected">--Selecione--</option>
						<c:forEach var="server" items="${servers}">
						<option value="${server.id}">${server.server}</option>
						</c:forEach>
					</select>
	           </div>
			</div>
			<div class="row">
				<div class="col-sm-4">
					<label>Sistema:</label>
					<select class="form-control" id="systemId" name="systemId">
						<option  value="" selected="selected">--Selecione--</option>
						<c:forEach var="system" items="${systems}">
						<option value="${system.id}">${system.system}</option>
						</c:forEach>
					</select>
				</div>
				<div class="col-sm-4">
					<label>Imagem:</label>
					<select class="form-control" id="imageId" name="imageId">
						<option  value="" selected="selected">Escolha o Sistema</option>
					</select>
				</div>
				<div class="col-sm-4">
					<label>Status:</label>
					<select class="form-control" id="statusId" name="statusId">
						<option  value="" selected="selected">--Selecione--</option>
						<c:forEach var="st" items="${status}">
						<option value="${st.id}">${st.containerStatus}</option>
						</c:forEach>
					</select>
				</div>
			</div>
			<div class="row"><br></div>
			<div class="row">
				<div class="col-sm-12">
					<button type="submit" class="btn btn-default" id="find">Pesquisar</button>
				</div>
			</div>
		</div>
		<div class="row"><br></div>
	</div>
	<div class="row">
		<div class="col-lg-12">
			<table id="dataGridContainer" class="display" cellspacing="0" width="100%">
				<thead>
					<tr>
						<th></th>
						<th>Nome</th>
						<th>Código Container</th>
						<th>Status</th>
						<th>Servidor</th>
						<th>Imagem</th>
						<th>Sistema</th>
						<th>Ações</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</div>
<script src="${containerJs}"></script>