import logo from './logo.svg';
import './App.css';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Addemployee from './Addemployee';
import Editemployee from './Editemployee';
import Deleteemployee from './Deleteemployee';
import Assign from './Assign';
import Work from './Work';
import Login from './Login';
import Unassign from './Unassign';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}> </Route>
        <Route path='/:token/dashboard' element={<Dashboard />}>

          <Route path='/:token/dashboard/edit/:id' element={<Editemployee />}></Route>
          <Route path='/:token/dashboard/create' element={<Addemployee />}></Route>
          <Route path='/:token/dashboard/delete/:id' element={<Deleteemployee />}></Route>
          <Route path='/:token/dashboard/assign/:id' element={<Assign />}></Route>
          <Route path='/:token/dashboard/work' element={<Work />}></Route>
          <Route path='/:token/dashboard/unassign/:id' element={<Unassign />}></Route>


        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
