import styled from 'styled-components/macro'
import { WEIGHTS } from '../../constants'

const NavLink = ({ children, ...delegated }) => {
  return (
    <Wrapper {...delegated}>
      <MainText>{children}</MainText>
      <HoverText aria-hidden>{children}</HoverText>
    </Wrapper>
  )
}

const Wrapper = styled.a`
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  overflow: clip;
  height: 27px;
  position: relative;
  cursor: pointer;

  &:first-of-type {
    color: var(--color-secondary);
  }
`

const Text = styled.span`
  display: block;
  transition: transform 500ms;
  transform: translateY(var(--translate-from));

  @media (prefers-reduced-motion: no-preference) {
    ${Wrapper}:hover & {
      transform: translateY(var(--translate-to));
      transition: transform 250ms;
    }
  }
`

const MainText = styled(Text)`
  --translate-from: 0;
  --translate-to: -100%;
`

const HoverText = styled(Text)`
  --translate-from: 100%;
  --translate-to: 0;
  position: absolute;
  inset: 0;
  font-weight: ${WEIGHTS.bold};
`

export default NavLink
