import styled from 'styled-components';
import 'antd/dist/antd.min.css';

import { Button, Progress } from 'antd';
import { StepBackwardOutlined, StepForwardOutlined } from '@ant-design/icons/lib';

export const MenuExerciseStyled = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const SkipButton = styled(Button)`
  width: 70px;
  height: 45px;
  padding: auto;
  border-radius: 8px;
  border-color: ${({ theme }) => theme.colors.purple};
`;

export const ReadyProgress = styled(Progress)`
  &.ant-progress-circle .ant-progress-text {
    color: ${({ theme }) => theme.colors.green};
  }
  &.ant-progress-circle.ant-progress-status-success .ant-progress-text {
    color: ${({ theme }) => theme.colors.green};
  }
`;

export const TimerProgress = styled(Progress)`
  &.ant-progress-circle .ant-progress-text {
    color: ${({ theme }) => theme.colors.red};
  }
  &.ant-progress-circle.ant-progress-status-success .ant-progress-text {
    color: ${({ theme }) => theme.colors.green};
  }
`;

export const StepBackwardOutlinedStyled = styled(StepBackwardOutlined)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.purple};
`;

export const StepForwardOutlinedStyled = styled(StepForwardOutlined)`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.purple};
`;
