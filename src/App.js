import React from 'react';
import './App.css';
import p from 'prop-types';
import get from 'lodash';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from 'history';
import { LoremIpsum } from 'lorem-ipsum';
import placeholder from './assets/sexy_placeholder.jpg';
import { fetchUser, logout } from './store/actions/user';

import icon from './assets/home-icon.png';
import Welcome from './containers/Welcome/Welcome';
import Feed from './containers/Feed/Feed';
import Login from './containers/LoginSignup/Login';
import Signup from './containers/LoginSignup/Signup';
import ArtistPage from './containers/ArtistPage/ArtistPage';
import ArtworkIntake from './containers/ArtworkIntake/ArtworkIntake';
import Artwork from './containers/Post/ArtworkView';
// import Privacy from './containers/Privacy/Privacy'
import NotFound from './containers/NotFound/404';
// import Legals from './containers/Legals/Legals';
import { HashLink } from 'react-router-hash-link';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const cache = JSON.parse(localStorage.getItem('kowtowbitches'))
    const currentUser = get(cache, 'user')
    this.setState(currentUser)
  }

  handleLogout(e) {
    // e.preventDefault();
    this.props.logout();
  };

  render() {
    const isLoggedIn = Object.keys(this.props.user).length > 0;

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
            {!this.props.user.id ?
              <Link className="login-nav" to="/login">login</Link> :
              <React.Fragment>
                <span className="user-greeting"> hello {this.props.user.username}</span>
                <a href="/login" className="login-nav" onClick={() => this.handleLogout()}>logout</a>
              </React.Fragment>
            }
          </header>
          <section className="App-body">
            <Switch>
              <Route exact path="/" component={Welcome} />
              <Route exact path="/feed" component={Feed} />
              <Route exact path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/artist-page/:postId" component={ArtistPage} />
              <Route path="/artwork/:postId" component={Artwork} />
              <Route path="/artwork-intake" component={ArtworkIntake} />
              <Route path="/about" component={About} />
              <Route path="/FAQ" component={FAQ} />
              <Route path="/contact" component={Contact} />
              <Route path="/donate" component={Donate} />
              <Route path="/legals" component={Legals} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/:any" component={NotFound} />
            </Switch>
          </section>

          <footer>
            <div className="footer-link-list">
              <p className="footer-link">
                <Link to="/about">ABOUT</Link>
              </p>
              <p className="footer-link">
                <Link to="/faq">FAQ</Link>
              </p>
              <p className="footer-link">
                <Link to="/contact">CONTACT</Link>
              </p>
              <p className="footer-link">
                <Link to="/donate">DONATE</Link>
              </p>
              <p className="footer-link">
                <Link to="/legals">LEGALS</Link>
              </p>
              <p className="footer-link">
                <Link to="/privacy">PRIVACY</Link>
              </p>
            </div>
          </footer>
        </div>
      </Router>
    );
  }
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
    <h4>What is Body of Workers?</h4>
    <div>
      <p>
        <li>BoW is a free (for sex workers) virtual art gallery honoring the artist, content creator, personatrix, and exhibitionist in you</li>
        <li>BoW is a place to share and archive your practice, to indulge and inspire your community</li>
        <li>BoW is the locker room behind the curtain, where glitter, ca$h, and stale champagne spill over</li>
        <li>BoW is a record of our underground creativity and resistance</li>
        <li>BoW is a way for art patrons and curators to find you and interact with your artSwork (should you choose)</li>
      </p>
    </div>
    <h4>Who are we?</h4>
    <div>
      <p>
        We are a collective of sex workers and allies who believe that the decriminalization of sex work would make the world a safer and more equitable place for women, trans, queer, migrant, and other marginalized workers.
        We believe in an open and free platform where our artistic contributions can live without fear of censorship.
      </p>
    </div>
  </div>
);

