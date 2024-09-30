USE `citas`;
DROP procedure IF EXISTS `obtener_proveedores`;
DELIMITER $$ 
CREATE PROCEDURE `obtener_proveedores` () BEGIN
	SELECT 
		id, 
        CONCAT(nombre, ' ', apellido) AS title
	FROM usuarios
	WHERE privado = 0;
END $$