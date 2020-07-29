import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { selectSite } from '../../store/modules/sitesSlice'
import { ipcRenderer } from 'electron'

import { Card } from 'antd';
import {
  HomeOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

export default function Analisys({match, history}) {
  let [siteIdx, setSiteIdx] = useState(match?.params?.site)
  let [ domStructure, setDomStructure] = useState([])
  let [ formHeight, setFormHeight ] = useState(window.innerHeight-(500 + 35))
  
  if (siteIdx === undefined || siteIdx === null) {
    history.push('/')
  }

  let sites:{url: string, name: string, desc: string}[] = useSelector(selectSite)
  
  let getDomStructure = useCallback(() => domStructure, [domStructure])

  useEffect(() => {
    let site = sites[siteIdx]
    ipcRenderer.send('open-web', {url: site.url})
  }, [sites])

  useEffect(() => {
    ipcRenderer.on('selectDom', (event, value) => {
      let doms = [...getDomStructure()]
      
      if (!doms.length) {
        doms.push({
          label: 'testColumn',
          cssSelector: value.target,
          color: '#0000ff'
        })
        setDomStructure(doms)
      }
      if (doms.length && doms[doms.length - 1].cssSelector !== value.target)  {
        doms.push({
          label: 'testColumn',
          cssSelector: value.target,
          color: '#0000ff'
        })
        setDomStructure(doms)
      } 
      
    }) 

    return () => {
      ipcRenderer.removeAllListeners('selectDom')
    }
  }, [getDomStructure()])

  const colorChangeHandle = (idx, color) => {
    let a = [...domStructure]
    a[idx].color = color
    ipcRenderer.send('dom-border-color', {
      selector: a[idx].cssSelector,
      color: color
    })
    setDomStructure(a)
  }

  return (
    <div style={{overflowY: 'scroll', height: formHeight}}>
      <div>
        <span><h2 style={{display: 'inline-block'}}>구조분석</h2></span>
        <span><h4 style={{display: 'inline-block'}}><HomeOutlined />{" "}{sites[siteIdx].url}</h4></span>
      </div>
      
      <div className="form">
        {domStructure.map((d, idx) => (
          <Card 
            title={d.label} 
            // extra={<Link to={`/analisys/${idx}`}>More</Link>} 
            style={{ width: 300, display: 'inline-block', margin: 15 }}
            key={idx}
          >
            {/* <p>이름: {site.name}</p> */}
            <p>이름: {d.label}</p>
            <p>선택자: {d.cssSelector}</p>
            <input 
              type="color" 
              value={d.color}
              onChange={(e) => colorChangeHandle(idx, e.target.value)}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}