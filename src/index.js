import { Article } from "./js/Article";

const data = [
  {
    id: 1,
    title: 'Increasing Prosperity With Positive Thinking',
    urlToImage: '../img/strategies/increasing.jpg',
    tags: ['Art', 'Design'],
    content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don\'t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What\'s my passion? What kind of career fits my personality?',
    date: '01.01.2022'
  },
  {
    id: 2,
    title: 'Motivation Is The First Step To Success',
    urlToImage: '../img/strategies/motivation.jpg',
    tags: ['Culture'],
    content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don\'t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What\'s my passion? What kind of career fits my personality?',
    date: '01.01.2022'
  },
  {
    id: 3,
    title: 'Success Steps For Your Personal Or Business Life',
    urlToImage: '../img/strategies/success.jpg',
    tags: ['Culture', 'Design', 'Art'],
    content: 'Knowing yourself is the first, and a very critical step in the process of planning your future. How can you figure out what you want to do with your life if you don\'t know: What am I going to do with the  rest of my life? What is my dream job? What do I enjoy doing? What\'s my passion? What kind of career fits my personality?',
    date: '01.01.2022'
  }
]

const STRATEGIES = document.querySelector('.strategies__tags');

window.onload = () => {

  // render Articles

  if (data) {
    renderArticlesToDom();
  }

  // tags
  clickTagHandler();
}

const clickTagHandler = () => {

  STRATEGIES.addEventListener('click', event => {

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
  const selectedTags = STRATEGIES.querySelectorAll('.tag');
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