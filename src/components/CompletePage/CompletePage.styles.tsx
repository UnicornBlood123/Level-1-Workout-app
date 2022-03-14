import styled from 'styled-components';
import { CheckOutlined } from '@ant-design/icons/lib';
import { Button } from 'antd';

export const CheckOutlinedStyled = styled(CheckOutlined)`
  color: ${({ theme }) => theme.colors.green};
  font-size: 70px;
`;
export const ButtonStyled = styled(Button)`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

export const DivStyled = styled.div`
  padding-top: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;
