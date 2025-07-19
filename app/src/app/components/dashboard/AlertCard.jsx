import { AlertCircle } from "lucide-react";
import img from "@/ressources/1.jpg"

export function AlertCard({ title, description, suggestion, status, imageUrl }) {
  return (
    <div className="border rounded-lg shadow-sm mb-6 bg-white">
      <div className="p-6">
        <div className="flex items-start justify-between">
          {/* Left Content */}
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-semibold text-gray-900">{title}</h3>
            </div>

            <p className="text-gray-900 font-medium mb-2">{description}</p>
            <p className="text-blue-600 text-sm mb-4">{suggestion}</p>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">{status}</span>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                Send to technician
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
