import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Forum from './pages/Forum'
import Post from './pages/Post'
import Inscription from './pages/Inscription'
import Header from './components/Header'
import Error from './components/Error'
import GlobalStyle from './utils/style/GlobalStyle'
import Creation from './pages/Creation';
import { ConnexionInfoProvider } from './utils/context'

//Lancement de React
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
{/*On donne les informations de connection à tout les éléments*/}
      <ConnexionInfoProvider>
{/*On fournis le style global du site*/}
        <GlobalStyle />
{/*On affiche le header*/}
        <Header />
{/*On affiche le reste du site en fonction de la barre d'adresse*/}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="inscription" element={<Inscription />} />
          <Route path="forum" element={<Forum />} />
          <Route path="creation" element={<Creation />} />
          <Route path="post/:id" element={<Post />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </ConnexionInfoProvider>
    </Router>
  </React.StrictMode>
)
