import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Forum from './pages/Forum'
import Post from './pages/Post'
import Inscription from './pages/Inscription'
import Header from './components/Header'
import Footer from './components/Footer'
import Error from './components/Error'
import GlobalStyle from './utils/style/GlobalStyle'
import { ConnexionInfoProvider } from './utils/context'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <ConnexionInfoProvider>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="inscription" element={<Inscription />} />
          <Route path="forum" element={<Forum />} >
            <Route path=":postNumber" element={<Post/>} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </ConnexionInfoProvider>
    </Router>
  </React.StrictMode>
)
