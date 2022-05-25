import React from 'react';
import { Menu, Dropdown, Button, Avatar } from '@self';

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const Droplist = (
  <Menu>
    <MenuItem key="1" disabled>
      <div>
        <Avatar>Hello</Avatar>
      </div>
    </MenuItem>
    <MenuItem key="2">Menu Item2</MenuItem>
    <MenuItem key="3">Menu Item3</MenuItem>
    <SubMenu key="Language" title="Language">
      <MenuItem key="4">C</MenuItem>
      <MenuItem key="5">C++</MenuItem>
      <SubMenu key="fe" title="Front End">
        <MenuItem key="6">JavaScript</MenuItem>
        <MenuItem key="7">CSS</MenuItem>
      </SubMenu>
      <SubMenu key="be" title="Back End">
        <MenuItem key="8">Java</MenuItem>
        <MenuItem key="9">Python</MenuItem>
        <MenuItem key="10">PHP</MenuItem>
      </SubMenu>
    </SubMenu>
    <SubMenu key="City" title="City">
      <MenuItem key="11">BeiJing</MenuItem>
      <MenuItem key="12">ShangHai</MenuItem>
      <MenuItem key="13">ShenZhen</MenuItem>
    </SubMenu>
  </Menu>
);

export const Demo = () => (
  <div>
    <Dropdown droplist={Droplist} position="bl">
      <span>鼠标移上来</span>
    </Dropdown>
    <Dropdown droplist={Droplist} trigger="click" position="bl">
      <Button style={{ marginLeft: 100 }}>点击我</Button>
    </Dropdown>
  </div>
);

export default {
  title: 'Dropdown',
};
