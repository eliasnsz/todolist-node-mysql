export interface ITask {
  id: number;
  title: string;
  status: "Pendente" | "Concluída";
  created_at: string;
}