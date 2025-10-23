import { createContext, type ReactNode, useContext } from "react";

export type ComposableIconsConfig = {
  source: string;
  numberOfColumns: number;
  spriteSize: number;
  spriteGap: number;
  spriteOffset: number;
};

const ComposableIconsContext = createContext<ComposableIconsConfig | null>(
  null,
);

type ComposableIconsProviderProps = {
  value: ComposableIconsConfig;
  children: ReactNode;
};

export const ComposableIconsProvider = ({
  children,
  value,
}: ComposableIconsProviderProps) => {
  return (
    <ComposableIconsContext.Provider value={value}>
      {children}
    </ComposableIconsContext.Provider>
  );
};

export const useComposableIcons = () => {
  const context = useContext(ComposableIconsContext);

  if (!context) {
    throw new Error(
      "useComposableIcons must be used within a ComposableIconsProvider",
    );
  }

  return context;
};
