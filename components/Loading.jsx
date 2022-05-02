import React from 'react';

const Loading = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-blue-400"></div>
    </div>
  );
};

export default Loading;
