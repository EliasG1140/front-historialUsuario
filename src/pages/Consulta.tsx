import { Tabs, type TabsProps } from "antd";
import { Outlet, useNavigate } from "react-router";

export const Consulta = () => {
  const navigate = useNavigate();

  const items: TabsProps["items"] = [
    {
      key: "personas",
      label: "Personas",
    },
    {
      key: "lideres",
      label: "Lideres",
    },
    {
      key: "puestos-votacion",
      label: "Puestos de votacion",
    },
  ];
  /* --------------------------------- Handle --------------------------------- */
  const onChange = (key: string) => {
    navigate(`/home/consultar/${key}`);
  };

  const pathParts = location.pathname.split("/").filter(Boolean);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h2 className="font-semibold text-blue-500 text-xl">Consultar</h2>
      <div className="flex-1 min-h-0">
        <Tabs items={items} onChange={onChange} activeKey={pathParts[2]} />
        <Outlet />
      </div>
    </div>
  );
};
