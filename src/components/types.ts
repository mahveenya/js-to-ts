import { NewsData, SourcesData } from './interfaces.js';

export type Callback<T> = (data: T) => void;
export type NewsCb = Callback<NewsData>;
export type SourcesCb = Callback<SourcesData>;
export type NewsOrSourcesCb<T> = T extends NewsCb ? NewsCb : SourcesCb;
export type NewsOrSourcesData = NewsData | SourcesData;
