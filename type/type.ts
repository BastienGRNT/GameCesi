export type UserType = {
  id: string;
  email: string;
  password: string;
  pseudo: string;
  inscription?: InscriptionType | null;
};

export type GameType = {
  id: string;
  name: string;
  inscriptions: InscriptionType[];
};

export type InscriptionType = {
  id: string;
  userId: string;
  user: UserType;
  gameId: string;
  game: GameType;
  teamId?: string | null;
  team?: TeamType | null;
  payment?: PaymentType | null;
};

export type TeamType = {
  id: string;
  name: string;
  members: InscriptionType[];
};

export type PaymentType = {
  id: string;
  inscriptionId: string;
  inscription: InscriptionType;
  amount: number;
  isPaid: boolean;
};
