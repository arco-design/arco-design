import React, { useRef, useState } from 'react';
import { Button, Divider, Tooltip, Avatar } from '@self';
import List, { VirtualListHandle } from '@self/_class/VirtualList';

const MyItem = ({ id, randomNumber }: { id: number; randomNumber: number }, ref: any) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        padding: '8px 16px',
        lineHeight: 1.15,
        backgroundColor: `rgba(0 ,0 ,0, ${id % 2 ? 0 : 0.07})`,
      }}
    >
      <Tooltip content={`This is the ${id}th item`}>
        <h3 style={{ display: 'inline-block' }}># {id}</h3>
      </Tooltip>

      <div
        style={{ position: 'absolute', right: 16, top: 16, display: 'flex', alignItems: 'center' }}
      >
        <Tooltip content="Something not important...">
          <Button>Just a Button</Button>
        </Tooltip>
        <Avatar.Group size={32} style={{ margin: 10 }}>
          <Avatar style={{ backgroundColor: '#7BC616' }}>A</Avatar>
          <Avatar style={{ backgroundColor: '#14C9C9' }}>B</Avatar>
          <Avatar style={{ backgroundColor: '#168CFF' }}>C</Avatar>
          <Avatar>
            <img
              alt="avatar"
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fbbdefc1702398f2f394c57270f7f727.png~tplv-uwbnlip3yd-png.png"
            />
          </Avatar>
          <Avatar>
            <img
              alt="avatar"
              src="//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/fbbdefc1702398f2f394c57270f7f727.png~tplv-uwbnlip3yd-png.png"
            />
          </Avatar>
        </Avatar.Group>
      </div>

      <div style={{ color: '#666', marginBottom: randomNumber * 10 }}>
        {new Array(randomNumber).fill(null).map((_, index) => (
          <p key={index}>
            This is something as content, content content content content content content content
          </p>
        ))}

        <p
          style={{
            marginTop: 8,
            paddingLeft: 12,
            borderLeft: '10px solid #666',
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          And a paragraph
        </p>
      </div>

      <div
        style={{
          height: 12,
          backgroundImage: 'linear-gradient(to right,#fca134,#e1294f)',
        }}
      />
    </div>
  );
};

const ForwardMyItem = React.forwardRef(MyItem);

const getData = (size: number) => {
  const data = [];
  for (let i = 0; i < size; i += 1) {
    data.push({
      id: i,
      height: 40,
      randomNumber: ~~(Math.random() * 4),
    });
  }
  return data;
};

const Demo1 = () => {
  const listRef = useRef(null as any as VirtualListHandle);
  const [virtual, setVirtual] = useState(true);
  const [data, setData] = useState(getData(200));

  return (
    <React.StrictMode>
      <Button onClick={() => setVirtual(!virtual)}>{`Virtual: ${virtual}`}</Button>
      <Button onClick={() => setData(data.concat(getData(1)))}>Append 1</Button>
      <Button onClick={() => setData(data.concat(getData(50)))}>Append 50</Button>
      <Button onClick={() => setData(data.slice(50))}>Remove 50 before</Button>
      <Button onClick={() => listRef.current.scrollTo({ index: 50 })}>Scroll To 50</Button>
      <Divider>${data.length} Items</Divider>
      <List
        threshold={virtual ? 100 : null}
        isStaticItemHeight={false}
        ref={listRef}
        data={data}
        itemKey="id"
        style={{
          border: '1px solid pink',
          boxSizing: 'border-box',
        }}
      >
        {(item: any) => <ForwardMyItem {...item} />}
      </List>
    </React.StrictMode>
  );
};

export const Demo = () => <Demo1 />;

export default {
  title: 'Private Components/VirtualList',
};
