import styled from 'styled-components';

// TODO: remove this ugly hack which comes from using mismatched icons
// offsetTop is max 3
export const IconWrapper = styled.span<{ offsetTop?: number }>`
  display: inline-flex;
  padding: 3px;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;
