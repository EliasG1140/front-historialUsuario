import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useGet } from "@hooks";
import { Button, Form, Input, InputNumber, Table, type TableProps } from "antd";
import { useState } from "react";

export const Categoria = () => {
  /* --------------------------------- States --------------------------------- */
  const [isEdit, setIsEdit] = useState(false);
  const [selectItem, setSelectItem] = useState<any>(null);

  /* ---------------------------------- Hook ---------------------------------- */
  const { categorias, updateCategoria, addCategoria, removeCategoria } =
    useGet();

  /* ---------------------------------- Form ---------------------------------- */
  const [form] = Form.useForm();

  /* --------------------------------- Handle --------------------------------- */
  const onSubmit = (values: any) => {
    if (isEdit) {
      updateCategoria({ id: selectItem.id, ...values }).then(() => {
        setIsEdit(false);
        setSelectItem(null);
        form.resetFields();
      });
    } else {
      addCategoria(values).then(() => {
        form.resetFields();
      });
    }
  };

  const handleFillForm = (record: any) => {
    form.setFieldsValue({
      nombre: record.nombre,
      minimo: record.minimo,
      maximo: record.maximo,
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
    removeCategoria(id);
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
        title: "Minimo",
        dataIndex: "minimo",
        key: "minimo",
      },
      {
        title: "Máximo",
        dataIndex: "maximo",
        key: "maximo",
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
      total: categorias?.length,
      showTotal: (total, range) => `${range[0]}-${range[1]} de ${total}`,
      defaultCurrent: 1,
      defaultPageSize: 20,
      showSizeChanger: true,
      pageSizeOptions: [20, 30],
      position: ["bottomRight"],
    },
    dataSource: categorias,
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2 className="font-semibold text-blue-500 text-xl">Categoría</h2>
      <Form
        layout="vertical"
        className="grid grid-cols-6 gap-2"
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="Nombre de la categoría"
          name="nombre"
          rules={[{ required: true, message: "Campo requerido." }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Minimo"
          name="minimo"
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
          label="Máximo"
          name="maximo"
          rules={[{ required: true, message: "Campo requerido." }]}
        >
          <InputNumber
            className="w-full!"
            min={0}
            precision={0}
            inputMode="numeric"
          />
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
