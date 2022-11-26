import { type } from 'os';
export interface News {
    id: string | number;
    title: string;
    description: string;
    author: string;
    countView?: number;
    createdAt?: number;
}

export type AllNews = Record<string | number, News>

export type NewsEdit = Partial<Omit<News, 'id'>>;