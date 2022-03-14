import styled from 'styled-components';
import { Layout } from 'antd';
import 'antd/dist/antd.min.css';

const { Content } = Layout;

export const ContentStyled = Content;

export const LayoutContentStyled = styled.div`
  min-width: 600px;
  max-width: 700px;
  min-height: 100%;
  padding: 24px;
  margin: auto;
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
`;

export const LayoutStyled = styled(Layout)`
  overflow: auto;
  width: 100vw;
  height: 100vh;
`;