const FAQ = () => (
  <div className="info-page">
    <h1>FAQ</h1>
    <div>
      <h4>What is Body of Workers all about?</h4>
      <p>
        Body of Workers is a private gallery created by and for sex worker artists. BoW intends to serve as an art sanctuary for sex workers, an act of resilience against the gentrification of the internet, and a peepshow to the art patron.
      </p>
    </div>

    <div>
      <h4>Why should I post here instead of Twitter, Instagram, TikTok, Snapchat, etc.?</h4>
      <p>
        Unlike other social media platforms that shadowban and censor our lifestyles, BoW is a celebration of our survival and creative force.
      </p>
    </div>

    <div>
      <h4>Is this a safe space for sex worker content?</h4>
      <p>
        This is a space FOR Sex Worker ART.
        We must enforce NO advertisement language or links to professional sex trade sites for legal purposes.
        We also strictly enforce our <a href="https://docs.google.com/document/d/1zHqcs2Xht_WO0X4cxKrvBkBJQAxj1J_Jh1KMvDWH1sA/edit" target="_blank" rel="noopener noreferrer">community agreements</a>.
      </p>
    </div>

    <div>
      <h4>Can I post whatever I want on this site?</h4>
      <p>
        No. We do not accept any art that includes persons under 18 years of age, coercion, force, beastiality, human trafficking, nor race play.
        Please consider trigger warnings if your work is, well, triggering. If you’re not sure, just ask us: <a href="mailto:info@bodyofworkers.com">info@bodyofworkers.com</a>.
      </p>
    </div>

    <div>
      <h4>Do I lose rights to my uploaded work if I post here? Will my uploaded content be used to advertise Body of Workers?</h4>
      <p>
        Your work is completely yours -- you retain the copyright to any uploaded artwork.
        We will never use your work to advertise Body of Workers without complete consent.
      </p>
    </div>

    <div>
      <h4>Who needs to have a paid membership to fully access Body of Workers?</h4>
      <p>
        Anyone who is NOT listed as a sex worker artist on the platform must pay for the priviledge of viewing the BoW gallery.
        If the ticket pricing is problematic for you or if you are a sex worker, but not an artist, please send an inquiry to <a href="mailto:info@bodyofworkers.com">info@bodyofworkers.com</a>.
      </p>
    </div>

    <div>
      <h4>Is there a storage limit for users’ uploaded work?</h4>
      <p>
        Yes. We will post more information about uploading artwork soon.
      </p>
    </div>

    <div>
      <h4>Am I able to advertise and safely connect with patrons, clients, and other interested parties?</h4>
      <p>
        While there is no advertising allowed for sex work, your art is promoted to patrons and curators and website visitors can follow a link to your external website, beyond the Body of Workers platform, if you add one to your profile.
      </p>
    </div>

    <div>
      <h4>Is my personal information safe with Body of Workers?</h4>
      <p>
        YES. We would NEVER share your personal information without your consent.
      </p>
    </div>
  </div>
);

const Contact = () => (
  <div className="info-page">
    <h1>Contact</h1>
    <div><p>
      Please email all inquiries to: <a href="mailto:info@bodyofworkers.com">info@bodyofworkers.com</a></p>
    </div>
    <h4>Follow</h4>

    <a href="https://www.instagram.com/bodyofworkers/" target="_blank" rel="noopener noreferrer">Instagram</a>

    {/* <p><b>Our Partners:</b></p>

      <p><b>Kink Out</b> <a href="https://www.instagram.com/kinkoutevents" target="_blank" rel="noopener noreferrer">Instagram</a>, <a href="https://twitter.com/kinkoutevents" target="_blank" rel="noopener noreferrer">Twitter</a>, and <a href="https://www.facebook.com/kinkoutevents" target="_blank" rel="noopener noreferrer">Facebook</a></p>
      <p><b>Veil Machine</b> <a href="https://www.instagram.com/veilmachine" target="_blank" rel="noopener noreferrer">Instagram</a> and <a href="https://twitter.com/veil_machine" target="_blank" rel="noopener noreferrer">Twitter</a></p>
      <p><b>Red Canary Song</b> <a href="https://www.instagram.com/redcanarysong" target="_blank" rel="noopener noreferrer">Instagram</a> and <a href="https://twitter.com/RedCanarySong" target="_blank" rel="noopener noreferrer">Twitter</a></p>
      <p><b>IWD NYC Coalition</b> <a href="https://www.instagram.com/iwdnyc" target="_blank" rel="noopener noreferrer">Instagram</a> and <a href="https://twitter.com/iwdnyc" target="_blank" rel="noopener noreferrer">Twitter</a></p> */}
  </div>
);

