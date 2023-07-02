export interface ApiPayload<T> {
  data: T[];
  success: boolean;
  errorCode: string | null;
  errors: { errors: string[] }  | null;
}