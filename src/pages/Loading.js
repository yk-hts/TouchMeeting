import React from "react";
import { IonContent, IonPage, IonText } from "@ionic/react";
import "./Day.css";

const Loading = () => {
  return (
    <IonPage>
      <IonContent>
        <div style={{ textAlign: "center", paddingTop: "50%" }}>
          <IonText>Now Loading ...</IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Loading;
