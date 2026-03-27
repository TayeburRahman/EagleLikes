"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  User,
  Info,
  Check,
  Star,
  Award,
} from "lucide-react";

/* ──────── Service Card Component ──────── */
interface ServiceCardProps {
  title: string;
  type: "premium" | "active" | "vip";
  features: string[];
  gradient: string;
  icon: React.ReactNode;
  isSelected?: boolean;
}

const ServiceCard = ({
  title,
  type,
  features,
  gradient,
  icon,
  isSelected = false,
}: ServiceCardProps) => {
  return (
    <div
      className={`relative flex flex-col rounded-[32px] overflow-hidden transition-all duration-300 w-[210px] h-[377px] glass-card glass-card-hover font-inter ${isSelected ? "ring-2 ring-primary border-transparent" : ""
        }`}
    >
      {/* Header with Gradient */}
      <div className={`p-5 bg-gradient-to-r ${gradient} flex justify-between items-start h-32 relative`}>
        <div className="z-10">
          <h3 className="text-[18px] font-semibold text-white leading-[1.3] flex items-center">
            {title.split(" ")[0]}<br />{title.split(" ")[1]}
          </h3>
          <button className="mt-2 text-[10px] font-semibold text-white/90 underline decoration-white/40 underline-offset-2">
            What&apos;s the difference?
          </button>
        </div>
        <div className="absolute right-3 top-3 w-16 h-16 opacity-90">
          {icon}
        </div>
      </div>

      {/* Feature List */}
      <div className="p-5 flex-1 flex flex-col">
        <ul className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <div className={`mt-0.5 p-0.5 rounded-full ${type === 'premium' ? 'bg-primary/20 text-primary' :
                  type === 'active' ? 'bg-pink-500/20 text-pink-500' :
                    'bg-green-500/20 text-green-500'
                }`}>
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </div>
              <span className="text-[14px] font-normal text-foreground/80 leading-[22px]">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Selection Circle at Bottom */}
        <div className="mt-auto flex justify-center pb-1">
          <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-colors ${isSelected
              ? (type === 'premium' ? "bg-primary border-primary" :
                type === 'active' ? "bg-pink-500 border-pink-500" :
                  "bg-green-500 border-green-500")
              : "border-white/10"
            }`}>
            {isSelected && <Check className="h-4 w-4 text-navy-dark stroke-[4]" />}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ──────── Main Page Component ──────── */
export default function EagleLikesPage() {
  const [isVip, setIsVip] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 relative flex flex-col grid-bg">
      {/* Background Mesh Overlay */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-10 pointer-events-none">
        <Image
          src="/mesh-shape.png"
          alt=""
          width={600}
          height={600}
          className="object-contain"
        />
      </div>

      {/* ─── Navbar ─── */}
      <nav className="z-50 px-6 py-5 flex items-center justify-between mx-auto w-full max-w-[1232px] font-open-sans">
        <div className="flex items-center cursor-pointer group max-w-[164px] w-full h-12 relative">
          <Image
            src="/eagle-logo.png"
            alt="Eagle Likes Logo"
            fill
            className="object-contain"
          />
        </div>

        <div className="hidden lg:flex items-center gap-6">
          {["TIKTOK", "INSTAGRAM", "YOUTUBE", "FACEBOOK", "TWITTER (X)", "BLOG", "CONTACT US"].map((item) => (
            <button key={item} className="flex items-center gap-1 text-[16px] font-normal text-white/70 hover:text-white transition-colors group leading-none">
              {item}
              {item !== "TIKTOK" && <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />}
            </button>
          ))}
        </div>

        <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-white/20 hover:border-white/40 text-[16px] font-normal text-white transition-all bg-white/5 leading-none">
          <User className="h-4 w-4" />
          LOGIN
        </button>
      </nav>

      {/* ─── Hero Section ─── */}
      <main className="flex-1 flex flex-col items-center pt-24 pb-20 px-6 mx-auto w-full">
        <h1 className="text-white text-center mb-6 max-w-[824px] mx-auto font-rethink-sans font-bold text-[54px] leading-[1.1] tracking-normal">
          Buy Instagram Followers
          <br />
          with <span className="text-cyan-accent">Fast Delivery!</span>
        </h1>

        <p className="max-w-[824px] text-center text-white/50 font-medium font-inter text-[18px] leading-[32px] tracking-normal mb-12 mx-auto">
          Quickly get premium Instagram followers safely and easily! Boost your IG influence and engagement instantly! Always great prices and offers!
        </p>

        {/* ─── VIP Toggle Pill ─── */}
        <div className="relative mb-16 inline-flex items-center gap-4 bg-navy-card/80 p-1.5 px-4 pr-3 rounded-full border border-pink-500/30 group cursor-pointer hover:border-pink-500/50 transition-all shadow-[0_0_20px_rgba(233,30,99,0.1)]">
          <div
            onClick={() => setIsVip(!isVip)}
            className={`w-14 h-6 rounded-full p-1 transition-all flex items-center cursor-pointer ${isVip ? "bg-pink-500" : "bg-zinc-700"
              }`}
          >
            <div className={`bg-white w-4 h-4 rounded-full transition-all shadow-md ${isVip ? "translate-x-8" : "translate-x-0"
              }`} />
          </div>
          <span className="text-sm font-bold text-white/90">
            I need vip followers
          </span>
          <Info className="h-5 w-5 text-white/40 ml-2" />
        </div>

        {/* ─── Service Grid ─── */}
        <div className="flex flex-row justify-center items-center gap-[20px] w-[677px] h-[399.85px] px-[3px] mx-auto mb-20">
          <ServiceCard
            title="Premium Followers"
            type="premium"
            gradient="from-blue-500 to-blue-600"
            isSelected={!isVip}
            icon={
              <div className="relative w-full h-full flex items-end justify-end">
                <Image src="/premium-bird.png" alt="Premium Mascot" fill className="object-contain" />
              </div>
            }
            features={[
              "Premium followers",
              "Super Fast Delivery",
              "No password needed",
              "24-hour support",
            ]}
          />

          <ServiceCard
            title="Active Followers"
            type="active"
            gradient="from-pink-500 to-pink-600"
            icon={
              <div className="relative w-full h-full flex items-end justify-end">
                <Image src="/active-bird.png" alt="Active Mascot" fill className="object-contain" />
                <Image src="/star-icon.png" alt="Star" width={16} height={16} className="absolute -top-4 left-6 object-contain" />
              </div>
            }
            features={[
              "Real Active followers",
              "Trusted Delivery",
              "30 day refills",
              "No password needed",
              "24-hour support",
            ]}
          />

          <ServiceCard
            title="VIP Followers"
            type="vip"
            gradient="from-green-500 to-green-600"
            isSelected={isVip}
            icon={
              <div className="relative w-full h-full flex items-end justify-end">
                <Image src="/vip-bird.png" alt="VIP Mascot" fill className="object-contain" />
                <Image src="/crown-icon.png" alt="Crown" width={24} height={24} className="absolute -top-6 left-5 object-contain" />
              </div>
            }
            features={[
              "All features of Active, plus:",
              "Real followers from Targeted users",
              "Hit the explore page and grow your engagement",
              "Instant Delivery Guaranteed",
              "VIP support with lifetime access",
            ]}
          />
        </div>
      </main>

      {/* Simple Footer Spacer */}
      <footer className="h-20" />
    </div>
  );
}
