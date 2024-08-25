import { Endpoints, Methods } from './enums';
import { Callback } from './types';

export interface APIKey {
    readonly apiKey: string;
}

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

export interface SourcesData {
    status: string;
    totalResults: number;
    sources: Source[];
}
export interface NewsData {
    status: string;
    articles: Article[];
}

interface ReqOptions {
    sources: string;
}

export interface URLOptions extends APIKey, Partial<ReqOptions> {}

export interface ReqParams {
    endpoint: Endpoints;
    options?: Partial<ReqOptions>;
}

export interface SourcesReqParams {
    endpoint: Endpoints;
}

export interface NewsReqParams {
    endpoint: Endpoints;
    options: ReqOptions;
}

export interface LoadReqParams<T> {
    method: Methods;
    endpoint: Endpoints;
    callback: Callback<T>;
    options: Partial<ReqOptions>;
}
