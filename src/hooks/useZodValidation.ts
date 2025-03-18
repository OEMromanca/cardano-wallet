import { useState } from "react";
import { z, ZodError } from "zod";

interface ValidationResult {
  error: string | null;
  isValid: boolean;
}

function useZodValidation<T>(schema: z.ZodSchema<T>) {
  const [error, setError] = useState<string | null>(null);

  const validate = (value: T): ValidationResult => {
    try {
      schema.parse(value);
      setError(null);
      return { isValid: true, error: null };
    } catch (err) {
      if (err instanceof ZodError) {
        setError(err.errors[0].message);
        return { isValid: false, error: err.errors[0].message };
      }
      setError("Neočakávaná chyba");
      return { isValid: false, error: "Neočakávaná chyba" };
    }
  };

  return { error, validate };
}

export default useZodValidation;
