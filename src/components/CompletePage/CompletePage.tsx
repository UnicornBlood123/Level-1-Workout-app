import { Paths } from '../../contents/routes';
import { CheckOutlined } from '@ant-design/icons/lib';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CompletePage.css';
import Workout from '../../store/workout';

const CompletePage = ({ workout }: { workout: Workout }) => {
  const navigate = useNavigate();

  return (
    <div className={'completePage'}>
      <CheckOutlined style={{ color: '#1DE9B6', fontSize: '80px' }} />
      <h1>Workout completed!</h1>
      <p>Nice job. You’re done. Here’s the workout summary.</p>
      <p>
        Minutes
        <br /> <b>{(workout.workoutTime / 60).toFixed(1)}</b>
      </p>
      <Button
        onClick={() => navigate(Paths.ROOT)}
        style={{
          width: '100%',
          backgroundColor: '#AA00FF',
          color: 'white',
          borderRadius: '8px',
        }}
      >
        Save & Continue
      </Button>
    </div>
  );
};

export default CompletePage;
