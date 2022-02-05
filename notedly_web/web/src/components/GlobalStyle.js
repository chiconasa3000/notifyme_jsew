
import {createGlobalStyle} from 'styled-components';
import normalize from 'normalize.css';

//we can write our CSS as a JS template literal


export default createGlobalStyle`
${normalize}

*,*:before, *:after{
  box-sizing: border-box;
}

body,
html{
  height: 100%;
  margin: 0;
}

body{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxigen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  background-color: #e5e5e5;
  line-height: 1.4;
}

a:link,
a:visited{
  color: #0077cc;
}
a:hover,
a:focus{
  color: #004499;
}

code,
pre{
  max-width: 100%;
}

`;
