import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

import routes from '../../constants/routes.json';

export default function LeftNav(): JSX.Element {
  return (
    <Layout>
      <div
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          maxWidth: 50,
          minWidth: 50,
          width: 50,
          flex: "0 0 200px",
          background: "#001529"
        }}
      >
        <Menu theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={ <Link to={routes.HOME} ><AppstoreOutlined style={{fontSize: 24}} /> </Link>}> </Menu.Item>
          <Menu.Item key="2" icon={ <Link to={routes.COUNTER} ><BarChartOutlined style={{fontSize: 24}}/></Link>}> </Menu.Item>
        </Menu>
    </div>
    </Layout>
  )
}