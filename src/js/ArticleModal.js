import { Modal } from "./Modal";

export class ArticleModal extends Modal {
  constructor(classes, {id, title, urlToImage, tags, content, date }) {
    super(classes);
    this.id = id;
    this.title = title;
    this.urlToImage = urlToImage;
    this.tags = tags;
    this.content = content;
    this.date = date;
  }

  // Article Modal Generator
  generateContent() {
    let template = '';
    let article = document.createElement('div');
    article.className = 'strategy-modal__content';

    this.urlToImage &&
        (template += `
            <div class="modal-image__container" style="background-image: url('${this.urlToImage}')">
            </div>
        `);
    
    if (this.title || this.tags || this.content || this.date) {
      template += `<div class="strategy__content">`;

      this.date &&
          (template += `<p class="strategy__date">${this.date}</p>`);

      this.title &&
          (template += `<h3 class="strategy__name">${this.title}</h3>`);

      this.content &&
          (template += `<p class="strategy__text">${this.content}</p>`);

      if (this.tags) {
        template += `<div class="tags strategy__tags">`;

        this.tags.map(tag => {
          template += `<span class="tag tag_bordered">${tag}</span>`;
        });

        template += `</div>`;
      }
      template += `</div>`;
    }

    article.innerHTML = template;
    return article;
  }

  renderContent() {
    let content = this.generateContent();
    super.createModal(content);
  }
}