import { Methods } from '../enums';
import { ReqParams, LoadReqParams, APIKey, URLOptions } from '../interfaces';
import { Callback } from '../types';

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
        const urlOptionsKeys = Object.keys(urlOptions) as (keyof URLOptions)[];

        urlOptionsKeys.forEach((key: keyof URLOptions): void => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
        // this func could've been more simple:
        // makeUrl({ options, endpoint }: ReqParams): URL
        // const urlSearchParams: URLSearchParams = new URLSearchParams({ ...this.options, ...options });
        // let url: URL = new URL(`${this.baseLink}${endpoint}?${urlSearchParams.toString()}`)
        // return url
    }

    load<T>({ method, endpoint, callback, options = {} }: LoadReqParams<T>): void {
        fetch(this.makeUrl({ options, endpoint }), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<T> => res.json())
            .then((data: T): void => callback(data))
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
