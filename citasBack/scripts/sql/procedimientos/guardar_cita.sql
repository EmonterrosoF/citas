USE `citas`;
DROP procedure IF EXISTS `guardar_cita`;
DELIMITER $$ USE `citas` $$ CREATE DEFINER = `root` @`localhost` PROCEDURE `guardar_cita`(
    id_servicio INT,
    id_proveedor INT,
    fecha_inicio DATETIME,
    fecha_final DATETIME,
    nombre_cliente VARCHAR(256),
    apellido_cliente VARCHAR(512),
    correo_cliente VARCHAR(512),
    telefono_cliente VARCHAR(128),
    notas_cliente TEXT
) BEGIN
DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN -- Rollback en caso de error
    ROLLBACK;
SIGNAL SQLSTATE '45000'
SET MESSAGE_TEXT = 'Error al guardar la cita.';
END;
-- Iniciar la transacción
START TRANSACTION;
-- Insertar en la tabla `clientes`
INSERT INTO clientes (nombre, apellido, email, telefono, notas)
VALUES (
        nombre_cliente,
        apellido_cliente,
        correo_cliente,
        telefono_cliente,
        notas_cliente
    );
-- Recuperar el ID del cliente recién insertado
SET @id_cliente = LAST_INSERT_ID();
-- Insertar en la tabla `citas`
INSERT INTO citas (
        fecha_inicio,
        fecha_fin,
        notas,
        estado,
        id_usuario_proveedor,
        id_usuario_cliente,
        id_servicio,
        fecha_reserva
    )
VALUES (
        fecha_inicio,
        fecha_final,
        notas_cliente,
        'RESERVADA',
        id_proveedor,
        @id_cliente,
        id_servicio,
        NOW()
    );
-- Confirmar la transacción
COMMIT;
END $$ DELIMITER;
;