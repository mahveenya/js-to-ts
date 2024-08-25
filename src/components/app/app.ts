import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DrawNewsCb, DrawSourcesCb } from '../types';

class App {
    protected controller: AppController;
    protected view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sources = document.querySelector('.sources') as HTMLDivElement;
        const drawNewsCb: DrawNewsCb = (data): void => this.view.drawNews(data);
        const drawSourcesCb: DrawSourcesCb = (data): void => this.view.drawSources(data);
        sources.addEventListener('click', (e: MouseEvent): void => this.controller.getNews(e, drawNewsCb));
        this.controller.getSources(drawSourcesCb);
    }
}

export default App;
