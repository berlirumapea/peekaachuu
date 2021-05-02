import ContentLoader from "react-content-loader";

const PokeCardPlaceholder = ({ ...props }) => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="100%"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="38" cy="65" r="2" />
      <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
    </ContentLoader>
  );
};

export default PokeCardPlaceholder;
