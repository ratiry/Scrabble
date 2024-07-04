import logo from './logo.svg';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import classes from  './App.module.scss';
import Welcome from './components/Pages/Welcome/Welcome';
import Game from './components/Pages/Game/Game';
import Results from './components/Pages/Results/Results';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
export const URLs={
  welcome:'/',
  game:"/Game",
  results:"/Results"
}
function App() {

  return (
    <div className={classes.App}>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path={URLs.welcome} element={<Welcome/>}></Route>
          <Route path={URLs.game} element={<Game/>}></Route>
          <Route path={URLs.results} element={<Results/>}></Route>          
        </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
