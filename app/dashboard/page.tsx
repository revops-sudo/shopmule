import { Bell, Home, Plus, Search } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatInterface } from "./_components/ChatInterface"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-md">
        <div className="flex items-center mb-8">
          <span className="text-2xl font-bold text-purple-600">shopmule</span>
        </div>
        <nav>
          <p className="text-sm font-semibold text-gray-600 mb-2">MAIN MENU</p>
          <Link href="#" className="flex items-center py-2 text-purple-600 font-medium">
            <Home className="mr-3 h-4 w-4" />
            Dashboard
          </Link>
          <Link href="#" className="flex items-center py-2 text-gray-600 hover:text-purple-600">
            New Project
          </Link>
          <Link href="#" className="flex items-center py-2 text-gray-600 hover:text-purple-600">
            Suppliers
          </Link>
          <Link href="#" className="flex items-center py-2 text-gray-600 hover:text-purple-600">
            Connections
          </Link>
          <p className="text-sm font-semibold text-gray-600 mt-6 mb-2">TOOLS</p>
          {["TrendMule", "MonitorMule", "SourceMule", "BizMule", "MuleScore"].map((tool) => (
            <Link key={tool} href="#" className="flex items-center py-2 text-gray-600 hover:text-purple-600">
              {tool}
            </Link>
          ))}
          <p className="text-sm font-semibold text-gray-600 mt-6 mb-2">ADMIN</p>
          <Link href="#" className="flex items-center py-2 text-gray-600 hover:text-purple-600">
            Manage Admins
          </Link>
          <Link href="#" className="flex items-center py-2 text-gray-600 hover:text-purple-600">
            Admin Roles
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="User avatar"
                className="rounded-full"
                width={32}
                height={32}
              />
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Hi [Name]</h2>
          <p className="text-gray-600">
            Welcome to your shopmule Dashboard! This page will help guide you through your product development and launch
            journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "New Project", description: "Search, find and sell your new product" },
            { title: "Saved Projects", description: "Continue building where you left off" },
            { title: "Resources", description: "Some direction could help kick things off!" },
          ].map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <Plus className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-gray-500">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="recently-viewed" className="mb-8">
          <TabsList>
            <TabsTrigger value="recently-viewed">Recently Viewed</TabsTrigger>
            <TabsTrigger value="shared-projects">Shared Projects</TabsTrigger>
            <TabsTrigger value="draft-projects">Draft Projects</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="bg-white p-4 rounded-lg shadow mb-8">
          <div className="flex items-center space-x-2">
            <Search className="text-gray-400" />
            <Input type="search" placeholder="Search..." className="flex-1" />
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Chat Interface</h2>
          <ChatInterface />
        </div>
      </main>
    </div>
  )
}
