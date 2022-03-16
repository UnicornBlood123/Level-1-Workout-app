import { makeAutoObservable, configure } from 'mobx';

configure({
  enforceActions: 'never',
});

export interface Question {
  title: string;
  exercises: {
    description: string;
    duration: number;
    id: number;
    photo: string;
    title: string;
    video: string;
  }[];
  muscle_group: { name: string; photo: string };
}

class Workout {
  data: {
    name: string;
    slug: string;
    questions: Question[];
  } = {
    name: '',
    slug: '',
    questions: [],
  };

  allTimers: { [key: number]: number } = {};

  _isWorkoutStart = false;
  _isWorkoutDone = false;
  _isExerciseDone = false;
  _questionId = 0;
  _readyTimer = 5;
  _workoutTime = 0;
  _exerciseId = 0;
  _currentTimer = 0;
  _isReady = false;
  _isPlay = true;
  _prevHidden = true;
  _nextHidden = true;

  constructor() {
    makeAutoObservable(this);
    this.fetchWorkouts().then(() => (this._exerciseId = this.data.questions[0].exercises[0].id));
  }

  decreaseReadyTimer = () => {
    if (this._readyTimer > 0) {
      this._readyTimer--;
    }
    if (!this._readyTimer) {
      this._isReady = true;
    }
  };

  resetReadyTimer = () => {
    this._readyTimer = 5;
  };

  decreaseExerciseTimer = () => {
    if (this._currentTimer > 0) this._currentTimer--;
    if (!this._currentTimer) this._isExerciseDone = true;
  };

  increaseTime = () => {
    this._workoutTime++;
  };

  get workoutTime() {
    return this._workoutTime;
  }

  get readyTimer() {
    return this._readyTimer;
  }

  setCurrentTimer = (i: number) => {
    this._currentTimer = i;
  };

  get currentTimer(): number {
    return this._currentTimer;
  }

  setQuestionId = (i: number) => {
    this._questionId = i;
  };

  get questionId() {
    return this._questionId;
  }

  setIsExerciseDone = (bool: boolean) => {
    this._isExerciseDone = bool;
  };

  get isExerciseDone() {
    return this._isExerciseDone;
  }

  setIsWorkoutDone = (bool: boolean) => {
    this._isWorkoutDone = bool;
  };

  get isWorkoutDone() {
    return this._isWorkoutDone;
  }

  setIsWorkoutStart = (bool: boolean) => {
    this._isWorkoutStart = bool;
  };

  get isWorkoutStart() {
    return this._isWorkoutStart;
  }

  setPrevHidden = (bool: boolean) => {
    this._prevHidden = bool;
  };

  get prevHidden() {
    return this._prevHidden;
  }

  setNextHidden = (bool: boolean) => {
    this._nextHidden = bool;
  };

  get nextHidden() {
    return this._nextHidden;
  }

  setExerciseId = (id: number) => {
    this._exerciseId = id;
  };

  get exerciseId() {
    return this._exerciseId;
  }

  setIsReady = (bool: boolean) => {
    this._isReady = bool;
  };

  get isReady() {
    return this._isReady;
  }

  setIsPlay = (bool: boolean) => {
    this._isPlay = bool;
  };

  get isPlay() {
    return this._isPlay;
  }

  onClickPlay = () => {
    this._isPlay = !this._isPlay;
  };

  fetchWorkouts() {
    return new Promise((resolve) => {
      resolve(
        fetch(
          'https://rnd.kilohealthservices.com/api/quizzes/workouts?api_token=4bfcebd0-0216-4572-bdb7-939e9600b9b2'
        )
          .then((response) => response.json())
          .then((json) => {
            this.data = json.data;
          })
      );
    });
  }
}

export default Workout;
