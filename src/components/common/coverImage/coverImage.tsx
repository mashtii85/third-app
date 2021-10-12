/**
 * Components - Courses - View - Client - Tabs - Cover Image
 */

// UI
import { Image } from '@drykiss/industry-ui'

// Style
import styled from 'styled-components'

export const CoverImage = ({
  src,
  action,
  click,
  alt,
  title
}: {
  src: string
  action?: string
  click?: () => void
  alt?: string
  title?: string
}) => {
  return (
    <div>
      {title && <Title>{title}</Title>}
      <StyledCoverImage>
        {src ? <Image alt={alt} src={src} /> : <div className="place-holder"></div>}
        {action && <StyledAction onClick={click}>{action}</StyledAction>}
      </StyledCoverImage>
    </div>
  )
}

const Title = styled.div`
  color: #474747;
  padding-bottom: 10px;
`
const StyledAction = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  bottom: 0;
  color: #fff;
  cursor: pointer;
  left: 0;
  padding: 4px;
  position: absolute;
  opacity: 0;
  right: 0;
  transition: all 0.1s ease-in-out;
  text-align: center;
  visibility: hidden;
  width: 100%;
`
const StyledCoverImage = styled.div`
  align-items: center;
  box-sizing: border-box;
  color: 'gray';
  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;
  object-fit: cover;
  &:hover {
    ${StyledAction} {
      visibility: visible;
      opacity: 1;
    }
  }
  .place-holder {
    width: 100%;
    height: 66px;
    background-color: #e5e5f7;
    opacity: 0.2;
    background-size: 10px 10px;
    background-image: repeating-linear-gradient(
      45deg,
      #a9a9a9 0,
      #a9a9a9 1px,
      #e5e5f7 0,
      #e5e5f7 50%
    );
  }
`
