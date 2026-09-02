export type TeamStatus = "ATIVO" | "INATIVO";

export interface Team {
  id: string;
  apiId?: number;
  name: string;
  country: string;
  state?: string;
  city?: string;
  logo?: string;
  stadium?: string;
  status: TeamStatus;
  createdAt: string;
}

export type TeamFormData = Omit<
  Team,
  "id" | "createdAt"
>;
