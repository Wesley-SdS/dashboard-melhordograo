"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  MagnifyingGlassIcon,
  EyeIcon,
  ShoppingCartIcon,
  UserIcon,
  KeyIcon,
  IdentificationIcon,
  ArrowRightOnRectangleIcon,
  BellIcon
} from "@heroicons/react/24/outline";
import { ModeToggle } from "@/components/ModeToggle"; // Atualize o caminho conforme necessário

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Tipo corrigido para HTMLDivElement

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside as EventListener);
    document.addEventListener(
      "touchstart",
      handleClickOutside as EventListener
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside as EventListener
      );
      document.removeEventListener(
        "touchstart",
        handleClickOutside as EventListener
      );
    };
  }, []);

  return (
    <nav className="flex w-full border shadow-sm text-stone-700 ">
      <ul className="flex items-center justify-between w-full h-24 px-6 text-stone-700 dark:text-white">
        <Image
          src="/assets/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-40 h-auto pt-3"
        />
        <div className="relative w-full max-w-[400px] mr-5 pl-10 flex items-center">
          <Input
            type="text"
            className="w-full border border-gray-300 rounded-md pl-3 pr-10 py-1 outline-none"
            placeholder="Search..."
          />
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>

        <div className="flex ">
          <div className="relative flex items-center mx-5">
            <div className="relative">
              <div className="rounded-full border p-2 hover:border-blue-600 transition-colors duration-300 hover:animate-swing">
                <BellIcon className="w-6 h-6 cursor-pointer text-red-700" />
                <div className="bg-red-600 text-white rounded-full absolute -top-1 -right-1 w-6 h-6 text-xs flex items-center justify-center">
                  +7
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex relative">
            <button
              onClick={toggleMenu}
              className="flex items-center space-x-2"
            >
              <Image
                src="/assets/profile.webp"
                alt="Profile"
                width={60}
                height={60}
                priority
                className="h-auto min-w-[60px] [min-h-60] rounded-full border border-blue-600"
              />
              <div className="text-left hidden lg:block dark:text-white">
                <div className="font-bold">Nome da Loja</div>
                <div className="text-sm">Nome do Usuário</div>
              </div>
            </button>
            {isOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-md shadow-lg z-auto"
              >
                <div className="rounded-lg border shadow-md">
                  <Input placeholder="Type a command or search..." />
                  <div>
                    <div className="p-2 text-gray-500">Opções</div>
                    <div className="flex flex-col">
                      <button className="flex items-center p-2 hover:bg-gray-100">
                        <EyeIcon className="w-5 h-5 mr-2" />
                        Ver a Loja
                      </button>
                      <button className="flex items-center p-2 hover:bg-gray-100">
                        <ShoppingCartIcon className="w-5 h-5 mr-2" />
                        Seletor de Lojas
                      </button>
                    </div>
                    <div className="p-2 text-gray-500">Configurações</div>
                    <div className="flex flex-col">
                      <button className="flex items-center p-2 hover:bg-gray-100">
                        <UserIcon className="w-5 h-5 mr-2" />
                        Minha Conta
                      </button>
                      <button className="flex items-center p-2 hover:bg-gray-100">
                        <KeyIcon className="w-5 h-5 mr-2" />
                        Alterar Senha
                      </button>
                      <button className="flex items-center p-2 hover:bg-gray-100">
                        <IdentificationIcon className="w-5 h-5 mr-2" />
                        Dados Cadastrais
                      </button>
                    </div>
                    <div className="flex flex-col">
                      <button className="flex items-center p-2 hover:bg-gray-100">
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                        Sair da Conta
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </ul>

      <div className="flex mr-5 items-center">
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
