export interface CardData {
  front: string;
  back: string;
}

export interface MaterialMetaData {
  id: string;
  title: string;
  description: string;
}

export interface MaterialData {
  id: string;
  title: string;
  description: string;
  cards: Array<CardData>;
}
