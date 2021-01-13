import logo from './logo.svg';
import AppBar from "./Components/AppBar/AppBar"
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import SignUp from "./Components/SignUp/signUp"
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Switch>
     <Route ><AppBar /></Route>
     <Route path="/SignUp" component={SignUp}/>
     </Switch>
     </BrowserRouter >
    </div>
  );
}

export default App;
