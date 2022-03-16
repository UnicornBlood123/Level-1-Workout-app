import React from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, List } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../App/App.routes';
import { useStore } from '../../index';
import * as S from './WorkoutList.styles';
import { Question } from '../../store/workout';

const WorkoutList = observer(() => {
  const workout = useStore();
  const navigate = useNavigate();

  const toWorkout = () => {
    workout.setIsWorkoutStart(true);
    if (workout.isWorkoutDone) {
      navigate(Paths.COMPLETE);
    } else {
      navigate(Paths.EXERCISE + workout.exerciseId);
    }
  };

  return (
    <>
      <S.StyledButton onClick={toWorkout}>
        {workout.isWorkoutStart ? 'Resume' : 'Start Workout'}
      </S.StyledButton>
      <S.ImageStyled
        preview={false}
        src={'https://miro.medium.com/max/2000/1*9ne-uyxEpFX3BuQataLO3w.jpeg'}
        alt={'notFound'}
      />
      <p>Day 1</p>
      <h1>Morning Flexibillity Routline</h1>
      <p>Easy • 15 min • No equipment</p>
      <S.ListStyled
        itemLayout="horizontal"
        dataSource={workout.data.questions}
        renderItem={(item: any) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={
                <List
                  itemLayout="horizontal"
                  dataSource={item.exercises}
                  renderItem={(exercise: any) => (
                    <List.Item>
                      <S.ListItemMetaStyled
                        alltimersbyexerciseid={workout.allTimers[exercise.id]}
                        avatar={<Avatar size={60} src={exercise.photo} />}
                        title={exercise.title}
                        description={exercise.duration + ' sec'}
                      />
                    </List.Item>
                  )}
                />
              }
            />
          </List.Item>
        )}
      />
    </>
  );
});

export default WorkoutList;
