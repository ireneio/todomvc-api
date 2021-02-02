export namespace SqlSchema {
  interface Item {
    id: number | bigint,
    value: string,
    status: number,
  }
  export interface ItemInput extends Item {
    created_on: string,
    last_updated: string
  }

  export interface ItemHttpRequestBody extends Item {}
}
