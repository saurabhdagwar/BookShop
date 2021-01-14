import logo from './logo.svg';
import AppBar from "./Components/AppBar/AppBar"
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import SignUp from "./Components/SignUp/signUp"
import Login from "./Components/LogIn/LogIn"
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
      <Switch>
     <Route path="appBar"><AppBar /></Route>
     <Route path="/SignUp" component={SignUp} exact/>
     <Route path="/Login" component={Login} exact/>
     </Switch>
     </BrowserRouter >
    </div>
  );
}

export default App;
