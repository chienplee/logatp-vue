import Styled from 'vue3-styled-components';
import { Tabs } from 'ant-design-vue';

const { TabPane } = Tabs;

const props = ['color'];

const TabColor = (colors) => `
  margin-bottom: 30px !important;
  .ant-tabs-bar {
    margin: 0;
  }
  .ant-tabs-nav-list{
    margin: 0;
  }
  .ant-tabs-nav{
    color : ${({ color }) =>
      color !== 'default' && color !== '#ffffff' && color !== '#fff' && color !== 'white' ? '#ffffff' : '#000000'};
  }
  .ant-tabs-nav .ant-tabs-tab:hover, .ant-tabs-nav .ant-tabs-tab:focus {
    //background : ${colors !== 'default' && colors};
    color : ${({ color }) =>
      color !== 'default' && color !== '#ffffff' && color !== '#fff' && color !== 'white' ? '#ffffff' : '#000000'};
  }
  .ant-tabs-nav .ant-tabs-tab.ant-tabs-tab-active {
    border: none;
    border-radius: 3px;
    background : ${colors !== 'default' && colors};
  }
  .ant-tabs-tab.ant-tabs-tab-active{
    color : ${
      colors !== 'default' && colors !== '#ffffff' && colors !== '#fff' && colors !== 'white' ? '#ffffff' : '#5F63F2'
    };
  }
  .ant-tabs-ink-bar {
    background: transparent
  }
`;

const TabChildColor = (color) => `
  h1, h2, h3, h4, h5, h6, p, span, i {
    padding: 15px;
    background : ${color !== 'default' && color};
    color : ${
      color !== 'default' && color !== '#ffffff' && color !== '#fff' && color !== 'white' ? '#ffffff' : '#000000'
    };
    margin: 0;
  }
  
`;

const TabBasic = Styled(Tabs, props)`
  margin-bottom: 30px !important;
  ${({ color }) => color && TabColor(color)}
`;

const Child = Styled(TabPane, props)` 
    /* background: ${({ color }) =>
      color !== 'default' && color !== '#ffffff' && color !== '#fff' && color !== 'white' ? '#ffffff' : '#000000'}; */
    ${({ color }) => color && TabChildColor(color)}
`;

export { TabBasic, Child };
