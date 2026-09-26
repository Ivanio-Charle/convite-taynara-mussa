export interface EventData {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  zone: string;
  dress_code: string;
  account_information: string;
}

export interface GuestData {
  id: string;
  event_id: string;
  name: string;
  phone: string;
  invitation_code?: string | null;
  created_at: string | Date;
  rsvps?: RsvpData[];
}

export interface RsvpData {
  id: string;
  guest_id: string;
  attending: boolean;
  number_of_people: number;
  observation?: string | null;
  responded_at: string | Date;
}

export type RsvpStatus = 'CONFIRMADO' | 'PENDENTE' | 'NAO_VAI';

export interface FormattedGuest {
  id: string;
  name: string;
  phone: string;
  status: RsvpStatus;
  numberOfPeople: number;
  observation: string;
  respondedAt: string | null;
  createdAt: string;
}

export interface AdminStats {
  totalResponses: number;
  confirmed: number;
  pending: number;
  declined: number;
  totalPeopleConfirmed: number;
}
