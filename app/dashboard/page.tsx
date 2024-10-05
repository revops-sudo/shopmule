import Link from "next/link"
import { Bell, Search, PlusCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductEvaluator } from "./_components/ProductEvaluator"
// import { ChatInterface } from "./_components/ChatInterface" // commented out for now for testing

export default function Dashboard() {
  return (
    <>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </header>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Hi [Name]</h2>
        <p className="text-gray-600">Welcome to your shopmule Dashboard! This page will help guide you through your product development and launch journey.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">New Project</h3>
            <PlusCircle className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-gray-600">Search, find and sell your new product</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">Saved Projects</h3>
            <PlusCircle className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-gray-600">Continue building where you left off</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">Resources</h3>
            <PlusCircle className="h-5 w-5 text-blue-500" />
          </div>
          <p className="text-gray-600">Some direction could help kick things off!</p>
        </div>
      </div>
      <div className="border-b border-gray-200 mb-4">
        <nav className="-mb-px flex">
          <Link href="#" className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">Recently Viewed</Link>
          <Link href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Shared Projects</Link>
          <Link href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Draft Projects</Link>
          <Link href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Teams</Link>
        </nav>
      </div>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <div className="flex items-center space-x-2">
          <Search className="text-gray-400" />
          <Input type="search" placeholder="Search..." className="flex-1" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">TrendMule</h2>
        <ProductEvaluator />
      </div>
    </>
  )
}