import logo from './assets/body of workers.png';
import './App.css';

import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Enter.
        </a>
      </header>
      <Footer />
    </div>
  );
}

export default App;
