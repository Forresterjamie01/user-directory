import Header from './components/Header';
import Footer from './components/Fotter';
import EmployeeData from './pages/employeedata';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <EmployeeData></EmployeeData>
      <Footer />
    </div>
  );
}

export default App;
