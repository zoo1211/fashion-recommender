export function Card({ children, className }) {
    return <div className={`border rounded-lg p-4 ${className}`}>{children}</div>;
  }
  export function CardHeader({ children }) {
    return <div className="border-b p-2">{children}</div>;
  }
  export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
  }
  export function CardTitle({ children }) {
    return <h2 className="text-lg font-bold">{children}</h2>;
  }
  