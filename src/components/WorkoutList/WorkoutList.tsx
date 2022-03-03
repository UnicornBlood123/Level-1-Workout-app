import React from 'react';
import { observer } from 'mobx-react-lite';
import { Avatar, List, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../contents/routes';
import { useStore } from '../../index';
import * as S from './WorkoutList.styles';

const WorkoutList = observer(() => {
  const workout = useStore();
  const navigate = useNavigate();

  return (
    <>
      <S.StyledButton
        onClick={() => {
          workout.setIsWorkoutStart(true);
          if (workout.isWorkoutDone) navigate(Paths.COMPLETE);
          else navigate(Paths.EXERCISE + workout.exerciseId);
        }}
      >
        {workout.isWorkoutStart ? 'Resume' : 'Start Workout'}
      </S.StyledButton>
      <Image
        preview={false}
        width={'100%'}
        src={'https://miro.medium.com/max/2000/1*9ne-uyxEpFX3BuQataLO3w.jpeg'}
        alt={'notFound'}
      />
      <p>Day 1</p>
      <h1>Morning Flexibillity Routline</h1>
      <p>Easy • 15 min • No equipment</p>
      <List
        style={{ paddingBottom: '20px' }}
        itemLayout="horizontal"
        dataSource={workout.data.questions}
        renderItem={(data) => (
          <List.Item>
            <List.Item.Meta
              title={data.title}
              description={
                <List
                  itemLayout="horizontal"
                  dataSource={data.exercises}
                  renderItem={(exercise) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar size={60} src={exercise.photo} />}
                        title={exercise.title}
                        style={
                          workout.allTimers[exercise.id] === 0
                            ? { border: '1px solid green' }
                            : { border: '' }
                        }
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
