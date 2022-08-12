import React, { useState, useEffect, useRef } from 'react';
import { Anchor } from '@arco-design/web-react';
import { withRouter } from 'react-router';

function SabAnchor(props) {
  const [prevTitle, setPrevTitle] = useState('');
  const [anchorLinks, setAnchorLinks] = useState([]);
  const timer = useRef(null);
  const count = useRef(0);

  function getAnchors() {
    setAnchorLinks([]);

    timer.current = setInterval(() => {
      count.current += 1;
      const navTitle = document.querySelector('.ac-nav-intro h1');
      const title = document.querySelector('.ac-nav-intro h1')?.innerHTML;
      if (navTitle && prevTitle !== title) {
        // demo
        const demoContents = document.querySelectorAll('.codebox-wrapper');
        const demoAnchors = [].slice.call(demoContents).map((x) => {
          const header = x.querySelector('.description>.code-preview .header');
          return {
            title: (header && header.innerText) || x.id,
            href: x.id,
          };
        });
        // markdown
        const markdownContents = document.querySelectorAll('.ac-content .markdown-body');
        const markdownAnchors = [];
        [].slice.call(markdownContents).map((root) => {
          const nodeList = [].slice.call(root.children);
          nodeList.map((node) => {
            if (node.id && node.tagName === 'H2') {
              markdownAnchors.push({
                href: node.id,
                title: node.innerText,
              });
            }
          });
        });
        setAnchorLinks(demoAnchors.concat(markdownAnchors));
        setPrevTitle(title);
        clearInterval(timer.current);
      }
      if (count.current > 1000) {
        clearInterval(timer.current);
      }
    }, 100);
  }

  useEffect(() => {
    getAnchors();

    return () => {
      clearInterval(timer.current);
    };
  }, [props.location.pathname]);

  return (
    <div className="ac-anchor-wrapper">
      <div className="ac-anchor-inner">
        {anchorLinks.length > 0 && (
          <Anchor boundary={70} affix={false} lineless>
            {anchorLinks.map((link) => (
              <Anchor.Link href={`#${link.href}`} title={link.title} key={link.href} />
            ))}
          </Anchor>
        )}
      </div>
    </div>
  );
}

export default withRouter(SabAnchor);
