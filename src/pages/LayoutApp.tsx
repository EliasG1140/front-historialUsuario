import { Outlet, useLocation, useNavigate } from "react-router";
import { Avatar, Dropdown, Menu, type MenuProps } from "antd";
import {
  DatabaseOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useUserStore } from "@stores";
import { useMemo } from "react";

const menuKeys = [
  "home",
  "barrios",
  "lengua",
  "codigo-c",
  "codigo-b",
  "puesto-votacion",
  "categoria",
  "lideres",
  "insertar",
  "consultar",
  "usuarios",
];

export const LayoutApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore((state) => state.user);

  /* ------------------------------ Menú usuario ------------------------------ */
  const userMenu = useMemo(() => {
    const result: MenuProps["items"] = [
      {
        key: "name",
        label: `${user?.nombre} ${user?.apellido}`,
        disabled: true,
      },
      {
        key: "cedula",
        label: `Cedula: ${user?.cedula}`,
        disabled: true,
      },
      {
        key: "rol",
        label: `Rol: ${user?.rolName}`,
        disabled: true,
      },
      { type: "divider" },
      {
        key: "termino",
        label: "Términos y condiciones",
        onClick: () => navigate("/home/terminos"),
      },
      {
        key: "logout",
        label: "Cerrar sesión",
        danger: true,
        onClick: () => {
          useUserStore.getState().clearUser();
          navigate("/");
        },
      },
    ];
    return result;
  }, [user, navigate]);

  /* ---------------------------------- Menu ---------------------------------- */
  const getMenuItemsByRole = (rolName: string | undefined) => {
    if (rolName === "Administrador") {
      return [
        {
          label: "Home",
          key: menuKeys[0],
          icon: <HomeOutlined />,
        },
        {
          label: "Insertar / Editar",
          key: menuKeys[8],
          icon: <PlusCircleOutlined />,
        },
        {
          label: "Consulta",
          key: menuKeys[9],
          icon: <SearchOutlined />,
        },
        {
          label: "Data",
          key: "data",
          icon: <DatabaseOutlined />,
          children: [
            { label: "Barrios", key: menuKeys[1] },
            { label: "Lengua", key: menuKeys[2] },
            { label: "Codigo C", key: menuKeys[3] },
            { label: "Codigo B", key: menuKeys[4] },
            { label: "Puesto de votacion", key: menuKeys[5] },
            { label: "Categoria", key: menuKeys[6] },
          ],
        },
        {
          label: "Usuarios",
          key: menuKeys[10],
          icon: <UserOutlined />,
        },
      ];
    }
    if (rolName === "Digitalizador") {
      return [
        {
          label: "Home",
          key: menuKeys[0],
          icon: <HomeOutlined />,
        },
        {
          label: "Insertar / Editar",
          key: menuKeys[8],
          icon: <PlusCircleOutlined />,
        },
        {
          label: "Consulta",
          key: menuKeys[9],
          icon: <SearchOutlined />,
        },
      ];
    }

    /* ---------------------------------- Prod ---------------------------------- */
    return [
      {
        label: "Home",
        key: menuKeys[0],
        icon: <HomeOutlined />,
      },
    ];

    /* ----------------------------------- Dev ---------------------------------- */
    /* return [
      {
        label: "Home",
        key: menuKeys[0],
        icon: <HomeOutlined />,
      },
      {
        label: "Insertar / Editar",
        key: menuKeys[8],
        icon: <PlusCircleOutlined />,
      },
      {
        label: "Consulta",
        key: menuKeys[9],
        icon: <SearchOutlined />,
      },
      {
        label: "Data",
        key: "data",
        icon: <DatabaseOutlined />,
        children: [
          { label: "Barrios", key: menuKeys[1] },
          { label: "Lengua", key: menuKeys[2] },
          { label: "Codigo C", key: menuKeys[3] },
          { label: "Codigo B", key: menuKeys[4] },
          { label: "Puesto de votacion", key: menuKeys[5] },
          { label: "Categoria", key: menuKeys[6] },
        ],
      },
      {
        label: "Usuarios",
        key: menuKeys[10],
        icon: <UserOutlined />,
      },
    ]; */
  };

  const items: MenuProps["items"] = getMenuItemsByRole(user?.rolName);

  /* --------------------------------- Handle --------------------------------- */
  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "home") {
      navigate("/home");
    } else {
      navigate(e.key);
    }
  };

  const pathParts = location.pathname.split("/").filter(Boolean);
  let selectedKey = "home";

  if (pathParts.length > 1) {
    const isMenu = menuKeys.includes(pathParts[1]);
    if (isMenu) {
      selectedKey = pathParts[1];
    }
  }

  return (
    <div className="w-full max-w-7xl h-[900px] bg-white rounded-2xl shadow-lg relative">
      <Menu
        mode="horizontal"
        items={items}
        onClick={onClick}
        selectedKeys={[selectedKey]}
      />
      <div className="absolute right-0 top-0 px-4 py-2.5">
        <Dropdown
          menu={{ items: userMenu }}
          trigger={["click"]}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
        >
          <button className="flex items-center gap-2 ml-4 outline-none">
            <Avatar size="small" icon={<UserOutlined />} />
            <span className="font-medium">
              {user ? `${user.nombre} ${user.apellido}` : "Usuario"}
            </span>
          </button>
        </Dropdown>
      </div>
      <div className="w-full h-[854px] overflow-scroll px-8 pb-2 pt-4">
        <Outlet />
      </div>
    </div>
  );
};
