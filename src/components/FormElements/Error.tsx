import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    message && (
      <div className="flex mt-1 relative">
        {/* Conteúdo do componente */}
      </div>
    )
  );
};

export default ErrorMessage;
