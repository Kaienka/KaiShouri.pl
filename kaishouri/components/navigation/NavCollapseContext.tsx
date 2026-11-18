"use client";
import { createContext, useContext } from "react";

export const NavCollapseContext = createContext(false);

export function useNavCollapsed() {
  return useContext(NavCollapseContext);
}
