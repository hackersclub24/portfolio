import { useLayoutEffect } from "react";

type GSAPCleanup = void | (() => void);

export function useGSAP(callback: () => GSAPCleanup, dependencies: React.DependencyList = []) {
  useLayoutEffect(() => callback(), dependencies);
}