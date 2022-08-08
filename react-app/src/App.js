import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import BusinessList from './components/BusinessList/BusinessList';
import NewBusinessForm from './components/NewBusinessForm/NewBusinessForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import HomePage from './components/HomePage/HomePage';
import SingleBusiness from './components/singleBusiness/singleBusiness';
import EditReviewForm from './components/Reviews/EditReviewPage';
import User from './components/User';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/businesses' exact={true}>
          <BusinessList />
        </Route>
        <ProtectedRoute path='/businesses/new' exact={true}>
          <NewBusinessForm />
        </ProtectedRoute>
        <Route path='/businesses/:businessId' exact={true}>
          <SingleBusiness />
        </Route>
        <ProtectedRoute path='/reviews/:reviewId' exact={true}>
          <EditReviewForm />
        </ProtectedRoute>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <HomePage/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
