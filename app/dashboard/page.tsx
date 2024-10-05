import Image from 'next/image'
import { Bell, Home, Package, Users, Monitor, Search, Briefcase, Star, PlusCircle } from 'lucide-react'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChatInterface } from "./_components/ChatInterface"
import { ProductEvaluator } from "./_components/ProductEvaluator"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/shopmule%20logo%20A%20(1500%20x%20500%20px)-FFTtiijZrfDljzXEGMEcYEWkBUEcd8.png"
            alt="Shopmule Logo"
            width={150}
            height={50}
            className="mb-6"
          />
        </div>
        <nav className="px-4">
          {/* ... MAIN MENU section ... */}
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">MAIN MENU</h2>
            <Link href="#" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
              <Home className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            {/* ... other main menu items ... */}
          </div>
          {/* ... ADMIN section ... */}
          <div className="mb-4">
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">ADMIN</h2>
            {/* ... admin menu items ... */}
          </div>
          {/* ... TOOLS section ... */}
          <div>
            <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">TOOLS</h2>
            {/* ... tools menu items ... */}
          </div>
        </nav>
      </div>
      <div className="flex-1 p-10">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-6 w-6 text-gray-500" />
            </Button>
            <Button variant="ghost" size="icon">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </Button>
          </div>
        </header>
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Hi [Name]</h2>
          <p className="text-gray-600">Welcome to your shopmule Dashboard! This page will help guide you through your product development and launch journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* ... New Project, Saved Projects, Resources cards ... */}
        </div>
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex">
            <a href="#" className="border-b-2 border-blue-500 py-4 px-1 text-sm font-medium text-blue-600">Recently Viewed</a>
            <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Shared Projects</a>
            <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Draft Projects</a>
            <a href="#" className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">Teams</a>
          </nav>
        </div>
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex items-center space-x-2">
            <Search className="text-gray-400" />
            <Input type="search" placeholder="Search..." className="flex-1" />
          </div>
        </div>
        {/* Chat Interface
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Chat Interface</h2>
          <ChatInterface />
        </div> */}
        {/* Add the ProductEvaluator component here */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">TrendMule</h2>
          <ProductEvaluator />
        </div>
      </div>
    </div>
  )
}