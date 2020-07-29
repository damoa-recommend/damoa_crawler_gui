import React from 'react';
import { Layout, Input, Tooltip } from 'antd';

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';


const { Header } = Layout;


const styles:any= {
  WebkitAppRegion: "drag",
  backgroundColor: "rgb(29, 29, 31)",
}

const itemStyles:any = {
  display: "inline-block",
  color: '#8e8e8e',
}

export default function TopHeader(): JSX.Element {
  return (
    <Layout style={styles}>
      <Header 
        className="header" 
        style={{height: 36, display: "flex", alignItems: "center", justifyContent: "space-between"}}
      > 
        <div style={{...itemStyles, marginLeft: 40}}>
          <ArrowLeftOutlined style={{cursor: "pointer"}}/>
          <span style={{padding: "0 10px"}}></span>
          <ArrowRightOutlined style={{cursor: "pointer"}}/>
        </div>
        <div style={itemStyles}>
          <Input 
            placeholder="search"
            style={{
              height: 24, 
              border: "1px solid rgb(55, 54, 57)", 
              backgroundColor: "rgb(32, 32, 32)",
              color: "rgb(193, 194, 195)"
            }}
          >
            
          </Input>
        </div>
        <div style={{...itemStyles}}>
          <Tooltip 
            placement="bottomRight" 
            title={<span>Help</span>}
          >
            
            {/* <button>test</button> */}
            <QuestionCircleOutlined style={{cursor: "pointer"}} />
          </Tooltip>
          {/* <Tooltip> */}
          {/* </Tooltip> */}
        </div>
      </Header>
    </Layout>
  )
}