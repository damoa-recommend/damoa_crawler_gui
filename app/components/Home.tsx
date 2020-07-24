import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron'

import routes from '../constants/routes.json';

import styles from './Home.css';

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
      <h2>Home</h2>
      <Link to={routes.COUNTER}>to Counter</Link>
      <div>
        <input type="text" value={url} onChange={onChangeHendle} />
      </div>
      <button onClick={onClickHandle}>c</button>
      {/* <iframe 
        id="webview"
        src="https://www.naver.com" 
        style={{width: '400px%', height: '300px', display: 'inline-flex'}}
      /> */}
    </div>
  );
}
