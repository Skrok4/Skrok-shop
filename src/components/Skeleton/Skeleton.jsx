import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={500}
    viewBox="0 0 400 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="-7" y="10" rx="10" ry="10" width="429" height="295" />
    <rect x="8" y="445" rx="6" ry="6" width="164" height="29" />
    <rect x="7" y="335" rx="5" ry="5" width="380" height="22" />
    <rect x="315" y="433" rx="100" ry="100" width="50" height="50" />
    <rect x="111" y="370" rx="5" ry="5" width="156" height="16" />
  </ContentLoader>
);

export default MyLoader;
