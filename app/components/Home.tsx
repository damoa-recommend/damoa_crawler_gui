import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

import { Card } from 'antd';
import {
  PlusCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'
import styles from './Home.css';

import routes from '../constants/routes.json';
import Connection from './modal/Connection'

import { selectSites } from '../store/modules/sitesSlice'

export default function Home(): JSX.Element {
  let [ visible, setVisible ] = useState(false)

  let sites = useSelector(selectSites)
  useEffect(() => {console.log('[RENDER] HOME')}, [])
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
              extra={<Link to={`/analisys/${idx}`}>More</Link>} 
              style={{ width: '32%', display: 'inline-block', margin: 15 }}
              key={idx}
            >
              <p>이름: {site.name}</p>
              <p>설명: {site.desc}</p>
              <p>링크: {site.url}</p>
              <p>날짜: {new Date().toString()}</p>
            </Card>
          ))
        }
      </div>
    </div>
  );
}
