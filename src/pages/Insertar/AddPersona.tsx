import { Form } from "antd";
import { FormPersona } from "./FormPersona";
import { useGet } from "@hooks";
import { notify } from "@utils";
import { useState } from "react";

export const AddPersona = () => {
  /* ---------------------------------- Hook ---------------------------------- */
  const { addPersona } = useGet();

  /* ---------------------------------- State --------------------------------- */
  const [formPersonaKey, setFormPersonaKey] = useState(0);

  /* ---------------------------------- Form ---------------------------------- */
  const [form] = Form.useForm();

  /* --------------------------------- Handle --------------------------------- */
  const onSubmit = (values: any) => {
    const payload = {
      ...values,
      cedula: String(values.cedula),
      apodo: values?.apodo || null,
      descripcion: values?.descripcion || null,
      lider: values?.lider || null,
      barrio: values?.barrio || null,
      coordinador: values?.coordinador || null,
    };
    addPersona(payload)
      .then(() => {
        form.resetFields();
        setFormPersonaKey((prev) => prev + 1);
        notify.success("Persona agregada con éxito");
      })
      .catch((error: any) => {
        const {
          response: {
            data: { title },
          },
        } = error;
        notify.error(title ?? "Error al agregar la persona");
      });
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2 className="font-semibold text-blue-500 text-xl">Formulario</h2>
      <Form
        layout="vertical"
        onFinish={onSubmit}
        form={form}
        className="grid grid-cols-3 gap-4"
      >
        <FormPersona key={formPersonaKey} />
      </Form>
    </div>
  );
};
