import React from 'react';
import { observer, inject } from "mobx-react";
import { Layout } from 'antd';
import MainContent from './main'
import './index.less';

const { Content } = Layout;

const Index = ({ commonStore }) => {
  const downHeaderClick = (e)=>{
    commonStore.update(false, 'isDown')
  }
  return (
    <>
      <Layout className="layout xdr_main_app">
        <Content className="xdr_main_content" onClick={downHeaderClick}>
          {/* 子应用注册节点页面 */}
          {/* <div className="subapp-viewport" id="subapp-viewport" style={{ display: commonStore.isMain ? "none" : 'block' }}></div> */}
          {/* 主应用界面 */}
          <div className="xdr_app_main"  style={{ display: commonStore.isMain ? "block" : 'none' }}>
            <MainContent />
          </div>
        </Content>
      </Layout>
    </>
  );
}

export default inject('loginStore', 'commonStore')(observer(Index));

