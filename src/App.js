import logo from './logo.svg';
import './App.css';
import CreateEntry from './components/CreateEntry';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CreateEntry />
      </header>
    </div>
  );
}

export default App;
