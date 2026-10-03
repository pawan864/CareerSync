import re

home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Add pageTheme state and logic
state_logic = """    const [isPaused, setIsPaused] = useState(false);
    const [pageTheme, setPageTheme] = useState('indigo');

    useEffect(() => {
        if (isPaused) {
            const themes = ['blue', 'indigo', 'orange'];
            setPageTheme(themes[currentSlide]);
        } else {
            setPageTheme('indigo'); // Default back to indigo when playing
        }
    }, [isPaused, currentSlide]);

    const pageStyles = {
        blue: { bgDark: "bg-blue-800", cardBg: "bg-blue-50", iconBg: "bg-blue-100", iconText: "text-blue-600", borderHover: "hover:border-blue-200", btnBg: "bg-blue-600 hover:bg-blue-700" },
        indigo: { bgDark: "bg-indigo-800", cardBg: "bg-[#f3f0fc]", iconBg: "bg-indigo-100", iconText: "text-indigo-600", borderHover: "hover:border-indigo-100", btnBg: "bg-indigo-600 hover:bg-indigo-700" },
        orange: { bgDark: "bg-orange-800", cardBg: "bg-orange-50", iconBg: "bg-orange-100", iconText: "text-orange-600", borderHover: "hover:border-orange-200", btnBg: "bg-orange-600 hover:bg-orange-700" }
    };
"""
content = content.replace("    const [isPaused, setIsPaused] = useState(false);", state_logic)

# Replace Timeline Line (bg-indigo-800)
content = content.replace('className="absolute left-0 right-0 h-1 bg-indigo-800', 'className={`absolute left-0 right-0 h-1 transition-colors duration-500 ${pageStyles[pageTheme].bgDark}')
# Replace Timeline Dots (bg-indigo-800)
content = content.replace('className="relative z-10 bg-indigo-800', 'className={`relative z-10 transition-colors duration-500 ${pageStyles[pageTheme].bgDark}')
content = content.replace('font-bold">', 'font-bold`}>')

# Replace Workflow Cards (bg-[#f3f0fc] ... hover:border-indigo-100)
content = content.replace('className="bg-[#f3f0fc] p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent hover:border-indigo-100 transition-all duration-300"', 'className={`p-8 rounded-xl shadow-sm hover:-translate-y-2 hover:shadow-xl hover:bg-white border border-transparent transition-all duration-300 ${pageStyles[pageTheme].cardBg} ${pageStyles[pageTheme].borderHover}`}')

# Replace Icon backgrounds (bg-indigo-100 text-teal-600)
content = content.replace('className="bg-indigo-100 text-teal-600 h-12 w-12', 'className={`h-12 w-12 transition-colors duration-500 ${pageStyles[pageTheme].iconBg} ${pageStyles[pageTheme].iconText}')
content = content.replace('justify-center mb-6">', 'justify-center mb-6`}>')

# Replace CTA Button (bg-indigo-600 hover:bg-indigo-700)
content = content.replace('className="inline-block bg-indigo-600 text-white font-bold px-8 py-4 rounded-md shadow hover:bg-indigo-700 transition-colors"', 'className={`inline-block text-white font-bold px-8 py-4 rounded-md shadow transition-colors duration-500 ${pageStyles[pageTheme].btnBg}`}')

# Replace CTA tag (bg-indigo-600)
content = content.replace('className="text-xs bg-indigo-600 text-white px-3 py-1 rounded"', 'className={`text-xs text-white px-3 py-1 rounded transition-colors duration-500 ${pageStyles[pageTheme].bgDark}`}')

# Replace mini stat block (bg-indigo-600)
content = content.replace('className="bg-indigo-600 text-white p-3 rounded-lg flex flex-col"', 'className={`text-white p-3 rounded-lg flex flex-col transition-colors duration-500 ${pageStyles[pageTheme].bgDark}`}')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(content)
