import styled from 'styled-components';
import { Button, Image, List, ListProps } from 'antd';
import 'antd/dist/antd.min.css';
import React from 'react';
import { Question } from '../../store/workout';
import { ListItemMetaInterface } from './WorkoutList.interfaces';

export const StyledButton = styled(Button)`
  width: 100%;
  position: sticky;
  top: 95%;
  left: 0;
  z-index: 1;
  background-color: ${({ theme }) => theme.colors.purple};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
`;

export const ImageStyled = styled(Image)`
  width: 100%;
`;

export const ListItemMetaStyled = styled(List.Item.Meta)<ListItemMetaInterface>`
  border: ${({ theme, alltimersbyexerciseid }: any) =>
    alltimersbyexerciseid === 0 ? `1px solid ${theme.colors.green}` : ''};
`;

export const ListStyled = styled(List)<ListProps<Question>>`
  padding-bottom: 20px;
`;
