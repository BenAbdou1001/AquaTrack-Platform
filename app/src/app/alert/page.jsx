import React from 'react'
import { AlertCard } from "../components/dashboard/AlertCard"
import { SummaryPanel } from "../components/dashboard/summary-panel"
import { api } from '../data';


export default async function page() {
    const response = await fetch(`${api}/api/alerts`, { cache: 'no-store' });
    const data = await response.json()
    console.log(data)
    return (
        <div className='grid grid-cols-[59%_39%] gap-4'>
            <div className="">
                {data.map((alert, index) => (
                    <AlertCard
                        key={index}
                        title={alert.title}
                        description={alert.description}
                        suggestion={alert.suggestion}
                        status={alert.status}
                        imageUrl={alert.imageUrl}
                    />
                ))}
            </div>
            <SummaryPanel />
        </div>
    )
}
