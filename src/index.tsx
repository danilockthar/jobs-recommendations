import React from 'react';
import ReactDOM from 'react-dom';
import 'reflect-metadata';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'index.scss';
import 'antd-customized.less';
import esES from 'antd/lib/locale/es_ES';
import 'tools/i18n/i18n';
import SessionProvider from 'auth/components/session-provider.component';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { MainFragment } from 'fragments/main/main.fragment';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ConfigProvider locale={esES}>
                <SessionProvider>
                    <MainFragment />
                </SessionProvider>
            </ConfigProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
