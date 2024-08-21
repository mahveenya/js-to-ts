import { Methods } from '../enums';
import { ReqParams, SourcesReqParams, NewsReqParams, LoadReqParams } from '../interfaces';
import { Callback } from '../types';

interface APIKey {
    apiKey: string;
}

type urlOptions = APIKey & Record<string, string>;

type GetRes<T extends SourcesReqParams | NewsReqParams> = T extends NewsReqParams ? NewsReqParams : ReqParams;

class Loader {
    private readonly baseLink: string;
    private readonly options: APIKey;
    constructor(baseLink: string, options: APIKey) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: ReqParams,
        callback: Callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        const loadReqParams: LoadReqParams = {
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
        const urlOptions: urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load({ method, endpoint, callback, options = {} }: LoadReqParams): void {
        fetch(this.makeUrl({ options, endpoint }), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
