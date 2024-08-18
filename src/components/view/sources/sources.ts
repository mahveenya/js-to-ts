import './sources.css';
import { Source } from '../interfaces.js';

export default class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: Source): void => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceItem = sourceClone.querySelector('.source__item') as HTMLDivElement;
            sourceItem.setAttribute('data-source-id', item.id);

            const sourceItemName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;
            sourceItemName.textContent = item.name;

            fragment.append(sourceClone);
        });

        const sources = document.querySelector('.sources') as HTMLDivElement;
        sources.append(fragment);
    }
}
