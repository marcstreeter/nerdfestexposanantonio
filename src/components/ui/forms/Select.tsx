import type { ComponentPropsWithoutRef } from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/shadcn/native-select";

interface Props extends Omit<
  ComponentPropsWithoutRef<typeof NativeSelect>,
  "children" | "className"
> {
  options: {
    value: string | number;
    label: string;
    disabled?: boolean;
  }[];
}

export default function Select({ options, ...props }: Props) {
  return (
    <NativeSelect {...props} className="form-control">
      {options.map(({ value, label, disabled }) => (
        <NativeSelectOption key={value} value={value} disabled={disabled}>
          {label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
}
