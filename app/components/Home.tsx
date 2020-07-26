import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
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

import { selectSite } from '../store/modules/sitesSlice'

export default function Home(): JSX.Element {
  let [ visible, setVisible ] = useState(false)

  let sites = useSelector(selectSite)

  useEffect(() => {
    console.log(sites)
  }, [sites])

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
        {
          sites.map((site: {url: string, name: string, desc: string}, idx: number) => (
            <Card 
              title={site.name} 
              extra={<Link to="/">More</Link>} 
              style={{ width: 300, display: 'inline-block', margin: 15 }}
              key={idx}
            >
              <p>이름: {site.name}</p>
              <p>설명: {site.desc}</p>
              <p>링크: {site.url}</p>
              <p>날짜: {new Date().toString()}</p>
            </Card>
          ))
        }
        {/* <Card 
          // size="small" 
          title="Site 2" 
          extra={<Link to="/">More</Link>} 
          style={{ width: 300, display: 'inline-block', margin: 15 }}
        >
          <p>이름: Site 2</p>
          <p>설명: A, B, C 데이터 수집</p>
          <p>날짜: {new Date().toString()}</p>
        </Card> */}
      </div>

      <div>
        <button onClick={onClickHandle}>url 입력</button>
      </div>
      <webview ng-style="style" id="content" src="http://www.tutorialbook.co.kr" autosize={true} allowpopups={true}></webview>

    </div>
  );
}
