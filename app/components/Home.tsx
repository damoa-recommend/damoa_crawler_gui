import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron'

import routes from '../constants/routes.json';
import styles from './Home.css';

import {
  PlusCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'

import { Card } from 'antd';



export default function Home(): JSX.Element {
  let [ url, seturl ] = useState('')

  const onChangeHendle = (e: {target: {value: string}}) => {
    seturl(e.target.value)
  }
  
  const onClickHandle = () => {
    console.log(ipcRenderer)
    ipcRenderer.send('test-channel', {url: url})
  }

  return (
    <div className={styles.container} data-tid="container">
      <div>
        <h2>
          <span>Crawler Information</span>
          <span style={{marginLeft: 6}}>
            <PlusCircleOutlined style={{fontSize: 24, cursor: 'pointer'}}/>
          </span>
          <span style={{marginLeft: 6}}>
            <SettingOutlined style={{fontSize: 24, cursor: 'pointer'}}/>
          </span>
        </h2>

      </div>

      <div>
        <Card 
          title="Site 1" 
          extra={<Link to="/">More</Link>} 
          style={{ width: 300, display: 'inline-block', margin: 15 }}
        >
          <p>이름: Site 1</p>
          <p>설명: A, B, C 데이터 수집</p>
          <p>날짜: {new Date().toString()}</p>
        </Card>
        <Card 
          // size="small" 
          title="Site 2" 
          extra={<Link to="/">More</Link>} 
          style={{ width: 300, display: 'inline-block', margin: 15 }}
        >
          <p>이름: Site 2</p>
          <p>설명: A, B, C 데이터 수집</p>
          <p>날짜: {new Date().toString()}</p>
        </Card>
      </div>

      <div>
        <button onClick={onClickHandle}>url 입력</button>
      </div>
    
    </div>
  );
}
