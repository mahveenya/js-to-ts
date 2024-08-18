import './news.css';
import { Article } from '../interfaces.js';

export default class News {
    draw(data: Article[]): void {
        const news: Article[] = data.length >= 10 ? data.filter((_item: Article, idx: number): boolean => idx < 10) : data;

        const fragment = document.createDocumentFragment() as DocumentFragment;
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx): void => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                const oddNews = newsClone.querySelector('.news__item') as HTMLDivElement;
                oddNews.classList.add('alt');
            }

            const newsPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;
            newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const newsAuthor = newsClone.querySelector('.news__meta-author') as HTMLLIElement;
            newsAuthor.textContent = item.author || item.source.name;

            const newsDate = newsClone.querySelector('.news__meta-date') as HTMLLIElement;
            newsDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsDescriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
            newsDescriptionTitle.textContent = item.title;

            const newsDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
            newsDescriptionSource.textContent = item.source.name;

            const newsDescriptionContent = newsClone.querySelector(
                '.news__description-content'
            ) as HTMLParagraphElement;
            newsDescriptionContent.textContent = item.description;

            const newsReadMore = newsClone.querySelector('.news__read-more a') as HTMLParagraphElement;
            newsReadMore.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElem = document.querySelector('.news') as HTMLDivElement;
        newsElem.innerHTML = '';
        newsElem.appendChild(fragment);
    }
}
