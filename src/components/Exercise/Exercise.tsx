import React, { useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { ExerciseProps } from './Exercise.interface';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Progress } from 'antd';
import './Exercise.css';
import {
  ArrowLeftOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons/lib';
import { Paths } from '../../contents/routes';
import { observer } from 'mobx-react-lite';

const Exercise = ({ store }: ExerciseProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const checkBorderArray = () => {
    !store.data.questions[store.questionId]?.exercises?.findIndex(
      (el) => el.id === Number(params?.id)
    ) && !store.questionId
      ? store.setPrevHidden(true)
      : store.setPrevHidden(false);

    store.data.questions[store.questionId]?.exercises?.findIndex(
      (el) => el.id === Number(params?.id)
    ) ===
      store.data.questions[store.questionId]?.exercises.length - 1 &&
    store.questionId === store.data.questions.length - 1
      ? store.setNextHidden(true)
      : store.setNextHidden(false);
  };

  const nextPage = () => {
    if (
      store.data.questions[store.questionId]?.exercises?.findIndex(
        (el) => el.id === Number(params?.id)
      ) ===
      store.data.questions[store.questionId]?.exercises.length - 1
    ) {
      store.setQuestionId(store.questionId + 1);
      navigate(Paths.EXERCISE + store.data.questions[store.questionId]?.exercises[0]?.id);
    } else {
      navigate(
        Paths.EXERCISE +
          store.data.questions[store.questionId]?.exercises[
            store.data.questions[store.questionId]?.exercises?.findIndex(
              (el) => el.id === Number(params?.id)
            ) + 1
          ].id
      );
    }
  };

  const prevPage = () => {
    if (
      store.data.questions[store.questionId]?.exercises?.findIndex(
        (el) => el.id === Number(params?.id)
      ) === 0
    ) {
      store.setQuestionId(store.questionId - 1);
      navigate(
        Paths.EXERCISE +
          store.data.questions[store.questionId]?.exercises[
            store.data.questions[store.questionId]?.exercises.length - 1
          ]?.id
      );
    } else {
      navigate(
        Paths.EXERCISE +
          store.data.questions[store.questionId]?.exercises[
            store.data.questions[store.questionId]?.exercises?.findIndex(
              (el) => el.id === Number(params?.id)
            ) - 1
          ]?.id
      );
    }
  };

  const checkWorkoutDone = () => {
    const index = store.data.questions.findIndex((qu) =>
      qu.exercises.find((ex) => {
        if (store.allTimers[ex.id] > 0 || store.allTimers[ex.id] === undefined) {
          return ex;
        }
      })
    );
    if (index === -1) store.setIsWorkoutDone(true);
  };

  const playVideo = () => {
    const video = document.querySelector('video');
    if (store.isPlay) video?.play();
    else video?.pause();
  };

  useEffect(() => {
    store.data.questions.length && checkWorkoutDone();
  });

  useEffect(() => {
    playVideo();
  }, [store.isPlay]);

  useEffect(() => {
    if (store.data.questions.length > 0) {
      store.setQuestionId(
        store.data.questions.findIndex((qu) =>
          qu.exercises.find((ex) => {
            if (ex.id === Number(params?.id)) {
              store.setExerciseId(ex.id);
              return ex;
            }
          })
        )
      );
    }
    if (store.questionId === -1) navigate(Paths.ROOT);
    checkBorderArray();
    if (store.allTimers[store.exerciseId] === undefined) {
      store.setCurrentTimer(
        store.data.questions[store.questionId]?.exercises?.find(
          (el) => el.id === Number(params?.id)
        )?.duration ?? 0
      );
    } else {
      if (params?.id) store.setCurrentTimer(store.allTimers[store.exerciseId]);
    }
    if (store.currentTimer) {
      store.setIsExerciseDone(false);
      store.resetReadyTimer();
      store.setIsReady(false);
      store.setIsPlay(true);
    } else {
      store.setIsExerciseDone(true);
      store.setIsReady(true);
    }
  }, [store.data.questions, navigate]);

  useEffect(() => {
    if (!store.isExerciseDone) {
      if (store.isReady) {
        const interval = setInterval(() => {
          if (store.isExerciseDone || !store.isPlay) {
            clearInterval(interval);
            if (!store.currentTimer) store.setIsExerciseDone(true);
          } else {
            store.decreaseExerciseTimer();
          }
          store.allTimers[store.exerciseId] = store.currentTimer;
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      } else {
        const readyInterval = setInterval(() => {
          if (store.isReady) {
            clearInterval(readyInterval);
          } else {
            store.decreaseReadyTimer();
          }
        }, 1000);
        return () => {
          clearInterval(readyInterval);
        };
      }
    }
  }, [store.isReady, store.isPlay]);

  useEffect(() => {
    if (!store.isExerciseDone) {
      if (store.isPlay) {
        const interval = setInterval(() => {
          if (store.isExerciseDone || !store.isPlay || store.isWorkoutDone) {
            clearInterval(interval);
          } else {
            store.increaseTime();
          }
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [store.isWorkoutDone, store.isPlay, navigate]);

  return (
    <>
      {store.isWorkoutDone ? (
        navigate(Paths.COMPLETE)
      ) : (
        <div className={'exercise'}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(Paths.ROOT)} />
          {store.isReady ? (
            <h1>
              {
                store.data.questions[store.questionId]?.exercises?.find(
                  (el) => el.id === Number(params?.id)
                )?.title
              }
            </h1>
          ) : (
            <h1>Get Ready</h1>
          )}
          <div className={'menu-exercise'}>
            <Button
              onClick={prevPage}
              color={'#AA00FF'}
              style={{
                width: '70px',
                height: '45px',
                padding: 'auto',
                borderRadius: '8px',
                borderColor: '#AA00FF',
              }}
              disabled={store.prevHidden}
              icon={<StepBackwardOutlined style={{ fontSize: '20px', color: '#AA00FF' }} />}
            />
            {store.isReady ? (
              <>
                <Progress
                  type="circle"
                  status={store.currentTimer ? 'normal' : 'success'}
                  strokeColor={store.isExerciseDone ? '#1de9b6' : '#FF4081'}
                  style={{ color: '#FF4081' }}
                  percent={
                    100 -
                    (store.currentTimer /
                      (store.data.questions[store.questionId]?.exercises?.find(
                        (el) => el.id === Number(params?.id)
                      )?.duration ?? 1)) *
                      100
                  }
                  format={() => {
                    return store.currentTimer;
                  }}
                />
              </>
            ) : (
              <>
                <Progress
                  style={{ color: '#1de9b6' }}
                  strokeColor={'#1DE9B6'}
                  type="circle"
                  percent={100 - (store.readyTimer / 5) * 100}
                  format={() => store.readyTimer}
                />
              </>
            )}
            <Button
              onClick={nextPage}
              style={{
                width: '70px',
                height: '45px',
                padding: 'auto',
                borderRadius: '8px',
                borderColor: '#AA00FF',
              }}
              disabled={store.nextHidden}
              icon={<StepForwardOutlined style={{ fontSize: '20px', color: '#AA00FF' }} />}
            />
          </div>
          <video
            src={
              store.data.questions[store.questionId]?.exercises?.find(
                (el) => el.id === Number(params?.id)
              )?.video
            }
            muted={true}
            autoPlay
            loop
            width={'100%'}
          />
          <div className={'playButton-exercise'}>
            <Button
              onClick={store.onClickPlay}
              hidden={!store.isReady}
              shape={'circle'}
              style={{
                width: '50px',
                height: '50px',
                padding: 0,
                margin: 0,
                backgroundColor: '',
              }}
              icon={
                store.isPlay ? (
                  <PauseCircleFilled style={{ fontSize: '48px', color: '#AA00FF' }} />
                ) : (
                  <PlayCircleFilled style={{ fontSize: '48px', color: '#AA00FF' }} />
                )
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
export default observer(Exercise);

// questions,
//   currentTimer,
//   setCurrentTimer,
//   questionId,
//   allTimers,
//   onClickPlay,
//   readyTimer,
//   decreaseExerciseTimer,
//   decreaseReadyTimer,
//   increaseTime,
//   resetReadyTimer,
//   prevHidden,
//   nextHidden,
//   exerciseId,
//   isWorkoutDone,
//   isExerciseDone,
//   isPlay,
//   isReady,
//   setQuestionId,
//   setExerciseId,
//   setPrevHidden,
//   setNextHidden,
//   setIsWorkoutDone,
//   setIsExerciseDone,
//   setIsPlay,
//   setIsReady,
