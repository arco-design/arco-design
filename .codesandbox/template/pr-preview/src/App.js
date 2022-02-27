import './styles.css';
import '@arco-design/web-react/dist/css/arco.css';
import { Empty, Button } from '@arco-design/web-react';

export default function App() {
  return (
    <div className="App">
      <Empty
        imgSrc="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp"
        description={<Button type="primary">Start check pr is working</Button>}
      />
    </div>
  );
}
