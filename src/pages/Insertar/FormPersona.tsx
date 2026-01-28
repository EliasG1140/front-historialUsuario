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
import { useEffect, useState } from "react";
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
  const isCoordinador = Form.useWatch("esCoordinador", form);
  const puestoVotacionWatch = Form.useWatch("puestoVotacion", form);
  const mesaVotacionWatch = Form.useWatch("mesaVotacion", form);

  // Persona normal: no es líder ni coordinador
  const isPersonaNormal = !isLider && !isCoordinador;

  /* ---------------------------------- Hook ---------------------------------- */
  const {
    puestovotacion,
    barrios,
    lenguas,
    codigosB,
    codigosC,
    mesasVotacion,
    lideres,
    coordinadores,
  } = useGet(puestoVotacionWatch);

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    form.setFieldValue("mesaVotacion", null);
  }, [puestoVotacionWatch]);

  // Si es líder, limpiar campo líder y desmarcar coordinador
  useEffect(() => {
    if (isLider) {
      form.setFieldValue("lider", null);
      form.setFieldValue("esCoordinador", false);
    }
  }, [isLider]);

  // Si es coordinador, limpiar campo coordinador y desmarcar líder
  useEffect(() => {
    if (isCoordinador) {
      form.setFieldValue("coordinador", null);
      form.setFieldValue("esLider", false);
      form.setFieldValue("lider", null); // Un coordinador no debe tener líder
    }
  }, [isCoordinador]);

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
      <Form.Item className="mb-0!" name="familia" label="Familia">
        <Input />
      </Form.Item>

      <Form.Item className="mb-0!" name="telefono" label="Telefono">
        <Input maxLength={10} />
      </Form.Item>
      <Form.Item className="mb-0!" name="apodo" label="Apodo">
        <Input />
      </Form.Item>
      <Form.Item className="mb-0!" label="Ubicacion">
        <Space.Compact block>
          <Form.Item className="mb-0! w-[50%]" name="barrio">
            <Select
              showSearch={{ optionFilterProp: "label" }}
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
          showSearch={{ optionFilterProp: "label" }}
          options={dataToSelectOptions(lenguas ?? [], "id", "nombre")}
          placeholder="Seleccione una o varias lenguas"
          mode="multiple"
          allowClear
        />
      </Form.Item>

      <Form.Item label="Puesto de votacion" className="mb-0!">
        <Space.Compact block>
          <Form.Item className="mb-0! w-[90%]" name="puestoVotacion">
            <Select
              showSearch={{ optionFilterProp: "label" }}
              placeholder="Seleccione un puesto de votacion"
              options={dataToSelectOptions(
                puestovotacion ?? [],
                "id",
                "nombre",
              )}
            />
          </Form.Item>
          <Form.Item className="mb-0! w-[10%]">
            <Button
              icon={<CloseOutlined />}
              className="w-full!"
              disabled={!puestoVotacionWatch}
              onClick={() =>
                form.setFieldsValue({
                  puestoVotacion: null,
                  mesasVotacion: null,
                })
              }
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item label="Mesa de votacion" className="mb-0!">
        <Space.Compact block>
          <Form.Item
            {...(puestoVotacionWatch && {
              rules: [{ required: true, message: "Campo requerido." }],
            })}
            className="mb-0! w-[90%]"
            name="mesaVotacion"
          >
            <Select
              showSearch={{ optionFilterProp: "label" }}
              placeholder="Seleccione una mesa de votacion"
              disabled={!puestoVotacionWatch}
              options={dataToSelectOptions(mesasVotacion ?? [], "id", "nombre")}
            />
          </Form.Item>
          <Form.Item className="mb-0! w-[10%]">
            <Button
              icon={<CloseOutlined />}
              className="w-full!"
              disabled={!mesaVotacionWatch}
              onClick={() =>
                form.setFieldsValue({
                  mesaVotacion: null,
                })
              }
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: "Campo requerido." }]}
        className="mb-0!"
        name="codigoc"
        label="Codigo C"
      >
        <Select
          showSearch={{ optionFilterProp: "label" }}
          options={dataToSelectOptions(codigosC ?? [], "id", "nombre")}
          placeholder="Seleccione un codigo C"
        />
      </Form.Item>
      <Form.Item className="mb-0!" name="codigob" label="Codigo B">
        <Select
          showSearch={{ optionFilterProp: "label" }}
          options={dataToSelectOptions(codigosB ?? [], "id", "nombre")}
          placeholder="Seleccione uno o varios codigo B"
          mode="multiple"
          allowClear
        />
      </Form.Item>

      {/* Coordinador asignado */}
      <Form.Item
        rules={[
          {
            required: isLider || isPersonaNormal,
            message: "Campo requerido.",
          },
        ]}
        className="mb-0!"
        name="coordinador"
        label="Coordinador asignado"
      >
        <Select
          showSearch={{ optionFilterProp: "label" }}
          placeholder="Seleccione un coordinador asignado"
          disabled={isCoordinador}
          options={dataToSelectOptions(coordinadores ?? [], "id", "nombre")}
        />
      </Form.Item>
      {/* Líder asignado */}
      <Form.Item
        rules={[
          {
            required: isPersonaNormal,
            message: "Campo requerido.",
          },
        ]}
        className="mb-0!"
        name="lider"
        label="Lider asignado"
      >
        <Select
          showSearch={{ optionFilterProp: "label" }}
          placeholder="Seleccione un lider asignado"
          disabled={isLider || isCoordinador}
          options={dataToSelectOptions(lideres ?? [], "id", "nombre")}
        />
      </Form.Item>

      <div className="flex justify-around">
        <Form.Item
          className="mb-0!"
          name="esLider"
          label="Es Lider ?"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox className="scale-150" disabled={isCoordinador} />
        </Form.Item>
        <Form.Item
          className="mb-0!"
          name="esCoordinador"
          label="Es Coordinador ?"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox className="scale-150" disabled={isLider} />
        </Form.Item>
      </div>
      <Form.Item
        className="mb-0! col-span-2"
        name="descripcion"
        label="Descripcion"
      >
        <Input.TextArea />
      </Form.Item>
      <div className="flex justify-around">
        <Form.Item
          className="mb-0!"
          name="verfAdres"
          label="Verificación ADRES"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox className="scale-150" />
        </Form.Item>
        <Form.Item
          className="mb-0!"
          name="verfPuestoVotacion"
          label="Verificación Puesto de votación"
          valuePropName="checked"
          initialValue={false}
        >
          <Checkbox className="scale-150" />
        </Form.Item>
      </div>
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
