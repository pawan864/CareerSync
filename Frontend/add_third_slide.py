import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I will find the heroSlides array and append the 3rd slide.
# Currently it ends with:
#         btn2Color: "border-indigo-900 text-indigo-900 hover:bg-indigo-50"
#     }
# ];

new_slide = """        btn2Color: "border-indigo-900 text-indigo-900 hover:bg-indigo-50"
    },
    {
        id: 3,
        tagline: "Bridging the Industry Gap",
        title1: "Source Top Tier Talent",
        title2: "With Unmatched Precision",
        description: "Empower your HR teams to recruit the brightest minds. Access verified academic records, AI-analyzed skill profiles, and conduct seamless campus drives all from one unified dashboard.",
        button1: "Hire as Recruiter",
        button1Link: "/register",
        button2: "View HR Features",
        button2Link: "/about",
        imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        imageAlt: "Professional HR Manager",
        gradient: "from-white via-teal-200 to-teal-500",
        taglineBg: "bg-teal-100 text-teal-900 border-teal-200",
        btn1Color: "bg-teal-900 hover:bg-teal-800",
        btn2Color: "border-teal-900 text-teal-900 hover:bg-teal-50"
    }"""

content = content.replace('btn2Color: "border-indigo-900 text-indigo-900 hover:bg-indigo-50"\n    }', new_slide)

# Update the setInterval modulo check from (prev === 1 ? 0 : 1) to (prev === 2 ? 0 : prev + 1)
# But wait, it might be (prev + 1) % heroSlides.length. Let's make it robust!
content = content.replace("setCurrentSlide((prev) => (prev === 1 ? 0 : 1));", "setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));")

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
