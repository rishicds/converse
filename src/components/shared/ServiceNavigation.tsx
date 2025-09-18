'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface ServiceTab {
  id: string
  name: string
  href: string
}

const serviceTabs: ServiceTab[] = [
  {
    id: 'business-development',
    name: 'Business Development',
    href: '/services/business-development'
  },
  {
    id: 'brand-strategy',
    name: 'Brand Strategy',
    href: '/services/brand-strategy'
  },
  
  {
    id: 'driving-growth',
    name: 'Driving Growth',
    href: '/services/driving-growth'
  },
  {
    id: 'financial-planning',
    name: 'Financial Planning',
    href: '/services/financial-planning'
  },
  {
    id: 'route-to-market',
    name: 'Route to Market',
    href: '/services/route-to-market'
  },
  {
    id: 'supply-chain-logistics',
    name: 'Supply Chain & Logistics',
    href: '/services/supply-chain-logistics'
  }
]

const ServiceNavigation = () => {
  const pathname = usePathname()

  return (
    <div className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
          Explore Our Other Services
        </h3>
        <div className="flex flex-wrap justify-center gap-2">
          {serviceTabs.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                {tab.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServiceNavigation