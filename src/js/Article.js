export class Article {
  constructor ({id, title, urlToImage, tags, ...rest}) {
    this.id = id;
    this.title = title;
    this.urlToImage = urlToImage;
    this.tags = tags;
  }

  // article generator

  generateArticle() {
    let template = '';
    let article = document.createElement('article');
    article.className = 'strategy block-shadowed';
    article.setAttribute('data-id', this.id);

    this.urlToImage &&
        (template += `<img src=${this.urlToImage} alt="motivation">`);
    
    if (this.title || this.tags) {
      template += `<div class="strategy__content">`;
      this.title &&
          (template += `<h3 class="strategy__name">${this.title}</h3>`);

      if (this.tags) {
        template += `<div class="tags strategy__tags">`;

        this.tags.map(tag => {
          template += `<span class="tag tag_colored">${tag}</span>`;
        });

        template += `</div>`;
      }
      template += `</div>`;
    }

    article.innerHTML = template;
    return article;
  }
};