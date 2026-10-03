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
        tagline: "Fostering Collaborative Success",
        title1: "Build Your Network",
        title2: "With Peers & Mentors",
        description: "Connect with classmates, collaborate with faculty, and share opportunities. CareerSync brings your entire academic community together in one thriving ecosystem.",
        button1: "Join the Community",
        button1Link: "/register",
        button2: "Our Story",
        button2Link: "/about",
        imageSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
        imageAlt: "Group of male and female students collaborating",
        gradient: "from-white via-purple-200 to-fuchsia-500",
        taglineBg: "bg-purple-100 text-purple-900 border-purple-200",
        btn1Color: "bg-purple-900 hover:bg-purple-800",
        btn2Color: "border-purple-900 text-purple-900 hover:bg-purple-50"
    }
];"""

content = re.sub(old_array_pattern, new_array, content, flags=re.DOTALL)

# Revert interval logic to modulo 3
content = content.replace("setCurrentSlide((prev) => (prev === 1 ? 0 : 1));", "setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));")

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
