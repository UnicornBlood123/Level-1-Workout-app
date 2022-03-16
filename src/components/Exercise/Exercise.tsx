import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paths } from '../App/App.routes';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../index';
import * as S from './Exercise.styles';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons/lib';
import MenuExercise from '../MenuExercise/MenuExercise';

const Exercise = () => {
  const workout = useStore();
  const params = useParams();
  const navigate = useNavigate();

  const checkBorderArray = () => {
    if (workout.questionId < workout.data.questions.length) {
      !workout.data.questions[workout.questionId]?.exercises?.findIndex(
        (el) => el.id === Number(params?.id)
      ) && !workout.questionId
        ? workout.setPrevHidden(true)
        : workout.setPrevHidden(false);

      workout.data.questions[workout.questionId]?.exercises?.findIndex(
        (el) => el.id === Number(params?.id)
      ) ===
        workout.data.questions[workout.questionId]?.exercises.length - 1 &&
      workout.questionId === workout.data.questions.length - 1
        ? workout.setNextHidden(true)
        : workout.setNextHidden(false);
    }
  };

  const checkWorkoutDone = () => {
    const index = workout.data.questions.findIndex((qu) =>
      qu.exercises.find((ex) => {
        if (workout.allTimers[ex.id] > 0 || workout.allTimers[ex.id] === undefined) {
          return ex;
        }
      })
    );
    if (index === -1) {
      workout.setIsWorkoutDone(true);
    }
  };

  const currentTimer = () => {
    const interval = setInterval(() => {
      if (workout.isExerciseDone || !workout.isPlay) {
        clearInterval(interval);
        if (!workout.currentTimer) workout.setIsExerciseDone(true);
      } else {
        workout.decreaseExerciseTimer();
      }
      workout.allTimers[workout.exerciseId] = workout.currentTimer;
    }, 1000);
    return interval;
  };

  const readyTimer = () => {
    const interval = setInterval(() => {
      if (workout.isReady) {
        clearInterval(interval);
      } else {
        workout.decreaseReadyTimer();
      }
    }, 1000);
    return interval;
  };

  const workoutTimer = () => {
    const interval = setInterval(() => {
      if (workout.isExerciseDone || !workout.isPlay || workout.isWorkoutDone) {
        clearInterval(interval);
      } else {
        workout.increaseTime();
      }
    }, 1000);
    return interval;
  };

  const navigateRoot = () => {
    navigate(Paths.ROOT);
  };

  const playVideo = () => {
    document.querySelector('video')?.play();
  };

  const pauseVideo = () => {
    document.querySelector('video')?.pause();
  };

  useEffect(() => {
    workout.data.questions.length && checkWorkoutDone();
  });

  useEffect(() => {
    if (workout.isPlay) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [workout.isPlay]);

  useEffect(() => {
    if (workout.data.questions.length > 0) {
      workout.setQuestionId(
        workout.data.questions.findIndex((qu) =>
          qu.exercises.find((ex) => {
            if (ex.id === Number(params?.id)) {
              workout.setExerciseId(ex.id);
              return ex;
            }
          })
        )
      );
    }
    if (workout.questionId === -1) {
      navigate(Paths.ROOT);
    }
    checkBorderArray();
    if (workout.allTimers[workout.exerciseId] === undefined) {
      workout.setCurrentTimer(
        workout.data.questions[workout.questionId]?.exercises?.find(
          (el) => el.id === Number(params?.id)
        )?.duration ?? 0
      );
    } else {
      if (params?.id) {
        workout.setCurrentTimer(workout.allTimers[workout.exerciseId]);
      }
    }
    if (workout.currentTimer) {
      workout.setIsExerciseDone(false);
      workout.resetReadyTimer();
      workout.setIsReady(false);
      workout.setIsPlay(true);
    } else {
      workout.setIsExerciseDone(true);
      workout.setIsReady(true);
    }
  }, [workout.data.questions, navigate]);

  useEffect(() => {
    if (!workout.isExerciseDone) {
      if (workout.isReady) {
        const interval = currentTimer();
        return () => {
          clearInterval(interval);
        };
      } else {
        const readyInterval = readyTimer();
        return () => {
          clearInterval(readyInterval);
        };
      }
    }
  }, [workout.isReady, workout.isPlay]);

  useEffect(() => {
    if (!workout.isExerciseDone) {
      if (workout.isPlay) {
        const workoutInterval = workoutTimer();
        return () => {
          clearInterval(workoutInterval);
        };
      }
    }
  }, [workout.isWorkoutDone, workout.isPlay, navigate]);

  return (
    <>
      {workout.isWorkoutDone ? (
        navigate(Paths.COMPLETE)
      ) : (
        <S.ExerciseStyled>
          <Button icon={<ArrowLeftOutlined />} onClick={navigateRoot} />
          {workout.isReady ? (
            <h1>
              {
                workout.data.questions[workout.questionId]?.exercises?.find(
                  (el) => el.id === Number(params?.id)
                )?.title
              }
            </h1>
          ) : (
            <h1>Get Ready</h1>
          )}
          <MenuExercise />
          <S.Video
            src={
              workout.data.questions[workout.questionId]?.exercises?.find(
                (el) => el.id === Number(params?.id)
              )?.video
            }
            muted={true}
            autoPlay
            loop
          />
          <S.PlayButtonExercise>
            <S.PlayButton
              onClick={workout.onClickPlay}
              hidden={!workout.isReady}
              shape={'circle'}
              icon={workout.isPlay ? <S.PauseCircleFilledStyled /> : <S.PlayCircleFilledStyled />}
            />
          </S.PlayButtonExercise>
        </S.ExerciseStyled>
      )}
    </>
  );
};
export default observer(Exercise);
