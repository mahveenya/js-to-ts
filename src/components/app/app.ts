import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsCb, SourcesCb } from '../types';

class App {
    protected controller: AppController;
    protected view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = document.querySelector('.sources') as HTMLDivElement;
        const newsCb: NewsCb = (data) => this.view.drawNews(data);
        const sourcesCb: SourcesCb = (data) => this.view.drawSources(data);
        sources.addEventListener('click', (e: MouseEvent): void => this.controller.getNews(e, newsCb));
        this.controller.getSources(sourcesCb);
    }
}

export default App;
