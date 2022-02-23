import React, { useEffect } from 'react';
import 'antd/dist/antd.min.css';
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
import { useStore } from '../../index';
import styled from 'styled-components';

const Exercise = () => {
  const workout = useStore();
  const params = useParams();
  const navigate = useNavigate();

  const checkBorderArray = () => {
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
  };

  const nextPage = () => {
    if (
      workout.data.questions[workout.questionId]?.exercises?.findIndex(
        (el) => el.id === Number(params?.id)
      ) ===
      workout.data.questions[workout.questionId]?.exercises.length - 1
    ) {
      workout.setQuestionId(workout.questionId + 1);
      navigate(Paths.EXERCISE + workout.data.questions[workout.questionId]?.exercises[0]?.id);
    } else {
      navigate(
        Paths.EXERCISE +
          workout.data.questions[workout.questionId]?.exercises[
            workout.data.questions[workout.questionId]?.exercises?.findIndex(
              (el) => el.id === Number(params?.id)
            ) + 1
          ].id
      );
    }
  };

  const prevPage = () => {
    if (
      workout.data.questions[workout.questionId]?.exercises?.findIndex(
        (el) => el.id === Number(params?.id)
      ) === 0
    ) {
      workout.setQuestionId(workout.questionId - 1);
      navigate(
        Paths.EXERCISE +
          workout.data.questions[workout.questionId]?.exercises[
            workout.data.questions[workout.questionId]?.exercises.length - 1
          ]?.id
      );
    } else {
      navigate(
        Paths.EXERCISE +
          workout.data.questions[workout.questionId]?.exercises[
            workout.data.questions[workout.questionId]?.exercises?.findIndex(
              (el) => el.id === Number(params?.id)
            ) - 1
          ]?.id
      );
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
    if (index === -1) workout.setIsWorkoutDone(true);
  };

  const playVideo = () => {
    const video = document.querySelector('video');
    if (workout.isPlay) video?.play();
    else video?.pause();
  };

  useEffect(() => {
    workout.data.questions.length && checkWorkoutDone();
  });

  useEffect(() => {
    playVideo();
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
    if (workout.questionId === -1) navigate(Paths.ROOT);
    checkBorderArray();
    if (workout.allTimers[workout.exerciseId] === undefined) {
      workout.setCurrentTimer(
        workout.data.questions[workout.questionId]?.exercises?.find(
          (el) => el.id === Number(params?.id)
        )?.duration ?? 0
      );
    } else {
      if (params?.id) workout.setCurrentTimer(workout.allTimers[workout.exerciseId]);
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
        const interval = setInterval(() => {
          if (workout.isExerciseDone || !workout.isPlay) {
            clearInterval(interval);
            if (!workout.currentTimer) workout.setIsExerciseDone(true);
          } else {
            workout.decreaseExerciseTimer();
          }
          workout.allTimers[workout.exerciseId] = workout.currentTimer;
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      } else {
        const readyInterval = setInterval(() => {
          if (workout.isReady) {
            clearInterval(readyInterval);
          } else {
            workout.decreaseReadyTimer();
          }
        }, 1000);
        return () => {
          clearInterval(readyInterval);
        };
      }
    }
  }, [workout.isReady, workout.isPlay]);

  useEffect(() => {
    if (!workout.isExerciseDone) {
      if (workout.isPlay) {
        const interval = setInterval(() => {
          if (workout.isExerciseDone || !workout.isPlay || workout.isWorkoutDone) {
            clearInterval(interval);
          } else {
            workout.increaseTime();
          }
        }, 1000);
        return () => {
          clearInterval(interval);
        };
      }
    }
  }, [workout.isWorkoutDone, workout.isPlay, navigate]);

  const SkipButton = styled(Button)`
    width: 70px;
    height: 45px;
    padding: auto;
    border-radius: 8px;
    border-color: #aa00ff;
  `;

  const ReadyProgress = styled(Progress)`
    &.ant-progress-circle .ant-progress-text {
      color: #1de9b6;
    }
    &.ant-progress-circle.ant-progress-status-success .ant-progress-text {
      color: #1de9b6;
    }
  `;

  const TimerProgress = styled(Progress)`
    &.ant-progress-circle .ant-progress-text {
      color: #ff4081;
    }
    &.ant-progress-circle.ant-progress-status-success .ant-progress-text {
      color: #1de9b6;
    }
  `;

  const PlayButton = styled(Button)`
    width: 50px;
    height: 50px;
    padding: 0;
    margin: 0;
    background-color: '';
  `;

  const StepBackwardOutlinedStyled = styled(StepBackwardOutlined)`
    font-size: 20px;
    color: #aa00ff;
  `;

  const StepForwardOutlinedStyled = styled(StepForwardOutlined)`
    font-size: 20px;
    color: #aa00ff;
  `;

  const PlayCircleFilledStyled = styled(PlayCircleFilled)`
    font-size: 48px;
    color: #aa00ff;
  `;

  const PauseCircleFilledStyled = styled(PauseCircleFilled)`
    font-size: 48px;
    color: #aa00ff;
  `;

  return (
    <>
      {workout.isWorkoutDone ? (
        navigate(Paths.COMPLETE)
      ) : (
        <div className={'exercise'}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(Paths.ROOT)} />
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
          <div className={'menu-exercise'}>
            <SkipButton
              onClick={prevPage}
              color={'#AA00FF'}
              disabled={workout.prevHidden}
              icon={<StepBackwardOutlinedStyled />}
            />
            {workout.isReady ? (
              <>
                <TimerProgress
                  type="circle"
                  status={workout.currentTimer ? 'normal' : 'success'}
                  strokeColor={workout.isExerciseDone ? '#1de9b6' : '#FF4081'}
                  percent={
                    100 -
                    (workout.currentTimer /
                      (workout.data.questions[workout.questionId]?.exercises?.find(
                        (el) => el.id === Number(params?.id)
                      )?.duration ?? 1)) *
                      100
                  }
                  format={() => {
                    return workout.currentTimer;
                  }}
                />
              </>
            ) : (
              <>
                <ReadyProgress
                  strokeColor={'#1DE9B6'}
                  type="circle"
                  percent={100 - (workout.readyTimer / 5) * 100}
                  format={() => workout.readyTimer}
                />
              </>
            )}
            <SkipButton
              onClick={nextPage}
              disabled={workout.nextHidden}
              icon={<StepForwardOutlinedStyled />}
            />
          </div>
          <video
            src={
              workout.data.questions[workout.questionId]?.exercises?.find(
                (el) => el.id === Number(params?.id)
              )?.video
            }
            muted={true}
            autoPlay
            loop
            width={'100%'}
          />
          <div className={'playButton-exercise'}>
            <PlayButton
              onClick={workout.onClickPlay}
              hidden={!workout.isReady}
              shape={'circle'}
              icon={workout.isPlay ? <PauseCircleFilledStyled /> : <PlayCircleFilledStyled />}
            />
          </div>
        </div>
      )}
    </>
  );
};
export default observer(Exercise);
