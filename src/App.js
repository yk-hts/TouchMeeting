import React from "react";
import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Top from "./pages/Top";
import Main from "./pages/main";
import PrivateRoute from "./pages/PrivateRoute";
import { AuthProvider } from "./contexts/Auth";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Add from "./pages/CreateSchedule";
import Day from "./pages/Day";
import Week from "./pages/Week";
import Loading from "./pages/Loading";

const App = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <PrivateRoute exact path="/week" component={Week} />
          <PrivateRoute exact path="/day" component={Day} />
          {/* <Route path="/top" component={Top} exact={true}></Route> */}
          <PrivateRoute path="/main" component={Main} exact={true} />
          <PrivateRoute exact path="/main/add" component={Add} />
          <PrivateRoute exact path="/" component={Top} />
          <Route path="/loading" component={Loading} exact={true} />
          <Route path="/signup" component={SignUp} exact={true} />
          <Route path="/signin" component={SignIn} exact={true} />
          {/* <Route path="/" render={() => <Redirect to="/top" />} exact={true} /> */}
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
