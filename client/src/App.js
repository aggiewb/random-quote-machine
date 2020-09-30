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
      <QuoteBox quote={this.state.quote} author={this.state.author}/>
    </main>;
  }
}

function QuoteBox(props){
  return <section id="quote-box">
    <p id="text">{props.quote}</p>
    <p id="author">{props.author}</p>
    <button id="new-quote">New Quote</button>
    <button id="tweet-quote">Tweet Quote</button>
  </section>;
}

export default App;