import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  } from '@ionic/react';
import { book, build, colorFill, grid } from 'ionicons/icons';
import React, { useState } from 'react';
import './Home.css';
import { userInfo } from 'os';
import { InputChangeEventDetail } from '@ionic/core';

interface IProps {
  updateUser: (username: string) => void
}

const HomePage: React.FC<IProps> = (props: IProps) => {

  const [username, setUsername] = useState('');
  const handleUsernameValueChange = (event: CustomEvent<InputChangeEventDetail>) => {
    const username = event.detail.value;
    setUsername(username? username : '');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard className="welcome-card">
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png" alt=""/>
          <IonCardHeader>
            <IonCardSubtitle>Get Started</IonCardSubtitle>
            <IonCardTitle>Welcome to Github page viewer</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              Navigate to list to see all projects
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardSubtitle>Enter a github username</IonCardSubtitle>
            <form onSubmit={(event) => {
              event.preventDefault();
              props.updateUser(username);
            }}>
              <IonItem>
                <IonLabel position="floating">username</IonLabel>
                <IonInput onIonChange={handleUsernameValueChange}/>
              </IonItem>
            </form>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
