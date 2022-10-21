export interface Text {
  _id?: string;
  type: string;
  title: string;
  description: string;
  date?: string;
}

export interface TextHeadCell {
  disablePadding: boolean;
  id: keyof Text;
  label: string;
  numeric: boolean;
}
