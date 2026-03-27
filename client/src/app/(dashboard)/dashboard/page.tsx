"use client";

import React from "react";
import {
  Users,
  Shield,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Layers,
  Clock,
} from "lucide-react";

const statCards = [
  {
    title: "Total Users",
    value: "—",
    change: "—",
    up: true,
    icon: Users,
    gradient: "from-violet-500 to-indigo-600",
  },
  {
    title: "Active Roles",
    value: "—",
    change: "—",
    up: true,
    icon: Shield,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Permissions",
    value: "—",
    change: "—",
    up: true,
    icon: Layers,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Active Sessions",
    value: "—",
    change: "—",
    up: false,
    icon: Activity,
    gradient: "from-rose-500 to-pink-600",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Welcome back! Here&apos;s an overview of your system.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="group relative p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-lg`}
              >
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  stat.up ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {stat.up ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {stat.title}
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-2xl bg-card border border-border/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              Recent Activity
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Activity className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm font-medium">No recent activity</p>
            <p className="text-xs mt-1">Activity will appear here once data is connected</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-card border border-border/50 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              System Overview
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mb-3 opacity-30" />
            <p className="text-sm font-medium">Dashboard coming soon</p>
            <p className="text-xs mt-1">Charts and analytics will be available here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
