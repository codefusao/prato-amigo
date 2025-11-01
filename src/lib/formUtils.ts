import { ChangeEvent } from "react";
import { UseFormSetValue } from "react-hook-form";
import { formatPhone } from "./formatPhone";

export function createPhoneHandler<T extends Record<string, any>>(
  setValue: UseFormSetValue<T>,
  fieldName: keyof T,
  shouldValidate = false
) {
  return (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setValue(fieldName as any, formatted as any, { shouldValidate });
  };
}

