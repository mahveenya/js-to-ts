import AppLoader from './appLoader';
import { NewsCb, SourcesCb } from '../types';
import { Endpoints } from '../enums';
import { SourcesReqParams, NewsReqParams } from '../interfaces';

class AppController extends AppLoader {
    getSources(callback: SourcesCb): void {
        const reqParams: SourcesReqParams = {
            endpoint: Endpoints.SOURCES,
        };
        super.getResp(reqParams, callback);
    }

    getNews(e: MouseEvent, callback: NewsCb): void {
        let target = e.target as Element;
        const newsContainer = e.currentTarget as Element;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                const newsContainerDataSource: string | null = newsContainer.getAttribute('data-source');

                if (sourceId && newsContainerDataSource !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);

                    const reqParams: NewsReqParams = {
                        endpoint: Endpoints.EVERYTHING,
                        options: {
                            sources: sourceId,
                        },
                    };

                    super.getResp(reqParams, callback);
                }
                return;
            }
            target = target.parentNode as Element;
        }
    }
}

export default AppController;
