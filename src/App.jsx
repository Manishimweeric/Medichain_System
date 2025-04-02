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
import GetUsers from './Pages/Procurement/User/GetUsers';
import AddInventory from './Pages/Procurement/Inventory/AddInventory';
import GetInventory from './Pages/Procurement/Inventory/GetInventory';
import AddRequest from './Pages/Procurement/Request/AddRequest';
import GetRequest from './Pages/Procurement/Request/GetRequest';
import AddOrder from './Pages/Procurement/Order/AddOrder';
import GetOrder from './Pages/Procurement/Order/GetOrder';
import AddWarehouse from './Pages/Procurement/Warehouse/AddWarehouse';
import GetWarehouse from './Pages/Procurement/Warehouse/GetWarehouse';
import Orders from './Pages/Procurement/Supplier/Orders';
import GetAllInventory from './Pages/Procurement/Procure/GetAllInventory';
import WarehouseDashboard from './Pages/Procurement/Inventory/WarehouseInventoryDashboard';
import InventoryReport from './Pages/Procurement/Inventory/InventoryReport ';
import HealthOrder from './Pages/Procurement/Healthcare/HealthOrder';
import OrderDashboard from './Pages/Procurement/Order/OrderDashboard';
import HealthDashboard from './Pages/Procurement/Healthcare/HealthDashboard';
import OrderReport from './Pages/Procurement/Healthcare/OrderReport';

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
          <Route path="GetUsers" element={<GetUsers />} />
          <Route path="addInventory" element={<AddInventory />} />
          <Route path="GetInventory" element={<GetInventory />} />
          <Route path="addRequest" element={<AddRequest />} />
          <Route path="GetRequest" element={<GetRequest />} />
          <Route path="addOrder" element={<AddOrder />} />
          <Route path="GetOrder" element={<GetOrder />} />
          <Route path="addWarehouse" element={<AddWarehouse />} />
          <Route path="GetWarehouse" element={<GetWarehouse />} />
          <Route path="orders" element={<Orders />} />
          <Route path="getAllInventory" element={<GetAllInventory />} />
          <Route path="warehouseInventoryDashboard" element={<WarehouseDashboard />} />
          <Route path="inventoryReport" element={<InventoryReport />} />
          <Route path="healthOrder" element={<HealthOrder />} />
          <Route path="orderDashboard" element={<OrderDashboard />} />
          <Route path="healthDashboard" element={<HealthDashboard />} />
          <Route path="orderReport" element={<OrderReport />} />

      </Route>      
      </Routes>      
    </Router>
  );
}
export default App;


