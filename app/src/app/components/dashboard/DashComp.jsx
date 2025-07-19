// app/components/Dashboard.tsx
'use client';

import React, { useState } from 'react';
import nit from "@/ressources/icons/mdi_drop.png"
import sal from "@/ressources/icons/mdi_drop (1).png"
import Image from 'next/image';
import { LiaStumbleuponCircle } from "react-icons/lia";

export default function Dashboard({data}) {
    const [activeIndex, setActiveIndex] = useState(2);

    const bars = data.bars
    return (
        <div className="p-6 w-full" style={{ minWidth: "80vw" }}>
            {/* Top Cards */}
            <div className="grid grid-cols-4 gap-10 mb-6 bg-white py-5 px-4 rounded-xl">
                {data.topCards.map((item, i) => (
                    <div key={i} className={`p-4 rounded-xl ${item.color} px-6`}>
                        <div className='flex justify-start gap-2 mb-9'>
                            
                            <div>
                                <p className="text-sm font-semibold">{item.label}</p>
                                <p className="text-xs">{item.value}</p>
                            </div>
                        </div>
                        <p className="text-md font-semibold mt-2 mr-2">{item.percent} To The Max</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-[39%_59%] gap-6">
                {/* Alerts */}
                <div className="space-y-4">
                    <div className="bg-white rounded-xl p-5">
                        <div className='mb-6'>
                            <h3 className="font-semibold text-lg">Alerts</h3>
                            <p className='text-gray-500 text-sm font-light'>Featured alerts</p>
                        </div>
                        <div className="border rounded p-3 text-sm border-gray-200">
                            <p className="font-medium mb-1">Mid PH Level</p>
                            <p className="text-normal">the ph level is at 45%</p>
                        </div>
                        <div className="border border-red-500 rounded p-3 text-sm mt-4 text-red-600 bg-red-50">
                            <p className="font-medium mb-1">high temperature</p>
                            <p className="text-normal">the temperature is at 42%</p>
                        </div>
                    </div>

                </div>

                <div>
                    {/* Filters */}
                    <div className="flex flex-col gap-6 mb-5">
                        <div className="flex justify-center gap-10 items-center bg-white rounded-xl p-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Time Range Filter</p>
                                <select className="mt-1 px-2 py-1 border rounded text-sm w-40 bg-gray-100 border-gray-300">
                                    <option>Last Day</option>
                                </select>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-600">Pond Selection</p>
                                <select className="mt-1 px-2 py-1 border rounded text-sm w-40 bg-gray-100 border-gray-300">
                                    <option>Pond one - alger</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white rounded-xl p-4">
                        <h3 className="font-semibold text-lg">statstiques</h3>
                        <p className="text-xs text-gray-400">click on the bars</p>
                        <div className="flex items-end justify-evenly mt-6 h-40">
                            {bars.map((bar, i) => {
                                const isActive = i === activeIndex;
                                return (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center justify-end cursor-pointer"
                                        onClick={() => setActiveIndex(i)}
                                    >
                                        {isActive && (
                                            <div className='bg-[#4CAEFE] p-2 rounded-xl mb-2'>
                                                <span className="block text-center text-white text-xs bg-transparent">
                                                    {bar.value} {bar.unit}
                                                </span>
                                            </div>
                                        )}
                                        <div
                                            className={`w-10 rounded-lg transition-all duration-300 ${isActive ? 'bg-blue-600' : 'bg-gray-300'
                                                } ${bar.height}`}
                                        >
                                        </div>

                                        <p className="text-[10px] mt-1 flex gap-2 "><span className={`text-lg`}><LiaStumbleuponCircle className={`${bar.color}`} /></span> <span className='text-sm'>{bar.label}</span></p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
