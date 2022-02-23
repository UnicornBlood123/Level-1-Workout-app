import { Paths } from '../../contents/routes';
import { CheckOutlined } from '@ant-design/icons/lib';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../index';
import { Button } from 'antd';
import styled from 'styled-components';

const CompletePage = () => {
  const navigate = useNavigate();
  const workout = useStore();

  const StyledCheckOutlined = styled(CheckOutlined)`
    color: #1de9b6;
    font-size: 70px;
  `;
  const StyledButton = styled(Button)`
    width: 100%;
    background-color: #aa00ff;
    color: white;
    border-radius: 8px;
  `;

  return (
    <div
      style={{
        paddingTop: '30px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <StyledCheckOutlined />
      <h1>Workout completed!</h1>
      <p>Nice job. You’re done. Here’s the workout summary.</p>
      <p>
        Minutes
        <br /> <b>{(workout.workoutTime / 60).toFixed(1)}</b>
      </p>
      <StyledButton onClick={() => navigate(Paths.ROOT)}>Save & Continue</StyledButton>
    </div>
  );
};

export default CompletePage;
