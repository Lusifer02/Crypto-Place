import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom'
import CoinContextProvider from './context/CoinContext.jsx'

createRoot(document.getElementById('root')).render(


  <Auth0Provider
      domain="dev-xn0j6mu0y0lgfnjw.us.auth0.com"
      clientId="b0yVRRUkRHuKOx9lrjyUN2RsomIgsYuM"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
  >
    <BrowserRouter>
    <CoinContextProvider>
      <App />
    </CoinContextProvider>
  </BrowserRouter>
  
  </Auth0Provider>,

)
