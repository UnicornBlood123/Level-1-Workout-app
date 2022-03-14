import 'antd/dist/antd.min.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
html, body {
    width:100%;
    height:100%;
    overflow-x: hidden;
    overflow-y: hidden;
}
`;

export default GlobalStyle;
