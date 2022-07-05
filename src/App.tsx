import './App.scss';
import { withAuth } from './app/hoc/withAuth';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app/routes/AppRoutes';
import { useAppDispatch } from './app/hook/store.hook';
import { login, logout } from './app/store/auth/authSlice';

const AppComponent = () => {

  const dispatch = useAppDispatch();
  const click1 = () => {
    dispatch(login({ login: 'stu002', password: 'stu002' }))
  }
  const click2 = () => {
    dispatch(logout());
  }

  return (
    <div className="App">
      <Router>
        <AppRoutes />
        <button onClick={click1}>LOGIN</button>
        <button onClick={click2}>LOGOUT</button>
      </Router>
    </div>
  );
}

const App = withAuth(AppComponent);
export default App;
