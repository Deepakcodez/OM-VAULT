import React from 'react';

const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value);

  React.useEffect(() => {
    // Set a timeout to update the debounced value after the delay
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if the value or delay changes
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue; // No need for type assertion
};

export default useDebounce;
