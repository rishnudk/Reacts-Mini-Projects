
import React from 'react';

// Main component of the application
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl space-y-6 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800">Higher-Order Component Example</h1>
        <p className="text-gray-600">
          This example shows a simple HOC that adds a `color` prop to a component.
        </p>

        {/* This is the original component without the HOC */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Original Component</h2>
          <WelcomeMessage />
        </div>

        {/* This is the component wrapped by the HOC, which now has a 'color' prop */}
        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Wrapped Component</h2>
          <ColoredWelcomeMessage />
        </div>

      </div>
    </div>
  );
};

// 1. A simple component we want to enhance.
// This component has no inherent color logic.
const WelcomeMessage = ({ color = 'text-gray-800' }) => {
  return (
    <div className={`p-4 rounded-lg font-medium transition-colors duration-300 ${color}`}>
      <p>Hello, World! This is a simple message component.</p>
    </div>
  );
};

// 2. Define the Higher-Order Component (HOC).
// An HOC is a function that takes a component as an argument...
const withColor = (WrappedComponent) => {
  // ...and returns a new component.
  // The new component is responsible for adding the new functionality.
  return (props) => {
    // Here, we're adding a new prop 'color' with a specific value.
    const newProps = {
      ...props, // Pass through any existing props
      color: 'text-indigo-600' // Add our new, enhanced prop
    };

    // We render the original WrappedComponent with the new props.
    return <WrappedComponent {...newProps} />;
  };
};

// 3. Use the HOC to create a new, enhanced component.
// Now, 'ColoredWelcomeMessage' is a version of 'WelcomeMessage'
// that automatically receives a specific color prop from the HOC.
const ColoredWelcomeMessage = withColor(WelcomeMessage);

// Export the main component as default
export default App;
