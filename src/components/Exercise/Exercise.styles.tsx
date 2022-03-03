import styled from 'styled-components';
import 'antd/dist/antd.min.css';
import { theme } from '../App/Theme';
import { Button, Progress } from 'antd';
import {
  PauseCircleFilled,
  PlayCircleFilled,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons/lib';

export const ExerciseStyled = styled.div`
  padding-top: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const MenuExerciseStyled = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const PlayButtonExercise = styled.div`
  display: flex;
  justify-content: center;
`;

export const SkipButton = styled(Button)`
  width: 70px;
  height: 45px;
  padding: auto;
  border-radius: 8px;
  border-color: ${theme.colors.purple};
`;

export const ReadyProgress = styled(Progress)`
  &.ant-progress-circle .ant-progress-text {
    color: ${theme.colors.green};
  }
  &.ant-progress-circle.ant-progress-status-success .ant-progress-text {
    color: ${theme.colors.green};
  }
`;

export const TimerProgress = styled(Progress)`
  &.ant-progress-circle .ant-progress-text {
    color: ${theme.colors.red};
  }
  &.ant-progress-circle.ant-progress-status-success .ant-progress-text {
    color: ${theme.colors.green};
  }
`;

export const PlayButton = styled(Button)`
  width: 50px;
  height: 50px;
  padding: 0;
  margin: 0;
  background-color: '';
`;

export const StepBackwardOutlinedStyled = styled(StepBackwardOutlined)`
  font-size: 20px;
  color: ${theme.colors.purple};
`;

export const StepForwardOutlinedStyled = styled(StepForwardOutlined)`
  font-size: 20px;
  color: ${theme.colors.purple};
`;

export const PlayCircleFilledStyled = styled(PlayCircleFilled)`
  font-size: 48px;
  color: ${theme.colors.purple};
`;

export const PauseCircleFilledStyled = styled(PauseCircleFilled)`
  font-size: 48px;
  color: ${theme.colors.purple};
`;
