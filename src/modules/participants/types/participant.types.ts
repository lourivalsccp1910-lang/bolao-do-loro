export interface Participant {
  id: string;
  name: string;
  phone: string;
  email: string;
  cpf: string;
  active: boolean;
  createdAt: string;
}

export interface ParticipantFormData {
  name: string;
  phone: string;
  email: string;
  cpf: string;
}