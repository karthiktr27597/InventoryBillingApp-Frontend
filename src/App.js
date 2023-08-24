import { Route, Routes } from 'react-router-dom';
import './App.css';
import AddProduct from './Components/AddProduct';
import LandingPage from './Components/LandingPage';
import Dashboard from './Components/Dashboard';
import Products from './Components/Products';
import CreateInvoice from './Components/CreateInvoice';
import EditProductPage from './Components/EditProduct/EditProductPage';
import LoginPage from './Components/LoginPage';


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/createinvoice" element={<CreateInvoice />} />
        <Route path="/edit-product/:id" element={<EditProductPage />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
