export interface ErrorResponse {
  response: {
    data: {
      errors: {
        error: string[];
      };
    };
  };
}
