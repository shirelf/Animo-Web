import React, { useContext, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthContext from '../../shared/context/auth-context';
import Chat from '../Pages/Chat/Chat';
import { Header } from '../HomePage/Header';
import { About } from '../HomePage/About';
import { Team } from '../HomePage/Team';
import { Contact } from '../HomePage/Contact';
import JsonData from '../../data/data.json';

import { User } from '../api/configuration/models/users';
/* eslint-disable max-len */
const Messaging = React.lazy(() => import('../MyNetwork/Messaging'));
const ManageUsers = React.lazy(() => import('../AdminPanel/ManageUsers'));
const ResetPassword = React.lazy(() => import('./ResetPassword/ResetPassword'));
const ForgotPassword = React.lazy(() => import('./ResetPassword/ForgotPassword'));
const InvitePsychologist = React.lazy(() => import('../AdminPanel/InvitePsychologist'));
const Profile = React.lazy(() => import('./Profile/Profile'));
const SignIn = React.lazy(() => import('./Login/SignIn'));
const SignUp = React.lazy(() => import('./Login/SignUp'));
const AboutMe = React.lazy(() => import('../PsycPanel/AboutMe'));
const EmotionalAnalysis = React.lazy(() => import('../Pages/EmotionalAnalysis'));
const TipsAndArticles = React.lazy(() => import('../Pages/TipsAndArticles'));
const PersonalQuiz = React.lazy(() => import('../Pages/PersonalityQuiz'));
const Sos = React.lazy(() => import('../Pages/Sos'));

const AuthrizationRouters = () => {
  const auth = useContext(AuthContext);
  let routers;
  const [landingPageData] = useState(JsonData);
  const user = auth.user as User;

  if (!auth.isLoggedIn) {
    routers =
            <Switch>
              <Route path='/home-page'>
                <Header data={landingPageData.Header} />
                <About data={landingPageData.About} />
                <Team data={landingPageData.Team} />
                <Contact data={landingPageData.Contact} />
              </Route>
              <Route path='/chat' component={Chat}/>
              <Route path='/tips' component={TipsAndArticles}/>
              <Route path='/sos' component={Sos}/>
              <Route path='/login' component={SignIn}/>
              <Route path='/signup' component={SignUp}/>
              <Route path='/forgotPassword' component={ForgotPassword}/>
              <Route path='/resetPassword' component={ResetPassword}/>
              <Redirect to='/home-page' />
            </Switch>;
  } else {
    routers =
            <Switch>
              <Route path='/home-page'>
                <Header data={landingPageData.Header} />
                <About data={landingPageData.About} />
                <Team data={landingPageData.Team} />
                <Contact data={landingPageData.Contact} />
              </Route>
              <Route path='/personalquiz' component={PersonalQuiz}/>
              <Route path='/chat' component={Chat}/>
              <Route path='/analyze' component={EmotionalAnalysis}/>
              <Route path='/tips' component={TipsAndArticles}/>
              <Route path='/sos' component={Sos}/>
              <Route path='/profile' component={Profile}/>
              <Route path='/manageUsers' component={ManageUsers}/>
              <Route path='/aboutMePsycoligist' component={AboutMe}/>
              <Route path='/invitePsychologist' component={InvitePsychologist}/>
              {user._id &&
              <Route path='/messaging'>
                <Messaging user={user}/>
              </Route>}
              <Redirect to='/home-page' />
            </Switch>;
  }
  return (
    routers
  );
};

export default AuthrizationRouters;
