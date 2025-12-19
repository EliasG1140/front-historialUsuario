import type { FC } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  titulo?: string;
}

export const Card: FC<CardProps> = ({ children, className, titulo }) => {
  return (
    <div
      className={`w-full ${
        titulo ? "pt-[35px] pb-[15px] px-[15px]" : "p-[15px]"
      } bg-white shadow rounded-[5px] relative ${className}`}
    >
      {titulo && (
        <p className="w-full absolute top-2.5 left-[15px] font-semibold">
          {titulo}
        </p>
      )}
      {children}
    </div>
  );
};
