import { useContext } from 'react';
import Navbar from '@arco-materials/site-navbar';

const { NavbarThemeContext } = Navbar;

function useTheme() {
  const { theme, realTheme, onHandleTheme } = useContext(NavbarThemeContext);

  return { theme, realTheme, onHandleTheme };
}

export default useTheme;
