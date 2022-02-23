import React, { useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, List, Image, Empty } from 'antd';
import { WorkoutListProps } from './WorkoutList.interface';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../contents/routes';
import Workout from '../../store/workout';
import CompletePage from '../CompletePage/CompletePage';

const WorkoutList = observer(({ workout }: WorkoutListProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          if (workout.isWorkoutDone) navigate(Paths.COMPLETE);
          else navigate(Paths.EXERCISE + workout.exerciseId);
        }}
        style={{
          width: '100%',
          position: 'sticky',
          top: '95%',
          left: 0,
          zIndex: 999,
          backgroundColor: '#AA00FF',
          color: 'white',
          borderRadius: '8px',
        }}
      >
        Start Workout
      </Button>
      <Image
        preview={false}
        width={'100%'}
        src={'https://miro.medium.com/max/2000/1*9ne-uyxEpFX3BuQataLO3w.jpeg'}
        alt={'notFound'}
      />
      <p>Day 1</p>
      <h1>Morning Flexibillity Routline</h1>
      <p>Easy 15 min No equoment</p>
      <List
        style={{ paddingBottom: '20px' }}
        itemLayout="horizontal"
        dataSource={workout.data.questions}
        renderItem={(workout) => (
          <List.Item>
            <List.Item.Meta
              title={workout.title}
              description={
                <List
                  itemLayout="horizontal"
                  dataSource={workout.exercises}
                  renderItem={(exercise) => (
                    <List.Item>
                      <List.Item.Meta
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
