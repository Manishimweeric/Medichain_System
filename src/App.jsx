import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/Home';
import Footer from './Pages/Components/Footer';
import Navbar  from "./Pages/Components/navbar";
import Login  from "./Pages/Autho/Login";
import ProcurementDashbord from './Pages/Procurement/Dashbord';
import ProcurementHome from './Pages/Procurement/Home';
import AddSupplier from './Pages/Procurement/Supplier/AddSupplier';
import GetSupplier from './Pages/Procurement/Supplier/GetSuppliers';
import EditSupplier from './Pages/Procurement/Supplier/EditSupplier';
import AddUser from './Pages/Procurement/User/AddUser';




function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
      <Route path="/" element={<><Navbar /><HomePage /><Footer/> </>} />
      <Route path="/login" element={<><Navbar /><Login /><Footer/> </>} />
      
      <Route path="Procurement" element={<ProcurementDashbord />} >
          <Route path="home" element={<ProcurementHome />} />     
          <Route index element={<Navigate to="home" />} />  
          <Route path="addSupplier" element={<AddSupplier />} />
          <Route path="GetSupplier" element={<GetSupplier />} />
          <Route path="editSupplier/:id" element={<EditSupplier />} />
          <Route path="addUser" element={<AddUser />} />


      </Route>
      
      </Routes>      
    </Router>
  );
}
export default App;


