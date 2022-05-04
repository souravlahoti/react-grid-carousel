import {FC, ReactNode, HTMLAttributes} from 'react';
import styled from 'styled-components';

export type ArrowButtonProps = HTMLAttributes<HTMLDivElement> & {
  type?: 'prev' | 'next';
  CustomBtn?: ReactNode;
};

const Button = styled.span<Pick<ArrowButtonProps, 'type'>>`
  position: absolute;
  top: calc(50% - 14px);
  height: 28px;
  width: 28px;
  background: #fff;
  border-radius: 50%;
  box-shadow: rgba(99, 99, 99, 0.2) 0 2px 8px 0;
  z-index: 10;
  cursor: pointer;
  font-size: 10px;
  opacity: 0.6;
  transition: opacity 0.25s;
  left: ${({type}) => (type === 'prev' ? '-14px' : 'initial')};
  right: ${({type}) => (type === 'next' ? '-14px' : 'initial')};

  &:hover {
    opacity: 1;
  }

  &::before {
    content: '';
    height: 8px;
    width: 8px;
    background: transparent;
    border-top: 2px solid #777;
    border-right: 2px solid #777;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: ${({type}) =>
      type === 'prev' ? 'translate(-25%, -50%) rotate(-135deg)' : 'translate(-75%, -50%) rotate(45deg)'};
  }
`;

const ArrowButton: FC<ArrowButtonProps> = ({type, CustomBtn, ...props}) => (
  <div {...props}>
    {CustomBtn ? typeof CustomBtn === 'function' ? <CustomBtn /> : CustomBtn : <Button type={type} />}
  </div>
);

export default ArrowButton;
