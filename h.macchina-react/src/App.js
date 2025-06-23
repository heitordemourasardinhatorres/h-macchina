import React from 'react';
import Header from './components/Header';
import Intro from './components/Intro';
import About from './components/About';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import './styles/format.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Intro />
      <About />
      <Products />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;
