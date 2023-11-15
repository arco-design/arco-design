---
order: 4
title:
  zh-CN: 属性
  en-US: Property
---

## zh-CN

基本用法

## en-US

Basic uasge.

```js
import React, { useMemo, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Button,
  Grid,
  InputNumber,
  Typography,
  Watermark,
  Slider,
  Space
} from '@arco-design/web-react';

const defaultValue = {
  content: 'Arco Design',
  gapsX: 100,
  gapsY: 100,
  offsetX: undefined,
  offsetY: undefined,
  fontSize: 16,
  fontWeight: 'normal',
  fontFamily: 'sans-serif',
  color: 'rgba(0,0,0,0.12)',
  rotate: 30,
  zIndex: 1,
};

const App = () => {
  const [form] = Form.useForm();

  const [config, setConfig] = useState(defaultValue);

  const wmProps = useMemo(() => {
    const {
      content,
      gapsX,
      gapsY,
      offsetX,
      offsetY,
      rotate,
      fontSize,
      fontWeight,
      fontFamily,
      color,
      zIndex
    } = config;
    return {
      content,
      rotate,
      gap: [gapsX, gapsY],
      offset: [offsetX, offsetY],
      fontStyle: {
        color,
        fontSize: fontSize + 'px',
        fontFamily,
        fontWeight,
      },
      zIndex
    };
  }, [config]);

  return (
    <Grid.Row style={{ color: 'var(--color-text-2)', flexWrap: 'nowrap' }} >
      <Watermark content="机密！严禁外传！" {...wmProps}>
      <div >
        <Typography.Title heading={2}>ArcoDesign 的诞生</Typography.Title>
        <Typography.Text bold>ArcoDesign</Typography.Text> 是一套设计系统的简称。
        <ul style={{ listStyleType: 'circle', paddingLeft: 20 }}>
          <li>
            ArcoDesign 的目标, 即通过通用的设计系统去解决产品中的体验问题,
            并为产品设计提供指导原则解决业务问题，同时它能够促进设计部门和研发部门之间协作,
            成为开发者之间沟通的语言。
          </li>
          <li>
            ArcoDesign
            主要服务于字节跳动旗下中后台产品的体验设计和技术实现，主要由UED设计和开发同学共同构建及维护。
          </li>
        </ul>
        <Typography.Title heading={2}> 设计语言 - 务实的浪漫主义</Typography.Title>
        <img
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/f50ceefbbf0946c894d492c961e9da8d~tplv-uwbnlip3yd-image.image"
          width="600"
          style={{zIndex: 50, position: 'relative'}}
        />
        <Typography.Title heading={3}> ArcoDesign试图建立一种工作模式</Typography.Title>
        务实=同理心 浪漫=想象力
        <ul style={{ listStyleType: 'circle', paddingLeft: 20 }}>
          <li>
            首先在于务实能够通过设计系统去解决大部分需求极大提高效率解放双手。让设计师&开发能去做一些更"浪漫"即发挥创新&想象力的东西。
          </li>
          <li>
            在产品侧我们不仅能够通过设计体系去务实的搭建基础功能，甚至可以通过它去配置一些能称得上浪漫的产品追求
          </li>
          <li>
            浪漫与务实, 并非矛盾对立。通过对它们的定义得出设计语言的价值观,
            这贯穿着整个设计语言。务实与浪漫相辅相成, 成为引导设计方向。
          </li>
        </ul>
        </div>
      </Watermark>
      <Form form={form} layout="vertical" style={{ width: '264px', flexShrink: 0,borderLeft: '1px solid var(--color-border-2)', paddingLeft: 24, marginLeft: 24 }} onValuesChange={() => {
        setConfig(form.getFieldsValue())
      }}>
        <Form.Item label="内容" field="content" initialValue={defaultValue.content}>
          <Input />
        </Form.Item>
        <Form.Item label="字重" field="fontWeight" initialValue={defaultValue.fontWeight}>
          <Radio.Group options={['lighter', 'normal', 'bold']} />
        </Form.Item>
        <Form.Item label="字族" field="fontFamily" initialValue={defaultValue.fontFamily}>
          <Radio.Group options={['sans-serif', 'serif']} />
        </Form.Item>
        <Form.Item label="颜色" field="color" initialValue={defaultValue.color}>
          <Radio.Group>
            <Radio value="rgba(0,0,0,0.02)">极浅</Radio>
            <Radio value="rgba(0,0,0,0.08)">浅</Radio>
            <Radio value="rgba(0,0,0,0.12)">正常</Radio>
            <Radio value="rgba(0,0,0,0.2)">深</Radio>
            <Radio value="rgba(0,0,0,0.3)">极深</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="字体大小" field="fontSize" initialValue={defaultValue.fontSize}>
          <Slider min={12} max={100}/>
        </Form.Item>
        <Form.Item label="旋转角度" field="rotate" initialValue={defaultValue.rotate}>
          <Slider min={-180} max={180}/>
        </Form.Item>
        <Form.Item label="zIndex" field="zIndex" initialValue={defaultValue.zIndex}>
          <Slider min={-1} max={100}/>
        </Form.Item>
        <Form.Item label="间距" >
          <Space>
            <Form.Item noStyle field="gapsX" initialValue={defaultValue.gapsX}>
              <InputNumber  placeholder="水平间距"/>
            </Form.Item>
            <Form.Item noStyle field="gapsY" initialValue={defaultValue.gapsY}>
              <InputNumber  placeholder="竖直间距"/>
            </Form.Item>
          </Space>
        </Form.Item>
        <Form.Item label="偏移" >
          <Space>
            <Form.Item noStyle field="offsetX" initialValue={defaultValue.offsetX}>
              <InputNumber placeholder="水平偏移"/>
            </Form.Item>

            <Form.Item noStyle field="offsetY" initialValue={defaultValue.offsetY}>
              <InputNumber placeholder="垂直偏移"/>
            </Form.Item>
          </Space>
        </Form.Item>
      </Form>
    </Grid.Row>
  );
};

export default App;

```
