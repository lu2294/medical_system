import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <ConfigProvider locale={zh_CN}
    // getPopupContainer={node => {
    //   if (document.getElementById("main-root") || node) {
    //     return document.getElementById("main-root");
    //   }
    //   return document.body;
    // }}
  >
    <App />
  </ConfigProvider >,
  document.getElementById('main-root')
);
reportWebVitals();
