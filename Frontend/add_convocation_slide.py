import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

old_array_pattern = r'const heroSlides = \[.*?\}\s+\];'

new_array = """const heroSlides = [
    {
        id: 1,
        tagline: "The Future of Campus Placements",
        title1: "Connecting Top Campus Talent",
        title2: "With Industry Leaders",
        description: "Empowering students with AI-driven skill mapping, connecting industries with top-tier verified talent, and providing TPOs with real-time placement analytics.",
        button1: "Join as Student",
        button1Link: "/register",
        button2: "Explore Opportunities",
        button2Link: "/jobs",
        imageSrc: "/hero-student-transparent.jpg?v=13",
        imageAlt: "Isolated Indian college student boy",
        gradient: "from-white via-blue-200 to-blue-500",
        taglineBg: "bg-blue-100 text-blue-900 border-blue-200",
        btn1Color: "bg-blue-900 hover:bg-blue-800",
        btn2Color: "border-blue-900 text-blue-900 hover:bg-blue-50"
    },
    {
        id: 2,
        tagline: "Empowering Your Career Journey",
        title1: "Discover Your True Potential",
        title2: "With AI-Powered Insights",
        description: "Build a dynamic profile, instantly match with top employers, and jumpstart your career through CareerSync's intelligent placement engine.",
        button1: "Get Started Now",
        button1Link: "/register",
        button2: "Learn More",
        button2Link: "/about",
        imageSrc: "/hero-girl-transparent.jpg",
        imageAlt: "Isolated female student",
        gradient: "from-white via-indigo-200 to-indigo-500",
        taglineBg: "bg-indigo-100 text-indigo-900 border-indigo-200",
        btn1Color: "bg-indigo-900 hover:bg-indigo-800",
        btn2Color: "border-indigo-900 text-indigo-900 hover:bg-indigo-50"
    },
    {
        id: 3,
        tagline: "Celebrate Your Achievements",
        title1: "Step Into The Professional World",
        title2: "With Total Confidence",
        description: "From campus convocation to corporate success. CareerSync transforms your academic milestones into real-world career opportunities seamlessly.",
        button1: "Start Your Journey",
        button1Link: "/register",
        button2: "View Placements",
        button2Link: "/about",
        imageSrc: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
        imageAlt: "Graduation caps thrown in the air during convocation",
        gradient: "from-white via-amber-200 to-amber-500",
        taglineBg: "bg-amber-100 text-amber-900 border-amber-200",
        btn1Color: "bg-amber-700 hover:bg-amber-600",
        btn2Color: "border-amber-700 text-amber-800 hover:bg-amber-50"
    }
];"""

content = re.sub(old_array_pattern, new_array, content, flags=re.DOTALL)

# Update interval logic to modulo 3
content = content.replace("setCurrentSlide((prev) => (prev === 1 ? 0 : 1));", "setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));")

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
