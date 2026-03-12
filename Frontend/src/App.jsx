import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateSop from "./Pages/CreateSop"
import AllSops from "./Pages/AllSops";
import ViewSop from "./Pages/ViewSop"
import EditSop from "./Pages/EditSop"

function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/createsop" element={
          <ProtectedRoute>
          <CreateSop />
          </ProtectedRoute>
          } />
        <Route path="/allsops" element={
          <ProtectedRoute>
            <AllSops />
          </ProtectedRoute>
        } />
        <Route path="/sops/:id" element={
          <ProtectedRoute>
            <ViewSop />
          </ProtectedRoute>
        } />
        <Route path="/edit/:id" element={
          <ProtectedRoute>
            <EditSop />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
    );
  }

  export default App;