import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ListCustomer from "./component/customer/ListCustomer";
import AddCustomer from "./component/customer/AddCustomer";
import ViewCustomer from "./component/customer/ViewCustomer";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" exact element={<ListCustomer />} />
          <Route path="/add-customer" exact element={<AddCustomer />} />
          <Route path="/view-customer/:id" exact element={<ViewCustomer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
