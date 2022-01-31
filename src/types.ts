export type Call = {
  id: number;
  client: string;
  number: string;
  date: string;
};

export type State = {
  calls: Call[];
};

export type ApiResponse = {
  status: number;
  error: string;
  response: any
} | null;