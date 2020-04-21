import React from 'react';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import ReactGA from 'react-ga';
import store from "./redux/store/store.js";

import CodeTest from "./views/CodeTest.jsx";
import Home from "./views/Home.jsx";
import Course from "./views/Courses.jsx";
import ClassRoom from "./views/Classroom.jsx";
import MyClassRoom from "./views/myClassRoom.jsx";
import LectureContent from "./views/LectureContent.jsx";
import EventList from './views/EventList.jsx';
import Blog from './views/Blog.jsx';
import Dashboard from './views/Dashboard.jsx';
import Login from "./views/LoginPage.jsx";
import Payment from './views/Payment.jsx';
import Test from "./views/test.jsx";
import './assets/css/main.css';
import './assets/css/font.css';
import {
  isPushNotificationSupported,
  createNotificationSubscription,
  registerServiceWorker,
  getUserSubscription,
  subscription
} from './Function/PushNotification.js'
const hist = createBrowserHistory();

function App() {

  React.useEffect(() => {
    ReactGA.initialize('UA-161947237-1')
    ReactGA.pageview('/home'); // Record a pageview for the given page
    hist.listen(location => {
      // ReactGA.set({ page: location.pathname }); // Update the user's current page
      // ReactGA.pageview(location.pathname); // Record a pageview for the given page
    });
    if(localStorage.userToken !== undefined){
      if (isPushNotificationSupported()) {
        registerServiceWorker().then(() => {
          Notification.requestPermission((res) => {
            if(res === 'granted'){
              const getExixtingSubscription = async () => {
                const existingSubscription = await getUserSubscription();
                if(existingSubscription === null){
                  createNotificationSubscription()
                  .then(function(subscrition) {
                    console.log(subscrition);
                    var data = {
                      subscrition: subscrition,
                      user_id: localStorage.userToken
                    }
                    subscription(data).then(res => {
                      console.log(res);
                    })
                  })
                  .catch(err => {
                    console.error("Couldn't create the notification subscription", err, "name:", err.name, "message:", err.message, "code:", err.code);
                  });
                }
                console.log(existingSubscription)
              };
              getExixtingSubscription();
            }
          })
        })
      }
    }
    
  },[])
  return (<>
    <Provider store={store}>
      <Router history={hist}>
        <Switch>
          <Route path="/lecture-redirect/:id" component={LectureContent} />
          <Route path="/lecture-content/:lecture_id/:item_id/:batch_date" component={CodeTest} />
          <Route path="/home" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/courses/:id" component={Course} />
          <Route path="/classroom-course" component={MyClassRoom} />
          <Route path="/classroom-event" component={MyClassRoom} />
          <Route path="/classroom/courses/:id" component={ClassRoom} />
          <Route path='/event' component={EventList} />
          <Route path='/blog/:id' component={Blog} />
          <Route path="/login" component={Login} />
          <Route path="/test" component={Test} />
          <Route path="/payment/:id" component={Payment} />
          <Redirect from="/" to="/home" />
        </Switch>
      </Router>
    </Provider>
    </>
  );
}

export default App;
