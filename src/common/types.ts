export type ResponseData<T> = Promise<{
  data?: T;
  message: string;
}>;
