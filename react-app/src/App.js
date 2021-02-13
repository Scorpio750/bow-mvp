import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LoremIpsum } from 'lorem-ipsum';

import icon from './assets/BoW-home-icon.png';
import Home from './containers/Home/Home';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Link className="home-nav" to="/"><img style={{ height: '10vmin' }} src={icon} /></Link>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/FAQ">
            <FAQ />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/tandc">
            <TandC />
          </Route>
          <Route path="/privacy">
            <Privacy />
          </Route>
          <Route path="/donations">
            <Donations />
          </Route>
          <Route path="/mailing">
            <MailingList />
          </Route>
        </Switch>

        <footer>
          <ul>
            <li className="footer-link">
              <Link to="/about">ABOUT</Link>
            </li>
            <li className="footer-link">
              <Link to="/faq">FAQ</Link>
            </li>
            <li className="footer-link">
              <Link to="/contact">CONTACT</Link>
            </li>
            <li className="footer-link">
              <Link to="/tandc">TERMS AND CONDITIONS</Link>
            </li>
            <li className="footer-link">
              <Link to="/privacy">PRIVACY</Link>
            </li>
            <li className="footer-link">
              <Link to="/donations">DONATIONS</Link>
            </li>
            <li className="footer-link">
              <Link to="/mailing">MAILING LIST</Link>
            </li>
          </ul>
        </footer>
      </div>
    </Router>
  );
}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

const About = () => (
  <div>
    <h1>About</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

const FAQ = () => (
  <div>
    <h1>FAQ</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

const Contact = () => (
  <div>
    <h1>Contact</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
)

const TandC = () => (
  <div>
    <h1>TandC</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

const Privacy = () => (
  <div>
    <h1>Privacy</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

const Donations = () => (
  <div>
    <h1>Donations</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

const MailingList = () => (
  <div>
    <h1>Mailing List</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

export default App;
