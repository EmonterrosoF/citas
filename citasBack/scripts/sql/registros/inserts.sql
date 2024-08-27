-- insertar un servicio
INSERT INTO citas.servicios (
        nombre,
        precio,
        descripcion,
        ubicacion,
        privado,
        duracion
    )
VALUES(
        'Corte de Cabello',
        25,
        'Corte para cabellero y niño',
        'Chiquimulilla',
        0,
        30
    ) --insertar rol
INSERT INTO `citas`.`roles` (`nombre`, `tipo`)
VALUES ('administrador', 'ADMIN'),
    ('colaborador', 'usuario');
--insertar usuario
INSERT INTO `citas`.`usuarios` (
        `nombre`,
        `apellido`,
        `email`,
        `telefono`,
        `direccion`,
        `privado`,
        `id_rol`
    )
VALUES (
        'Mario',
        'Hernandez',
        'mario@gmail.com',
        '45657654',
        'chiquimulilla',
        0,
        2
    ) -- relacionar servicio con usuario
INSERT INTO `citas`.`servicios_usuarios` (`id_usuario`, `id_servicio`)
VALUES(1, 1) --citas
INSERT INTO `citas`.`citas` (
        `fecha_reserva`,
        `fecha_inicio`,
        `fecha_fin`,
        `estado`,
        `id_usuario_proveedor`,
        `id_servicio`
    )
VALUES (
        NOW(),
        NOW(),
        DATE_ADD(NOW(), INTERVAL 30 MINUTE),
        'RESERVADA',
        1,
        1
    ),
    (
        NOW(),
        DATE_ADD(NOW(), INTERVAL 1 DAY),
        DATE_ADD(
            DATE_ADD(NOW(), INTERVAL 1 DAY),
            INTERVAL 30 MINUTE
        ),
        'RESERVADA',
        1,
        1
    );
SELECT fecha_inicio AS fechaInicio
FROM citas
WHERE id_usuario_proveedor = 1
    AND id_servicio = 1
    AND estado = 'RESERVADA';
--configuraciones
INSERT INTO `citas`.`configuraciones_globales` (`nombre`, `valor`)
VALUES (
        'horario_laboral',
        '{"lunes":{"inicio":"09:00","fin":"18:00","descanso":[{"inicio":"14:30","fin":"15:00"}]},"martes":{"inicio":"09:00","fin":"18:00","descanso":[{"inicio":"14:30","fin":"15:00"}]},"miercoles":{"inicio":"09:00","fin":"18:00","descanso":[{"inicio":"14:30","fin":"15:00"}]},"jueves":{"inicio":"09:00","fin":"18:00","descanso":[{"inicio":"14:30","fin":"15:00"}]},"viernes":{"inicio":"09:00","fin":"18:00","descanso":[{"inicio":"14:30","fin":"15:00"}]},"sabado":null,"domingo":null}'
    );