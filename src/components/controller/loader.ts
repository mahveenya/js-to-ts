import { Methods } from '../enums';
import { ReqParams, LoadReqParams, APIKey, URLOptions } from '../interfaces';
import { NewsCb, NewsOrSourcesCb, NewsOrSourcesData, SourcesCb } from '../types';

class Loader {
    private readonly baseLink: string;
    private readonly options: APIKey;
    constructor(baseLink: string, options: APIKey) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T extends NewsCb | SourcesCb>(
        { endpoint, options = {} }: ReqParams,
        callback: NewsOrSourcesCb<T> = (): never => {
            throw new Error('No callback for GET response');
        }
    ): void {
        const loadReqParams: LoadReqParams<T> = {
            method: Methods.GET,
            endpoint,
            callback,
            options,
        };
        this.load(loadReqParams);
    }

    errorHandler(res: Response): Response | never {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw new Error(res.statusText);
        }

        return res;
    }

    makeUrl({ options, endpoint }: ReqParams): string {
        const urlOptions: URLOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;
        const urlOptionsKeys = Object.keys(urlOptions) as (keyof URLOptions)[];

        urlOptionsKeys.forEach((key: keyof URLOptions): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T extends NewsCb | SourcesCb>({ method, endpoint, callback, options = {} }: LoadReqParams<T>): void {
        fetch(this.makeUrl({ options, endpoint }), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<NewsOrSourcesData> => res.json())
            .then((data: NewsOrSourcesData): void => {
                if ('articles' in data) {
                    (callback as NewsCb)(data);
                }
                if ('sources' in data) {
                    (callback as SourcesCb)(data);
                }
            })
            .catch((err: Error): never => {
                throw err;
            });
    }
}

export default Loader;
