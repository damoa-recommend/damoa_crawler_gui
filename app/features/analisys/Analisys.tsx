import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import { selectSite } from '../../store/modules/sitesSlice'
import { ipcRenderer } from 'electron'

export default function Analisys({match, history}) {
  let [siteIdx, setSiteIdx] = useState(match?.params?.site)
  let [ domStructure, setDomStructure] = useState([])

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
          cssSelector: value.target
        })
        setDomStructure(doms)
      }
      if (doms.length && doms[doms.length - 1].cssSelector !== value.target)  {
        doms.push({
          label: 'testColumn',
          cssSelector: value.target
        })
        setDomStructure(doms)
      } 
      
    }) 

    return () => {
      ipcRenderer.removeAllListeners('selectDom')
    }
  }, [getDomStructure()])

  return (
    <div>
      <h2>구조분석</h2>
      <div>
        <h4>name: {sites[siteIdx].name}</h4>
        <h4>url: {sites[siteIdx].url}</h4>
        <h4>desc: {sites[siteIdx].desc}</h4>
      </div>

      <div>
        {domStructure.map((d, idx) => (
          <div key={idx}>
            <h5>
              라벨: {d.label}
            </h5>
            <h5>
              CSS SELECTOR : {d.cssSelector}
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
}