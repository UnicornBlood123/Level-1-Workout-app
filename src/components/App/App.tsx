import React from 'react';
import { observer } from 'mobx-react-lite';
import WorkoutList from '../WorkoutList/WorkoutList';
import { Route, Routes } from 'react-router';
import { Paths } from '../../contents/routes';
import CompletePage from '../CompletePage/CompletePage';
import Exercise from '../Exercise/Exercise';
import * as S from './App.styles';
import { Theme } from './Theme';

const App = observer(() => {
  return (
    <Theme>
      <S.LayoutStyled>
        <S.ContentStyled>
          <S.LayoutContentStyled>
            <Routes>
              <Route path={Paths.ROOT} element={<WorkoutList />} />
              <Route path={Paths.EXERCISE_ID} element={<Exercise />} />
              <Route path={Paths.COMPLETE} element={<CompletePage />} />
            </Routes>
          </S.LayoutContentStyled>
        </S.ContentStyled>
      </S.LayoutStyled>
    </Theme>
  );
});

export default App;
