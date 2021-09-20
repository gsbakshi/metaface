import './App.css';

import Navigation from './components/navigation/navigation.component';
import ContentContainer from './pages/content-container/content-container.component';
import Footer from './components/footer/footer.components';

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <ContentContainer />
      <Footer />
    </div>
  );
}

export default App;

// eslint-disable-next-line no-lone-blocks
{/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}