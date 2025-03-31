import { Card } from "ts-fsrs";

export interface CardData extends Card {
  id: string;
  front: string;
  back: string;
}

export interface CardDataWithMaterialId extends CardData {
  materialId: string;
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
  cards: CardDataWithMaterialId[];
}
