import styled from "styled-components"

const StyledButton = styled.button`
  --brand: #2b59ad;

  position: relative;
  overflow: hidden;
  height: 3rem;
  padding: 0 2rem;
  border-radius: 1.5rem;
  background: #ffffff;
  color: #0f172a;
  border: 1px solid rgba(15, 23, 42, 0.15);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: 0 6px 18px rgba(43, 89, 173, 0.35);
  }

  &:hover .button-content {
    color: #ffffff;
  }

  .button-content {
    position: relative;
    z-index: 1;
    transition: color 0.35s ease;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: 0 50%;
    width: 100%;
    height: inherit;
    border-radius: inherit;
    background: linear-gradient(82.3deg, var(--brand) 10.8%, #3b6bd0 94.3%);
    transition: transform 0.475s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:active::before {
    filter: brightness(0.92);
  }
`

export default function Button({
  children = "Kirish",
  type = "button",
  ...props
}) {
  return (
    <StyledButton type={type} className="button" {...props}>
      <span className="button-content">{children}</span>
    </StyledButton>
  )
}
