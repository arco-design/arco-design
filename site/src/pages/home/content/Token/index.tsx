import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Typography,
  Button,
  Slider,
  Select,
  Input,
  Popconfirm,
  Space,
} from '@arco-design/web-react';
import { IconUndo } from '@arco-design/web-react/icon';
import styles from './index.module.less';
import EditorSkin, { EditorPanel } from '../../components/EditorSkin';
import CardIntroduce from '../../components/CardIntroduce';
import ColorPicker from '../../components/ColorPicker';
import useLocale from '../../hooks/useLocale';

enum FontWeight {
  UltraLight = 100,
  Thin = 200,
  Light = 300,
  Regular = 400,
  Medium = 500,
  SemiBold = 600,
  Bold = 700,
  ExtraBold = 800,
  Black = 900,
}

const borderSizeVariableMap = {
  0: '@border-none',
  1: '@border-1',
  2: '@border-2',
  3: '@border-3',
};

const borderRadiusMap = {
  0: '0',
  1: '2px',
  2: '4px',
  3: '8px',
  4: '16px',
};

const borderRadiusVariableMap = {
  0: '@border-radius-none',
  1: '@border-radius-small',
  2: '@border-radius-medium',
  3: '@border-radius-large',
  4: '@border-radius-extra-large',
};

const sizeMap = {
  0: 'mini',
  1: 'small',
  2: 'default',
  3: 'large',
};

interface TokenProps {
  onMounted?: () => void;
}

export default function Token(props: TokenProps) {
  const { onMounted } = props;
  const locale = useLocale();
  const [themeColor, setThemeColor] = useState('#165dff');
  const [fontWeight, setFontWeight] = useState(400);
  const [borderSize, setBorderSize] = useState(1);
  const [borderRadius, setBorderRadius] = useState(2);
  const [size, setSize] = useState(2);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    window.setTimeout(() => setOpacity(1));
  }, []);

  const handleReset = () => {
    setFontWeight(400);
    setBorderSize(1);
    setBorderRadius(2);
    setSize(2);
  };

  useLayoutEffect(() => {
    document.body.style.setProperty('--home-token-component-font-weight', `${fontWeight}`);
    document.body.style.setProperty('--home-token-component-border', `${borderSize}px`);
    document.body.style.setProperty(
      '--home-token-component-border-radius',
      `${borderRadiusMap[borderRadius]}`
    );
  }, [fontWeight, borderSize, borderRadius]);

  useEffect(() => {
    onMounted && onMounted();
  }, []);

  return (
    <div className={styles['token-body']} ref={bodyRef} style={{ opacity }}>
      <div className={styles['token-body-left']}>
        <div className={styles['token-form']}>
          <Space direction="vertical" size="large">
            <Space direction="vertical">
              <Typography.Text type="secondary">
                {locale['content.token.label.theme']}
              </Typography.Text>
              <ColorPicker
                getPropertyWrapper={() => wrapperRef.current}
                color={themeColor}
                onChange={setThemeColor}
              />
            </Space>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                {locale['content.token.label.fontWeight']}
              </Typography.Text>
              <Select value={fontWeight} onChange={(value) => setFontWeight(value)}>
                {Object.keys(FontWeight)
                  .filter((key) => isNaN(Number(key)))
                  .map((item, index) => (
                    <Select.Option value={FontWeight[item]} key={index}>
                      {item}
                    </Select.Option>
                  ))}
              </Select>
            </Space>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                {locale['content.token.label.border']}
              </Typography.Text>
              <Slider
                max={3}
                value={borderSize}
                onChange={(value: number) => setBorderSize(value)}
              />
            </Space>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                {locale['content.token.label.radius']}
              </Typography.Text>
              <Slider
                max={4}
                value={borderRadius}
                formatTooltip={(value) => borderRadiusMap[value]}
                onChange={(value: number) => setBorderRadius(value)}
              />
            </Space>
            <Space direction="vertical">
              <Typography.Text type="secondary">
                {locale['content.token.label.size']}
              </Typography.Text>
              <Slider
                max={3}
                value={size}
                formatTooltip={(value) => sizeMap[value]}
                onChange={(value: number) => setSize(value)}
              />
            </Space>
          </Space>
          <div className={styles['form-bottom']}>
            <Button type="text" size="small" onClick={handleReset} style={{ marginLeft: -16 }}>
              <IconUndo />
              {locale['content.token.reset']}
            </Button>
          </div>
        </div>
        <div className={styles['token-display']}>
          <div className={styles['token-lattice']}>
            <div className={styles['token-component-wrapper']} ref={wrapperRef}>
              <Space direction="vertical" size="medium" style={{ width: '100%' }}>
                <Popconfirm
                  title="Are you sure you want to delete?"
                  popupVisible
                  okButtonProps={{
                    size: sizeMap[size],
                  }}
                  cancelButtonProps={{
                    size: sizeMap[size],
                  }}
                  getPopupContainer={() => wrapperRef.current}
                  style={{ width: 262 }}
                  triggerProps={{
                    autoFitPosition: false,
                  }}
                >
                  <Input
                    placeholder="Please enter something"
                    maxLength={10}
                    showWordLimit
                    size={sizeMap[size]}
                  />
                </Popconfirm>
                <Space>
                  <Button type="secondary" size={sizeMap[size]}>
                    Again
                  </Button>
                  <Button type="primary" size={sizeMap[size]}>
                    OK
                  </Button>
                </Space>
              </Space>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['token-body-right']} data-aos="scale-fade-in">
        <CardIntroduce
          style={{ height: '100%' }}
          code={
            <EditorSkin lineNumber={6}>
              <EditorPanel>
                <p>
                  <span className="token selector">.button </span>
                  <span className="token punctuation">{'{'}</span>
                </p>
                <p>
                  &nbsp;&nbsp;<span className="token property">background</span>
                  <span className="token punctuation">: </span>
                  <span className="token variable">{themeColor}</span>
                  <span className="token punctuation">;</span>
                </p>
                <p>
                  &nbsp;&nbsp;<span className="token property">font-weight</span>
                  <span className="token punctuation">: </span>
                  <span className="token variable">@font-weight-{fontWeight}</span>
                  <span className="token punctuation">;</span>
                </p>
                <p>
                  &nbsp;&nbsp;<span className="token property">border</span>
                  <span className="token punctuation">: </span>
                  <span className="token variable">
                    {borderSizeVariableMap[borderSize]} solid var(--color-border)
                  </span>
                  <span className="token punctuation">;</span>
                </p>
                <p>
                  &nbsp;&nbsp;<span className="token property">border-radius</span>
                  <span className="token punctuation">: </span>
                  <span className="token variable">{borderRadiusVariableMap[borderRadius]}</span>
                  <span className="token punctuation">;</span>
                </p>
                <p>
                  <span className="token punctuation">{'}'}</span>
                </p>
              </EditorPanel>
            </EditorSkin>
          }
          title="Design Token"
          description={
            <>
              <p>{locale['content.token.desc1']}</p>
              <br />
              <p>{locale['content.token.desc2']}</p>
            </>
          }
        />
      </div>
    </div>
  );
}
