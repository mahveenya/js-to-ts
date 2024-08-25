import { NewsData, SourcesData } from './interfaces.js';

export type Callback<T> = (data: T) => void;
export type DrawNewsCb = Callback<NewsData>;
export type DrawSourcesCb = Callback<SourcesData>;
