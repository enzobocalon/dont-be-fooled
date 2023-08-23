import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string,
    primaryHover: string,
    secondary: string, 
    primaryAccent: string,
    secondaryAccent: string,
    dark: string,
    gray: string,
    success: string,
    ligtherSuccess: string,
    danger: string,
    lighterDanger: string,
    info: string,
    lighterInfo: string,
    boxShadow: string,
  }
}