const Donate = () => (
  <div className="info-page">
    <h1>Donate</h1>
    <div>
      <p>Thank you for perusing the Body of Workers prototype. As we head into further development, BoW needs funds to pay our tech team and community outreach team. Please donate via:</p>
      <p><strong>Paypal:</strong> <a href="https://www.paypal.com/donate?hosted_button_id=E8V48PXH3B6BY" target="_blank" rel="noopener noreferrer">https://www.paypal.com/donate?hosted_button_id=E8V48PXH3B6BY</a></p>
      <p><strong>Venmo:</strong> @Q13LLC</p>
    </div>

    <h4>Reach Out</h4>
    <div>
      <p>To offer other types of support, please reach out: <a href="mailto:info@bodyofworkers.com">info@bodyofworkers.com</a></p>
    </div>
  </div>
);

const Legals = () => {
  return (
    <div className="info-page">
      <h1>Legals</h1>

      <HashLink to="/legals#terms">Terms of Service</HashLink>
      <br />
      <HashLink to="/legals#contentLicensing">Content Licensing</HashLink>

      <div id="terms" />
      <h4>Terms of Service</h4>
      <p><i>Last updated: February 17, 2021</i></p>
      <p>Please read these Terms of Service (“Terms,” “Terms of Service”) carefully before using the Body of Workers website (the “Service” or the “Site”). Please also read the <a href="/privacy">Privacy Policy</a>, which is incorporated into these Terms of Service.</p>
      <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.</p>
      <p>By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, please do not access the Service.</p>

      <h4>Ability to Accept Terms of Service</h4>
      <p>You affirm that you are at least 18 years of age or the age of majority in the jurisdiction you are accessing the Service from and are fully able to enter into and comply with the terms and conditions set forth in these Terms of Service. If you are under 18 or the applicable age of majority, please do not use the Service. You also represent that the jurisdiction from which you access the Service does not prohibit the receiving or viewing of sexually explicit content.</p>

      <h4>Termination</h4>
      <p>We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>

      <h4>The Site</h4>
      <p>Body of Workers allows for uploading, sharing and general viewing of various types of content by registered users. Some of this content may include adult-oriented content, including sexually explicit images.</p>
      <p>Please refer to our <a href="https://docs.google.com/document/d/1zHqcs2Xht_WO0X4cxKrvBkBJQAxj1J_Jh1KMvDWH1sA/edit" target="_blank" rel="noopener noreferrer">Community Agreements</a> to understand what content is prohibited from the Site. We may, in our sole discretion and at any time, remove any content on the Site.</p>
      <p>You understand and acknowledge that you may be exposed to content that you find offensive, indecent, or objectionable, and you agree to waive, and hereby do waive, any legal or equitable rights or remedies you have or may have against the Site with respect thereto. You agree to indemnify and hold harmless the Site, the site operators, the Site’s  affiliates, licensors, service providers, officers, directors, employees, agents, successors and assigns to the fullest extent allowed by law regarding all matters related to your use of the Site.</p>
      <h4>Communication Preferences</h4>
      <p>By using the Site, you consent to receiving electronic communications from us relating to your account. This may include notices about your account, updates to the website’s Terms of Service, newsletters, offers, and other announcements. You agree that any notices, agreements, disclosures or other communications that we send to you electronically will satisfy any legal communication requirements, including that such communications be in writing.</p>

      <h4>Contact Us</h4>
      <p>If you have any questions about these Terms, please contact us at <a href="mailto:info@bodyofworkers.com">info@bodyofworkers.com</a></p>

      <div id="contentLicensing" />
      <h1>Content Licensing</h1>

      <h4>Plain Language Explanation:</h4>
      <p>When you upload content to Body of Workers, you retain ownership of any art that you have created. In order for us to run the site, we need your permission to host and display your intellectual property (the photos, writing, videos, and other works that you submit to the site). This license gives us that legal permission. The broad language allows us to create functionality, like our user artwork pages, that features your artwork. The permissions for “derivative works” allow Body of Workers to run various features of the site, such as creating the feed of images that users see upon login, and is not intended to give us the ability to make substantive edits to your artwork.</p>
      <p>In using our services, you agree that you will only upload your own work, and that you have obtained the necessary legal permissions for any third-party contributions to or depictions in your artwork (for instance, obtaining a model release from the subject of a portrait).</p>

      <h4>User Content License to Body of Workers: </h4>
      <p>You retain all ownership rights to your content, but grant Body of Workers the following license:</p>
      <p>By sharing, posting, or otherwise providing content to Body of Workers on or through our Services, you grant us a non-exclusive, worldwide, royalty-free, sublicensable, transferable right and license to use, host, store, cache, reproduce, publish, display (publicly or otherwise), perform (publicly or otherwise), distribute, transmit, modify, adapt, translate, and create derivative works of your content in any and all media now known or later developed. The rights you grant to Body of Workers in this license are for the limited purposes of allowing us to operate our Services, improve and promote those Services, and develop new Services (consistent with your privacy and application settings).</p>
      <p>In providing content to Body of Workers, you represent and warrant that:</p>

      <ol type="I">
        <li>you own or otherwise control all rights, power, and authority necessary to grant the rights to your content described herein</li>
        <li>the use of your content does not violate our community agreement. Because you bear sole responsibility for your content, posting or sharing content without the necessary rights can expose you to legal liability.</li>
      </ol>
    </div>
  )
};

