import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import "./Week.css";
import { add } from "ionicons/icons";
import C from "./calendar";

const Week = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Week</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <C />
        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          style={{ paddingBottom: "70px" }}
        >
          <IonFabButton href="/day">
            <IonLabel>Day</IonLabel>
          </IonFabButton>
        </IonFab>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/main/add">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Week;
