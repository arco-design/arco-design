import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Space,
  Avatar,
  Upload,
  Message,
  Select,
  Grid,
} from '@arco-design/web-react';
import { FormInstance } from '@arco-design/web-react/es/Form';
import { IconCamera } from '@arco-design/web-react/icon';
import ResizeObserver from '../../utils/resizeObserver';
import styles from './style/form.module.less';
import useLocale from '../../hooks/useLocale';
import LogoW from '../../assets/logo_w.svg';

export default function Info() {
  const locale = useLocale();
  const [userInfo] = useState({
    name: '王立群',
    avatar: '',
    email: 'wangliqun@bytedance.com',
    job: 'role_ue',
    organization: 'UED',
    organizationName: 'UED',
    location: 'beijing',
    introduction: '王力群并非是一个真实存在的人。',
    personalWebsite: '/',
  });
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState('');
  const [isMultiCol, setIsMultiCol] = useState(true);
  const gutter = 40;
  const span = isMultiCol ? 12 : 24;

  function save(_params) {
    setLoading(true);
    setTimeout(() => {
      Message.success(locale['content.pro.form.saveSuccess']);
      setLoading(false);
    }, 1000);
  }

  function onSaveBtnClick() {
    formRef.current.validate().then((values) => {
      save({
        ...values,
        avatar,
      });
    });
  }

  function onCancelBtnClick() {
    setInitialValue(userInfo);
  }

  function setInitialValue(values) {
    if (values) {
      setAvatar(values.avatar);
      formRef.current.setFieldsValue({
        ...values,
        avatar: [
          {
            uid: 1,
            url: values.avatar,
          },
        ],
      });
    }
  }

  function onAvatarChange(_, file) {
    setAvatar(file.originFile ? URL.createObjectURL(file.originFile) : '');
  }

  useEffect(() => {
    if (userInfo) {
      setAvatar(userInfo.avatar);
      setInitialValue(userInfo);
    }
  }, [userInfo]);

  return (
    <ResizeObserver
      onResize={([target]) => {
        const { width } = target.contentRect;
        setIsMultiCol(width > 425);
      }}
    >
      <Form layout="vertical" ref={formRef} className={styles.form}>
        <Form.Item
          label={locale['content.pro.form.label.avatar']}
          field="avatar"
          rules={[{ required: true }]}
          triggerPropName="fileList"
        >
          <Upload showUploadList={false} onChange={onAvatarChange}>
            <Avatar
              size={64}
              triggerIcon={<IconCamera />}
              triggerIconStyle={{ color: '#165dff' }}
              style={{ background: '#165dff' }}
            >
              {avatar ? <img src={avatar} /> : <LogoW style={{ height: 24 }} />}
            </Avatar>
          </Upload>
        </Form.Item>
        <Grid.Row gutter={isMultiCol ? gutter : 0}>
          <Grid.Col span={span}>
            <Form.Item
              label={locale['content.pro.form.label.name']}
              field="name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={locale['content.pro.form.label.location']}
              field="location"
              rules={[{ required: true }]}
            >
              <Select>
                <Select.Option key="beijing" value="beijing">
                  {locale['content.pro.form.location.beijing']}
                </Select.Option>
                <Select.Option key="shanghai" value="shanghai">
                  {locale['content.pro.form.location.shanghai']}
                </Select.Option>
                <Select.Option key="hangzhou" value="hangzhou">
                  {locale['content.pro.form.location.hangzhou']}
                </Select.Option>
                <Select.Option key="xiamen" value="xiamen">
                  {locale['content.pro.form.location.xiamen']}
                </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label={locale['content.pro.form.label.introduction']} field="introduction">
              <Input.TextArea />
            </Form.Item>
          </Grid.Col>
          <Grid.Col span={span}>
            <Form.Item
              label={locale['content.pro.form.label.personalWebsite']}
              field="personalWebsite"
            >
              <Input />
            </Form.Item>
            <Form.Item label={locale['content.pro.form.label.role']} field="job">
              <Select>
                <Select.Option key="UE" value="role_ue">
                  {locale['content.pro.form.role.ue']}
                </Select.Option>
                <Select.Option key="RD" value="role_rd">
                  {locale['content.pro.form.role.rd']}
                </Select.Option>
              </Select>
            </Form.Item>
          </Grid.Col>
        </Grid.Row>
        <Space>
          <Button type="primary" loading={loading} onClick={onSaveBtnClick}>
            {locale['content.pro.form.save']}
          </Button>
          <Button onClick={onCancelBtnClick}>{locale['content.pro.form.cancel']}</Button>
        </Space>
      </Form>
    </ResizeObserver>
  );
}
