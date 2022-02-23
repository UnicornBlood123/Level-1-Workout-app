import React from 'react';
import 'antd/dist/antd.min.css';
import { observer } from 'mobx-react-lite';
import { Avatar, Button, List, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../contents/routes';
import { useStore } from '../../index';
import styled from 'styled-components';
import { CheckOutlined } from '@ant-design/icons/lib';

const WorkoutList = observer(() => {
  const workout = useStore();
  const navigate = useNavigate();

  const StyledButton = styled(Button)`
    width: 100%;
    position: sticky;
    top: 95%;
    left: 0;
    z-index: 999;
    background-color: #aa00ff;
    color: white;
    border-radius: 8px;
  `;

  const StyledList = styled(List)``;

  return (
    <>
      <StyledButton
        onClick={() => {
          if (workout.isWorkoutDone) navigate(Paths.COMPLETE);
          else navigate(Paths.EXERCISE + workout.exerciseId);
        }}
      >
        Start Workout
      </StyledButton>
      <Image
        preview={false}
        width={'100%'}
        src={'https://miro.medium.com/max/2000/1*9ne-uyxEpFX3BuQataLO3w.jpeg'}
        alt={'notFound'}
      />
      <p>Day 1</p>
      <h1>Morning Flexibillity Routline</h1>
      <p>Easy•15•min•No•equoment</p>
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
