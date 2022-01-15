interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  specialProp?: string;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="px-8 py-2 text-black transition-colors bg-white border-2 border-black rounded-full cursor-pointer disabled:opacity-30 hover:bg-black hover:text-white focus-visible:ring-2"
    >
      {children}
    </button>
  );
}
