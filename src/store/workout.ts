import { makeAutoObservable } from 'mobx';

class Workouts {
  data: { name: string; slug: string; questions: {}[] }[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchWorkouts() {
    fetch(
      'https://rnd.kilohealthservices.com/api/quizzes/workouts?api_token=4bfcebd0-0216-4572-bdb7-939e9600b9b2'
    )
      .then((response) => response.json())
      .then((json) => (this.data = json.data));
  }
}

export default new Workouts();
