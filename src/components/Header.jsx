import React, { Fragment } from 'react';
import Link from 'next/link';
import { useAuth } from '@hooks/useAuth';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import logo3 from '@logos/logo2.png';
import Image from 'next/image';

import { UsuarioContext } from '@hooks/TodoContext/';

const adminNavigation = [
  { name: 'Dashboard', href: '/dashboard/', current: true },
  { name: 'Documentos', href: '/dashboard/documentos/', current: false },
  { name: 'Archivos', href: '/dashboard/archivos/', current: false },
  { name: 'Prestamos', href: '/dashboard/prestamos/', current: false },
  { name: 'Trabajadores', href: '/dashboard/trabajadores/', current: false },
  { name: 'Areas', href: '/dashboard/areas/', current: false },
  { name: 'Gerencias', href: '/dashboard/gerencias/', current: false },
  { name: 'Locales', href: '/dashboard/locales/', current: false },
  { name: 'Usuarios', href: '/dashboard/usuarios/', current: false },
];
const responsableNavigation = [
  { name: 'Dashboard', href: '/dashboard/', current: true },
  { name: 'Documentos', href: '/dashboard/documentos/', current: false },
  { name: 'Archivos', href: '/dashboard/archivos/', current: false },
  { name: 'Prestamos', href: '/dashboard/prestamos/', current: false },
  { name: 'Trabajadores', href: '/dashboard/trabajadores/', current: false },
  { name: 'Areas', href: '/dashboard/areas/', current: false },
  { name: 'Gerencias', href: '/dashboard/gerencias/', current: false },
  { name: 'Locales', href: '/dashboard/locales/', current: false },
];
const encargadoNavigation = [
  { name: 'Dashboard', href: '/dashboard/', current: true },
  { name: 'Documentos', href: '/dashboard/documentos/', current: false },
  { name: 'Prestamos', href: '/dashboard/prestamos/', current: false },
  { name: 'Trabajadores', href: '/dashboard/trabajadores/', current: false },
];
let navigation = [];
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Header() {
  const { user, loading } = React.useContext(UsuarioContext);
  const auth = useAuth();

  const userData = {
    rol: user?.rol,
    email: user?.email,
    imageUrl: `https://ui-avatars.com/api/?name=${user?.email}&background=random&color=random`,
  };
  if (user?.rol === 'encargado') {
    navigation = encargadoNavigation;
  }
  if (user?.rol === 'responsable') {
    navigation = responsableNavigation;
  }
  if (user?.rol === 'admin') {
    navigation = adminNavigation;
  }

  if (loading) {
    return (
      <>
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-22">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 place-content-center items-center content-center">
                      <a href="/" className="flex-shrink-0">
                        <div className="inline-grid justify-items-center items-center content-center	">
                          <Image src={logo3} width={50} height={50} alt="logo" />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </>
    );
  }
  if (!user) {
    return (
      <>
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-22">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 place-content-center items-center content-center">
                      <a href="/" className="flex-shrink-0">
                        <div className="inline-grid justify-items-center items-center content-center	">
                          <Image src={logo3} width={50} height={50} alt="logo" />
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          {/* boton de inicio de sesion redirecciona a login*/}
                          <Link href="/login">
                            <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-gray-900 focus:outline-none focus:shadow-outline-gray focus:border-gray-700 active:bg-gray-700 transition duration-150 ease-in-out border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4">
                              Iniciar Sesión
                            </a>
                          </Link>
                        </div>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>
      </>
    );
  } else {
    return (
      <>
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-22">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 place-content-center items-center content-center">
                      <a href="/" className="flex-shrink-0">
                        <div className="inline-grid justify-items-center items-center content-center	">
                          <Image src={logo3} width={50} height={50} alt="logo" />
                        </div>
                      </a>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={userData.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                            <button onClick={() => auth.logout()} className="block px-4 py-2 text-sm text-gray-700 z-2">
                              Cerrar Sesión
                            </button>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium')}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={userData.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{userData.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{userData.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    <span onClick={() => auth.logout()} className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                      Cerrar Sesión
                    </span>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </>
    );
  }
}
