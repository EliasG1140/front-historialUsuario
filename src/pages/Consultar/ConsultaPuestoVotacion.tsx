import { EyeOutlined, FileExcelOutlined } from "@ant-design/icons";
import { getExportPuestoVotacion } from "@api";
import { useGet } from "@hooks";
import { usePersonasFilterStore } from "@stores";
import { Button, Table, type TableProps } from "antd";
import { useNavigate } from "react-router";

export const ConsultaPuestoVotacion = () => {
  const navigate = useNavigate();
  const setFilters = usePersonasFilterStore((state) => state.setFilters);
  const { consultaPuestoVotacion } = useGet();

  /* --------------------------------- Hnadle --------------------------------- */
  const handleDownloadExcel = async () => {
    const blob = await getExportPuestoVotacion();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "puestos_votacion.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  /* ---------------------------------- Table --------------------------------- */
  const tableExpandProps: TableProps<any> = {
    size: "small",
    rowKey: "id",
    pagination: false,
    columns: [
      {
        title: "Mesa",
        dataIndex: "nombre",
        key: "nombre",
      },
      {
        title: "Personas",
        dataIndex: "cantidadPersonas",
        key: "cantidadPersonas",
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
                setFilters({
                  mesaVotacionId: record.id,
                  puestoVotacionId: record.puestoVotacionId,
                });
                navigate("/home/consultar/personas");
              }}
            >
              <EyeOutlined />
            </Button>
          </div>
        ),
      },
    ],
  };

  const tableProps: TableProps<any> = {
    size: "middle",
    rowKey: "id",
    bordered: true,
    columns: [
      {
        width: 50,
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Puesto de votacion",
        dataIndex: "nombre",
        key: "nombre",
      },
      {
        title: "Mesas",
        dataIndex: "cantidadMesas",
      },
      {
        title: "Personas",
        dataIndex: "cantidadPersonas",
        key: "cantidadPersonas",
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
                setFilters({ puestoVotacionId: record.id });
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
    dataSource: consultaPuestoVotacion?.value?.puestosDeVotacion,
    expandable: {
      expandedRowRender: (dataTable: any) => {
        const dataRaw = consultaPuestoVotacion?.value?.mesasDeVotacion ?? [];

        const childRows = dataRaw.filter(
          (mesa) => mesa.puestoVotacionId === dataTable.id
        );

        return <Table {...tableExpandProps} dataSource={childRows} />;
      },
    },
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="mt-2  flex justify-end">
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
