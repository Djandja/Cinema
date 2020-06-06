import { observable, action, computed} from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IProjectionDTO } from "../models/Projection/projectionDto";
import agent from "../api/agent";
import { act } from "react-dom/test-utils";
import { IProjectionPostUpdate } from "../models/Projection/projectionPostUpdate";
import { IProjection } from "../models/Projection/projection";


class ProjectionStore {
  @observable projectionRegistry = new Map();
  @observable projectionsDTO: IProjectionDTO[] = [];
  @observable loadingInitial = false;
  @observable movieTitleRecord = new Map<number, string>();
  @observable hallNameRecord = new Map<number, string>();
  @observable selectedProjection: IProjectionDTO | undefined;  
  @observable editMode = false;
  @observable submitting = false;
  @observable createMode = false;
  @observable target = "";

  @computed get projectionByDate() {
    return Array.from(this.projectionsDTO.values()).sort(
      (a, b) => Date.parse(a.dateOfProjection) - Date.parse(b.dateOfProjection)
    );
  }
  

  // @action loadProjections = async () => {
  //   this.loadingInitial = true;
  //   try {
  //     const projections = await agent.Projections.list();
  //       projections.forEach((projection) => {
  //         projection.dateOfProjection = projection.dateOfProjection.split(".")[0];
  //         this.projectionRegistry.set(projection.projectionID, projection);
  //     
  //       this.loadingInitial = false;
  //     });
  //   } catch (error) {
  //       runInAction('load projection error',() => {
  //           this.loadingInitial = false;
  //       })
  //     console.log(error);
  //   }
  // };

  @action loadProjections = () => {
    this.loadingInitial = true;
    agent.Projections.list()
      .then(([projectionsResult, moviesResult, hallsResult]) => {
        if (
          projectionsResult.status === "fulfilled" &&
          moviesResult.status === "fulfilled" &&
          hallsResult.status === "fulfilled"
        ) {
          this.movieTitleRecord = new Map(
            moviesResult.value.data.map(({ movieID, title }) => [
              movieID,
              title,
            ])
          );
          this.hallNameRecord = new Map(
            hallsResult.value.data.map(({ hallID, nameOfHall }) => [
              hallID,
              nameOfHall,
            ])
          );

          const projections = projectionsResult.value.data.map(
            ({ movieID, hallID, ...projection }) => ({
              ...projection,
              movie: {
                movieID: movieID,
                title: this.movieTitleRecord.get(movieID as number)!,
              },
              hall: {
                hallID: hallID,
                nameOfHall: this.hallNameRecord.get(hallID as number)!,
              },
            })
          );
          projections.forEach((projection) => {
                projection.dateOfProjection = projection.dateOfProjection.split("T")[0];
                projection.timeOfProjection = projection.timeOfProjection.split("T")[1];

          })

          this.projectionsDTO = projections;
          console.log(this.projectionsDTO)
         }
        // else if (
      //     booksResult.status === "fulfilled" &&
      //     writersResult.status === "rejected"
      //   ) {
      //     //TODO
      //   } else if (
      //     booksResult.status === "rejected" &&
      //     writersResult.status === "fulfilled"
      //   ) {
      //     //TODO
      //   } else if (
      //     booksResult.status === "rejected" &&
      //     writersResult.status === "rejected"
      //   ) {
      //     //TODO
      //     console.log("try again later");
      //   }
       }).catch((err) => console.log(err))
       .finally(() => (this.loadingInitial = false));
  };


  @action createProjection = async (projection: IProjectionPostUpdate) => {
    this.submitting = true;
    try {
      await agent.Projections.create(projection);
      
        //this.projectionRegistry.set(projection.projectionID, projection);
        this.loadProjections();
        this.createMode = false;
        //this.editMode = false;
        this.submitting = false;     
    } catch (error) {       
        this.submitting = false;
        console.log(error);      
    }
  };

  @action openCreateForm = () => {
    //this.editMode = true;
    this.createMode = true;
    this.selectedProjection = undefined;
  };

  @action openEditForm = (id: number) => {
    //this.selectedProjection = this.projectionRegistry.get(id);
    this.selectedProjection= this.projectionsDTO.find((a) => a.projectionID === id);
    this.editMode = true;
  };

  @action cancelSelectedProjection = () => {
    this.selectedProjection = undefined;
  };

  @action cancelCreateFormOpen = () => {
    this.createMode = false;
  };
  @action cancelEditFormOpen = () => {
    this.editMode = false;
  };
  
  @action selectProjection = (id: number) => {
    this.selectedProjection= this.projectionsDTO.find((a) => a.projectionID === id);
    //this.selectedProjection = this.projectionRegistry.get(id);
    this.editMode = false;
    this.createMode = false;
  };

  @action editProjection = async (projection: IProjection) => {
    this.submitting = true;
    try {
      await agent.Projections.update(projection);
      this.loadProjections();
        this.editMode = false;
        this.submitting= false;
        //this.projectionRegistry.set(projection.projectionID, projection);
       // this.selectedProjection = projection;
    } catch (error) {
            this.submitting = false;
      console.log(error);
    }
  };

  @action deleteProjection = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: number
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;
    try {
      await agent.Projections.delete(id);
        this.loadProjections();
        //this.projectionRegistry.delete(id);
        this.submitting = false;
        this.target = "";
    } catch (error) {
            this.submitting = false;
            this.target = "";
      console.log(error);
    }
  };

}

export default createContext(new ProjectionStore());