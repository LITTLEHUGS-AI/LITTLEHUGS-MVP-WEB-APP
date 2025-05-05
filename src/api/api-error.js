import { AxiosError } from "axios";

class ApiError extends Error {
  statusCode;
  data;
  error;

  constructor(error) {
    super(error.message);
    this.error = error;

    if (error instanceof AxiosError && error.response) {
      this.statusCode = error.response.status;
      this.message = error.response.data.message || error.message;
      this.data = error.response.data || {};
    } else {
      this.message = error.message;
    }
  }
}

export default ApiError;
