import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useGet } from "@hooks";
import { Button, Form, Input, Table, type TableProps } from "antd";
import { useState } from "react";

export const Barrios = () => {
  /* --------------------------------- States --------------------------------- */
  const [isEdit, setIsEdit] = useState(false);
  const [selectItem, setSelectItem] = useState<any>(null);

  /* ---------------------------------- Hook ---------------------------------- */
  const { barrios, updateBarrio, addBarrio, removeBarrio } = useGet();

  /* ---------------------------------- Form ---------------------------------- */
  const [form] = Form.useForm();

  /* --------------------------------- Handle --------------------------------- */
  const onSubmit = (values: any) => {
    if (isEdit) {
      updateBarrio({ id: selectItem.id, ...values }).then(() => {
        setIsEdit(false);
        setSelectItem(null);
        form.resetFields();
      });
    } else {
      addBarrio(values).then(() => {
        form.resetFields();
      });
    }
  };

  const handleFillForm = (record: any) => {
    form.setFieldsValue({
      nombre: record.nombre,
    });
    setSelectItem(record);
    setIsEdit(true);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
    setSelectItem(null);
    form.resetFields();
  };

  const handleDelete = (record: any) => {
    const id = record.id;
    removeBarrio(id);
  };
  /* ---------------------------------- Table --------------------------------- */
  const tableProps: TableProps<any> = {
    size: "middle",
    rowKey: "id",
    bordered: true,
    columns: [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Nombre",
        dataIndex: "nombre",
        key: "nombre",
      },
      {
        title: "Acciones",
        key: "acciones",
        width: 80,
        render: (_, record) => (
          <div className="flex gap-2">
            <Button
              type="link"
              size="small"
              className="p-0"
              disabled={isEdit}
              onClick={() => handleFillForm(record)}
            >
              <EditOutlined />
            </Button>
            <Button
              type="link"
              danger
              size="small"
              className="p-0"
              disabled={isEdit}
              onClick={() => handleDelete(record)}
            >
              <DeleteOutlined />
            </Button>
          </div>
        ),
      },
    ],
    pagination: {
      total: barrios?.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
      defaultCurrent: 1,
      defaultPageSize: 20,
      showSizeChanger: true,
      pageSizeOptions: [20, 30],
      position: ["bottomRight"],
    },
    dataSource: barrios,
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2 className="font-semibold text-blue-500 text-xl">Barrios</h2>
      <Form
        layout="vertical"
        className="grid grid-cols-2 gap-2"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="Nombre del barrio"
          name="nombre"
          rules={[{ required: true, message: "Campo requerido." }]}
        >
          <Input />
        </Form.Item>

        <div className="flex gap-2">
          {isEdit && (
            <Form.Item label=" ">
              <Button
                type="primary"
                danger
                icon={<CloseOutlined />}
                onClick={handleCancelEdit}
              >
                Cancelar
              </Button>
            </Form.Item>
          )}
          <Form.Item label=" ">
            <Button
              type="primary"
              icon={isEdit ? <EditOutlined /> : <PlusCircleOutlined />}
              htmlType="submit"
            >
              {isEdit ? "Actualizar" : "Agregar"}
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Table {...tableProps} />
    </div>
  );
};
