CREATE OR ALTER PROCEDURE login_usuario (
@correo VARCHAR(30)
)
AS
BEGIN
	IF NOT EXISTS (SELECT id FROM usuarios WHERE correo = @correo)
	BEGIN
		SELECT 0 usuarioExistente
		RETURN
	END
	
	SELECT id, nombre, apellido, correo, contraseña FROM usuarios WHERE correo = @correo
END