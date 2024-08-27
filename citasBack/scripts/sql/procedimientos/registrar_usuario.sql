CREATE OR ALTER PROCEDURE registrar_usuario (
@nombre VARCHAR(20),
@apellido VARCHAR(20),
@correo VARCHAR(30),
@contraseña VARCHAR(60)
)
AS
BEGIN
    IF EXISTS (SELECT id FROM usuarios WHERE correo = @correo)
	BEGIN
		SELECT 1 usuarioExistente
		RETURN
	END

	INSERT INTO usuarios (nombre, apellido, correo, contraseña)
		VALUES (@nombre, @apellido, @correo, @contraseña)
	
	SELECT id, nombre, apellido, correo FROM usuarios WHERE correo = @correo
END

