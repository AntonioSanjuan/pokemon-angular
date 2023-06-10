export interface Mapper<T> {
    adapt(item: any): T;
  }
  