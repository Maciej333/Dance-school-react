import './App.scss';
import { withAuth } from './app/hoc/withAuth';
import { BrowserRouter as Router, Outlet } from 'react-router-dom';
import AppRoutes from './app/routes/AppRoutes';
import Nav from './app/components/Nav/Nav';

const AppComponent = () => {

  return (
    <div className="App">
      <Router>
        <Nav />
        <AppRoutes />
      </Router>
      <Outlet />
    </div>
  );
}

const App = withAuth(AppComponent);
export default App;
