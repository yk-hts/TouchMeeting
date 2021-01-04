import React from "react";
import {
  IonIcon,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
} from "@ionic/react";
import { Redirect } from "react-router-dom";
import "./Day.css";
import { triangle, ellipse } from "ionicons/icons";

const Main = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/main" to="/main/day" />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="day" href="/main/day">
          <IonIcon icon={ellipse} />
          <IonLabel>Day</IonLabel>
        </IonTabButton>
        <IonTabButton tab="week" href="/main/week">
          <IonIcon icon={triangle} />
          <IonLabel>Week</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default Main;
