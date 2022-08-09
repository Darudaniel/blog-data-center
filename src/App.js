import logo from './logo.svg';
import './App.css';
import CreateEntry from './components/CreateEntry';
import Register from './components/Register';
import EntriesList from './components/EntriesList'
import Login from './components/Login';
import CreateLead from './components/CreateLead';

function App() {

  return (
    <div className="App">
      <div className="app-container">
        <img src={logo} className="App-logo" alt="logo" />
        <Register />
        <CreateEntry />
        <CreateLead />
        <Login />
      </div>
      <EntriesList />
    </div>
  );
}

export default App;
