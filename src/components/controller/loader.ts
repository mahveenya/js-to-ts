import { Methods } from '../enums';
import { ReqParams, SourcesReqParams, NewsReqParams, LoadReqParams, APIKey, URLOptions } from '../interfaces';
import { Callback } from '../types';

type GetRes<T extends SourcesReqParams | NewsReqParams> = T extends NewsReqParams ? NewsReqParams : ReqParams;

class Loader {
    private readonly baseLink: string;
    private readonly options: APIKey;
    constructor(baseLink: string, options: APIKey) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: ReqParams,
        callback: Callback<T> = (): void => {
            console.error('No callback for GET response');
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

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl({ options, endpoint }: ReqParams): string {
        const urlOptions: URLOptions = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;
        const urlOptionsKeys = Object.keys(urlOptions) as (keyof URLOptions)[]

        urlOptionsKeys.forEach((key: keyof URLOptions): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>({ method, endpoint, callback, options = {} }: LoadReqParams<T>): void {
        fetch(this.makeUrl({ options, endpoint }), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
