import { Form } from "antd";
import { FormPersona } from "./FormPersona";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getPersonaById } from "@api";
import type { IGetPersonaById } from "@types";
import { useGet } from "@hooks";
import { notify } from "@utils";

export const EditPersona = () => {
  /* ---------------------------------- Hook ---------------------------------- */
  const { id } = useParams();
  const navigate = useNavigate();
  const { updatePersona } = useGet();

  /* ---------------------------------- State --------------------------------- */
  const [data, setData] = useState<IGetPersonaById>();

  /* ---------------------------------- Form ---------------------------------- */
  const [form] = Form.useForm();

  /* --------------------------------- Handle --------------------------------- */
  const onSubmit = (values: any) => {
    const payload = {
      ...values,
      id: data?.id,
      cedula: String(values.cedula),
      apodo: values?.apodo || null,
      descripcion: values?.descripcion || null,
      lider: values?.lider || null,
      barrio: values?.barrio || null,
    };
    if (values.codigob?.length !== 0) {
      payload.codigob = values.codigob;
    } else {
      payload.codigob = null;
    }

    if(values.lengua?.length !== 0) {
      payload.lengua = values.lengua;
    } else {
      payload.lengua = null;
    }

    updatePersona(payload)
      .then(() => {
        notify.success("Persona actualizada con éxito");
        navigate("/home/consultar");
      })
      .catch((error: any) => {
        const {
          response: {
            data: { title },
          },
        } = error;
        notify.error(title ?? "Error al actualizar la persona");
      });
  };

  const fillForm = (values: IGetPersonaById) => {
    form.setFieldsValue({
      ...values,
      barrio: values.barrioId,
      lengua: values.lenguasIds,
      puestoVotacion: values.mesaVotacion?.puestoVotacion.id,
      mesaVotacion: values.mesaVotacion?.id,
      codigoc: values?.codigoCId,
      codigob: values?.codigosBIds,
      lider: values?.liderId,
      esLider: values?.isLider,
    });
  };

  useEffect(() => {
    getPersonaById(Number(id ?? 0)).then((res) => {
      setData(res);
      fillForm(res);
    });
  }, [id]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2 className="font-semibold text-blue-500 text-xl">Formulario</h2>
      <Form
        layout="vertical"
        form={form}
        className="grid grid-cols-3 gap-4"
        onFinish={onSubmit}
      >
        <div className="col-span-3 flex flex-col">
          <p className="text-gray-600">
            Fecha de creacion:{" "}
            {new Date(data?.createdAt ?? "").toLocaleString()} por{" "}
            {data?.createdBy}
          </p>
          {data?.lastModifiedAt && (
            <p className="text-gray-600">
              Ultima modificación:{" "}
              {new Date(data?.lastModifiedAt ?? "").toLocaleString()} por{" "}
              {data?.lastModifiedBy}
            </p>
          )}
        </div>
        <FormPersona edit={true} data={data} />
      </Form>
    </div>
  );
};
