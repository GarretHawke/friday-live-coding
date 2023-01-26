import { Article } from './js/Article';
import { ArticleModal } from "./js/ArticleModal";
import { Modal } from "./js/Modal";
import { Data } from "./js/Data";

import './sass/style.scss';

const data = Data;
const strategiesTags = document.querySelector('.strategies__tags');

window.onload = () => {

  // render Articles
  if (data) {
    renderArticlesToDom();
  }

  clickTagHandler();

}

const clickTagHandler = () => {

  strategiesTags.addEventListener('click', event => {

    if (event.target.classList.contains('tag')) {
      let clickedTag = event.target;
      removeSelectedTags();
      selectClickedTag(clickedTag);
      if (clickedTag.innerText === 'All') {
        showAllStrategies();
      } else {
        filterStrategyBySelectedTag(clickedTag);
      }
    }
  });
}

const removeSelectedTags = () => {
  const selectedTags = strategiesTags.querySelectorAll('.tag');
  selectedTags.forEach( tag => {
    tag.classList.remove('tag_selected');
    tag.classList.add('tag_bordered');
  });
}

const selectClickedTag = clickedTag => {
  clickedTag.classList.remove('tag_bordered');
  clickedTag.classList.add('tag_selected');
}

const showAllStrategies = () => {
  let strategies = document.querySelectorAll('.strategy-wrapper .strategy');
  strategies.forEach(strategy => {
    strategy.classList.remove('strategy_hidden');
  });
}

const filterStrategyBySelectedTag = selectedTag => {
  let strategies = document.querySelectorAll('.strategy-wrapper .strategy');
  strategies.forEach(strategy => {
    strategy.classList.add('strategy_hidden');
    let tags = strategy.querySelectorAll('.tag');
    tags.forEach(tag => {
      if (tag.innerText === selectedTag.innerText) {
        strategy.classList.remove('strategy_hidden');
      }
    });
  });
}

const renderArticlesToDom = () => {
  const strategiesWrapper = getStrategiesWrapper();
  generateArticles(data).forEach(article => {
    strategiesWrapper.append(article.generateArticle());
  });
  
  addStrategyClickHandler();
}

const getStrategiesWrapper = () => {
  const strategiesContainer = document.querySelector('.strategy-wrapper');
  strategiesContainer.innerHTML = '';
  return strategiesContainer;
}

const generateArticles = (data) => {
  let articles = [];
  data.forEach(article => {
    articles.push(new Article (article));
  });
  return articles;
}

const generateToolsModal = () => {
  let clickedStrategy = event.target.closest('.strategy').getAttribute('data-id');
  let clickedStrategyData = getClickedData(clickedStrategy);
  
  renderArticleModalWindow(clickedStrategyData);
}

const addStrategyClickHandler = () => {
  let strategies = document.querySelectorAll('.strategy-wrapper .strategy');
  strategies.forEach(strategy => {
    strategy.addEventListener('click', () => generateToolsModal());
  });
}

const getClickedData = id => {
  return data.find(article => article.id == id);
}

const renderArticleModalWindow = article => {
  let modal = new ArticleModal ('article-modal', article);
  modal.renderContent();
}