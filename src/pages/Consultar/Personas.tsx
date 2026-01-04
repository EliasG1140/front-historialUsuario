import {
  DeleteOutlined,
  EditOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { getExportPersonas } from "@api";
import { useGet } from "@hooks";
import { usePersonasFilterStore, useUserStore } from "@stores";
import type { IGetPersona } from "@types";
import { dataToSelectOptions } from "@utils";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Table,
  type TableProps,
} from "antd";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

export const Personas = () => {
  const {
    liderId,
    puestoVotacionId,
    mesaVotacionId,
    clearFilters,
    categoriaId,
    onlyLider,
  } = usePersonasFilterStore();
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);

  /* ---------------------------------- Form ---------------------------------- */
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [form] = Form.useForm();
  const [filters, setFilters] = useState<any>({});
  const firstLoad = useRef(true);

  /* ---------------------------------- Watch --------------------------------- */
  const isLider = Form.useWatch("lideres", form);
  const puestoVotacionWatch = Form.useWatch("puestoVotacion", form);

  /* ---------------------------------- Hook ---------------------------------- */
  const {
    personas,
    mesasVotacion,
    puestovotacion,
    lideres,
    codigosC,
    codigosB,
    removePersona,
    categorias,
  } = useGet(puestoVotacionWatch, filters);
  /* --------------------------------- Handle --------------------------------- */
  const onSubmit = (values: any) => {
    setFilters({
      lider: values.lider || undefined,
      lideres: values.lideres || undefined,
      puestoVotacion: values.puestoVotacion || undefined,
      mesaVotacion: values.mesaVotacion || undefined,
      codigoC: values.codigoC || undefined,
      codigoB: values.codigoB || undefined,
      categoria: values.categoria || undefined,
    });
  };

  const getFilteredPersonas = () => {
    if (!debouncedSearch) return personas;
    const lowerSearch = debouncedSearch.toLowerCase();
    return (personas ?? []).filter(
      (p) =>
        p.nombre?.toLowerCase().includes(lowerSearch) ||
        p.apellido?.toLowerCase().includes(lowerSearch) ||
        p.cedula?.toString().toLowerCase().includes(lowerSearch)
    );
  };

  const handleDownloadExcel = async () => {
    const blob = await getExportPersonas(filters);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "personas.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  /* ---------------------------------- Table --------------------------------- */
  const tableProps: TableProps<IGetPersona> = {
    size: "middle",
    bordered: true,
    rowKey: "id",
    columns: [
      {
        title: "Cedula",
        dataIndex: "cedula",
        key: "cedula",
      },
      {
        title: "Nombres",
        dataIndex: "nombre",
        key: "nombre",
      },
      {
        title: "Apellidos",
        dataIndex: "apellido",
        key: "apellido",
      },
      {
        title: "Teléfono",
        dataIndex: "telefono",
        key: "telefono",
      },
      {
        title: "Apodo",
        dataIndex: "apodo",
        key: "apodo",
      },
      {
        title: "Barrio",
        dataIndex: "barrio",
        key: "barrio",
        render: (barrio: { id: number; nombre: string }) => barrio.nombre,
      },
      {
        title: "Direccion",
        dataIndex: "direccion",
        key: "direccion",
      },
      {
        title: "Lenguas",
        dataIndex: "lenguas",
        key: "lenguas",
        render: (lenguas: { id: number; nombre: string }[]) =>
          lenguas.map((l) => l.nombre).join(", "),
      },
      {
        title: "Puesto de votación",
        key: "puestoVotacion",
        render: (_, record) => record?.mesaVotacion?.puestoVotacion?.nombre,
      },
      {
        title: "Mesa",
        dataIndex: "mesaVotacion",
        key: "mesaVotacion",
        render: (mesaVotacion: { id: number; nombre: string }) =>
          mesaVotacion?.nombre,
      },
      {
        title: "Codigos C",
        dataIndex: "codigoC",
        key: "codigoC",
        render: (codigosC: { id: number; nombre: string }) => codigosC.nombre,
      },
      {
        title: "Codigos B",
        dataIndex: "codigosB",
        key: "beneficios",
        render: (codigosB: { id: number; nombre: string }[]) =>
          codigosB.map((e) => e.nombre).join(", "),
      },
      {
        title: "Descripcion",
        dataIndex: "descripcion",
        key: "descripcion",
      },
      {
        render: (_, record) => (
          <div className="flex gap-2">
            <Button
              type="link"
              size="small"
              className="p-0!"
              onClick={() => navigate(`/home/insertar/${record.id}`)}
            >
              <EditOutlined />
            </Button>
            {user?.rolName === "Administrador" && (
              <Button
                type="link"
                danger
                size="small"
                className="p-0!"
                onClick={() => removePersona(record.id)}
              >
                <DeleteOutlined />
              </Button>
            )}
          </div>
        ),
      },
    ],
    pagination: false,
    dataSource: getFilteredPersonas(),
  };

  /* --------------------------------- Effects -------------------------------- */
  useEffect(() => {
    form.setFieldValue("mesaVotacion", null);
  }, [puestoVotacionWatch]);

  useEffect(() => {
    if (isLider) {
      form.setFieldValue("lider", null);
    } else {
      form.setFieldValue("categoria", null);
    }
  }, [isLider]);

  useEffect(() => {
    if (onlyLider) {
      form.setFieldValue("lideres", true);
      setFilters((prev: any) => ({ ...prev, lideres: true }));
    }
    if (categoriaId) {
      form.setFieldValue("categoria", categoriaId);
      clearFilters();
      setFilters((prev: any) => ({ ...prev, categoria: categoriaId }));
    }
    if (liderId) {
      form.setFieldValue("lider", liderId);
      clearFilters();
      setFilters((prev: any) => ({ ...prev, lider: liderId }));
    }
    if (puestoVotacionId && !mesaVotacionId) {
      form.setFieldValue("puestoVotacion", puestoVotacionId);
      clearFilters();
      setFilters((prev: any) => ({
        ...prev,
        puestoVotacion: puestoVotacionId,
      }));
    }
  }, [
    liderId,
    puestoVotacionId,
    mesaVotacionId,
    form,
    clearFilters,
    categoriaId,
    onlyLider,
  ]);

  useEffect(() => {
    if (puestoVotacionId && !puestoVotacionWatch) {
      form.setFieldValue("puestoVotacion", puestoVotacionId);
    }
    if (mesaVotacionId && mesasVotacion && mesasVotacion.length > 0) {
      form.setFieldValue("mesaVotacion", mesaVotacionId);
      clearFilters();
      setFilters((prev: any) => ({
        ...prev,
        puestoVotacion: puestoVotacionId,
        mesaVotacion: mesaVotacionId,
      }));
    }
  }, [
    mesaVotacionId,
    mesasVotacion,
    puestoVotacionId,
    form,
    clearFilters,
    puestoVotacionWatch,
  ]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (firstLoad.current) {
      form.submit();
      firstLoad.current = false;
    }
  }, [form]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Form layout="vertical" form={form} onFinish={onSubmit}>
        <div className="grid grid-cols-10 gap-4">
          <div className="flex">
            <Form.Item
              label="Lideres"
              name="lideres"
              valuePropName="checked"
              className="mb-0!"
              initialValue={false}
            >
              <Checkbox className="scale-150" />
            </Form.Item>
            <Form.Item
              label="Categoria"
              name="categoria"
              className="mb-0! w-full"
            >
              <Select
                allowClear
                disabled={!isLider}
                placeholder="Categoria"
                options={dataToSelectOptions(categorias ?? [], "id", "nombre")}
              />
            </Form.Item>
          </div>
          <Form.Item label="Lider a cargo" className="mb-0!" name="lider">
            <Select
              allowClear
              showSearch={{ optionFilterProp: "label" }}
              placeholder="Seleccione un lider asignado"
              disabled={isLider}
              options={dataToSelectOptions(lideres ?? [], "id", "nombre")}
            />
          </Form.Item>
          <Form.Item
            label="Puesto de votación"
            className="col-span-2 mb-0!"
            name="puestoVotacion"
          >
            <Select
              allowClear
              placeholder="Seleccione un puesto de votacion"
              options={dataToSelectOptions(
                puestovotacion ?? [],
                "id",
                "nombre"
              )}
            />
          </Form.Item>
          <Form.Item label="Mesa" className="mb-0!" name="mesaVotacion">
            <Select
              allowClear
              placeholder="Seleccione una mesa de votacion"
              disabled={!puestoVotacionWatch}
              options={dataToSelectOptions(mesasVotacion ?? [], "id", "nombre")}
            />
          </Form.Item>

          <Form.Item label="Codigo C" className="mb-0!" name="codigoC">
            <Select
              allowClear
              placeholder="Seleccione un codigo C"
              options={dataToSelectOptions(codigosC ?? [], "id", "nombre")}
            />
          </Form.Item>

          <Form.Item label="Codigo B" className="mb-0!" name="codigoB">
            <Select
              allowClear
              placeholder="Seleccione un codigo B"
              options={dataToSelectOptions(codigosB ?? [], "id", "nombre")}
            />
          </Form.Item>
          <div className="col-span-2 flex items-center gap-2">
            <Form.Item label=" " className="mb-0!">
              <Button type="primary" onClick={() => form.submit()}>
                Filtrar
              </Button>
            </Form.Item>
            <Form.Item label=" " className="mb-0!">
              <Button
                type="default"
                onClick={() => {
                  form.resetFields();
                  setFilters({});
                  setSearch("");
                }}
              >
                Limpiar
              </Button>
            </Form.Item>
          </div>
          <p className="font-semibold text-right">Total: {personas?.length}</p>
        </div>
        <div className="mt-2  flex justify-between">
          <div className="w-[300px]">
            <Form.Item label="Buscar" className="mb-0!">
              <Input
                allowClear
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Item>
          </div>
          <Form.Item label=" " className="mb-0!">
            <Button
              htmlType="button"
              onClick={handleDownloadExcel}
              color="green"
              variant="solid"
              icon={<FileExcelOutlined />}
            >
              Exportar
            </Button>
          </Form.Item>
        </div>
      </Form>
      <Table {...tableProps} />
    </div>
  );
};
