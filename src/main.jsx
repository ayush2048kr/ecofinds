import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx' // Make sure this component exists
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LandingPage from './components/Home/LandingPage'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'; // Import the Home component
import UserDashBoard from './components/Dashboard/UserDashboard.jsx'
import AddToCards from './components/Cart/AddToCards.jsx'
import CardPage from './components/Cart/CardPage.jsx'
import Purchase from './components/Purchase/Purchase.jsx'
import ProductListing from './components/ProductListing/ProductListing.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<LandingPage />}>
      <Route index element={<Auth />} />
      <Route path="/user-dashboard" element={< UserDashBoard />} />
      <Route path="/add-to-cards" element={< AddToCards />} />
      <Route path="/card-page" element={< CardPage />} />
      <Route path="/purchase" element={< Purchase />} />
      <Route path="/product-listing" element={< ProductListing />} />
    </Route>
  )
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> {/* Use RouterProvider to provide the router */}
  </StrictMode>
);
