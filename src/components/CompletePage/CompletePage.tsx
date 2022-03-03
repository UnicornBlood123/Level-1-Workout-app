import { Paths } from '../../contents/routes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../index';
import * as S from './CompletePage.styles';

const CompletePage = () => {
  const navigate = useNavigate();
  const workout = useStore();

  const navigateRoot = () => {
    navigate(Paths.ROOT);
  };

  return (
    <S.DivStyled>
      <S.CheckOutlinedStyled />
      <h1>Workout completed!</h1>
      <p>Nice job. You’re done. Here’s the workout summary.</p>
      <p>
        Minutes
        <br />
        <b>{(workout.workoutTime / 60).toFixed(1)}</b>
      </p>
      <S.ButtonStyled onClick={navigateRoot}>Save & Continue</S.ButtonStyled>
    </S.DivStyled>
  );
};

export default CompletePage;
