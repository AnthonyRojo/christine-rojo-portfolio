"use client"

import { Download, Mail, Menu, X, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Header />
      <main>
        <HeroSection scrollY={scrollY} />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Determine active section - optimized with removed projects section
      const sections = ["about", "skills", "experience", "education", "certifications", "contact"]
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section)
          break
        }
      }
      if (window.scrollY < 200) setActiveSection("hero")
    }

    // Throttle scroll event for better performance
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"}`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="font-bold text-xl group">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-pink-500 group-hover:from-pink-500 group-hover:to-gray-200 transition-all duration-500">
            Christine
          </span>
        </Link>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <nav
          className={`${isMenuOpen ? "flex" : "hidden"} md:flex absolute md:static top-16 left-0 right-0 flex-col md:flex-row items-center gap-6 bg-black/95 md:bg-transparent p-6 md:p-0 border-b md:border-0 backdrop-blur-md md:backdrop-blur-none z-50`}
        >
          {["about", "skills", "experience", "education", "certifications", "contact"].map((section) => (
            <Link
              key={section}
              href={`#${section}`}
              className={`text-sm font-medium relative px-2 py-1 transition-all duration-300 ${activeSection === section ? "text-white" : "text-gray-400 hover:text-white"}`}
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="capitalize">{section}</span>
              {activeSection === section && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-gray-400 to-pink-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

function HeroSection({ scrollY }) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Optimized animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gray-500/10 rounded-full blur-3xl animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-gray-700/10 rounded-full blur-3xl animation-delay-4000"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          >
            <div>
              <motion.p
                className="text-lg font-medium text-pink-400 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Hello, I'm
              </motion.p>
              <motion.h1
                className="text-4xl md:text-6xl xl:text-7xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-300 to-gray-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Christine Faith A. Rojo
              </motion.h1>
              <motion.div
                className="flex items-center space-x-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span className="h-px w-12 bg-pink-500"></span>
                <p className="text-xl text-gray-300">Industrial Engineer & Purchasing Planner</p>
              </motion.div>
            </div>
            <motion.p
              className="max-w-[600px] text-gray-300 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              A detail-oriented professional with experience in project management, purchasing planning, and industrial
              engineering.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <a
                href="https://drive.google.com/file/d/1IC5P6-doJdHTpyETB2zgqIrU3A5vwD-x/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-gray-800 to-pink-600 hover:from-gray-900 hover:to-pink-700 text-white border-0 rounded-full px-8 py-6 font-medium text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </a>
              <Button
                variant="outline"
                asChild
                className="bg-transparent border border-white/20 text-white hover:bg-white/10 rounded-full px-8 py-6 font-medium text-base transition-all duration-300 transform hover:scale-105"
              >
                <Link href="#contact" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Me
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              transform: `translateY(${scrollY * -0.1}px)`,
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-pink-600 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative h-[300px] w-[300px] overflow-hidden rounded-full border-4 border-white/20 shadow-2xl">
                <Image
                  src="/christine-portrait.jpeg"
                  alt="Christine Faith A. Rojo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full"
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent"></div>
      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400 mb-2">About Me</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            My Background
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gray-500 to-pink-600 rounded-full my-4"></div>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-4">
            <p className="text-gray-300 leading-relaxed">
              Currently working as a Purchasing Planner at Toyota Motor Philippines, I specialize in contract
              negotiations, supplier management, and implementing cost-saving strategies while maintaining product
              quality.
            </p>
            <p className="text-gray-300 leading-relaxed">
              With a background in Industrial Engineering from the Polytechnic University of the Philippines, I bring
              analytical thinking and process optimization skills to every role. I'm passionate about improving
              efficiency, fostering team collaboration, and delivering exceptional results.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Beyond my technical skills, I value clear communication, problem-solving, and continuous learning. I'm
              always looking for new challenges and opportunities to grow professionally.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              <span className="text-gray-300">Team Leadership</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              <span className="text-gray-300">Process Optimization</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              <span className="text-gray-300">Supply Chain</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="w-2 h-2 rounded-full bg-pink-500"></div>
              <span className="text-gray-300">Project Management</span>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <Button className="bg-gradient-to-r from-gray-800 to-pink-600 hover:from-gray-900 hover:to-pink-700 text-white border-0 rounded-full px-6 py-2 font-medium text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25">
              <Link href="#experience" className="flex items-center">
                View My Experience
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const technicalSkills = [
    { name: "Microsoft Office", icon: "💻" },
    { name: "Google Suite", icon: "📊" },
    { name: "Web Development", icon: "🌐" },
    { name: "Adobe InDesign", icon: "🎨" },
    { name: "Canva", icon: "🖌️" },
    { name: "Figma", icon: "🖼️" },
    { name: "Google Analytics", icon: "📈" },
    { name: "JMP", icon: "📉" },
  ]

  const laboratorySkills = [
    { name: "Time Study", icon: "⏱️" },
    { name: "Work Sampling", icon: "🔍" },
    { name: "Operations Management", icon: "⚙️" },
    { name: "Inventory Management", icon: "📦" },
    { name: "Project Management", icon: "📝" },
    { name: "Safety Management", icon: "🛡️" },
    { name: "Quality Management", icon: "✅" },
    { name: "Delivery Management", icon: "🚚" },
    { name: "Environment Management", icon: "🌱" },
  ]

  const languages = [
    { name: "English (Conversational)", icon: "🇺🇸" },
    { name: "Tagalog (Fluent)", icon: "🇵🇭" },
  ]

  return (
    <section id="skills" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400 mb-2">My Skills</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Professional Expertise
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gray-500 to-pink-600 rounded-full my-4"></div>
          <p className="max-w-[700px] text-gray-300 text-lg">My professional toolkit and areas of expertise</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-900/50 border-white/5 overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-pink-600/10 opacity-50"></div>
              <CardHeader className="relative pb-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-pink-600 flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h10" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-bold text-white">Technical Skills</CardTitle>
                <CardDescription className="text-gray-400">Software and tools I'm proficient with</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-3">
                  {technicalSkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xl">{skill.icon}</span>
                      <span className="text-sm text-gray-300">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-900/50 border-white/5 overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-pink-600/10 opacity-50"></div>
              <CardHeader className="relative pb-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-pink-600 flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M12 2H2v10h10V2Z" />
                    <path d="M12 12H2v10h10V12Z" />
                    <path d="M22 2h-10v20h10V2Z" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-bold text-white">Laboratory Skills</CardTitle>
                <CardDescription className="text-gray-400">Industrial engineering methodologies</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-3">
                  {laboratorySkills.map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xl">{skill.icon}</span>
                      <span className="text-sm text-gray-300">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-1 md:col-span-2"
          >
            <Card className="bg-gray-900/50 border-white/5 overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-pink-600/10 opacity-50"></div>
              <CardHeader className="relative pb-0">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-pink-600 flex items-center justify-center mb-4 shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <CardTitle className="text-xl font-bold text-white">Languages</CardTitle>
                <CardDescription className="text-gray-400">Communication capabilities</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-3">
                  {languages.map((language) => (
                    <div
                      key={language.name}
                      className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xl">{language.icon}</span>
                      <span className="text-sm text-gray-300">{language.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ExperienceSection() {
  const experiences = [
    {
      title: "Purchasing Planner",
      company: "TOYOTA MOTOR PHILIPPINES",
      location: "Santa Rosa, Laguna",
      period: "May 2023 – Present",
      responsibilities: [
        "Facilitate team-building exercises and collaborative activities to foster camaraderie and enhance teamwork within the group.",
        "Managing skill development programs, including tracking participant progress and evaluating program effectiveness.",
        "Serve as the primary point of contact for all contract negotiations and supplier agreements, ensuring clients' interests are represented and protected.",
        "Oversee personnel actions related to selling, purchasing, distributing, and equipping our clients on the field of Safety, Quality, Delivery, and Environment management.",
        "Manage our office support staff to ensure materials and products are received on time and intact, and in the quality and at the cost agreed upon with the client.",
        "Continuously seek cost-saving opportunities without compromising product quality, thereby successfully fulfilling customer orders, maximizing investments, enhancing company services and offerings.",
      ],
    },
    {
      title: "Health Advocate I",
      company: "CARE COACH CORPORATION",
      location: "Millbrae, CA 94030 (Remote)",
      period: "February 2022 – July 2022",
      responsibilities: [
        "Provided companionship and emotional support and delivered reminders for clients who may be suffering from mental illness, loneliness, or intellectual disabilities.",
        "Assisted clients' well-being with medication reminders and hospital appointments.",
        "Creatively and proactively started conversations with the clients and typed appropriate conversational response in real-time.",
        "Used a web interface to view/enter/manage data and information. This involved writing in standard US English.",
        "Participated in data annotation projects employing US English for language recognition.",
      ],
    },
    {
      title: "Project Leader on Software Development",
      company: "CREOTEC PHILIPPINES, INC.",
      location: "Biñan, Laguna",
      period: "August 2021 – October 2021",
      responsibilities: [
        "Worked with the project manager to develop team goals and delegate tasks to the appropriate team members.",
        "Provided frequent feedback on team performance, addressed weaknesses or inefficiencies, and offered support to improve skill gaps.",
        "Maintained frequent communication to offer encouragement, amend tasks, provided updates on goal progress, and nurtured collaboration amongst team members.",
        "Wrote project reports as necessary.",
        "Nurtured a workspace that encourages creativity and innovation while quickly and effectively resolving team conflicts.",
      ],
    },
    {
      title: "Service Crew",
      company: "MCDONALD'S, GOLDEN ARCHES DEVELOPMENT CORPORATION",
      location: "Santa Rosa, Laguna",
      period: "February 2018 – October 2018",
      responsibilities: [
        "Handled guests' concerns and complaints professionally and calmly to resolve problems according to restaurant policy.",
        "Greeting customers with a smile, accurately taking food orders while maintaining a fast speed and quality service.",
        "Ensured restaurant cleanliness by clearing tables, returning trays to the kitchen, sweeping, and mopping floors, washing and sanitizing kitchen utensils, and servicing restrooms.",
        "Effectively collaborated and communicated with coworkers and management.",
      ],
    },
    {
      title: "Private Instructor/Tutor",
      company: "GEO TUTORIAL SERVICES, INC.",
      location: "Santa Rosa, Laguna",
      period: "2016 – 2018",
      responsibilities: [
        "Established a friendly, encouraging, and welcoming environment for students and parents.",
        "Worked with students in adapting teaching methods and instructional materials to meet students varying needs, abilities and interests.",
        "Provided educational materials to further demonstrate subject matter to be covered in tutoring sessions.",
        "Motivated and supported students through positive feedback and reinforcement.",
        "Demonstrated the ability to work with diverse groups of people.",
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent"></div>
      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400 mb-2">My Journey</div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Work Experience
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gray-500 to-pink-600 rounded-full my-4"></div>
          <p className="max-w-[700px] text-gray-300 text-lg">My professional journey and roles</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-gray-500 to-pink-600 rounded-full"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className={`relative flex items-start gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <div className="hidden md:block w-1/2"></div>

                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-gray-800 to-pink-600 border-4 border-black z-10 flex items-center justify-center">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>

                <Card className="w-full md:w-1/2 bg-gray-900/50 border-white/5 overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800/5 to-pink-600/5 opacity-50"></div>
                  <CardHeader className="relative">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <CardTitle className="text-xl font-bold text-white">{exp.title}</CardTitle>
                      <Badge className="bg-pink-500/20 text-pink-300 hover:bg-pink-500/30 border-0">{exp.period}</Badge>
                    </div>
                    <CardDescription className="text-gray-400 mt-2">
                      <div className="font-medium text-gray-300">{exp.company}</div>
                      <div>{exp.location}</div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-left list-disc pl-5">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-sm text-gray-300">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function EducationSection() {
  const education = [
    {
      institution: "POLYTECHNIC UNIVERSITY OF THE PHILIPPINES",
      location: "Santa Rosa, Laguna Campus",
      degree: "Bachelor of Science in Industrial Engineering",
      period: "2018 – April 2023",
      icon: "🎓",
    },
    {
      institution: "SANTA ROSA SCIENCE AND TECHNOLOGY HIGH SCHOOL",
      location: "Santa Rosa City, Laguna",
      degree: "Specialized in Science, Engineering, Technology, and Mathematics",
      period: "2012 – 2018",
      additional: "Graduated with honors",
      icon: "🏫",
    },
  ]

  return (
    <section id="education" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat opacity-5"></div>
      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400 mb-2">
            My Education
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Academic Background
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gray-500 to-pink-600 rounded-full my-4"></div>
          <p className="max-w-[700px] text-gray-300 text-lg">My academic journey and qualifications</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <Card className="bg-gray-900/50 border-white/5 overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-pink-600/10 opacity-50"></div>
                <CardHeader className="relative">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-pink-600 flex items-center justify-center text-3xl">
                      {edu.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-white">{edu.institution}</CardTitle>
                      <CardDescription className="text-gray-400">{edu.location}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-white mb-1">{edu.degree}</h4>
                    <p className="text-sm text-gray-400">{edu.period}</p>
                  </div>
                  {edu.additional && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-pink-500/10 border border-pink-500/20">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink-400"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                      </svg>
                      <span className="text-sm text-pink-300">{edu.additional}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CertificationsSection() {
  const certifications = [
    {
      title: "Housekeeping NC II",
      issuer: "National Institute for Technical Education and Skills Development",
      organization: "Technical Education and Skills Development Authority (TESDA)",
      date: "July 2024",
      icon: "🏆",
    },
    {
      title: "Basic Occupational Safety and Health for Safety Officer 2",
      issuer: "Philippine Department of Labor and Employment",
      credentialId: "OLBOSH-420922-1360",
      date: "September 2022",
      icon: "🛡️",
    },
    {
      title: "InDesign 2022 Essential Training",
      issuer: "LinkedIn Learning",
      organization: "LinkedIn Learning: 1000 W Maude Ave, Sunnyvale, CA 94085",
      date: "January 2023",
      icon: "🎨",
    },
    {
      title: "Microsoft Digital Literacy",
      issuer: "National Institute for Technical Education and Skills Development",
      organization: "Technical Education and Skills Development Authority (TESDA)",
      date: "January 2023",
      icon: "💻",
    },
    {
      title: "Managing the Company",
      issuer: "Coursera",
      organization: "University of London and London Business School and offered through Coursera",
      date: "April 25, 2020",
      icon: "🏢",
    },
    {
      title: "Project Management Essentials Certified (PMEC)",
      issuer: "Management & Strategy Institute",
      credentialId: "132484975",
      date: "August 2022",
      icon: "📊",
    },
    {
      title: "Scrum Fundamentals Certified (SFC)",
      issuer: "SCRUMstudy – Accreditation Body for Scrum and Agile",
      credentialId: "932953",
      date: "August 2022",
      icon: "🔄",
    },
    {
      title: "Six Sigma Yellow Belt (SSYB)",
      issuer: "6SigmaStudy – Global Certification Body for Six Sigma Certifications",
      credentialId: "856941",
      date: "August 2022",
      icon: "📈",
    },
  ]

  return (
    <section id="certifications" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent"></div>
      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400 mb-2">
            My Certifications
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Professional Credentials
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gray-500 to-pink-600 rounded-full my-4"></div>
          <p className="max-w-[700px] text-gray-300 text-lg">
            Professional certifications and additional qualifications
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="bg-gray-900/50 border-white/5 overflow-hidden backdrop-blur-sm hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 h-full group">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/5 to-pink-600/5 opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <CardHeader className="relative pb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-pink-600 flex items-center justify-center text-xl">
                      {cert.icon}
                    </div>
                    <CardTitle className="text-lg font-bold text-white">{cert.title}</CardTitle>
                  </div>
                  <CardDescription className="text-gray-400">{cert.issuer}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 pt-0">
                  {cert.organization && <p className="text-sm text-gray-300">{cert.organization}</p>}
                  {cert.credentialId && <p className="text-sm text-gray-300">ID: {cert.credentialId}</p>}
                  <div className="flex items-center gap-2 mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-pink-400"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                      <line x1="3" x2="21" y1="9" y2="9"></line>
                      <line x1="9" x2="9" y1="21" y2="9"></line>
                    </svg>
                    <p className="text-sm text-pink-300">{cert.date}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-transparent"></div>
      <div className="container px-4 md:px-6 relative">
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block rounded-lg bg-pink-500/10 px-3 py-1 text-sm text-pink-400 mb-2">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Contact Me
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-gray-500 to-pink-600 rounded-full my-4"></div>
          <p className="max-w-[700px] text-gray-300 text-lg">Let's connect for opportunities or collaborations</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-gray-900/50 border-white/5 overflow-hidden backdrop-blur-sm h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-pink-600/10 opacity-50"></div>
              <CardHeader className="relative">
                <CardTitle className="text-xl font-bold text-white">Contact Information</CardTitle>
                <CardDescription className="text-gray-400">
                  Feel free to reach out through any of these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-pink-600 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white">christinefaithrojo@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-pink-600 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="text-white">+639392980257</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-800 to-pink-600 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Location</p>
                      <p className="text-white">Santa Rosa, Laguna, Philippines</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-900/50 border-white/5 overflow-hidden backdrop-blur-sm h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/10 to-pink-600/10 opacity-50"></div>
              <CardHeader className="relative">
                <CardTitle className="text-xl font-bold text-white">Send a Message</CardTitle>
                <CardDescription className="text-gray-400">I'll get back to you as soon as possible</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">
                      Name
                    </label>
                    <input
                      id="name"
                      className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <textarea
                      id="message"
                      className="flex min-h-[120px] w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Your message"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-gray-800 to-pink-600 hover:from-gray-900 hover:to-pink-700 text-white border-0 rounded-md py-2 font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-pink-500/25"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="w-full border-t border-white/10 py-8">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
        <div className="inline-block">
          <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-pink-500 to-gray-200">
            Christine Faith A. Rojo
          </span>
        </div>
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </footer>
  )
}

