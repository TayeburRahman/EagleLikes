"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  User,
  Info,
  Check,
  Menu,
} from "lucide-react";

/* ──────── Service Card Component ──────── */
interface ServiceCardProps {
  id: string;
  title: string;
  type: "premium" | "active" | "vip";
  features: { boldPart: string; normalPart?: string; subText?: string; isSpecial?: boolean }[];
  color: string;
  headerGradient: string;
  selectionGradient?: string;
  mascotSrc: string;
  overlaySrc?: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ServiceCard = ({
  id,
  title,
  type,
  features,
  color,
  headerGradient,
  selectionGradient,
  mascotSrc,
  overlaySrc,
  isSelected,
  onSelect,
}: ServiceCardProps) => {
  return (
    <div
      onClick={onSelect}
      className={`relative flex flex-col rounded-[24px] md:rounded-[32px] overflow-hidden transition-all duration-500 w-[158.89px] md:w-[220px] h-[320px] md:h-[377px] cursor-pointer group shrink-0 ${isSelected ? "translate-y-[-8px]" : "hover:translate-y-[-4px]"
        }`}
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        boxShadow: isSelected ? `0 2px 4px ${color}33` : '0 2px 4px rgba(0,0,0,0.4)',
        border: isSelected ? `3px solid ${color}` : '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Header with Solid Color (72px Height) */}
      <div
        className="p-3 md:p-5 pt-4 flex justify-between items-start h-[60px] md:h-[72px] relative overflow-hidden shrink-0"
        style={{ background: headerGradient }}
      >
        <div className="z-10">
          <h3 className="text-[13.62px] md:text-[18px] font-inter font-semibold text-white leading-[19.67px] md:leading-[1.3] tracking-normal">
            {title.split(" ").map((word, i) => (
              <React.Fragment key={i}>
                {word}
                {i === 0 && <br />}
              </React.Fragment>
            ))}
          </h3>
        </div>

        {/* Mascot Container (Pixel-Perfect Alignment) */}
        <div className="absolute right-3 md:right-5 bottom-[0px] pointer-events-none select-none">
          <div className="relative flex items-end justify-end">
            {overlaySrc && (
              <div className={`absolute z-20 ${type === 'active' ? 'top-[-10px] left-3 md:left-5' : 'top-[-8px] left-2 md:left-4'}`}>
                <Image
                  src={overlaySrc}
                  alt=""
                  width={type === 'active' ? 10 : 16}
                  height={type === 'active' ? 10 : 16}
                  className="object-contain drop-shadow-md"
                />
              </div>
            )}
            <div className="relative w-[36px] md:w-[49px] h-[40px] md:h-[54px]">
              <Image
                src={mascotSrc}
                alt={title}
                fill
                className="object-contain relative z-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature List */}
      <div className="px-3 py-3 pr-5 flex-1 flex flex-col bg-[#161B3D]/50 backdrop-blur-sm">
        <ul className="space-y-[5px] md:space-y-[7px] mb-4">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 md:gap-2.5">
              <div className={`mt-[4px] rounded-full flex items-center justify-center shrink-0`}>
                <Check className="h-[14px] w-[14px] md:h-[18px] md:w-[18px] stroke-[3]" style={{ color }} />
              </div>
              <div className="flex flex-col">
                <div className={`text-[10.59px] md:text-[14px] leading-[18px] md:leading-[22px] tracking-tight ${feature.isSpecial ? '' : 'text-white'}`} style={{ color: feature.isSpecial ? color : undefined }}>
                  <span className="font-bold">{feature.boldPart}</span>
                  {feature.normalPart && <span className="font-normal"> {feature.normalPart}</span>}
                </div>
                {feature.subText && (
                  <span className={`text-[9.5px] md:text-[12px] cursor-pointer underline-offset-2 opacity-100 hover:opacity-80 transition-opacity whitespace-nowrap tracking-tight`} style={{ color }}>
                    {feature.subText}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Selection Circle at Bottom Right (Pinned) */}
      <div
        className={`absolute bottom-4 right-3 md:bottom-5 md:right-6 w-5 h-5 md:w-7 md:h-7 rounded-full border-[1.5px] md:border-[2.5px] flex items-center justify-center transition-all duration-300 ${isSelected ? "shadow-inner scale-110" : "border-white/10 scale-100"
          }`}
        style={{
          background: isSelected ? (selectionGradient || color) : 'transparent',
          borderColor: isSelected ? (selectionGradient ? 'transparent' : color) : 'rgba(255,255,255,0.1)',
          border: isSelected && selectionGradient ? 'none' : undefined
        }}
      >
        {isSelected && <Check className="h-3 w-3 md:h-5 md:w-5 text-white stroke-[4] md:stroke-[3]" />}
      </div>
    </div>
  );
};

/* ──────── Main Page Component ──────── */
export default function EagleLikesPage() {
  const [selectedPackage, setSelectedPackage] = useState<string>("premium");
  const [isVipToggle, setIsVipToggle] = useState(false);


  // selection logic: link toggle to vip package
  const handleToggleVip = () => {
    const newState = !isVipToggle;
    setIsVipToggle(newState);
    if (newState) {
      setSelectedPackage("vip");
    } else if (selectedPackage === "vip") {
      setSelectedPackage("premium");
    }
  };

  const handleSelectPackage = (id: string) => {
    setSelectedPackage(id);
    if (id === "vip") {
      setIsVipToggle(true);
    } else {
      setIsVipToggle(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 relative flex flex-col overflow-x-hidden font-sans">
      {/* 2. Topographic Mesh Accents (Left & Right) - Hidden on Mobile */}
      <div className="hidden lg:block z-0 overflow-hidden pointer-events-none">
        {/* Right Mesh - Elevated and Rotated */}
        <div className="absolute -right-48 top-9 w-[450px] aspect-square transition-opacity duration-1000">
          <Image src="/page-mesh.png" alt="" fill className="object-contain rotate-12" />
        </div>
        {/* Left Mesh - Mirrored and Lowered */}
        <div className="absolute -left-65 top-[30%] w-[400px] aspect-square transition-opacity duration-1000">
          <Image src="/page-mesh.png" alt="" fill className="object-contain -rotate-[35deg] scale-x-[-1] blur-[0.5px]" />
        </div>
      </div>

      {/* Dynamic Background Glows (Exact Per Reference) */}

      {/* 1. Top Central Glow (Hero Depth) */}
      <div className="fixed top-[-100px] left-1/2 translate-x-[-50%] w-[800px] h-[400px] bg-[#0663CDA6] blur-[120px] rounded-[100%] pointer-events-none" />

      {/* 2. Left Middle Glow (Electric Blue Accent) */}
      <div className="hidden lg:block fixed top-[25%] left-[-150px] w-[500px] h-[500px] bg-[#0663CDA6] blur-[100px] rounded-full pointer-events-none " />

      {/* 3. Right Middle Glow (Royal Blue Accent) */}
      <div className="hidden lg:block fixed top-[40%] right-[-150px] w-[600px] h-[600px] bg-[#0663CDA6] blur-[120px] rounded-full pointer-events-none " />

      {/* 4. Global Subtle Depth */}
      <div className="hidden lg:block fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[1000px] h-[600px] bg-blue-500/5 blur-[180px] rounded-full pointer-events-none" />



      {/* ─── Navbar ─── */}
      <nav className="z-50 px-4 md:px-6 py-4 md:py-5 flex items-center justify-between mx-auto w-full max-w-[1240px]">
        <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105 active:scale-95">
          <div className="relative w-[130px] md:w-[160px] h-9 md:h-12">
            <Image
              src="/eagle-logo.png"
              alt="Eagle Likes"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {["TIKTOK", "INSTAGRAM", "YOUTUBE", "FACEBOOK", "TWITTER (X)", "BLOG", "CONTACT US"].map((link) => (
            <button key={link} className="flex items-center gap-1.5 text-[13px] font-bold tracking-widest text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
              {link}
              {link !== "TIKTOK" && link !== "TWITTER (X)" && link !== "BLOG" && link !== "CONTACT US" && (
                <ChevronDown className="h-4 w-4 opacity-50" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Mobile: Rating Stars - next to menu */}
          <div className="flex lg:hidden items-center gap-1.5">
            <span className="text-white text-[14px]">5.0</span>
            <div className="flex gap-[3px]">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center"
                  style={{
                    width: '17.58px',
                    height: '17.58px',
                    borderRadius: '3.14px',
                    backgroundColor: 'hsl(200, 100%, 50%)',
                  }}
                >
                  <svg className="w-[15px] h-[15px]" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              ))}
            </div>
          </div>
          {/* LOGIN - Hidden on Mobile */}
          <button className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold text-[13px] tracking-wider text-white">
            <User className="h-4 w-4" />
            LOGIN
          </button>
          {/* Mobile Menu Trigger */}
          <button className="lg:hidden p-2 text-white/70 hover:text-white transition-colors">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <hr className="hidden md:block" style={{ borderTopColor: '#0663CDA6' }} />
      {/* ─── Hero Section ─── */}
      <main className="flex-1 flex flex-col items-center pt-3 pb-20 px-4 md:px-6 mx-auto w-full z-10 max-w-[820px] ">
        <div className="relative w-full flex flex-col items-center py-2 pb-6 overflow-visible">
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            <Image
              src="/hero-grid.png"
              alt=""
              fill
              priority
              className="object-fill opacity-40 md:opacity-70"
            />
          </div>

          <h1 className="text-center mb-4 max-w-[900px] text-white animate-fade-in-up mt-8 md:mt-12 font-[family:var(--font-rethink-sans)] font-bold text-[25px] md:text-[54px] leading-[1.1] tracking-normal">
            Buy Instagram Followers
            <br />
            with <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#018DFF] to-[#00FFFF] drop-shadow-[0_0_15px_rgba(0,255,255,0.2)]">Fast Delivery!</span>
          </h1>

          <p className="max-w-[700px] text-center text-white/45 font-medium text-[13px] md:text-[18px] leading-[26px] md:leading-[32px] tracking-normal mb-10 animate-fade-in-up font-inter px-2" style={{ animationDelay: '0.1s' }}>
            Quickly get premium Instagram followers safely and easily! Boost your IG influence and engagement instantly! Always great prices and offers!
          </p>

          <div
            onClick={handleToggleVip}
            className="relative flex items-center gap-3 md:gap-5 bg-[#161B3D]/90 p-2 px-5 md:px-6 rounded-full border border-pink-500/30 shadow-[0_0_40px_rgba(233,30,99,0.1)] group transition-all hover:border-pink-500/50 animate-fade-in-up cursor-pointer w-full max-w-[343px] md:w-[367px] md:h-[48px] md:inline-flex"
            style={{ animationDelay: '0.2s' }}
          >
            <div
              className={`w-[50px] md:w-[56px] h-6 md:h-7 rounded-full p-1 transition-all flex items-center ${isVipToggle ? "bg-pink-500" : "bg-zinc-700/50"}`}
            >
              <div className={`bg-white w-4 md:h-5 md:w-5 h-4 rounded-full transition-all shadow-xl ${isVipToggle ? "translate-x-6 md:translate-x-7" : "translate-x-0"}`} />
            </div>
            <span className="text-[14px] md:text-[16px] text-left text-white/90 tracking-tight select-none">
              I need vip followers
            </span>
            <Info className="h-4 md:h-5 w-4 md:w-5 text-white/20 group-hover:text-white/50 transition-colors ml-auto" />
          </div>
        </div>

        {/* ─── Service Grid (Carousel on Mobile) ─── */}
        <div className="relative w-full max-w-full md:max-w-[688px] mx-auto mb-20 animate-fade-in-up font-sans pt-1" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-2 pb-8 pl-4 no-scrollbar md:grid md:grid-cols-3 md:px-0 md:justify-center h-full pt-5">
            <ServiceCard
              id="premium"
              title="Premium Followers"
              type="premium"
              color="#00ADFF"
              headerGradient="linear-gradient(to bottom right, #0663CD, #01AAFF)"
              selectionGradient="linear-gradient(to bottom right, #0663CD, #01AAFF)"
              isSelected={selectedPackage === "premium"}
              onSelect={() => handleSelectPackage("premium")}
              mascotSrc="/premium-bird.png"
              features={[
                { boldPart: "Premium followers", subText: "What's the difference?" },
                { boldPart: "Super Fast", normalPart: "Delivery" },
                { boldPart: "No password", normalPart: "needed" },
                { boldPart: "24-hour", normalPart: "support" },
              ]}
            />

            <ServiceCard
              id="active"
              title="Active Followers"
              type="active"
              color="#E91E63"
              headerGradient="linear-gradient(to bottom right, #E11D48, #F43F5E)"
              isSelected={selectedPackage === "active"}
              onSelect={() => handleSelectPackage("active")}
              mascotSrc="/active-bird.png"
              overlaySrc="/star-icon.png"
              features={[
                { boldPart: "Real Active", normalPart: "followers", subText: "What's the difference?" },
                { boldPart: "Trusted", normalPart: "Delivery" },
                { boldPart: "30 day", normalPart: "refills" },
                { boldPart: "No password", normalPart: "needed" },
                { boldPart: "24-hour", normalPart: "support" },
              ]}
            />

            <ServiceCard
              id="vip"
              title="VIP Followers"
              type="vip"
              color="#1DB954"
              headerGradient="linear-gradient(to bottom right, #10B981, #059669)"
              isSelected={selectedPackage === "vip"}
              onSelect={() => handleSelectPackage("vip")}
              mascotSrc="/vip-bird.png"
              overlaySrc="/crown-icon.png"
              features={[
                { boldPart: "All features", normalPart: "of Active, plus:", isSpecial: true },
                { boldPart: "Real followers", normalPart: "from Targeted users" },
                { boldPart: "Hit the explore page", normalPart: "and grow your engagement" },
                { boldPart: "Instant Delivery", normalPart: "Guaranteed" },
                { boldPart: "VIP support", normalPart: "with lifetime access" },
              ]}
            />
          </div>
        </div>

      </main>

      {/* Simple Footer Spacer */}
      <footer className="h-20" />
    </div>
  );
}
