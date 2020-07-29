import React from 'react';
import { Layout } from 'antd';
const { Header } = Layout;


export default function TopHeader(): JSX.Element {
  return (
    <Layout>
      <Header className="header" style={{height: 36, border: 0}}> </Header>
    </Layout>
  )
}