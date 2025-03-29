interface PageTitleProps {
  children: React.ReactNode;
}

export function PageTitle({ children }: PageTitleProps) {
  return (
    <h2 className="w-full bg-[#FAFAFA] text-center text-2xl leading-16 font-bold">
      {children}
    </h2>
  );
}
