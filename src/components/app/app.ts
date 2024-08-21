import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Callback } from '../types';
import { NewsData, SourcesData } from '../interfaces';


class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = document.querySelector('.sources') as HTMLDivElement;
        const drawNewsCb: Callback<NewsData> = (data) => this.view.drawNews(data);
        const drawSourcesCb: Callback<SourcesData> = (data) => this.view.drawSources(data);
        sources.addEventListener('click', (e: MouseEvent): void => this.controller.getNews(e, drawNewsCb));
        this.controller.getSources(drawSourcesCb);
    }
}

export default App;
