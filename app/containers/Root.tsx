import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../store';
import Routes from '../Routes';
import { Layout } from 'antd';

import LeftNav from '../components/layout/LeftNav'
import Header from '../components/layout/Header'

const { Content } = Layout;

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <Header />
    
    <Layout>
      <ConnectedRouter history={history}>
        <LeftNav />
        <Layout className="site-layout" style={{ marginLeft: 50 }}>
          < Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            <Routes />
          </Content >
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </ConnectedRouter>
    </Layout>
  </Provider>
);

export default hot(Root);
