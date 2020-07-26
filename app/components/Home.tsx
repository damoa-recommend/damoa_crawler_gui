import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron'

import { Card } from 'antd';
import {
  PlusCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'
import styles from './Home.css';

import routes from '../constants/routes.json';
import Connection from './modal/Connection'


export default function Home(): JSX.Element {
  let [ visible, setVisible ] = useState(false)
  const onClickHandle = () => {
    console.log(ipcRenderer)
    ipcRenderer.send('open-web', {url: 'test'})
  }

  return (
    <div className={styles.container} data-tid="container">
      <Connection visible={visible} setVisible={setVisible} />
      <div>
        <h2>
          <span>Crawler Information</span>
          <span style={{marginLeft: 6}} onClick={() => setVisible(true)}>
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
      <webview ng-style="style" id="content" src="http://www.tutorialbook.co.kr" autosize={true} allowpopups={true}></webview>

    </div>
  );
}
