type AlertProps = {
  status: 'error' | 'submitted';
  message: string;
};

function Alert({ status, message }: AlertProps) {
  const statusList = {
    error: {
      bg: 'bg-red-50 ',
      text: 'text-red-800',
      icon: 'text-red-400',
    },
    submitted: {
      bg: 'bg-green-50 ',
      text: 'text-green-800',
      icon: 'text-green-400',
    },
  };

  return (
    <div className={`rounded-md p-4 ${statusList[status].bg}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className={`h-5 w-5 ${statusList[status].icon}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            {status === 'error' && (
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                clipRule="evenodd"
              />
            )}

            {status === 'submitted' && (
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            )}
          </svg>
        </div>
        <div className="ml-3">
          <p className={`text-sm font-medium ${statusList[status].text}`}>
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Alert;
