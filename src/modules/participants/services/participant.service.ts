import type {
  Participant,
  ParticipantFormData,
} from "../types/participant.types";

const STORAGE_KEY = "bolao-do-loro-participants";

function getParticipants(): Participant[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data) as Participant[];
}

function saveParticipants(participants: Participant[]) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(participants)
  );
}

export function listParticipants(): Participant[] {
  return getParticipants();
}

export function createParticipant(
  data: ParticipantFormData
): Participant {
  const participants = getParticipants();

  const participant: Participant = {
    id: crypto.randomUUID(),
    name: data.name,
    phone: data.phone,
    email: data.email,
    cpf: data.cpf,
    active: true,
    createdAt: new Date().toISOString(),
  };

  participants.push(participant);

  saveParticipants(participants);

  return participant;
}

export function updateParticipant(
  id: string,
  data: ParticipantFormData
): Participant | null {
  const participants = getParticipants();

  const index = participants.findIndex(
    (participant) => participant.id === id
  );

  if (index === -1) {
    return null;
  }

  participants[index] = {
    ...participants[index],
    ...data,
  };

  saveParticipants(participants);

  return participants[index];
}

export function deleteParticipant(id: string): boolean {
  const participants = getParticipants();

  const filtered = participants.filter(
    (participant) => participant.id !== id
  );

  if (filtered.length === participants.length) {
    return false;
  }

  saveParticipants(filtered);

  return true;
}