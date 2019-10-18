export interface Service<T> {
  status: string;
  payload?: T;
  error?: string;
}

