import React from 'react';
import { shallow, mount } from 'enzyme';
import App, { QuoteBox, UserActions, Footer } from './App';

//https://jestjs.io/docs/en/expect
//shallow: https://enzymejs.github.io/enzyme/docs/api/shallow.html
//mount: https://enzymejs.github.io/enzyme/docs/api/mount.html

const EXPECTED_QUOTE = 'Boop';
const EXPECTED_AUTHOR = 'Steven B';
const EXPECTED_ERROR = 'An error has occured. Please try again later.';

it('App deeply renders as a smoke test', () => {
  mount(<App />);
});

it('should render App class child components, and initialize their props', () => {
  const app = shallow(<App />);
  
  const quoteBox = app.find('QuoteBox');
  expect(quoteBox.exists()).toEqual(true);
  expect(quoteBox.prop('error')).toEqual('');
  expect(quoteBox.prop('quote')).toEqual('');
  expect(quoteBox.prop('author')).toEqual('');
  expect(quoteBox.prop('getQuote')).toBeDefined();

  const footer = app.find('Footer');
  expect(footer.exists()).toEqual(true);
});

it('should update the QuoteBox props with data from the quote API after mounting', (done) => {
  global.fetch = () => {
    return new Promise(resolve => {
      resolve({
        json: () => new Promise(resolve => {
          resolve([{quote: EXPECTED_QUOTE, character: EXPECTED_AUTHOR}]);
        })
      });
    });
  };

  const app = shallow(<App />);

  process.nextTick(() => {
    const quoteBox = app.find('QuoteBox');
    expect(quoteBox.prop('quote')).toEqual(EXPECTED_QUOTE);
    expect(quoteBox.prop('author')).toEqual(EXPECTED_AUTHOR);
    expect(quoteBox.prop('error')).toEqual('');
    done();
  });
});

it('should assign a String value to the QuoteBox error prop', (done) => {
  global.fetch = () => {
    return new Promise((resolve, reject) => {
      reject();
    });
  };

  const app = shallow(<App />);

  process.nextTick(() => {
    const quoteBox = app.find('QuoteBox');
    expect(quoteBox.prop('quote')).toEqual('');
    expect(quoteBox.prop('author')).toEqual('');
    expect(quoteBox.prop('error')).toEqual(EXPECTED_ERROR);
    done();
  });
});

it('should render QuoteBox p tag elements with ids of text and author containing the set quote and author props when error prop is falsy', () => {
  const quoteBox = shallow(<QuoteBox quote={EXPECTED_QUOTE} author={EXPECTED_AUTHOR} error={''} />);
  const text = quoteBox.find('#text');
  const author = quoteBox.find('#author');

  expect(text.text()).toEqual(EXPECTED_QUOTE);
  expect(author.text()).toEqual(EXPECTED_AUTHOR);
});

it('should render QuoteBox p tag elements containing error prop when it is truthy', () => {
  const quoteBox = shallow(<QuoteBox quote={''} author={''} error={EXPECTED_ERROR} />);
  const text = quoteBox.find('#text');
  const author = quoteBox.find('#author');

  expect(text.text()).toEqual(EXPECTED_ERROR);
  expect(author.text()).toEqual('');
  expect(author.text()).toBeFalsy();
});

it('should render UserActions and pass props, handleNewQuote, quote and author', () => {
  const quoteBox = shallow(<QuoteBox quote={EXPECTED_QUOTE} author={EXPECTED_AUTHOR} error={''} getQuote={jest.fn()}/>);
  const userActions = quoteBox.find('UserActions');
  
  expect(userActions.exists()).toEqual(true);
  expect(userActions.prop('handleNewQuote')).toBeDefined();
  expect(userActions.prop('quote')).toEqual(EXPECTED_QUOTE);
  expect(userActions.prop('author')).toEqual(EXPECTED_AUTHOR);
});

it('should render expected UserAction elements with ids #new-quote and #tweet-quote', () => {
  const userAction = shallow(<UserActions quote={EXPECTED_QUOTE} author={EXPECTED_AUTHOR}/>);
  const newQuote = userAction.find('#new-quote');
  const tweetQuote = userAction.find('#tweet-quote');

  expect(newQuote.exists()).toEqual(true);
  expect(tweetQuote.prop('href')).toEqual(`https://twitter.com/intent/tweet?text=${EXPECTED_QUOTE} -${EXPECTED_AUTHOR}`);
});

it('should be able to click button with the id new-quote within UserAction to call handleNewQuote()', () => {
  const getQuote = jest.fn();
  const userActions = shallow(<UserActions handleNewQuote={getQuote}/>);

  userActions.find('#new-quote').simulate('click');
  expect(getQuote).toHaveBeenCalled();
});