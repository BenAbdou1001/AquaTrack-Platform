import React from 'react'
import { LiveBars } from '../components/dashboard/LiveBars'
import { LiveMonitorProgress } from '../components/dashboard/LiveProgress'
import { LiveMonitorChart } from '../components/dashboard/LiveCharts'
import { api } from '../data';

export default async function page() {
    const response = await fetch(`${api}/api/tanks`, { cache: 'no-store' });
    const data = await response.json()
    console.log(data)
    return (
        <main className="p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="w-full">
                    <LiveBars tanks={data}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LiveMonitorProgress />
                    <LiveMonitorChart tanks={data}/>
                </div>
            </div>
        </main>
    )
}
