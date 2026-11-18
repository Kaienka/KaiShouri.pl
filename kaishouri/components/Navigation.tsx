"use client";
import { useState, useEffect } from "react";
import SocialLinks from "@/components/navigation/SocialLinks";
import MainNavbar from "@/components/navigation/MainNavbar";
import Header from "@/components/navigation/Header";
import HamburgerBtn from "@/components/navigation/HamburgerBtn";
import Link from "next/link";
import ThemeChanger from "@/components/read/ThemeChanger";
import { NavCollapseContext } from "@/components/navigation/NavCollapseContext";

const STORAGE_KEY = "navCollapsed";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [hasMounted, setHasMounted] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {}
    const media = window.matchMedia("(min-width: 640px)");
    setIsDesktop(media.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    media.addEventListener("change", onChange);
    setHasMounted(true);
    return () => media.removeEventListener("change", onChange);
  }, []);

  function toggleCollapsed() {
    setCollapsed((c) => {
      const next = !c;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
      } catch {}
      return next;
    });
  }

  if (!hasMounted) return null;

  const isCollapsed = collapsed && isDesktop;

  return (
    <NavCollapseContext.Provider value={isCollapsed}>
      {!isOpen && (
        <header className="sm:hidden fixed top-0 left-0 w-full h-16 z-50 bg-plume-wine shadow-md flex items-center justify-between pl-4 pr-1">
          <div className="flex flex-row items-center">
          <HamburgerBtn onClick={toggleMenu} isOpen={isOpen} />
          <Link href="/">
          <p className="font-mono font-bold text-linen-cloud">Kai Shouri</p>
          </Link>
          </div>
          <ThemeChanger
            mobile additionalClass="py-0 px-0" />
        </header>
      )}

      <div
        className={`
    fixed top-0 left-0 w-[250px] flex flex-col justify-between
    transform transition-[transform,width,background-color] duration-300 ease-in-out
    ${isCollapsed ? "bg-nice-light-purple dark:bg-dark-plume" : "bg-plume-wine shadow-xl"}
    sm:relative sm:translate-x-0 ${isCollapsed ? "sm:w-[72px]" : "sm:w-[250px]"} sm:shrink-0
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    z-40
    pt-16 sm:pt-0 pb-[env(safe-area-inset-bottom)] sm:pb-0 h-dvh sm:min-h-dvh
  `}
      >
        <div>
          <Header
           onClick={toggleMenu} />
          <MainNavbar />
        </div>
        <SocialLinks />
        <button
          type="button"
          onClick={toggleCollapsed}
          aria-label={isCollapsed ? "Rozwiń menu" : "Zwiń menu"}
          aria-expanded={!isCollapsed}
          title={isCollapsed ? "Rozwiń menu" : "Zwiń menu"}
          className={`hidden sm:flex absolute top-8 -right-3.5 z-50 items-center justify-center w-7 h-7 rounded-full transition-colors ${
            isCollapsed
              ? "bg-nice-light-purple text-third-plum hover:text-plume-wine dark:bg-dark-plume dark:text-fourth-plum dark:hover:text-linen-cloud"
              : "bg-plume-wine text-linen-cloud hover:text-nice-light-purple"
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={isCollapsed ? "M13 17l5-5-5-5M6 17l5-5-5-5" : "M11 17l-5-5 5-5M18 17l-5-5 5-5"} />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 sm:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </NavCollapseContext.Provider>
  );
}

export default Navigation;