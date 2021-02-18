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
import ArtworkIntake from './containers/ArtworkIntake/ArtworkIntake';

export const App = props => {
  const isLoggedIn = Object.keys(props.user).length > 0;
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
        { !isLoggedIn ?
          <Link className="login-nav" to="/login">login</Link> :
          <Link className="login-nav">Logout</Link>
        }
        </header>
        <section className="App-body">
          <Switch>
            <Route exact path="/">
              <Welcome />
            </Route>
            <Route exact path="/feed">
              <Feed />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/artist-profile">
              <ArtistProfile />
            </Route>
            <Route path="/artwork-intake">
              <ArtworkIntake />
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
    <h4>What is BOW?</h4>
    <div><p>
      <li>BOW is a free (for sex workers) virtual art gallery honoring the artist, content creator, personatrix, and exhibitionist in you </li>
      <li>BOW is a place to share and archive your practice,to indulge and inspire your community</li>
      <li>BOW is the locker room behind the curtain, where glitter, ca$h and stale champagne spill over
      </li>
      <li>BOW is a record of our underground creativity and resistance
      </li>
      <li>BOW is a way for art patrons and curators to find you and interact with your artSwork (should you choose)
      </li></p>
      </div>
    <h4>Who are we?</h4>
    <div>
    <p>We are a collective of sex workers and allies who believe that decriminalization of sex workers would make the world a safer and more equitable place for women, trans, queer, migrant, and other marginalized workers. We believe in an open and free platform where our artistic contributions can live without fear of censorship.
    </p>
    </div>
  </div>
);

const FAQ = () => (
  <div className="info-page">
    <h1>FAQ</h1>
    <div>
    <h4>What is BOW all about?</h4>
    <p>
    Body of Workers is a private gallery created by and for sex worker artists. BoW intends to serve as an art sanctuary for sex workers, an act of resilience against the gentrification of the internet, and a peepshow to the art patron.
    </p>
    </div>

    <div>
    <h4>Why should I post here instead of Twitter, Instagram, TikTok, Snapchat, etc.? </h4>
    <p>
    Unlike other social media platforms that shadowban and censor our lifestyles, BoW is a celebration of our survival and creative force.
    </p>
    </div>

    <div>
    <h4>Is this a safe space for sex worker content? </h4>
    <p>
    This is a space FOR Sex Worker ART. We must enforce NO advertisement language or links to professional sex trade sites for legal purposes. We also strictly enforce our community standards.
    </p>
    </div>

    <div>
    <h4>Can I post whatever I want on this site?</h4>
    <p>
    No. We do not accept any art that includes underage persons, coercion, force, beastiality, human trafficking, nor race play. Please consider trigger warnings if your work is, well, triggering. If you’re not sure, just ask us (not your grandma).
    </p>
    </div>

    <div>
    <h4>Do I lose rights to my uploaded work if I post here? Will my uploaded content be used to advertise BOW? </h4>
    <p>
    Your work is completely yours and we will never use your work to advertise BoW unless done with complete consent and compensation to the artist.
    </p>
    </div>

    <div>
    <h4>Who needs to have a paid membership to fully access BOW? </h4>
    <p>
    Anyone who is NOT a sex worker artist must pay for the priviledge of viewing the gallery. If the ticket pricing is problematic for you or if you are a sex worker, but not an artist, please send an inquiry to info@bodyofworkers.com
    </p>
    </div>

    <div>
    <h4>Is there a storage limit for users’ uploaded work? </h4>
    <p>
    Yes
    </p>
    </div>

    <div>
    <h4>Am I able to advertise and safely connect with patrons, clients and other interested parties?  </h4>
    <p>
    While there is no advertising allowed for sex work, your art is promoted to patrons and curators and anyone is able to search your work beyond the BoW space.
    </p>
    </div>

    <div>
    <h4>Is my personal information safe with BOW?</h4>
    <p>
    YES. We would NEVER share your personal information.
    </p>
    </div>

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
