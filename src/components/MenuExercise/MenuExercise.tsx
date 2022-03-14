import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paths } from '../../contents/routes';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../index';
import { theme } from '../../theme/theme';
import * as S from './MenuExercise.styles';

const MenuExercise = () => {
  const workout = useStore();
  const params = useParams();
  const navigate = useNavigate();

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

  return (
    <S.MenuExerciseStyled>
      <S.SkipButton
        onClick={prevPage}
        disabled={workout.prevHidden}
        icon={<S.StepBackwardOutlinedStyled />}
      />
      {workout.isReady ? (
        <>
          <S.TimerProgress
            type="circle"
            status={workout.currentTimer ? 'normal' : 'success'}
            strokeColor={workout.isExerciseDone ? theme.colors.green : theme.colors.red}
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
          <S.ReadyProgress
            strokeColor={theme.colors.green}
            type="circle"
            percent={100 - (workout.readyTimer / 5) * 100}
            format={() => workout.readyTimer}
          />
        </>
      )}
      <S.SkipButton
        onClick={nextPage}
        disabled={workout.nextHidden}
        icon={<S.StepForwardOutlinedStyled />}
      />
    </S.MenuExerciseStyled>
  );
};

export default observer(MenuExercise);
