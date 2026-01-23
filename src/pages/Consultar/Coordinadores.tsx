import { EyeOutlined, FileExcelOutlined } from "@ant-design/icons";
import { getExportCoordinadores } from "@api";
import { useGet } from "@hooks";
import { usePersonasFilterStore } from "@stores";
import { Button, Form, Input, Table, type TableProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Coordinadores = () => {
  const navigate = useNavigate();
  const setFilters = usePersonasFilterStore((state) => state.setFilters);
  const { listCoordinadores } = useGet();

  /* ---------------------------------- State --------------------------------- */
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  /* --------------------------------- Handle --------------------------------- */
  const handleDownloadExcel = async () => {
    const blob = await getExportCoordinadores();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "coordinadores.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getFilteredCoordinadores = () => {
    if (!debouncedSearch) return listCoordinadores;
    const lowerSearch = debouncedSearch.toLowerCase();
    return (listCoordinadores ?? []).filter(
      (c) =>
        c.nombre?.toLowerCase().includes(lowerSearch) ||
        c.apellido?.toLowerCase().includes(lowerSearch) ||
        c.cedula?.toString().toLowerCase().includes(lowerSearch),
    );
  };

  /* ---------------------------------- Table --------------------------------- */
  const tableProps: TableProps<any> = {
    size: "middle",
    rowKey: "id",
    bordered: true,
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
        title: "Puesto de votación",
        key: "puestoVotacion",
        render: (_, record) => record?.mesaVotacion?.puestoVotacion?.nombre,
      },
      {
        title: "Lideres a Cargo",
        dataIndex: "lideresCount",
        key: "lideresCount",
      },
      {
        width: 10,
        render: (_, record) => (
          <div className="flex">
            <Button
              type="link"
              size="small"
              className="p-0!"
              onClick={() => {
                setFilters({ onlyLider: true, coordinadorId: record.id });
                navigate("/home/consultar/personas");
              }}
            >
              <EyeOutlined />
            </Button>
          </div>
        ),
      },
    ],
    pagination: false,
    dataSource: getFilteredCoordinadores(),
  };

  /* --------------------------------- Effect --------------------------------- */
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 200);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="mt-2  flex justify-between">
        <Form.Item label="Buscar" className="mb-0!">
          <Input
            allowClear
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Item>
        <Button
          htmlType="button"
          onClick={handleDownloadExcel}
          color="green"
          variant="solid"
          icon={<FileExcelOutlined />}
        >
          Exportar
        </Button>
      </div>
      <Table {...tableProps} />
    </div>
  );
};
