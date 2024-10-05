"use client"

import Image from 'next/image'
import Link from "next/link"
import { Home, Package, Users, Bell, BarChart2, Monitor, Search, Briefcase, Star } from 'lucide-react'

export default function DashboardSideBar() {
  return (
    <div className="w-64 bg-white shadow-md h-screen">
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
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">MAIN MENU</h2>
          <Link href="/dashboard" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Home className="h-5 w-5 mr-2" />
            Dashboard
          </Link>
          <Link href="/dashboard/projects" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Package className="h-5 w-5 mr-2" />
            New Project
          </Link>
          <Link href="/dashboard/suppliers" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Users className="h-5 w-5 mr-2" />
            Suppliers
          </Link>
          <Link href="/dashboard/connections" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Bell className="h-5 w-5 mr-2" />
            Connections
          </Link>
        </div>
        <div className="mb-4">
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">ADMIN</h2>
          <Link href="/dashboard/manage-admins" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Users className="h-5 w-5 mr-2" />
            Manage Admins
          </Link>
          <Link href="/dashboard/admin-roles" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Users className="h-5 w-5 mr-2" />
            Admin Roles
          </Link>
        </div>
        <div>
          <h2 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">TOOLS</h2>
          <Link href="/dashboard/trendmule" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <BarChart2 className="h-5 w-5 mr-2" />
            TrendMule
          </Link>
          <Link href="/dashboard/monitormule" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Monitor className="h-5 w-5 mr-2" />
            MonitorMule
          </Link>
          <Link href="/dashboard/sourcemule" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Search className="h-5 w-5 mr-2" />
            SourceMule
          </Link>
          <Link href="/dashboard/bizmule" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Briefcase className="h-5 w-5 mr-2" />
            BizMule
          </Link>
          <Link href="/dashboard/mulescore" className="flex items-center py-2 text-gray-700 hover:bg-gray-200 rounded">
            <Star className="h-5 w-5 mr-2" />
            MuleScore
          </Link>
        </div>
      </nav>
    </div>
  )
}