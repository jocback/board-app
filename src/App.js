import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListBoardComponent from './components/ListBoardComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateBoardComponent from './components/CreateBoardComponent';
import ReadBoardComponent from './components/ReadBoardComponent';


function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
          <div className="container">
            <Switch>
              <Route path = "/" exact component={ListBoardComponent}></Route>
              <Route path = "/board" component={ListBoardComponent}></Route>
              <Route path ="/create-board" component={CreateBoardComponent}></Route>
              <Route path ="/modify-board/:boardNo" component={CreateBoardComponent}></Route>
              <Route path ="/read-board/:boardNo" component = {ReadBoardComponent}></Route>
            </Switch>
          </div>
        <FooterComponent/>
      </Router>
    </div>


    // <div className="App">
    //   <header className="App-header">
    //     <h1>Hello World</h1>
    //   </header>
    // </div>


  );
}

export default App;
