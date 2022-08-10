---
order: 3
title:
  zh-CN: 组合示例
  en-US: Conplex
---

## zh-CN

组件提供的完整能力

## en-US

Complete capabilities provided by components

```js
import { PageHeader, Button, Tag, Message, Typography } from '@arco-design/web-react';

const App = () => {
  return (
    <div style={{ background: 'var(--color-fill-2)', padding: 40 }}>
      <PageHeader
        style={{ background: 'var(--color-bg-2)' }}
        title="ArcoDesign"
        subTitle={
          <>
            This is a description
            <Tag color="red" size="small" style={{ marginLeft: 8 }}>
              Default
            </Tag>
          </>
        }
        backIcon
        onBack={() => Message.info('点击了返回按钮')}
        breadcrumb={{
          routes: [
            {
              path: '/',
              breadcrumbName: 'Home',
            },
            {
              path: '/channel',
              breadcrumbName: 'Channel',
            },
            {
              path: '/news',
              breadcrumbName: 'News',
            },
          ],
        }}
        extra={
          <div>
            <Button type="secondary" style={{ marginRight: 12 }}>
              Cancel
            </Button>
            <Button type="primary">Save</Button>
          </div>
        }
      >
        <Typography.Paragraph
          style={{
            fontSize: 16,
            fontWeight: 600,
            marginTop: 0,
            marginBottom: 20,
          }}
        >
          For other uses, see Design
        </Typography.Paragraph>
        <Typography.Paragraph>
          A design is a plan or specification for the construction of an object or system or for the
          implementation of an activity or process, or the result of that plan or specification in
          the form of a prototype, product or process. The verb to design expresses the process of
          developing a design. In some cases, the direct construction of an object without an
          explicit prior plan (such as in craftwork, some engineering, coding, and graphic design)
          may also be considered to be a design activity. The design usually has to satisfy certain
          goals and constraints, may take into account aesthetic, functional, economic, or
          socio-political considerations, and is expected to interact with a certain environment.
          Major examples of designs include architectural blueprints,engineering drawings, business
          processes, circuit diagrams, and sewing patterns.Major examples of designs include
          architectural blueprints,engineering drawings, business processes, circuit diagrams, and
          sewing patterns.
        </Typography.Paragraph>
      </PageHeader>
    </div>
  );
};

export default App;
```
