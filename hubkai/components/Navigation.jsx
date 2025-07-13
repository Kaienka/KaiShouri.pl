"use client";
import { useState, useEffect } from "react";
import BottomNavbar from "@/components/navigation/BottomNavbar";
import MainNavbar from "@/components/navigation/MainNavbar";
import Header from "@/components/navigation/Header";
import HamburgerBtn from "@/components/navigation/HamburgerBtn";
import Link from "next/link";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  return (
    <>
      {!isOpen && (
        <header className="sm:hidden fixed top-0 left-0 w-full z-50 bg-plume-wine shadow-md flex items-center px-4">
          <HamburgerBtn onClick={toggleMenu} isOpen={isOpen} />
          <Link href="/">
          <p className="font-mono font-bold text-linen-cloud">Kai Shouri</p>
          </Link>
        </header>
      )}

      <div
        className={`
    fixed top-0 left-0 w-[250px] bg-plume-wine shadow-xl flex flex-col justify-between
    transform transition-transform duration-300 ease-in-out 
    sm:relative sm:translate-x-0 sm:w-[250px]
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
    z-40
    pt-16 sm:pt-0 h-screen sm:min-h-screen
  `}
      >
        <div>
          <Header isOpen={isOpen} onClick={toggleMenu} />
          <MainNavbar />
        </div>
        <BottomNavbar />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 sm:hidden"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Navigation;
