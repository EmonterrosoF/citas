USE `citas`;
DROP procedure IF EXISTS `obtener_servicios`;
DELIMITER $$ USE `citas` $$ CREATE PROCEDURE `obtener_servicios` () BEGIN
SELECT id,
    nombre,
    precio,
    descripcion,
    duracion
FROM servicios
WHERE privado <> 1;
END $$ DELIMITER;