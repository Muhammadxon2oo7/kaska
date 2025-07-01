"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {
  Phone,
  MapPin,
  Star,
  CheckCircle,
  Home,
  Zap,
  Truck,
  Wrench,
  Facebook,
  Instagram,
  Send,
  Menu,
  X,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Users,
  Sparkles,
  Heart,
  Play,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
  prefix = "",
  isVisible = false,
}: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
  isVisible?: boolean
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isVisible])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Intersection Observer Hook
function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible] as const
}

// Floating Animation Component
function FloatingElement({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div
      className="animate-float"
      style={{
        animationDelay: `${delay}s`,
        animation: `float 6s ease-in-out infinite ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

export default function KaskaCreativeWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [statsRef, statsVisible] = useIntersectionObserver(0.3)

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  const openVideoModal = () => setIsVideoModalOpen(true)
  const closeVideoModal = () => setIsVideoModalOpen(false)

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideoModal()
    }

    if (isVideoModalOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isVideoModalOpen])

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .gradient-bg {
          background: linear-gradient(-45deg, #1e293b, #334155, #475569, #64748b);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .hover-lift {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Modal animations */
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-modalFadeIn {
          animation: modalFadeIn 0.3s ease-out forwards;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full glass-effect z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">Kaska.uz</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["Bosh sahifa", "Xizmatlar", "Biz haqimizda", "Aloqa"].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(["home", "services", "about", "contact"][index])}
                  className="text-gray-700 hover:text-blue-600 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/20 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/20">
              <div className="flex flex-col space-y-4 pt-4">
                {["Bosh sahifa", "Xizmatlar", "Biz haqimizda", "Aloqa"].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(["home", "services", "about", "contact"][index])}
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"></div>
<div className="absolute inset-0 bg-black/30"></div>


        {/* Floating Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <FloatingElement delay={0}>
            <div className="w-20 h-20 bg-white/30 rounded-full"></div>
          </FloatingElement>
        </div>
        <div className="absolute top-40 right-20 opacity-20">
          <FloatingElement delay={2}>
            <div className="w-16 h-16 bg-white/30 rounded-full"></div>
          </FloatingElement>
        </div>
        <div className="absolute bottom-40 left-20 opacity-20">
          <FloatingElement delay={4}>
            <div className="w-12 h-12 bg-white/30 rounded-full"></div>
          </FloatingElement>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            <div className="text-white animate-slideInLeft">
              <div className="flex items-center mb-6">
                <Sparkles className="h-8 w-8 text-yellow-400 mr-3" />
                <span className="text-lg font-medium">Professional Xizmatlar</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Sizning uyingiz uchun
                <span className="block text-blue-400">ishonchli hamkor</span>
              </h1>

              <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
                8 yillik tajriba bilan universal ustalar, yordamchi ishchilar, uy-ofis xizmatkorlari, alpinistlar,
                demontajchilar va boshqa professional xizmatlarni taqdim etamiz. Sifat va ishonch - bizning asosiy
                tamoyilimiz.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105"
                  onClick={() => scrollToSection("contact")}
                >
                  Bog'lanish
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-transparent"
                  onClick={() => scrollToSection("services")}
                >
                  Xizmatlarni ko'rish
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-10 h-10 bg-white/20 rounded-full border-2 border-white">
                        <Image
                          src={`/avatar-${i}.jpg`}
                          alt={`Avatar ${i}`}
                          width={40}
                          height={40}
                          className="w-full h-full rounded-full"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="ml-3 text-white/90">5000+ mijoz</span>
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-white/90">4.9 reyting</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slideInRight">
              <div className="relative z-10">
                <Image
                  src="/hero.png"
                  alt="Professional Services"
                  width={600}
                  height={600}
                  className="rounded-3xl shadow-2xl"
                />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-10 -left-10 z-20">
                <FloatingElement delay={1}>
                  <Card className="p-4 glass-effect border-white/20">
                    <CardContent className="p-0 flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-white">
                        <p className="font-semibold">Sifatli xizmat</p>
                        <p className="text-sm text-white/70">Kafolat bilan</p>
                      </div>
                    </CardContent>
                  </Card>
                </FloatingElement>
              </div>

              <div className="absolute -bottom-10 -right-1 z-20">
                <FloatingElement delay={3}>
                  <Card className="p-4 glass-effect border-white/20">
                    <CardContent className="p-0 flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-white" />
                      </div>
                      <div className="text-white">
                        <p className="font-semibold">24/7 xizmat</p>
                        <p className="text-sm text-white/70">Har doim tayyor</p>
                      </div>
                    </CardContent>
                  </Card>
                </FloatingElement>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Pastga suring</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Bizning xizmatlarimiz
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Professional <span className="text-gradient">xizmatlar</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Har bir xizmatimiz yuqori sifat va professional yondashuvni kafolatlaydi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Wrench,
                title: "Universal ustalar",
                description:
                  "Har qanday uy-ro'zg'or ishlarini bajaruvchi tajribali ustalar. Kichik ta'mirdan tortib katta loyihalargacha.",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
                delay: "0s",
              },
              {
                icon: Users,
                title: "Yordamchi ishchilar",
                description: "Har xil ish turlarida yordam beruvchi ishchilar. Tez va sifatli xizmat ko'rsatadi.",
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-50",
                delay: "0.1s",
              },
              {
                icon: Home,
                title: "Uy-ofis xizmatkorlari",
                description: "Uy va ofislarni tozalash, tartibga solish va parvarish qilish xizmatlari.",
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50",
                delay: "0.2s",
              },
              {
                icon: Zap,
                title: "Alpinistlar (oyna yuvish)",
                description: "Baland binolarning oynalarini yuvish va tashqi devorlarni tozalash xizmatlari.",
                color: "from-cyan-500 to-cyan-600",
                bgColor: "bg-cyan-50",
                delay: "0.3s",
              },
              {
                icon: Wrench,
                title: "Demontajchilar",
                description: "Xavfsiz buzish va demontaj ishlari. Professional asboblar va tajribali mutaxassislar.",
                color: "from-red-500 to-red-600",
                bgColor: "bg-red-50",
                delay: "0.4s",
              },
              {
                icon: Zap,
                title: "Maishiy texnika ustalari",
                description: "Barcha turdagi maishiy texnikalarni ta'mirlash va texnik xizmat ko'rsatish.",
                color: "from-yellow-500 to-orange-500",
                bgColor: "bg-yellow-50",
                delay: "0.5s",
              },
              {
                icon: Shield,
                title: "Dezinfektsiyachilar",
                description: "Professional dezinfektsiya va sanitariya xizmatlari. Xavfsiz va samarali tozalash.",
                color: "from-teal-500 to-teal-600",
                bgColor: "bg-teal-50",
                delay: "0.6s",
              },
              {
                icon: MapPin,
                title: "Yetkazib berish xizmati",
                description: "Bozorlik yoki rasm orqali buyurtma berish va yetkazib berish xizmatlari.",
                color: "from-indigo-500 to-indigo-600",
                bgColor: "bg-indigo-50",
                delay: "0.7s",
              },
              {
                icon: Truck,
                title: "Yuk mashina va avtobuslar",
                description: "Har xil o'lchamdagi yuk mashinalari va avtobuslar ijarasi. Ishonchli transport xizmati.",
                color: "from-emerald-500 to-emerald-600",
                bgColor: "bg-emerald-50",
                delay: "0.8s",
              },
            ].map((service, index) => (
              <Card
                key={service.title}
                className={`group hover-lift cursor-pointer border-0 shadow-lg ${service.bgColor} animate-fadeInUp`}
                style={{ animationDelay: service.delay }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>

                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="outline" className="rounded-full bg-transparent"
                    onClick={() => scrollToSection("contact")}>
                      Batafsil
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative animate-slideInLeft">
              <div className="relative z-10">
                <Image
                  src="/cleaning.png"
                  alt="About Kaska.uz"
                  width={700}
                  height={500}
                  className="rounded-3xl shadow-2xl"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20"></div>
            </div>

            <div className="animate-slideInRight">
              <div className="inline-flex items-center bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Heart className="h-4 w-4 mr-2" />
                Biz haqimizda
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Sizning <span className="text-gradient">ishonchli</span> hamkoringiz
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Kaska.uz - O'zbekistonda professional xizmatlar ko'rsatuvchi yetakchi kompaniya. 2016 yildan beri
                mijozlarimizga sifatli xizmat ko'rsatib kelmoqdamiz.
              </p>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Bizning missiyamiz - har bir mijozga professional, tez va ishonchli xizmat ko'rsatish. Tajribali
                mutaxassislar jamoasi bilan ishlaymiz va zamonaviy texnologiyalardan foydalanamiz.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Award, text: "8 yillik tajriba", color: "text-blue-500" },
                  { icon: Users, text: "Professional jamoa", color: "text-green-500" },
                  { icon: Shield, text: "Kafolat beriladi", color: "text-purple-500" },
                  { icon: Clock, text: "24/7 qo'llab-quvvatlash", color: "text-orange-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center group">
                    <div
                      className={`w-12 h-12 ${item.color.replace("text-", "bg-").replace("500", "100")} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection("contact")}
              >
                Biz bilan ishlash
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Play className="h-4 w-4 mr-2" />
              Bizning ish jarayonimiz
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Qanday <span className="text-gradient">ishlashimizni</span> ko'ring
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional xizmatlarimiz va ish jarayonimiz haqida batafsil ma'lumot oling
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative group cursor-pointer" onClick={openVideoModal}>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/cover.jpeg"
                  alt="Kaska.uz Video Preview"
                  width={1000}
                  height={600}
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300"></div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl">
                    <Play className="h-12 w-12 md:h-16 md:w-16 text-blue-600 ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Video info overlay */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Kaska.uz - Professional Xizmatlar</h3>
                  <p className="text-lg opacity-90">Bizning missiya va xizmatlarimiz haqida</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section
        ref={statsRef}
        className="py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Animated Background Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Bizning yutuqlarimiz</h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Raqamlar bizning professional faoliyatimizni ko'rsatadi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { end: 10000, suffix: "+", title: "Bajarilgan xizmat", icon: CheckCircle },
              { end: 5000, suffix: "+", title: "Mijoz", icon: Users },
              { end: 4.9, suffix: "/5", title: "Reyting", icon: Star },
              { end: 8, suffix: "", title: "Yillik tajriba", icon: Award },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl md:text-6xl font-bold mb-2">
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} isVisible={statsVisible} duration={2500} />
                </div>
                <p className="text-white/80 text-lg">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-flex items-center bg-yellow-100 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="h-4 w-4 mr-2" />
              Mijozlar fikri
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Mijozlarimiz <span className="text-gradient">bizni sevadi</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bizning xizmatlarimizdan foydalangan mijozlarning haqiqiy fikrlari
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Aziza Karimova",
                location: "Toshkent",
                rating: 5,
                text: "Uy tozalash xizmati juda yaxshi. Tez va sifatli ishladilar. Albatta yana murojaat qilaman. Professional yondashuv va mijozlarga e'tibor juda yoqdi.",
                delay: "0s",
              },
              {
                name: "Bobur Rahimov",
                location: "Samarqand",
                rating: 5,
                text: "Elektrik ustasi professional darajada ishladi. Muammo tez hal qilindi. Xavfsizlik qoidalariga rioya qilishdi. Rahmat katta jamoa!",
                delay: "0.2s",
              },
              {
                name: "Malika Tosheva",
                location: "Buxoro",
                rating: 5,
                text: "Yuk tashish xizmati juda yaxshi tashkil etilgan. Vaqtida va xavfsiz yetkazib berishdi. Narxlar ham mos. Tavsiya qilaman barchaga.",
                delay: "0.4s",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="hover-lift border-0 shadow-lg bg-white animate-fadeInUp"
                style={{ animationDelay: testimonial.delay }}
              >
                <CardContent className="p-8">
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-500">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Telegram Channels Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-flex items-center bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Send className="h-4 w-4 mr-2" />
              Telegram tarmoqlarimiz
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bizning <span className="text-gradient">rasmiy</span> kanallari
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Har xil xizmatlar uchun maxsus Telegram kanallarimizga qo'shiling
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Ishchilar kanali",
                handle: "@Kaska_UZ",
                description: "Umumiy ishchilar xizmatlari",
                color: "from-blue-500 to-blue-600",
              },
              {
                title: "Premium ishchilar",
                handle: "@Kaska_premium",
                description: "Yuqori toifali xizmatlar",
                color: "from-purple-500 to-purple-600",
              },
              {
                title: "Ustalar kanali",
                handle: "@Kaska_UZB",
                description: "Professional ustalar",
                color: "from-green-500 to-green-600",
              },
              {
                title: "Oylik ishchilar",
                handle: "@Kaska_HR",
                description: "Doimiy ish imkoniyatlari",
                color: "from-orange-500 to-orange-600",
              },
              {
                title: "Ayollar uchun",
                handle: "@Kaska_women",
                description: "Ayol ishchilar xizmati",
                color: "from-pink-500 to-pink-600",
              },
              {
                title: "Onlayn do'kon",
                handle: "@KaskaMall",
                description: "Mahsulotlar va aksessuarlar",
                color: "from-teal-500 to-teal-600",
              },
            ].map((channel, index) => (
              <Card
                key={index}
                className="hover-lift border-0 shadow-lg group cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${channel.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Send className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{channel.title}</h3>
                  <p className="text-blue-600 font-medium mb-3">{channel.handle}</p>
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  <Link
                    href={`https://t.me/${channel.handle.replace("@", "")}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform duration-300"
                  >
                    Kanalga o'tish
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-slate-900 to-gray-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-flex items-center bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Phone className="h-4 w-4 mr-2" />
              Biz bilan bog'laning
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Savollaringiz <span className="text-yellow-400">bormi?</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Biz bilan bog'laning va professional xizmatlarimizdan foydalaning
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="animate-slideInLeft">
              <h3 className="text-3xl font-bold mb-8">Aloqa ma'lumotlari</h3>

              <div className="space-y-8">
                {[
                  { icon: Phone, title: "Telefon", info: "+998 90 123 45 67", color: "from-green-400 to-green-500" },
                  { icon: Send, title: "Telegram", info: "@Kaska_UZ", color: "from-blue-400 to-blue-500" },
                  {
                    icon: MapPin,
                    title: "Manzil",
                    info: "Toshkent, O'zbekiston",
                    color: "from-purple-400 to-purple-500",
                  },
                ].map((contact, index) => (
                  <div key={index} className="flex items-center group">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <contact.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <p className="text-white/60 mb-1">{contact.title}</p>
                      <p className="text-xl font-semibold">{contact.info}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h4 className="text-xl font-bold mb-6">Ijtimoiy tarmoqlar</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Facebook, color: "hover:bg-blue-600", link: "#" },
                    { icon: Instagram, color: "hover:bg-pink-600", link: "#" },
                    { icon: Send, color: "hover:bg-blue-500", link: "#" },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.link}
                      className={`w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center ${social.color} transition-all duration-300 hover:scale-110`}
                    >
                      <social.icon className="h-6 w-6" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-slideInRight">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold mb-8 text-white">Xabar yuborish</h3>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-white/80 font-medium mb-3">Ism</label>
                      <Input
                        placeholder="Ismingizni kiriting"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-medium mb-3">Telefon raqami</label>
                      <Input
                        placeholder="+998 90 123 45 67"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 font-medium mb-3">Xizmat tavsifi</label>
                      <Textarea
                        placeholder="Qanday xizmat kerak ekanligini yozing..."
                        rows={4}
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 resize-none"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white h-12 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
                      Xabar yuborish
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-3xl font-bold text-gradient mb-6">Kaska.uz</h3>
              <p className="text-gray-400 leading-relaxed">
                Professional xizmatlar kompaniyasi. Sifat va ishonch bizning asosiy tamoyilimiz.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Xizmatlar</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Universal ustalar</li>
                <li className="hover:text-white transition-colors cursor-pointer">Yordamchi ishchilar</li>
                <li className="hover:text-white transition-colors cursor-pointer">Uy-ofis xizmatkorlari</li>
                <li className="hover:text-white transition-colors cursor-pointer">Alpinistlar</li>
                <li className="hover:text-white transition-colors cursor-pointer">Demontajchilar</li>
                <li className="hover:text-white transition-colors cursor-pointer">Maishiy texnika ustalari</li>
                <li className="hover:text-white transition-colors cursor-pointer">Dezinfektsiyachilar</li>
                <li className="hover:text-white transition-colors cursor-pointer">Yetkazib berish</li>
                <li className="hover:text-white transition-colors cursor-pointer">Transport xizmati</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Kompaniya</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Biz haqimizda</li>
                <li className="hover:text-white transition-colors cursor-pointer">Xizmatlar</li>
                <li className="hover:text-white transition-colors cursor-pointer">Aloqa</li>
                <li className="hover:text-white transition-colors cursor-pointer">Telegram kanallar</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">Aloqa</h4>
              <div className="space-y-3 text-gray-400">
                <p className="hover:text-white transition-colors">+998 90 123 45 67</p>
                <p className="hover:text-white transition-colors">@Kaska_UZ</p>
                <p className="hover:text-white transition-colors">Toshkent, O'zbekiston</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2024 Kaska.uz. Barcha huquqlar himoyalangan.
              <span className="text-gradient font-medium ml-2">Professional xizmatlar bilan</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
    {isVideoModalOpen && (
  <div className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-sm flex items-center justify-center px-4">
    {/* Close on backdrop click */}
    <div className="absolute inset-0 z-0" onClick={closeVideoModal}></div>

    {/* Close Button */}
    <button
      onClick={closeVideoModal}
      className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110"
      aria-label="Modalni yopish"
    >
      <X className="h-6 w-6" />
    </button>

    {/* Modal Content */}
    <div className="relative z-10 w-full max-w-5xl">
      {/* Video */}
      <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/g96Xs45rGpg?autoplay=1&rel=0&modestbranding=1"
          title="Kaska.uz - Professional Xizmatlar"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Info Section */}
      <div className="mt-6 px-6 text-center">
        <h3 className="text-white text-2xl font-bold mb-2">Kaska.uz - Professional Xizmatlar</h3>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Bizning kompaniya, xizmatlarimiz va professional yondashuvimiz haqida batafsil ma'lumot oling.
        </p>
      </div>
    </div>
  </div>
)}

    </div>
  )
}
