import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage'
import { AllBeersPage } from './pages/AllBeersPage'
import { RandomBeerPage } from './pages/RandomBeerPage'
import { AddBeerPage } from './pages/AddBeerPage'
import { BeersDetailPage } from './pages/BeersDetailPage'
import { NotFoundPage } from './pages/NotFoundPage';
import Navbar from "./components/Navbar";


export function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/beers" element={<AllBeersPage/>} />
        <Route path="/random-beer" element={<RandomBeerPage/>} />
        <Route path="/new" element={<AddBeerPage/>} />
        <Route path="/beers/:beerId" element={<BeersDetailPage/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}

