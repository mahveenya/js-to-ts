import { Endpoints } from './enums';

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface Data {
    status: string;
    totalResults?: number;
    articles?: Article[];
    sources?: Source[];
}

export interface SourcesReqParams {
    endpoint: Endpoints;
}

export interface NewsReqParams {
    endpoint: Endpoints;
    options: {
        sources: string;
    };
}
