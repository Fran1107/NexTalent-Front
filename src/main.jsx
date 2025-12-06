import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import Router from './router'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OfertasPage from "./pages/Ofertas";

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </StrictMode>,
)



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/ofertas" element={<OfertasPage />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
