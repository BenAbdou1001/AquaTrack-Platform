'use client'

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { api } from "@/app/data"


export function LiveBars({ tanks }) {
  const [tankId, setTankId] = useState("ef98981f-1fa0-4e55-9d55-30ca5f88f808")
  const [bars, setBars] = useState([])


  const getData = async () => {
    try {
      const response = await fetch(`${api}/api/sensors/${tankId}`, { cache: 'no-store' });
      const data = await response.json();
      setBars(data)
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${api}/api/sensors/${tankId}`, { cache: 'no-store' });
        const data = await response.json();
        setBars(data)
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }

    getData()
  }, [])

  const [activeIndex, setActiveIndex] = useState(2)

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Live Bars</h3>
          <p className="text-sm text-blue-500 cursor-pointer">click on the bars</p>
        </div>
        <div className="relative">
          <select
            value={tankId}
            onChange={(e) => {
              setTankId(e.target.value)
              setActiveIndex(0)
              getData()
            }}
            className="text-sm bg-gray-50 rounded-lg px-3 py-2 border border-gray-300 text-gray-700"
          >
            {tanks.map(tank => (
              <option key={tank.id} value={tank.id}>
                {tank.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-end justify-between space-x-4 mb-6 h-40">
        {bars.length > 0 && bars.map((bar, index) => {
          const isActive = index === activeIndex
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-end cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              {isActive && bar.value && (
                <div className="bg-blue-500 p-2 rounded-xl mb-2 text-white text-xs">
                  {bar.value}
                </div>
              )}
              <div
                className={`w-8 rounded-lg transition-all duration-300 ${isActive ? 'bg-blue-600' : 'bg-gray-300'
                  } ${bar.height}`}
              ></div>
              <p className="text-[10px] mt-1 flex gap-1 items-center">
                <span className={`text-lg`}>
                  <div className={`w-2 h-2 rounded-full ${bar.color} bg-current`}></div>
                </span>
                <span className="text-sm">{bar.label}</span>
              </p>
            </div>
          )
        })}
      </div>

      <div className="flex flex-wrap gap-4 text-xs text-gray-600">
        {bars.length > 0 && bars.map((bar, index) => (
          <div key={index} className="flex items-center space-x-1">
            <div className={`w-2 h-2 rounded-full ${bar.color} bg-current`}></div>
            <span>{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
