import { EyeOutlined, FileExcelOutlined } from "@ant-design/icons";
import { getExportLideres } from "@api";
import { useGet } from "@hooks";
import { usePersonasFilterStore } from "@stores";
import { Button, Table, type TableProps } from "antd";
import { useNavigate } from "react-router";

export const Lideres = () => {
  const navigate = useNavigate();
  const setFilters = usePersonasFilterStore((state) => state.setFilters);
  const { listLideres } = useGet();

  /* --------------------------------- Hnadle --------------------------------- */
  const handleDownloadExcel = async () => {
    const blob = await getExportLideres();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lideres.xlsx";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  /* ---------------------------------- Table --------------------------------- */
  const tableProps: TableProps<any> = {
    size: "middle",
    rowKey: "id",
    bordered: true,
    columns: [
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
        title: "Numero Identificación",
        dataIndex: "cedula",
        key: "cedula",
      },
      {
        title: "Puesto de votación",
        key: "puestoVotacion",
        render: (_, record) => record?.mesaVotacion?.puestoVotacion?.nombre,
      },
      {
        title: "Personas",
        dataIndex: "personasACargoCount",
        key: "personasACargoCount",
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
                setFilters({ liderId: record.id });
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
    dataSource: listLideres,
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
