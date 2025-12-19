import type { SelectOptions } from "@types";
export * from "./notification";

export const dataToSelectOptions = <T>(
  data: T[],
  value: keyof T,
  label: keyof T,
  stringify: boolean = false,
  options?: {
    combineLabel?: boolean;
    keys: (keyof T)[];
    separator: string;
  }
): SelectOptions[] => {
  const result: SelectOptions[] = [];
  for (const item of data) {
    if (options?.combineLabel) {
      const label = options.keys
        .map((key) => item[key])
        .join(options.separator);
      result.push({
        label,
        value: stringify ? String(item[value]) : Number(item[value]),
      });
    } else {
      result.push({
        label: item[label] as string,
        value: stringify ? String(item[value]) : Number(item[value]),
      });
    }
  }

  return result;
};

export const capitalizeWords = (str: string) => {
  return (str ?? "")
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
