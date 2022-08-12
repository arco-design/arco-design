import React from 'react';
import CardIntroduce from '../../components/CardIntroduce';
import EditorSkin, { EditorPanel } from '../../components/EditorSkin';

const demo1Html = `
<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useEffect<span class="token punctuation">,</span> useRef <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span><br/>
<span class="token keyword">import</span> <span class="token punctuation">{</span> <br/>
&nbsp;&nbsp;Card<span class="token punctuation">,</span> <br/>
&nbsp;&nbsp;Statistic<span class="token punctuation">,</span> <br/>
&nbsp;&nbsp;Typography <br/>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@arco-design/web-react'</span><span class="token punctuation">;</span><br/>
`;
const demo2Html = `

<span class="token keyword">import</span> React<span class="token punctuation">,</span> <span class="token punctuation">{</span> useEffect<span class="token punctuation">,</span> useRef<span class="token punctuation">,</span> useState <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'react'</span><span class="token punctuation">;</span><br/>
<span class="token keyword">import</span> <span class="token punctuation">{</span><br/>
&nbsp;&nbsp;Form<span class="token punctuation">,</span><br/>
&nbsp;&nbsp;Input<span class="token punctuation">,</span><br/>
&nbsp;&nbsp;Button<span class="token punctuation">,</span><br/>
&nbsp;&nbsp;Space<span class="token punctuation">,</span><br/>
&nbsp;&nbsp;Avatar<span class="token punctuation">,</span><br/>
&nbsp;&nbsp;Upload<span class="token punctuation">,</span><br/>
&nbsp;&nbsp;Message<span class="token punctuation">,</span><br/>
&nbsp;&nbsp;Select<span class="token punctuation">,</span><br/>
&nbsp;&nbsp;Grid<span class="token punctuation">,</span><br/>
<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@arco-design/web-react'</span><span class="token punctuation">;</span><br/>
<span class="token keyword">import</span> <span class="token punctuation">{</span> IconCamera<span class="token punctuation">,</span> IconPlus <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'@arco-design/web-react/icon'</span><span class="token punctuation">;</span><br/>
`;

type DemoType = 'demo1' | 'demo2';
const demoArr: DemoType[] = ['demo1', 'demo2'];
const demoMap = { demo1: 0, demo2: 1 };

interface EditorCardProps {
  activeDemo: DemoType;
  onChange: (activeDemo: DemoType) => void;
}

export default function EditorCard(props: EditorCardProps) {
  const { activeDemo } = props;
  const activeTab: number = demoMap[activeDemo];

  return (
    <CardIntroduce
      style={{ width: 500 }}
      code={
        <EditorSkin
          activeTab={activeTab}
          onChange={(index) => {
            props.onChange(demoArr[index]);
          }}
        >
          <EditorPanel title="Demo1.js" lineNumber={7}>
            <div dangerouslySetInnerHTML={{ __html: demo1Html }} />
          </EditorPanel>
          <EditorPanel title="Demo2.js" lineNumber={15}>
            <div dangerouslySetInnerHTML={{ __html: demo2Html }} />
          </EditorPanel>
        </EditorSkin>
      }
    />
  );
}
