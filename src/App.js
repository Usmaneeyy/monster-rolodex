import './App.css';
import React,{ Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
     .then(res => res.json())
     .then(users => this.setState({monsters: users}))
     .catch(err => console.log(err));
  };

  handleChange = e => {this.setState({searchField: e.target.value}, () => {
        console.log(this.state); //Right after setState is done this is logged.
      });
      // console.log(this.state); //This console log is one char behind cuz setState is async 
    }

  render() {
    const { monsters,searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    )
    return (
      <div className="App">
        <h1>Cats Rolodex</h1>
        <SearchBox
          placeholder={'search cats'}
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }
}

export default App;
