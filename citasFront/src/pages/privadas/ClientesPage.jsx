import { useEffect, useState, useMemo, useCallback, useContext } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  User,
  Pagination,
  Tooltip,
} from "@nextui-org/react";

import { SearchIcon } from "../../components/icons/SearchIcon";
import { ChevronDownIcon } from "../../components/icons/ChevronDownIcon";
import { EyeIcon } from "../../components/icons/EyeIcon";
import { obtenerClientes } from "../../services/usuarios";

import { toast, ToastContainer } from "react-toastify";

import dayjs from "dayjs";
import ModalCliente from "../../components/modalCliente";
import { AuthContext } from "../../context/authProvider";
import { useNavigate } from "react-router-dom";

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "FECHA CREACION", uid: "fecha_creacion", sortable: true },
  { name: "NOMBRE", uid: "nombre", sortable: true },
  { name: "APELLIDO", uid: "apellido" },
  { name: "EMAIL", uid: "email" },
  { name: "TELEFONO", uid: "telefono", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "id",
  "fecha_creacion",
  "nombre",
  "apellido",
  "email",
  "telefono",
  "actions",
];

export default function ClientesPage() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState({});

  // para mostrar modal
  const [verModalCliente, setVerModalCliente] = useState(false);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  async function getClientes() {
    const data = await obtenerClientes();

    if (!data.ocurrioError) {
      setClientes(data.resultado);
      return;
    }

    toast.error(data.mensaje);
  }

  useEffect(() => {
    if (user?.rol !== "ADMIN") return navigate("/panel");
    getClientes();
  }, []);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...clientes];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.nombre.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [clientes, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback(
    (cliente, columnKey) => {
      const cellValue = cliente[columnKey];

      switch (columnKey) {
        case "nombre":
          return (
            <User
              avatarProps={{ radius: "lg", src: cliente.avatar }}
              description={cliente.email}
              name={cellValue}
            ></User>
          );
        case "fecha_creacion":
          return dayjs(cellValue, { locale: "es-us" }).format(
            "dddd D [de] MMMM [del] YYYY [a las] h:mm A"
          );
        case "actions":
          return (
            <div className="relative flex justify-center gap-2">
              <Tooltip content="Ver detalle">
                <Button
                  onClick={() => {
                    setCliente(cliente);
                    setVerModalCliente(!verModalCliente);
                  }}
                  className="text-lg text-default-400 bg-transparent cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </Button>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [verModalCliente]
  );

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown></Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {clientes.length} clientes
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por pagina:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    visibleColumns,
    onRowsPerPageChange,
    clientes.length,
    onSearchChange,
    onClear,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Todos los elementos seleccionados"
            : `${selectedKeys.size} de ${filteredItems.length} seleccionados`}
        </span>
        {filteredItems.length > 0 && clientes.length > 0 && (
          <>
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages == 0 ? 1 : pages}
              onChange={setPage}
            />
            <div className="hidden sm:flex w-[30%] justify-end gap-2">
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onPreviousPage}
              >
                Anterior
              </Button>
              <Button
                isDisabled={pages === 1}
                size="sm"
                variant="flat"
                onPress={onNextPage}
              >
                Siguiente
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }, [
    selectedKeys,
    page,
    pages,
    filteredItems.length,
    onNextPage,
    onPreviousPage,
    clientes.length,
  ]);

  return (
    <>
      <ToastContainer />
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[700px]",
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No se encontraron registros"}
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalCliente
        isOpen={verModalCliente}
        setOpenChange={setVerModalCliente}
        cliente={cliente}
      />
    </>
  );
}
