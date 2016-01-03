CREATE DATABASE xyinc;

CREATE TABLE poi
(
   id serial not null, 
   nome character varying(50) not null,
   x numeric(26,20) not null, 
   y numeric(26,20) not null, 
   CONSTRAINT pk PRIMARY KEY (id)
) 
WITH (
  OIDS = FALSE
)
;

CREATE OR REPLACE FUNCTION distancia_entre_pontos(
    lat1 numeric,
    lng1 numeric,
    lat2 numeric,
    lng2 numeric)
  RETURNS double precision AS
$BODY$
	SELECT 6371000 * acos(
		sin( radians($1) ) * sin( radians( $3 ))
	      + cos( radians($1) ) * cos( radians( $3 )) * cos(radians($4) - radians($2))  )
	AS distance;
$BODY$
  LANGUAGE sql IMMUTABLE
  COST 100;

CREATE OR REPLACE FUNCTION fn_poi(
    IN xIN numeric,
    IN yIN numeric,
    IN distanciaIN int)
  RETURNS table(id integer, nome text, x numeric(26,20), y numeric(26,20), distancia double precision) AS
'select * from (select id, nome, x, y, distancia_entre_pontos(y, x, yIN, xIN) distancia from poi where distancia_entre_pontos(y, x, yIN, xIN) < distanciaIN) T order by t.distancia' language 'sql';
