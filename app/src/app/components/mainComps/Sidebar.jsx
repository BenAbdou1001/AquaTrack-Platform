import Link from 'next/link'
import React from 'react'
import dash from "@/ressources/icons/Graph.png"
import Image from 'next/image'
import live from "@/ressources/icons/Video.png"
import alert from "@/ressources/icons/Info.png"
import report from "@/ressources/icons/Document.png"
import disc from "@/ressources/icons/Arrow.png"

export default function Sidebar() {
    return (
        <div className="flex flex-col h-full w-56 text-white justify-between py-6">
            {/* Top navigation */}
            <div>
                <nav className="flex flex-col gap-2 text-[#222222]">
                    <ul className='list-style-type-none'>
                        <li className="px-6 py-2 text-left hover:bg-gray-200 rounded cursor-pointer">
                            <Link href={"/"} className='flex justify-start gap-3'><span><Image src={dash} alt="test" width={30} height={30}/></span><span>Dashboard</span></Link>
                        </li>
                        <li className="px-6 py-2 text-left hover:bg-gray-200 rounded cursor-pointer">
                            <Link href={"/live-streaming"} className='flex justify-start gap-3'><span><Image src={live} alt="test" width={30} height={30}/></span><span>Live monitor</span></Link>
                        </li>
                        <li className="px-6 py-2 text-left hover:bg-gray-200 rounded cursor-pointer">
                            <Link href={"/alert"} className='flex justify-start gap-3'><span><Image src={alert} alt="test" width={30} height={30}/></span><span>Alert</span></Link>
                        </li>
                        <li className="px-6 py-2 text-left hover:bg-gray-200 rounded cursor-pointer">
                            <Link href={"#"} className='flex justify-start gap-3'><span><Image src={report} alt="test" width={30} height={30}/></span><span>Report</span></Link>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* Bottom actions */}
            <div className="flex flex-col gap-2">
                <button className="px-6 py-2 text-left hover:bg-gray-700 rounded flex justify-start gap-3 text-[#222222] cursor-pointer"
                ><Image src={disc} width={30} height={30}/> <span>Logout</span></button>
            </div>
        </div>
    )
}