const Privacy = () => (
  <div className="info-page">
    <h1>Privacy</h1>

    <p>
      <b>We are committed to building a platform that is safe and accessible to our community.
      We know that privacy policies and terms of services are usually wielded as weapons to hurt,
      and not protect us. Ours will be different. The Privacy Policy you’ll find below is only a work in progress.
      Look for an email from us soon announcing our official legal agreements,
      and we hope to hear feedback from you about how we can make this space the virtual safehouse we hope it can become.</b>
    </p>

    <p><i>Last updated: April 8, 2021</i></p>

    <p>
      Body of Workers (“Site”) is committed to protecting personal data and does not sell data it collects from users.
      This Privacy Policy explains how we collect, use, disclose,
      and safeguard your information when you visit our website.
    </p>

    <p>
      Please note that this Privacy Policy does not apply to information collected through third-party websites
      or services that you may access through the Site or that you send to us through e-mail.
    </p>

    <p>
      By using this website, you accept the terms of this Privacy Policy and our Terms of Service and consent to the
      collection, use, disclosure, and storage of information as described in this Privacy Policy.
    </p>

    <h4>How We Collect Information</h4>

    <p>
      Whether we collect certain types of information and how we process it depends on how you use and access the Services.
      We collect information about you in the following ways when you:
    </p>

    <ul>
      <li><b>Access the Site.</b> Information we collect from visitors may include:</li>
      <li className="indent1">Derivative Data: Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site. We delete this information after 30 days.</li>
      <li className="indent2">f you have issues with us collecting your IP address, you might try using a VPN or the Tor web browser.</li>
      <li className="indent1">Mobile Device Data: Device information, such as your mobile device ID, model, and manufacturer, and information about the location of your device, if you access the Site from a mobile device.</li>
      <li className="indent1">A note on third-party cookies and other data collection tools: Body of Workers uses tokens in lieu of cookies. Tokens do not store access data with the Site’s servers.</li>

      <br />

      <li><b>Create an account.</b> From persons who create an account on Body of Workers (“registered users”), we collect the following information:</li>
      <li className="indent1">The same categories of information described above for unregistered users.</li>
      <li className="indent1">Contact Information: Username and email address.</li>
      <li className="indent1">Personal Information: Personal pronouns are required to sign up for the site. Providing other Personal Information, such as location information, is optional.</li>

      <br />

      <li><b>Complete an Artist Intake Form.</b> From artists who complete an artist intake form and are given a profile on the site, we collect the following information:</li>
      <li className="indent1">The same categories of information described above for unregistered users.</li>
      <li className="indent1">Contact Information: Artist name and email address.</li>
      <li className="indent1">User Contributions including Audio/Video Information: We provide areas on our Websites where you can post information about yourself and others and upload content (e.g., pictures, video files, etc.).</li>
      <li className="indent1">Personal Information: Our intake form requires artists to provide their email, city, state, country, and a short biography. Providing other Personal Information, such as personal pronouns, social media URLs, identity notes, and accessibility notes, is optional.</li>
      <li className="indent2">Please note: Our intake form is hosted by Airtable. You can read Airtable’s privacy policy <a href="https://airtable.com/privacy" target="_blank" rel="noopener noreferrer">here</a>.</li>
    </ul>

    <h4>How We Use Your Information</h4>

    <p>
      We may use the information we collect for any of the following purposes:
    </p>

    <ul>
      <li>to provide the Site to you;</li>
      <li>for customer service, security, to detect fraud or illegal activities, or for archival and backup purposes in connection with the provision of the Site;</li>
      <li>to communicate with users; and</li>
      <li>to enforce our Terms of Service or other applicable policies.</li>
    </ul>

    <h4>How We Share and Disclose Your Information</h4>

    <p>
      The term “Personal Information,” as used below, is information associated with or used to identify or
      contact a specific person. Personal Information includes: (1) contact data (such as e-mail address);
      (2) demographic data (such as pronouns); (3) user-generated content; and (4) certain usage data (such as IP address).
    </p>

    <p>We may share and disclose Personal Information as follows:</p>

    <ul>
      <li><b>With third party service providers performing services on our behalf.</b> We share information, including Personal Information, with our service providers to perform the functions for which we engage them (such as hosting).</li>
      <li><b>For legal purposes.</b> We also may share information that we collect from users, as needed, to enforce our rights or protect the rights or safety of others, or as needed to support external auditing, compliance and corporate governance functions. We will disclose Personal Information as we deem strictly necessary to respond to a subpoena, regulation, binding order of a data protection agency, legal process, governmental request or other legal or regulatory process. We may also share Personal Information as required to pursue available remedies or limit damages we may sustain.</li>
      <li><b>When you consent.</b> In all other cases, we will only share Personal Information you have shared with us when you give us your opt-in consent.</li>
    </ul>

    <h4>Information Storage and Security</h4>

    <p>
      We retain information as long as it is necessary and relevant for our operations.
      We also retain Personal Information to comply with applicable law, prevent fraud, resolve disputes,
      troubleshoot problems, assist with any investigation, enforce our Terms of Service, collect any fees owed,
      and other actions permitted by law. After it is no longer necessary for us to retain information,
      we dispose of it according to our data retention and deletion policies.
    </p>

    <p>
      We employ security measures designed to protect the security of all information submitted through the Site.
      However, the security of information transmitted through the internet can never be guaranteed.
      We are not responsible for any interception or interruption of any communications through the
      internet or for changes to or losses of data. Users of the Site are responsible for maintaining
      the security of any password, user ID or other form of authentication involved in obtaining access to
      password protected or secure areas of any of our digital services. In order to protect you and your data,
      we may suspend your use of the Site, without notice, pending an investigation, if any breach of security is
      suspected. Access to and use of password protected and/or secure areas of the Site are restricted to authorized
      users only. Unauthorized access to such areas is prohibited.
    </p>

    <h4>Your Rights</h4>

    <p>
      It is important to us that you are able to access and review the Personal Information we have about
      you and make corrections to it or delete it, as necessary. You can visit your account to manage and correct
      the information we have on file about you. If you have any questions about how to access your Personal Information,
      please contact us at <a href="mailto:info@bodyofworkers.com">info@bodyofworkers.com.</a>
    </p>

    <h4>Disclaimer: Not Child-Directed</h4>

    <p>
      The Site is not intended for use by persons under the age of 18 or the applicable age of majority
      in the jurisdiction from which the Site is accessed, and we prohibit minors from using the Site.
      We do not knowingly collect personal information from minors. If you are the parent or legal guardian of a
      minor who has provided us with personal information, then please contact us at <a href="mailto:info@bodyofworkers.com">info@bodyofworkers.com</a> to have that minor’s personal information deleted.
    </p>

    <h4>GDPR (General Data Protection Regulation)</h4>

    <p>
      In accordance with the General Data Protection Regulation law in the European Union effective May 25, 2018,
      Site users can request a copy of their personal data as well as get Body of Workers to delete their personal data.
    </p>

    <h4>California Consumer Privacy Act</h4>

    <p>The California Consumer Privacy Act (“CCPA”) provides you certain rights in relation to your personal information:</p>

    <ul>
      <li>You have the right to request disclosure of the categories of Personal Information that we have collected from you in the past 12 months.</li>
      <li>You have the right to request disclosure of the specific Personal Information that we have collected from you in the past 12 months.</li>
      <li>You have the right to request a statement that we have not sold your Personal Information in the past 12 months.</li>
      <li>You have the right to request that we delete any of the personal information we collected from you and retained, subject to certain exceptions set forth in the CCPA.</li>
    </ul>
  </div>
);

