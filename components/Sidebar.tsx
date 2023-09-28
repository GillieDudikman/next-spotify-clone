"use client";

import {usePathname} from "next/navigation";
import {useMemo} from "react";
import {AiFillHome} from "react-icons/ai";
import {BiSearchAlt2} from "react-icons/bi";
import Box from "@/components/Box";
import SidebarItem from "@/components/SidebarItem";
import Library from "@/components/Library";

interface SidebarProps {
    children: React.ReactNode
}
const Sidebar: React.FC<SidebarProps> = ({ children })=> {
    const path = usePathname();
    const routes = useMemo(() => [
        {
            icon: AiFillHome,
            label: 'Home',
            active: path !== '/search',
            href: '/'
        },{
            icon: BiSearchAlt2,
            label: 'Search',
            active: path === '/search',
            href: '/search'
        }
    ], [path])

    return (
        <div className="flex h-full">
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {routes.map(item => (
                            <SidebarItem key={item.label} {...item}/>
                        ))}
                    </div>
                </Box>
                <Box className="overflow-y-auto h-full">
                    <Library />
                </Box>
            </div>
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    )
}
export default Sidebar