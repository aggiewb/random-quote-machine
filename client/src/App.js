import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      quote: '',
      author: ''
    }
  }

  componentDidMount(){
    this.getQuote();
  }

  getQuote(){
    fetch('https://thesimpsonsquoteapi.glitch.me/quotes', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
      this.setState({quote: data[0].quote});
      this.setState({author: data[0].character});
    })
  }
  
  render(){
    return <main className="App">
      <QuoteBox quote={this.state.quote} author={this.state.author} getQuote={() => this.getQuote()}/>
    </main>;
  }
}

class QuoteBox extends React.Component {
  render(){
    return <section id="quote-box">
      <p id="text">{this.props.quote}</p>
      <p id="author">{this.props.author}</p>
      <UserActions handleNewQuote={this.props.getQuote}/>
  </section>;
  }
}

function UserActions(props){
  return <section>
      <button id="new-quote" onClick={props.handleNewQuote}>New Quote</button>
      <a href="twitter.com/intent/tweet" target="blank" id="tweet-quote">Tweet Quote</a>
  </section>;
}

export default App;