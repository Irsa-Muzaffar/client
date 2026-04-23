
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormExample from './components/Form.jsx'
// import ItemsTable from './components/Table.jsx';
import { HeaderSection } from './components/HeaderSection.jsx';
import { ShowinTable } from './components/ShowinTable.jsx';
import { useEffect, useState } from 'react';
import { LoginForm } from './components/LoginForm.jsx';
// import { LoginForm } from './components/LoginForm.jsx';
// import  { Navbara } from './components/Navbar.jsx';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  return (

    <>
      {/* <Navbara /> */}
      {/* <ColorSchemesExample/> */}
      <HeaderSection />
      <FormExample />


      {isLoggedIn ? (
        <ShowinTable />
      ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} />
      )}
      {/* <ItemsTable /> */}
    </>
  );
}

export default App;
