import './App.scss';
import { withAuth } from './app/hoc/withAuth';
import { BrowserRouter as Router, Outlet } from 'react-router-dom';
import AppRoutes from './app/routes/AppRoutes';
import Nav from './app/components/Nav/Nav';
import { createContext, useState } from 'react';
import ModalMsg from './app/components/ModalMsg/ModalMsg';

export const ModalContext = createContext(
  {
    value: "",
    setValue: (text: string) => { }
  }
);

const AppComponent = () => {

  const [modalMsg, setModalMsg] = useState("");

  const handleModal = (content: string) => {
    setModalMsg(content);
  }

  return (
    <div className="App">
      <ModalContext.Provider value={{ value: modalMsg, setValue: handleModal }}>
        <Router>
          <Nav />
          <AppRoutes />
        </Router>
        <Outlet />
        {
          modalMsg ?
            <ModalMsg content={modalMsg} />
            :
            null
        }
      </ModalContext.Provider>
    </div>
  );
}

const App = withAuth(AppComponent);
export default App;
