import styled from "@emotion/styled";

const _Button = styled.button`
  outline: none;
  background-color: var(--${(props) => props.variant});
  border: 2px solid var(--tertiary);
  font-weight: 500;
  font-size: 1rem;
  padding-top: 10px;
  padding-bottom: 10px;
  cursor: pointer;
  font-family: inherit;

  &:active {
    box-shadow: inset 0px 0px 999px 100px rgba(0, 0, 0, 0.08);
  }
`;

const Button = ({ variant = "primary", size = "md", children, ...props }) => {
  const variantsList = ["primary", "secondary", "tertiary"];

  if (!variantsList.includes(variant)) {
    variant = "primary";
  }

  return (
    <_Button variant={variant} size={size} {...props}>
      {children}
    </_Button>
  );
};

export default Button;
