export interface CardData {
  id: string;
  front: string;
  back: string;
}

export interface MaterialMetaData {
  id: string;
  title: string;
  tags: string[];
  description: string;
}

export interface MaterialData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cards: CardData[];
}
