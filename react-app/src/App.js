import './App.css';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { LoremIpsum } from 'lorem-ipsum';

import icon from './assets/home-icon.png';
import Welcome from './containers/Welcome/Welcome';
import Feed from './containers/Feed/Feed';
import Login from './containers/LoginSignup/Login';
import Signup from './containers/LoginSignup/Signup';
import ArtistProfile from './containers/ArtistProfile/ArtistProfile';

export const App = props => {
  return (
    <Router>
      <div className="App">

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <header className="App-header">
          <Link className="home-nav" to="/feed"><img style={{ height: '10vmin' }} src={icon} /></Link>
          <Link className="login-nav" to="/login">login</Link>
        </header>
        <section className="App-body">
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route path="/feed">
              <Feed />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/artist-profile">
              <ArtistProfile />
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
            <Route exact path="/feed">
              <Feed />
            </Route>
          </Switch>
        </section>

        <footer>
          <ul className="footer-link-list">
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
  <div className="info-page">
    <h1>About</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

const FAQ = () => (
  <div className="info-page">
    <h1>FAQ</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

const Contact = () => (
  <div className="info-page">
    <h1>Contact</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
)

const TandC = () => (
  <div className="info-page">
    <h1>Terms and Conditions</h1>
    <p>DMCA notice:

      Body of Workers complies with the Digital Millennium Copyright Act. If you have a good faith belief that a work on this site is infringing, email the following information to info@bodyofworkers.com: your full name, description of and link to the original work, and link to the infringing work.
    </p>
  </div>
);

const Privacy = () => (
  <div className="info-page">
    <h1>Privacy</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

const Donations = () => (
  <div className="info-page">
    <h1>Donations</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

const MailingList = () => (
  <div className="info-page">
    <h1>Mailing List</h1>
    <p>{lorem.generateParagraphs(4)}</p>
  </div>
);

const mapStateToProps = state => ({
  user: state.user,
})

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
