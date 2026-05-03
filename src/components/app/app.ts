import { NewsCb, SourcesCb } from '../types';
import BaseApp from './baseApp';

class App extends BaseApp {
    start(): void {
        const sources = document.querySelector('.sources') as HTMLDivElement;
        const newsCb: NewsCb = (data) => this.view.drawNews(data);
        const sourcesCb: SourcesCb = (data) => this.view.drawSources(data);
        sources.addEventListener('click', (e: MouseEvent): void => this.controller.getNews(e, newsCb));
        this.controller.getSources(sourcesCb);
    }
}

export default App;
