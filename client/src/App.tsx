import React, { useState } from 'react';
import 'antd/dist/antd.css';
import SurveyList from './survey-list/SurveyList';
import Survey from './survey/Survey';
import { Layout, Menu, Breadcrumb } from 'antd';
import './App.scss';

const { Header, Content, Footer } = Layout;

export const App = () => {
    const [isShowingEdit, setIsShowingEdit] = useState<Boolean>(true);

    const switchPage = () => {
        setIsShowingEdit(!isShowingEdit);
    };

    return (
        <Layout className="layout">
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" onClick={switchPage}>
                        Survey
                    </Menu.Item>
                    <Menu.Item key="2" onClick={switchPage}>
                        Results
                    </Menu.Item>
                </Menu>
                <div>Premier league goal scorer survey</div>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    {isShowingEdit ? <Survey switchPage={switchPage} /> : <SurveyList switchPage={switchPage} />}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Mark Shurmer</Footer>
        </Layout>
    );
};
