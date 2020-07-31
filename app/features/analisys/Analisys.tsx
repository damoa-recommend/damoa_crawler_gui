import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RouteComponentProps } from 'react-router-dom'

import { selectSites, select } from '../../store/modules/sitesSlice'
import { ipcRenderer } from 'electron'

import { Card } from 'antd';
import {
  HomeOutlined,
} from '@ant-design/icons';

const Analisys: React.FC<RouteComponentProps> =({match, history}) => {
  let [ siteIdx, setSiteIdx ] = useState(match?.params?.site)
  let [ domStructure, setDomStructure ] = useState([])
  let [ formHeight, setFormHeight ] = useState(window.innerHeight-(400 + 60 ))

  let dispatch = useDispatch()
  if (siteIdx === undefined || siteIdx === null || siteIdx === '') {
    history.push('/')
  }

  useEffect(() => {
    console.log(siteIdx)
  }, [siteIdx])

  useEffect(() => {
    console.log(123)
    dispatch(select({
      selectedSiteIdx: siteIdx && siteIdx || -1
    }))
  }, [])

  let sites:{url: string, name: string, desc: string}[] = useSelector(selectSites)
  
  let getDomStructure = useCallback(() => domStructure, [domStructure])

  useEffect(() => {
    let site = sites[siteIdx]
    ipcRenderer.send('open-web', {url: site.url})
  }, [sites])

  useEffect(() => {
    ipcRenderer.on('selectDom', (event, value) => {
      let doms: {label: string, namcssSelectore: string, color: string}[] = [...getDomStructure()]
      
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

  const colorChangeHandle = (idx: number, color: string) => {
    let a: {color: string, cssSelector: string}[] = [...domStructure]
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
        {domStructure.map((d: {label: string, color: string, cssSelector: string}, idx) => (
          <Card 
            title={d.label} 
            // extra={<Link to={`/analisys/${idx}`}>More</Link>} 
            style={{ width: '30%', display: 'inline-block', margin: 15 }}
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

export default React.memo(Analisys)