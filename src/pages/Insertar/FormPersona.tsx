import {
  CloseOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useGet } from "@hooks";
import { dataToSelectOptions } from "@utils";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";

interface IFormPersonaProps {
  edit?: boolean;
  data?: any;
}

export const FormPersona = ({ edit, data }: IFormPersonaProps) => {
  const navigate = useNavigate();

  /* ---------------------------------- Form ---------------------------------- */
  const form = Form.useFormInstance();

  /* ---------------------------------- State --------------------------------- */
  const [isEdit, setIsEdit] = useState(!!edit);

  /* ---------------------------------- Watch --------------------------------- */
  const isLider = Form.useWatch("esLider", form);
  const puestoVotacionWatch = Form.useWatch("puestoVotacion", form);

  /* ---------------------------------- Hook ---------------------------------- */
  const {
    puestovotacion,
    barrios,
    lenguas,
    codigosB,
    codigosC,
    mesasVotacion,
    listLideres,
  } = useGet(puestoVotacionWatch);

  /* ---------------------------------- Memo ---------------------------------- */
  const lideres = useMemo(() => {
    const data = listLideres ?? [];
    return data.map((lider) => ({
      ...lider,
      nombreCompleto: `${lider.nombre} ${lider.apellido}${
        lider.apodo ? ` (${lider.apodo})` : ""
      }`,
    }));
  }, [listLideres]);

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    form.setFieldValue("mesaVotacion", null);
  }, [puestoVotacionWatch]);

  useEffect(() => {
    if (isLider) {
      form.setFieldValue("lider", null);
    }
  }, [isLider]);

  useEffect(() => {
    if (isEdit && data) {
      if (puestoVotacionWatch) {
        form.setFieldValue("mesaVotacion", data.mesaVotacion?.id);
        setIsEdit(false);
      }
    }
  }, [isEdit, data, puestoVotacionWatch]);

  return (
    <>
      <Form.Item
        rules={[{ required: true, message: "Campo requerido." }]}
        className="mb-0!"
        name="cedula"
        label="Cedula"
      >
        <InputNumber
          className="w-full!"
          min={0}
          max={9999999999}
          precision={0}
          inputMode="numeric"
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Campo requerido." }]}
        className="mb-0!"
        name="nombre"
        label="Nombre"
      >
        <Input />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Campo requerido." }]}
        className="mb-0!"
        name="apellido"
        label="Apellido"
      >
        <Input />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Campo requerido." }]}
        className="mb-0!"
        name="telefono"
        label="Telefono"
      >
        <Input maxLength={10} />
      </Form.Item>
      <Form.Item className="mb-0!" name="apodo" label="Apodo">
        <Input />
      </Form.Item>
      <Form.Item className="mb-0!" label="Ubicacion">
        <Space.Compact block>
          <Form.Item className="mb-0! w-[50%]" name="barrio">
            <Select
              options={dataToSelectOptions(barrios ?? [], "id", "nombre")}
              placeholder="Seleccione un barrio"
            />
          </Form.Item>

          <Form.Item className="mb-0! w-[50%]" name="direccion">
            <Input placeholder="Direccion" />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Form.Item className="mb-0!" name="lengua" label="Lengua">
        <Select
          options={dataToSelectOptions(lenguas ?? [], "id", "nombre")}
          placeholder="Seleccione una o varias lenguas"
          mode="multiple"
          allowClear
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Campo requerido." }]}
        className="mb-0!"
        name="puestoVotacion"
        label="Puesto de votacion"
      >
        <Select
          placeholder="Seleccione un puesto de votacion"
          options={dataToSelectOptions(puestovotacion ?? [], "id", "nombre")}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Campo requerido." }]}
        className="mb-0!"
        name="mesaVotacion"
        label="Mesa de votacion"
      >
        <Select
          placeholder="Seleccione una mesa de votacion"
          disabled={!puestoVotacionWatch}
          options={dataToSelectOptions(mesasVotacion ?? [], "id", "nombre")}
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: "Campo requerido." }]}
        className="mb-0!"
        name="codigoc"
        label="Codigo C"
      >
        <Select
          options={dataToSelectOptions(codigosC ?? [], "id", "nombre")}
          placeholder="Seleccione un codigo C"
        />
      </Form.Item>
      <Form.Item className="mb-0!" name="codigob" label="Codigo B">
        <Select
          options={dataToSelectOptions(codigosB ?? [], "id", "nombre")}
          placeholder="Seleccione uno o varios codigo B"
          mode="multiple"
          allowClear
        />
      </Form.Item>
      <Form.Item
        rules={[{ required: !isLider, message: "Campo requerido." }]}
        className="mb-0!"
        name="lider"
        label="Lider asignado"
      >
        <Select
          showSearch={{ optionFilterProp: "label" }}
          placeholder="Seleccione un lider asignado"
          disabled={isLider}
          options={dataToSelectOptions(lideres ?? [], "id", "nombre", false, {
            combineLabel: true,
            separator: " - ",
            keys: ["cedula", "nombreCompleto"],
          })}
        />
      </Form.Item>
      <Form.Item
        className="mb-0!"
        name="esLider"
        label="Es lider?"
        valuePropName="checked"
        initialValue={false}
      >
        <Checkbox className="scale-150" />
      </Form.Item>
      <Form.Item
        className="mb-0! col-span-2"
        name="descripcion"
        label="Descripcion"
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item className="mb-0! col-span-3 flex justify-end">
        <div className="flex gap-2">
          {isEdit && (
            <Form.Item label=" ">
              <Button
                type="primary"
                danger
                icon={<CloseOutlined />}
                onClick={() => navigate("/home/consultar")}
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
      </Form.Item>
    </>
  );
};
