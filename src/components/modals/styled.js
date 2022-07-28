import Styled from 'vue3-styled-components';
import { Modal } from 'ant-design-vue';

const ModalStyledColord = (type, theme) => `
  .ant-modal-content, .ant-modal-header {
    background-color: ${type !== 'default' && theme[`${type}-color`]} !important;
  }
  .ant-modal-title {
    color: #fff;
  }
  .ant-modal-footer button {
    background: #fff;
    color: #999;
    border: 1px solid #ffff;
  }
`;
const props = ['type'];
const ModalStyled = Styled(Modal, props)`    
  ${({ theme, type }) => type && ModalStyledColord(type, theme)}
`;

export { ModalStyled, ModalStyledColord };
