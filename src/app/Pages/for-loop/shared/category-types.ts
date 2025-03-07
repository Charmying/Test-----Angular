export enum Category {
  CellPhone = 'CellPhone',
  NoteBook = 'NoteBook',
}

export interface Product {
  name: string;
  attributes: Attribute[];
}

export interface Attribute {
  name: string;
  value: string;
}

export interface CategoryInterface {
  name: Category;
  products: Product[];
}
