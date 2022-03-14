import styled from 'styled-components';
import { Button } from 'antd';
import 'antd/dist/antd.min.css';

export const StyledButton = styled(Button)`
  width: 100%;
  position: sticky;
  top: 95%;
  left: 0;
  z-index: 999;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;
