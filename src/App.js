//import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import Watchlist from './components/Watchlist';
import HomePage from './components/HomePage';
import MoviesPage from './components/MoviesPage';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';

function App() {
  return (
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={
              <>
                <HomePage />
              </>}
            />
            <Route path='/movies' element={
              <>
                <MoviesPage />
              </>}
            />
            <Route path='/watchlist' element={
              <>
                <Watchlist />
              </>
            } />
          </Routes>
        </BrowserRouter>
      </React.Fragment>
    </Provider>
    
  );
}

export default App;
