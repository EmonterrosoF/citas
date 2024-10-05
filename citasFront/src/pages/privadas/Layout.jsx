import { useContext, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  User,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
  Image,
  Button,
  divider,
} from "@nextui-org/react";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.jpg";
import { Outlet, Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { cerrarSesion } from "../../services/auth";
import { AuthContext } from "../../context/authProvider";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user } = useContext(AuthContext);

  const menuItems = [
    { modulo: "Calendario", to: "/panel" },
    { modulo: "Clientes", to: "/panel/clientes", rol: "ADMIN" },
    { modulo: "Servicios", to: "/panel/servicios", rol: "ADMIN" },
    { modulo: "Usuarios", to: "/panel/usuarios", rol: "ADMIN" },
    { modulo: "Bitacora de citas", to: "/panel/bitacoraCitas", rol: "ADMIN" },
  ];

  const navigate = useNavigate();

  const logout = async () => {
    const data = await toast.promise(cerrarSesion(), {
      pending: "Cargando...",
    });

    if (!data.ocurrioError) {
      navigate("/login");
    } else {
      toast.error(data.mensaje);
    }
  };

  return (
    <>
      <Navbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <Link to="/panel">
              <Image
                isZoomed
                isBlurred
                width={50}
                src={logo}
                alt="Logo"
                title="THE KING BARBER"
              />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarBrand>
            <Link to="/panel">
              <Image
                isZoomed
                isBlurred
                width={50}
                src={logo}
                alt="Logo"
                title="THE KING BARBER"
              />
            </Link>
          </NavbarBrand>
          <NavbarItem isActive>
            <Link color="foreground" to={"/panel"}>
              Calendario
            </Link>
          </NavbarItem>
          {user.rol === "ADMIN" && (
            <NavbarItem>
              <Link
                color="foreground"
                to={"/panel/clientes"}
                aria-current="page"
              >
                Clientes
              </Link>
            </NavbarItem>
          )}

          <NavbarItem>
            {user.rol === "ADMIN" && (
              <Link color="foreground" to={"/panel/servicios"}>
                Servicios
              </Link>
            )}
          </NavbarItem>
          <NavbarItem>
            {user.rol === "ADMIN" && (
              <Link color="foreground" to={"/panel/usuarios"}>
                Usuarios
              </Link>
            )}
          </NavbarItem>
          <NavbarItem>
            {user.rol === "ADMIN" && (
              <Link color="foreground" to={"/panel/bitacoraCitas"}>
                Bitacora de citas
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{
                    isBordered: true,
                    src: avatar,
                  }}
                  className="transition-transform"
                  description={`@${user.username}`}
                  name={`${user.nombre} ${user.apellido}`}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" color="primary">
                  <p className="font-bold">
                    <Link
                      style={{ padding: "0 100% 0 0" }}
                      color="foreground"
                      to={"/panel/perfil"}
                    >
                      Mi perfil
                    </Link>
                  </p>
                </DropdownItem>
                {user.rol === "ADMIN" && (
                  <DropdownItem key="configurations">
                    <Link
                      style={{ padding: "0 100% 0 0" }}
                      color="foreground"
                      to={"/panel/configuraciones"}
                    >
                      Configuraciones
                    </Link>
                  </DropdownItem>
                )}
                <DropdownItem key="logout" color="danger">
                  <Button
                    style={{ padding: "0 0 0 0", height: "20px" }}
                    color="foreground"
                    onClick={() => logout()}
                  >
                    Cerrar sesion
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems
            .filter((item) => !item.rol || item.rol === user.rol) // Filtrar elementos según el rol
            .map((item, index) => (
              <NavbarMenuItem key={`${item.modulo}-${index}`}>
                <Link
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full"
                  color={
                    index === 2
                      ? "warning"
                      : index === menuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  to={item.to}
                  size="lg"
                >
                  {item.modulo}
                </Link>
              </NavbarMenuItem>
            ))}
        </NavbarMenu>
      </Navbar>
      <main className="my-5">
        <Outlet />
      </main>
    </>
  );
}
