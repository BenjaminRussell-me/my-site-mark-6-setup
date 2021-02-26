import { Store } from "./main";

interface Hsla {
  h: number;
  s: number;
  l: number;
  a: number;
}

interface Theme {
  hsla: Hsla;
  accent: Hsla;
  textColor: Hsla;
  isDark: boolean;
}

interface ThemesShape {
  isDark: boolean;
  light: Theme;
  dark: Theme;
  dynamicTheme: Theme;
}

interface Themes extends Object {
  themes: ThemesShape;
}

class ThemeStore extends Store<Themes> {
  protected data(): Themes {
    return {
      themes: {
        isDark: false,
        light: {
          hsla: { h: 208, s: 70, l: 40, a: 1 },
          accent: { h: 166, s: 70, l: 40, a: 1 },
          textColor: { h: 185, s: 100, l: 10, a: 1 },
          isDark: false
        },
        dark: {
          hsla: { h: 185, s: 100, l: 45, a: 1 },
          accent: { h: 185, s: 100, l: 45, a: 1 },
          textColor: { h: 185, s: 100, l: 45, a: 1 },
          isDark: true
        },
        dynamicTheme: {
          hsla: { h: 208, s: 70, l: 40, a: 1 },
          accent: { h: 166, s: 70, l: 40, a: 1 },
          textColor: { h: 185, s: 100, l: 10, a: 1 },
          isDark: false
        }
      }
    };
  }

  flipTheme() {
    if (this.state.themes.isDark === false) {
      this.state.themes.isDark = true;
      this.state.themes.dynamicTheme = this.state.themes.dark;
    } else {
      this.state.themes.isDark = false;
      this.state.themes.dynamicTheme = this.state.themes.light;
    }
  }
}

export const themeStore = new ThemeStore();
