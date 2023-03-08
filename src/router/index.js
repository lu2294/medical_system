import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import { Spin } from 'antd';
import MainHeader from '../pages/header/index';
import './index.less';

const Home = React.lazy(() => import('../pages/index'));
const Login = React.lazy(() => import('../pages/login'));
// 组件加载优化
const SuspenseComponent = (Component, isLogin) => (
  (props) => {
    if (isLogin) {
      if (localStorage.getItem('name') && localStorage.getItem('token')) {
        return <Redirect to={{ pathname: '/' }} />
      }
      return <React.Suspense fallback={<Spin className="child-component-loading" />}>
        <Component {...props} />
      </React.Suspense>
    } else {
      if (!localStorage.getItem('name') && !localStorage.getItem('token')) {
        return <Redirect to={{ pathname: '/login' }} />
      } else {
        return <React.Suspense fallback={<Spin className="child-component-loading" />}>
          <Component {...props} />
        </React.Suspense>
      }
    }
  }
)
// 权限，无权限直接输入地址返回，设计逻辑混乱，先不做路由方面的权限
// const SuspenseAuitComponent = (Component,roleId,auit)=>(
//   (props) => {
//       if (!localStorage.getItem('name') && !localStorage.getItem('token')) {
//         return <Redirect to={{ pathname: '/login' }} />
//       }
//       if(roleId && auit.includes(roleId)){return <Redirect to={{ pathname: '/' }} />}
//       return <React.Suspense fallback={<Spin className="child-component-loading" />}>
//         <Component {...props} />
//       </React.Suspense>
//   }
// )
// const BasicRoute = ({commonStore}) => {
  const BasicRoute = () => {
  // const roleId = commonStore.roleId;
  return <BrowserRouter >
    <Switch>
      <Route exact path="/login" component={SuspenseComponent(Login, true)} />
      <Route>
        <MainHeader>
          <Switch>
            <Route exact path="/" component={SuspenseComponent(Home)} />
          </Switch>
        </MainHeader>
      </Route>
    </Switch>
  </BrowserRouter >
};

export default inject('commonStore')(observer(BasicRoute));