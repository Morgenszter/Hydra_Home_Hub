import {theme,Theme} from '../../theme';
class ThemeEngine{private current:Theme=theme;getTheme(){return this.current;}setTheme(t:Theme){this.current=t;}}
export const themeEngine=new ThemeEngine();
