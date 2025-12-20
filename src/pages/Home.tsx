import { useGet } from "@hooks";
import { usePersonasFilterStore } from "@stores";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate();
  const setFilters = usePersonasFilterStore((state) => state.setFilters);
  const { categorizacion } = useGet();

  const ordenadas = [...(categorizacion ?? [])].sort(
    (a, b) => b.maximo - a.maximo
  );
  const levels = ordenadas.length;
  const heightPerLevel = 90;

  return (
    <div className="w-full max-w-3xl mx-auto py-8">
      <h2 className="text-center text-lg font-semibold mb-6">Categorizacion</h2>

      <div className="flex justify-center">
        <div
          className="relative"
          style={{
            width: "80%",
            height: `${levels * heightPerLevel}px`,
            clipPath: "polygon(30% 0, 70% 0, 100% 100%, 0% 100%)",
            overflow: "hidden",
          }}
        >
          <div className="flex flex-col h-full gap-1">
            {ordenadas.map((cat) => (
              <button
                onClick={() => {
                  setFilters({ onlyLider: true, categoriaId: cat.id });
                  navigate("/home/consultar/personas");
                }}
                key={cat.id}
                className="
                  flex-1 flex items-center justify-center
                  bg-blue-100
                  border-y border-blue-400/60
                  hover:cursor-pointer 
                  hover:bg-blue-200
                "
              >
                <div className="text-center text-black text-sm">
                  <div className="font-semibold">
                    {cat.nombre} ({cat.count} Lideres)
                  </div>
                  <div className="text-xs opacity-90">
                    {cat.minimo} a {cat.maximo} personas
                  </div>
                  <div>Total: {cat.total}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
