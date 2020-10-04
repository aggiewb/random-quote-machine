import React from 'react';
import { shallow, mount } from 'enzyme';
import App, { QuoteBox, UserActions, Footer } from './App';

//https://jestjs.io/docs/en/expect
//shallow: https://enzymejs.github.io/enzyme/docs/api/shallow.html
//mount: https://enzymejs.github.io/enzyme/docs/api/mount.html

const EXPECTED_QUOTE = 'Boop';
const EXPECTED_AUTHOR = 'Steven B';
const EXPECTED_ERROR = 'Help';

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