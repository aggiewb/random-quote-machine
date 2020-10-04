import React from 'react';
import { shallow, mount } from 'enzyme';
import App, { QuoteBox, UserActions, Footer } from './App';

//https://jestjs.io/docs/en/expect
//shallow: https://enzymejs.github.io/enzyme/docs/api/shallow.html
//mount: https://enzymejs.github.io/enzyme/docs/api/mount.html

const EXPECTED_QUOTE = 'Boop';
const EXPECTED_AUTHOR = 'Steven B';
const EXPECTED_ERROR = 'An error has occured. Please try again later.';

it('renders', () => {
  mount(<App />);
});

it('should shallow render App class child components, and initialize their props', () => {
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