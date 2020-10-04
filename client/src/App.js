import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      quote: '',
      author: '',
      error: ''
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
      this.setState({quote: data[0].quote, author: data[0].character});
    })
    .catch(() => {
      this.setState({error: 'An error has occured. Please try again later.'})
    });
  }
  
  render(){
    return <main className="App">
      <QuoteBox error={this.state.error} quote={this.state.quote} author={this.state.author} getQuote={() => this.getQuote()}/>
      <Footer />
    </main>;
  }
}

export function QuoteBox(props){
  return <section id="quote-box">
  <p id="text">{props.error ? props.error : props.quote}</p>
  <p id="author">{props.author}</p>
  <UserActions handleNewQuote={props.getQuote} quote={props.quote} author={props.author}/>
</section>;
}

export function UserActions(props){
  return <section id="button-box">
      <button id="new-quote" onClick={props.handleNewQuote}>New Quote</button>
      <a href={`https://twitter.com/intent/tweet?text=${props.quote} -${props.author}`} target="blank" id="tweet-quote">Tweet Quote</a>
  </section>;
}

export function Footer(){
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