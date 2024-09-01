import styled from 'styled-components/macro'
import { WEIGHTS } from '../../constants'

const ANIMATION_TYPE = {
  flipUp: 'flipUp',
  selection: 'selection',
}

const ANIMATION_TYPE_DEFAULT = ANIMATION_TYPE.selection

const NavLink = ({ animationType = ANIMATION_TYPE_DEFAULT, ...delegated }) => {
  if (animationType === ANIMATION_TYPE.selection) {
    return <SelectionLink {...delegated} />
  }

  return <FlipUpLink {...delegated} />
}

const FlipUpLink = ({ children, ...delegated }) => {
  return (
    <Wrapper {...delegated}>
      <MainText>{children}</MainText>
      <HoverText aria-hidden>{children}</HoverText>
    </Wrapper>
  )
}

const SelectionLink = ({ children, ...delegated }) => {
  return <SelectionLinkWrapper {...delegated}>{children}</SelectionLinkWrapper>
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

const SelectionLinkWrapper = styled(Wrapper)`
  overflow: revert;

  &::before,
  &::after {
    display: inline-block;
    position: absolute;
    transform: translateX(var(--translate-from));
    opacity: 0;
    transition: transform 500ms, opacity 250ms;
  }

  &::before {
    content: '[';
    left: 0;
    --translate-from: 0;
    --translate-to: -16px;
  }

  &::after {
    content: ']';
    right: 0;
    --translate-from: 0;
    --translate-to: 16px;
  }

  @media (prefers-reduced-motion: no-preference) {
    &:hover&::before,
    &:hover&::after {
      transform: translateX(var(--translate-to));
      opacity: 1;
      transition: transform 250ms, opacity 750ms;
    }
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