const Eyebeam = () => (
  <div className="info-page">
    <h1>Eyebeam</h1>
    <div>
      <h3> LOW ART/HIGH STANDARDS: PROGRAM COPY</h3>
      <img
        src='https://bodyofworkers.nyc3.digitaloceanspaces.com/BoW_Promo_Panel_Twitter.png'
        alt='watch the panel at fromtherupture.eyebeam.org'
        width="50%"
      />

      <h5>An Artistic Panel produced by Veil Machine and Kink Out:</h5>

      <p>
        Low Art/High Standards: Towards a New Understanding of Sex, Art, and Tech in the 21st Century
        February 20, 2021 4:45pm-6:15pm EST
      </p>
      <p>
        Low Art/High Standards is a fictional panel that engages six archetypes from the sex work movement and art world in dialogue about Body of Workers and E-Viction. We will explore the lines between sex work and art, the commodification of desire, eroticism of censorship, and the political stakes in reclaiming space for sex workers online. Each archetype offers a perspective. Each has something to gain. Each holds a different funhouse mirror up to the viewer.
      </p>
      <p>
        As sex working artists, the validity of our creations are challenged at every turn: the erotica we make is censored, and the art we create has little value. Both Body of Workers and E-Viction (2020) respond to this by revealing what we can learn from looking at art through the lens of sex work and vice versa. Both E-Viction and Body of Workers are direct responses to COVID-19. We are in the midst of a pandemic that requires us to share space online, while rampant gentrification of the internet by corporations and laws like SESTA/FOSTA threaten sex workers’ access to digital space. By challenging, parodying, and subverting the politics of digital space, these projects imagine what the internet can be -- not only for sex workers, but for everyone.
      </p>
      <p>
        The panel begins with three screenings of satirical tours of sex workers’ “artist studios,” before launching a discussion of Body of Workers, E-Viction, and the lines between sex work and art.
      </p>
      <ul className="eyebeamList">
        <h5>Overview of Panel</h5>
        <li>4:45pm - 5:00pm - Screenings of Artist Studio
          Visits (Shayla Lange, Domme Discordia, Liminal Praxis)</li>
        <li>5:00pm-5:15pm - Introducing Body of Workers</li>
        <li>5:15pm-6:15pm - Panel Discussion</li>
      </ul>
      <ul className="eyebeamList">
        <h5>Characters:</h5>

        <li>THE CURATOR: A curator at the Contemporary Museum of American Art. Received the “Hot Curatorial Award” in 2020 for their commitment to showing the most titillating art by the most marginalized and tokenized artists across the US. Produced the catalogue Relational Thinking Through Artistic Dialogue.
          </li>
        <li>
          THE CRITIC: The foremost scholar in their field of post-postmodern hyper-criticism. They wrote the book Queering Queerness: Towards Even More Queer Theories of Contemporary Performance.
          </li>
        <li>
          THE DEALER: Head of The Dealer Gallery, with locations in New York, Los Angeles, and Milan. His first show Piss/Art was a legendary success, and he is renowned for his capacity to turn art into gold.
          </li>
        <li>
          THE ARTIST: Almost has a BFA in Painting. Now does bespoke one on one art pieces with high paying collectors. You can find more of her body and work on the Body of Workers platform.
          </li>
        <li>
          THE LOBBYIST: The head of a wombyn-led anti-trafficking nonprofit, and a leader of WAP: Wombyn Against Pornos, of course. In 2020 she was recognized as “Mother of the Feminist Movement Award” for having personally rescued dozens of survivors who have since become feminist role models.
          </li>
        <li>
          THE COLLECTOR: Works in a distinguished financial institution, and has a strong interest in supporting sex worker art in every way that makes him feel more generous and necessary.
          </li>
      </ul>
      <ul className="eyebeamList">
        <h5>  Artists from Studio Visits: </h5>
        <li>
          Shayla Lange: Shayla Lange is a Brooklyn-based Pro Domme and kink educator. She likes dogs (both animal and human), cheese, and long romantic walks down the fasteners aisle of the hardware store.
          </li>
        <li>
          Liminal Praxis: EPB is a writer, visual artist, performer & researcher who plays in the space between theory and practice. In her writing, she parallels her observations of the art world with academic discourse and the politics of sex work. She is the Head Mistress of Liminal Praxis. Liminal Praxis is a performance based project and can be found online at www.liminalpraxis.com. The online space contains archival material from performances beginning in 2001 and running through 2021. These performances touch on themes between esoteric & erotic, head spaces & somatic impressions, lived experience & multiple theoretical frameworks.
          </li>
        <li>
          Domme Discordia: Domme Discordia is a professional dominatrix of nine years, currently based in NYC. Deep Space is their work and play dominion, designed with ornate functionality as well as visual pleasure in mind. Emphasis on a bold color palette combined with customizable lighting design lend the dungeon dramatic flexibility for the range of scenes enacted within the space. Discordia, aka Disco, aka Joules McKnuckles' projects have included Thirst Fursdays, a monthly queer art and music residency, pirate transmissions for People Will Radio, hosting absurdist speed dating with Erica Nix, and various engagements with Holodeck Records videos. Their other fascinations include DJ-ing, writing poetry and memoirs, and hosting orgies.
          </li>
      </ul>
      <ul className="eyebeamList">
        <h5>Panelists:</h5>
        <li>
          Tina Horn: Tina Horn hosts and produces the long-running kink podcast Why Are People Into That?!. She is also the creator and writer of the sci-fi sex-rebel comic book series SfSx (Safe Sex). Her reporting on sexual subcultures and politics has appeared in Rolling Stone, Playboy, Hazlitt, Glamour, Jezebel and elsewhere; she is the author of two nonfiction books and has contributed to numerous anthologies including the queer horror collection Theater of Terror and We Too: Essays on Sex Work and Survival, which she also co-edited. Tina has lectured on sex worker politics and queer BDSM identities at universities and community centers all over North America, and works as an on-set consultant for theater and television including the dominatrix scenes of Pose. She is a LAMBDA Literary Fellow, an AVN nominee, the recipient of two Feminist Porn Awards, and holds an MFA in Creative Nonfiction Writing from Sarah Lawrence. Tina is currently working on her first scripts for film and television. You can follower her on Twitter and Instagram @TinaHornsAss
          </li>
        <li>
          Ze Royale: Ze Royale is a writer, performance artist, sexual anarchist, and pleasure activist whose philosophy of subjectivity and individualism is threaded in all of their work. Provocation, eccentricity, and erotic neurosis are shown through visual representation. Ze performs in text, film, and via chanting rituals in the music duo Zoid^. New work: performance installation called Daymares. @ze.royale
          </li>
        <li>
          Empress Wu: Wu is a social media coordinator and digital archivist for arts nonprofits, who enjoys being mean to people for money, and nice to them for free. She and Her work have been featured at MoMA PS1, Satellite Art Fair, Leslie Lohman Museum, and the Performa Biennial. www.empresswu.net/creative
          </li>
        <li>
          Niko Flux: Niko Flux is a Pro Domme by day, traveling artist by night. She is the co-founder of Veil Machine, a member of Red Canary Song, and a collaborator with Kink Out.
          </li>
        <li>
          Danielle Blunt: Danielle Blunt (she/her) is a New York City based professional Dominatrix. Blunt is a co-founder of Hacking//Hustling, a collective of sex workers and accomplices working at the intersection of tech and social justice to interrupt state surveillance and violence facilitated by technology. Blunt is on the advisory board of Berkman Klein's Initiative for a Representative First Amendment (IfRFA) and is one of the 2020 recipients of EFF’s Pioneer Award. You can follow her kinky adventures on OnlyFans (https://onlyfans.com/MistressBlunt) and AVNStars (http://stars.avn.com/MistressBlunt)
          </li>
        <li>
          Lena Chen: Lena Chen (b. 1987, San Francisco) is a Chinese American writer and artist working across performance and social practice. Named “Best Emerging Talent” at the B3 Biennial of the Moving Image (Frankfurt), she has performed and exhibited at Transmediale (Berlin), Die Digitale (Düsseldorf), Museum of Modern Art (Antwerp), Färgfabriken (Stockholm), Tempting Failure (London), and Baltimore Museum of Art, among others. She holds a B.A. in sociology from Harvard University, and is currently pursuing her MFA at Carnegie Mellon University’s School of Art, where she holds the Lea Simmons Fellowship. She is based between Pittsburgh and Berlin.
          </li>
      </ul>
      <ul className="eyebeamList">
        <h5>Crew</h5>
        <li>
          Sybil Fury: Sybil Fury is interested in the intersections of intimacy and labor, which she explores as a graduate student, curator, organizer, and sex worker. She is a co-founder of Veil Machine and frequent collaborator with Kink Out.
          </li>
        <li>
          Eli: Eli is a freelance stage manager and a full time coordinator and artist wrangler. She is a frequent collaborator with Kink Out and was on the Veil Machine production team for E-Viction.
          </li>
        <li>
          About Veil Machine:
          Veil Machine is a project that poses the question: when we see sex work as a radical art practice, what new worlds are possible? At its core, sex work, like artwork, is about the interplay between fantasy and reality, intimacy and lies. The veil machine, like the sex worker and artist, manipulates through masks. Using the relational practices we cultivate through kink and sex work, we create experimental art pieces.
          </li>
        <li>
          About Kink Out:
          Kink Out produces empowering events that bring people of intersectional identities with lived experience in BDSM culture together to share art, activism, work, and conversation. We provide an arena for the diverse leather and kink communities in NYC to celebrate and build alliances with each other. Our events are helmed by rotating contributors who are queer, sex workers, people of color, trans, femme, butch, gender non-conforming, disabled, parents, non-monogamous, fat, elders, and/or leather dykes/fags.
          </li>
      </ul>

      <p>
      </p>
    </div>
  </div>
);

App.propTypes = {
  user: p.object,
  logout: p.func,
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchUser: () => dispatch(fetchUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
