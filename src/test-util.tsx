import { render } from "@testing-library/react";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { MemoryRouter } from "react-router-dom";

setLogger({
  log: console.log,
  warn: console.warn,
  // ✅ no more errors on the console
  error: () => {},
});

const Wrapper = ({
  children,
  route,
}: {
  children: ReactNode;
  route: string;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // ✅ turns retries off
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

const renderWithRouter = (
  ui: ReactElement<any, string | JSXElementConstructor<any>>,
  { route = "/" } = {}
) => {
  return render(ui, {
    wrapper: ({ children }) => <Wrapper route={route}>{children}</Wrapper>,
  });
};

export { renderWithRouter };
