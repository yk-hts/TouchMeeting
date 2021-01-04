import React from "react";
import {
  IonPage,
  IonLabel,
  IonInput,
  IonButton,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
} from "@ionic/react";
import { auth, db } from "../firebase";

const CreateSchedule = ({ history }) => {
  const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const getDateDetails = (d) => {
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();

    console.log(month);
    const toDoubleDigits = (num) => {
      num += "";
      if (num.length === 1) {
        num = "0" + num;
      }
      return num;
    };

    return (
      year +
      "-" +
      toDoubleDigits(month) +
      "-" +
      toDoubleDigits(date) +
      "T" +
      toDoubleDigits(hour) +
      ":" +
      toDoubleDigits(minute)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, url, begin, finish, date } = e.target.elements;

    let diffDate;
    let beginDate = new Date(begin.value);
    let finishDate = new Date(finish.value);
    let addDate = beginDate.getDay();
    let beginDateIndex = dayOfWeek.indexOf(date.value);

    if (beginDateIndex >= addDate) {
      diffDate = beginDateIndex - addDate;
    } else {
      diffDate = beginDateIndex + 1;
    }

    console.log(diffDate);

    beginDate.setDate(beginDate.getDate() + diffDate);
    finishDate.setDate(finishDate.getDate() + diffDate);

    console.log(addDate);
    console.log(beginDate);
    console.log(finishDate);

    const collectionRef = db
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("schedules");

    collectionRef.add({
      name: name.value,
      begin: getDateDetails(beginDate),
      finish: getDateDetails(finishDate),
      date: date.value,
      url: url.value,
    });
    history.push("/day");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meetingを追加</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="stacked">名前</IonLabel>
            <IonInput name="name" type="text" />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">曜日</IonLabel>
            <IonSelect name="date" okText="Okay" cancelText="Dismiss">
              <IonSelectOption value="Mon">月曜日</IonSelectOption>
              <IonSelectOption value="Tue">火曜日</IonSelectOption>
              <IonSelectOption value="Wed">水曜日</IonSelectOption>
              <IonSelectOption value="Thu">木曜日</IonSelectOption>
              <IonSelectOption value="Fri">金曜日</IonSelectOption>
              <IonSelectOption value="Sat">土曜日</IonSelectOption>
              <IonSelectOption value="Sun">日曜日</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">開始時間</IonLabel>
            <IonDatetime
              displayFormat="H:mm"
              minuteValues="0,10,20,30,40,50,60"
              name="begin"
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">終了時間</IonLabel>
            <IonDatetime
              displayFormat="H:mm"
              minuteValues="0,10,20,30,40,50,60"
              name="finish"
            ></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">URL</IonLabel>
            <IonInput name="url" type="url" />
          </IonItem>
          <IonButton type="submit" style={{ float: "right" }}>
            追加
          </IonButton>
          <IonButton
            type="button"
            style={{ float: "right" }}
            color="light"
            href="/day"
          >
            キャンセル
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateSchedule;
