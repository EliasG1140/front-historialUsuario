import {
  InfoCircleOutlined,
  LockOutlined,
  PlusCircleOutlined,
  SyncOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { useGet } from "@hooks";
import type { IGetUsers } from "@types";
import { capitalizeWords } from "@utils";
import {
  Badge,
  Button,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Select,
  Table,
  Tooltip,
  type MenuProps,
  type TableProps,
} from "antd";
import { useMemo, type FC } from "react";

interface CustomRowProps {
  record: IGetUsers;
  children: React.ReactNode;
}

const CustomRow: FC<
  CustomRowProps & React.HTMLAttributes<HTMLTableRowElement>
> = ({ record, children, ...restProps }) => {
  const { toggleUsuario, recoveryUsuario, changeRoleUsuario } = useGet();

  //* ---------------------------------- Memo ---------------------------------- */
  const menuProps = useMemo<MenuProps>(() => {
    const items: MenuProps["items"] = [
      {
        key: "role",
        label: `Rol: ${record?.rolName}`,
        type: "group",
      },
      {
        key: "title",
        label: `${capitalizeWords(record?.nombre)} (${record?.userName})`,
        type: "group",
      },
      {
        type: "divider",
      },
      {
        key: "0",
        label: "Cambiar rol",
        type: "submenu",
        children: [
          record?.rolName === "Administrador"
            ? {
                label: "Digitalizador",
                key: "change-to-digitalizador",
                onClick: () => {
                  changeRoleUsuario({ id: record.id, roleId: "Digitalizador" });
                },
              }
            : {
                label: "Administrador",
                key: "change-to-administrador",
                onClick: () => {
                  changeRoleUsuario({ id: record.id, roleId: "Administrador" });
                },
              },
        ],
      },
      {
        key: "1",
        label: "Restablecer contraseña",
        danger: true,
        icon: <SyncOutlined />,
        onClick: () => {
          recoveryUsuario(record.id);
        },
      },
    ];

    if (record?.inactivo) {
      items.splice(3, 0, {
        key: "3",
        label: "Desbloquear",
        icon: <UnlockOutlined />,
        onClick: () => {
          toggleUsuario(record.id);
        },
      });
    } else {
      items.splice(3, 0, {
        key: "2",
        label: "Bloquear",
        danger: true,
        icon: <LockOutlined />,
        onClick: () => {
          toggleUsuario(record.id);
        },
      });
    }

    return {
      items,
      onClick: ({ key }) => {
        console.log(`Acción ${key} para:`, record);
      },
    };
  }, [record]);

  return (
    <Dropdown menu={menuProps} trigger={["contextMenu", "click"]}>
      <tr
        {...restProps}
        className="hover:cursor-pointer hover:bg-[#fafafa] duration-300 ease-in-out"
      >
        {children}
      </tr>
    </Dropdown>
  );
};

export const Usuarios = () => {
  /* ---------------------------------- Hook ---------------------------------- */
  const { usuarios, addUsuario } = useGet();

  /* ---------------------------------- Form ---------------------------------- */
  const [form] = Form.useForm();

  /* --------------------------------- Handle --------------------------------- */
  const onSubmit = (values: any) => {
    const payload = { ...values, cedula: String(values.cedula) };
    addUsuario(payload).then(() => {
      form.resetFields();
    });
  };

  /*  const handleFillForm = (record: any) => {
    form.setFieldsValue({
      nombre: record.nombre,
      mesas: record.cantidadMesas,
    });
    setSelectItem(record);
    setIsEdit(true);
  }; */

  /*  const handleCancelEdit = () => {
    setIsEdit(false);
    setSelectItem(null);
    form.resetFields();
  }; */

  /*  const handleDelete = (record: any) => {
    const id = record.id;
    removePuestoVotacion(id);
  }; */

  /* ---------------------------------- Table --------------------------------- */
  const tableProps: TableProps<any> = {
    size: "middle",
    rowKey: "id",
    bordered: true,
    onRow: (record) => ({
      onContextMenu: (event) => event.preventDefault(), // Evita el menú contextual por defecto del navegador
      record, // Se pasa el record al CustomRow sin tocar el DOM
    }),
    components: {
      body: {
        row: CustomRow,
      },
    },
    columns: [
      {
        title: (
          <Tooltip title="Haz clic derecho sobre una fila para ver más opciones.">
            <InfoCircleOutlined className="text-blue-cc" />
          </Tooltip>
        ),
        width: 1,
        render: (_, { inactivo }) => (
          <Badge status={inactivo ? "error" : "success"} />
        ),
      },
      {
        title: "Nombre de usuario",
        dataIndex: "userName",
        key: "userName",
      },
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
      },
      {
        title: "Apellido",
        dataIndex: "apellido",
        key: "apellido",
      },
      {
        title: "Rol",
        dataIndex: "rolName",
        key: "rolName",
      },
    ],
    pagination: {
      total: usuarios?.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
      defaultCurrent: 1,
      defaultPageSize: 20,
      showSizeChanger: true,
      pageSizeOptions: [20, 30],
      placement: ["bottomEnd"],
    },
    dataSource: usuarios,
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2 className="font-semibold text-blue-500 text-xl">Usuarios</h2>
      <Form
        layout="vertical"
        className="grid grid-cols-5 gap-2"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="Nombre del usuario"
          name="username"
          rules={[{ required: true, message: "Campo requerido." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Campo requerido." }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Cedula"
          name="cedula"
          rules={[{ required: true, message: "Campo requerido." }]}
        >
          <InputNumber
            className="w-full!"
            min={0}
            precision={0}
            inputMode="numeric"
          />
        </Form.Item>

        <Form.Item
          label="Rol"
          name="Role"
          rules={[{ required: true, message: "Campo requerido." }]}
        >
          <Select
            options={[
              {
                label: "Administrador",
                value: "Administrador",
              },
              {
                label: "Digitalizador",
                value: "Digitalizador",
              },
            ]}
          />
        </Form.Item>

        <div className="flex gap-2">
          <Form.Item label=" ">
            <Button
              type="primary"
              icon={<PlusCircleOutlined />}
              htmlType="submit"
            >
              Agregar
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Table {...tableProps} />
    </div>
  );
};
