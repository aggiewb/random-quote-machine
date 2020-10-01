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
      <Footer />
    </main>;
  }
}

class QuoteBox extends React.Component {
  render(){
    return <section id="quote-box">
      <p id="text">{this.props.quote}</p>
      <p id="author">{this.props.author}</p>
      <UserActions handleNewQuote={this.props.getQuote} quote={this.props.quote} author={this.props.author}/>
  </section>;
  }
}

function UserActions(props){
  return <section id="button-box">
      <button id="new-quote" onClick={props.handleNewQuote}>New Quote</button>
      <a href={`https://twitter.com/intent/tweet?text=${props.quote} -${props.author}`} target="blank" id="tweet-quote">Tweet Quote</a>
  </section>;
}

function Footer(){
  return <footer>
    <div>
      <a href="https://www.aggiewb.com" rel="noreferrer noopener" target="_blank">Aggie Wheeler Bateman</a> &copy; {new Date().getFullYear()}
    </div>
    <div>
      API developed by <a href="https://jluboff-portfolio.glitch.me/" rel="noreferrer noopener" target="_blank">Jason Luboff</a>
    </div>
  </footer>;
}

export default App;