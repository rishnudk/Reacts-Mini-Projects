import React from "react";

// Higher-Order Component
function withLoading(Component) {
  // Return a new component
  return function WrappedComponent(props) {
    if (props.isLoading) {
      return <h2>Loading...</h2>;
    }
    return <Component {...props} />;
  };
}

export default withLoading;
