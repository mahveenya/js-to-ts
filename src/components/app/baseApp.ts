import AppController from '../controller/controller';
import { AppView } from '../view/appView';

abstract class BaseApp {
    protected controller: AppController;
    protected view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    abstract start(): void;
}

export default BaseApp;
