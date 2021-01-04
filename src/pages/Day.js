import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Day.css";
import { add } from "ionicons/icons";
import { auth, db } from "../firebase";

const Day = () => {
  const [datas, setDatas] = useState([]);
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeekJp = [
    "日曜日",
    "月曜日",
    "火曜日",
    "水曜日",
    "木曜日",
    "金曜日",
    "土曜日",
  ];
  const today = new Date();
  useEffect(() => {
    console.log();
    const unsubscribe = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("schedules")
      .onSnapshot((snapshot) => {
        setDatas(
          snapshot.docs.map((doc) => {
            const docData = doc.data();
            return {
              name: docData.name,
              begin: docData.begin,
              finish: docData.finish,
              url: docData.url,
              date: docData.date,
            };
          })
        );
      });
    return () => {
      unsubscribe();
    };
  }, []);
  console.log(datas);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{dayOfWeekJp[today.getDay()]}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {datas
          .filter((data) => data.date === dayOfWeek[today.getDay()])
          .sort((a, b) => {
            if (a.begin < b.begin) {
              return -1;
            } else {
              return 1;
            }
          })
          .map((data, i) => {
            return (
              <IonCard key={i} href={data.url}>
                <IonItem>
                  <IonLabel>{data.name}</IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>
                    {data.begin.slice(11, 16)}~{data.finish.slice(11, 16)}
                  </IonLabel>
                </IonItem>
              </IonCard>
            );
          })}
        <IonFab
          vertical="bottom"
          horizontal="end"
          slot="fixed"
          style={{ paddingBottom: "70px" }}
        >
          <IonFabButton href="/week">
            <IonLabel>week</IonLabel>
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

export default Day;
