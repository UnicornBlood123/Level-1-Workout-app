import React, { useEffect } from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import { observer } from 'mobx-react-lite';
import { Layout } from 'antd';
import WorkoutList from '../WorkoutList/WorkoutList';
import { Route, Routes } from 'react-router';
import { Paths } from '../../contents/routes';
import CompletePage from '../CompletePage/CompletePage';
import Exercise from '../Exercise/Exercise';

const { Content } = Layout;

const App = observer(() => {
  return (
    <Layout className="layout">
      <Content>
        <div className="site-layout-content">
          <Routes>
            <Route path={Paths.ROOT} element={<WorkoutList />} />
            <Route path={Paths.EXERCISE_ID} element={<Exercise />} />
            <Route path={Paths.COMPLETE} element={<CompletePage />} />
          </Routes>
        </div>
      </Content>
    </Layout>
  );
});

export default App;
