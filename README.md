# xy_inc

Para utilização dos fontes deverá ser instalado o postgresql e o tomcat na versão 7

http://mirror.nbtelecom.com.br/apache/tomcat/tomcat-7/v7.0.67/bin/apache-tomcat-7.0.67.zip
http://get.enterprisedb.com/postgresql/postgresql-9.5.0-rc1-windows-x64.exe

A senha de banco do usuário postgres deverá ser alterada para 123456
Deverá ser executado o script database.sql no postgres

Compilar os fontes com a versão do java 7 e fazer o deploy do artefado no tomcat


Para validar os serviços deverá ser utilizado uma ferramente restClient (Recomendo Advance Rest Client 'Plugin google chrome')

Todas requisições são do tipo POST

para Listar pontos de interesse cadastrados
http://localhhost:8080/xyinc/POI/list

Para listar pontos de interesse proximo a outro ponto, deverá ser passado os parametros (x,y,distancia)
http://localhost:8080/xyinc/POI/listByProximity

Para cadastrar um ponto de interesse, deverá ser passado os parametros (nome,x,y)
http://localhost:8080/xyinc/POI/save
