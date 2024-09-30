import { useState } from "react";
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
} from "@nextui-org/react";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.jpg";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { modulo: "Calendario", to: "/panel" },
    { modulo: "Clientes", to: "/panel/clientes" },
    { modulo: "Servicios", to: "/panel/servicios" },
    { modulo: "Usuarios", to: "/panel/usuarios" },
  ];

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
          <NavbarItem>
            <Link color="foreground" to={"/panel/clientes"} aria-current="page">
              Clientes
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to={"/panel/servicios"}>
              Servicios
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to={"/panel/usuarios"}>
              Usuarios
            </Link>
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
                  description="@tonyreichert"
                  name="Tony Reichert"
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
                <DropdownItem key="configurations">
                  <Link
                    style={{ padding: "0 100% 0 0" }}
                    color="foreground"
                    to={"/panel/configuraciones"}
                  >
                    Configuraciones
                  </Link>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <Link
                    style={{ padding: "0 100% 0 0" }}
                    color="foreground"
                    to={"/panel/perfil"}
                  >
                    Cerrar sesion
                  </Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
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
