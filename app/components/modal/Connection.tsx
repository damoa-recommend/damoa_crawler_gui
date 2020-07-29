import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Modal, Form, Input,
  Row, Col, Select,
  message
} from 'antd';

import axios from 'axios'
import { addSite } from '../../store/modules/sitesSlice'

const { Option } = Select;

export default function Connection(props: any): JSX.Element {
  let [ name, setName ] = useState('')
  let [ beforeUrl, setBeforeUrl ] = useState('http://')
  let [ url, setUrl ] = useState('')
  let [ afterUrl, setAfterUrl ] = useState('.com')
  let [ desc, setDesc ] = useState('')

  let [loading, setLoading] = useState(false)

  const dispatch = useDispatch();

  const handleOk = async () => {
    setLoading(true)
    let timestamp = new Date().getTime()
    message.loading( {content: 'Connection ...', key: timestamp})
    
    name = name || url // 사이트 이름이 없으면 url을 사이트 이름으로 설정한다
    try {
      let response = await axios.get(`${beforeUrl}${url}${afterUrl}`)
      message.success( {content: 'Connection Success', key: timestamp})
      
      dispatch(addSite({
        url: `${beforeUrl}${url}${afterUrl}`, 
        name: name, 
        desc: desc
      }))
    } catch (err) {
      message.error( {content: 'Connection Fail', key: timestamp})
    }

    setLoading(false)
  }

  const handleCancel = () => {
    props.setVisible(false)
  }

  const urlSelectBefore = (
    <Select defaultValue="http://" className="select-before" value={beforeUrl} onChange={v => setBeforeUrl(v)}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  const urlSelectAfter = (
    <Select defaultValue=".com" className="select-after" value={afterUrl} onChange={v => setAfterUrl(v)}>
      <Option value=".com">.com</Option>
      <Option value=".co.kr">.co.kr</Option>
      <Option value=".org">.org</Option>
    </Select>
  );

  return (
    <Modal
      title="사이트정보"
      visible={props.visible}
      confirmLoading={loading}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="연결"
      cancelText="돌아가기"
    >
      <Row style={{marginBottom: 13}}>
        <Col span={6}><label>Site Name: </label></Col>
        <Col span={18}>
          <Input 
            placeholder="사이트 이름"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Col>
      </Row>

      <Row style={{marginBottom: 13}}>
        <Col span={6}><label>Site Url: </label></Col>
        <Col span={18}>
          <Input 
            addonBefore={urlSelectBefore} 
            addonAfter={urlSelectAfter} 
            placeholder="example"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </Col>
      </Row>

      <Row >
        <Col span={6}><label>Description: </label></Col>
        <Col span={18}>
          <Input.TextArea 
            autoSize={{ minRows: 2, maxRows: 3 }}
            placeholder="사이트 설명"
            value={desc}
            onChange={e => setDesc(e.target.value)}
          />
        </Col>
      </Row>
    </Modal>
  )
}

