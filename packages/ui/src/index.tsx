export const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    {...props}
  >
    {children}
  </button>
);

export const Card = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className="bg-white rounded-lg shadow p-6"
    {...props}
  >
    {children}
  </div>
);
