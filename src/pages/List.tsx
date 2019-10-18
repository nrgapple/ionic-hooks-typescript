import { IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonList, IonMenuButton, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCard, IonCardTitle, IonCardSubtitle, IonCardContent, IonCardHeader } from '@ionic/react';
import { americanFootball, basketball, beer, bluetooth, boat, build, flask, football, paperPlane, wifi } from 'ionicons/icons';
import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';
import axios from 'axios';
import { async } from 'q';
import { Service } from "../types/Service";
import { IProjectInfo } from "../types/Project";
import "./List.css";

interface IParams {
  username: string
}

interface IProjects {
  results: IProjectInfo[];
}

const ListPage: React.FC<RouteComponentProps<IParams>> = (props: RouteComponentProps<IParams>) => {
  
  const [projects, setProjects] = useState<Service<IProjectInfo[]>>({payload: undefined, status: 'loading'});
  
  useEffect(() => {
    const getProjects = async () => {
      try {
        const response = await axios.request({
          url: `https://api.github.com/users/${props.match.params.username}/repos`,
        });
        const {data} = response;
        const allProjects = data.map((project: any) : IProjectInfo => {
          return ({name: project.name, updated_at: project.updated_at, html_url: project.html_url});
        });
        setProjects({ status: 'loaded', payload: (allProjects as IProjectInfo[])});
      } catch (err) {
        let errorMessage = '';
        if (err instanceof Error) {
          errorMessage = (err as Error).message;
        }
        setProjects({status: 'error', error: errorMessage});
      }
    }

    getProjects();
  }, [props.match.params.username]);
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{props.match.params.username}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        {projects.status === 'loading' && (
          <>
          <IonProgressBar type="indeterminate"></IonProgressBar><br />
          </>
        )}
        {projects.status === 'loaded' && (
          <ListItems projects={projects.payload}/>
        )}
        {projects.status === 'error' && (
          <IonCard className="error-card">
            <IonCardHeader>
              <IonCardTitle>
                There was an error loading...
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {projects.error? projects.error : ''}
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

interface IListItemProps {
  projects?: IProjectInfo[],
}

const ListItems: React.FC<IListItemProps> = (props: IListItemProps) => {
  const icons = [
    flask,
    wifi,
    beer,
    football,
    basketball,
    paperPlane,
    americanFootball,
    boat,
    bluetooth,
    build
  ];

  const items = (projects?: IProjectInfo[]) => projects ? projects.map((project, index) => {
    return (
      <IonItem
        href={project.html_url}
        key={`item-${project.name}`}>
        {project.name}
        <div className="item-note" slot="end">
          Last updated: {project.updated_at}
        </div>
      </IonItem>
    );
  }) : (<></>);

  return <IonList>{items(props.projects)}</IonList>;
};

export default ListPage;
