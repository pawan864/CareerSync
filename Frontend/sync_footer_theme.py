import re

# 1. Update Home.jsx to dispatch pageThemeChange and apply dynamic CTA banner
home_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\pages\Home.jsx'
with open(home_path, 'r', encoding='utf-8') as f:
    home_content = f.read()

# Add dispatch event
if "pageThemeChange" not in home_content:
    hook_logic = """    useEffect(() => {
        if (isPaused) {
            const themes = ['blue', 'indigo', 'orange'];
            setPageTheme(themes[currentSlide]);
        } else {
            setPageTheme('indigo'); // Default back to indigo when playing
        }
    }, [isPaused, currentSlide]);"""
    
    new_hook_logic = """    useEffect(() => {
        if (isPaused) {
            const themes = ['blue', 'indigo', 'orange'];
            setPageTheme(themes[currentSlide]);
        } else {
            setPageTheme('indigo'); // Default back to indigo when playing
        }
    }, [isPaused, currentSlide]);

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('pageThemeChange', { detail: { theme: pageTheme } }));
    }, [pageTheme]);"""
    
    home_content = home_content.replace(hook_logic, new_hook_logic)

# Update pageStyles to include ctaGradient
old_styles = """    const pageStyles = {
        blue: { bgDark: "bg-blue-800", cardBg: "bg-blue-50", iconBg: "bg-blue-100", iconText: "text-blue-600", borderHover: "hover:border-blue-200", btnBg: "bg-blue-600 hover:bg-blue-700" },
        indigo: { bgDark: "bg-indigo-800", cardBg: "bg-[#f3f0fc]", iconBg: "bg-indigo-100", iconText: "text-indigo-600", borderHover: "hover:border-indigo-100", btnBg: "bg-indigo-600 hover:bg-indigo-700" },
        orange: { bgDark: "bg-orange-800", cardBg: "bg-orange-50", iconBg: "bg-orange-100", iconText: "text-orange-600", borderHover: "hover:border-orange-200", btnBg: "bg-orange-600 hover:bg-orange-700" }
    };"""

new_styles = """    const pageStyles = {
        blue: { bgDark: "bg-blue-800", cardBg: "bg-blue-50", iconBg: "bg-blue-100", iconText: "text-blue-600", borderHover: "hover:border-blue-200", btnBg: "bg-blue-600 hover:bg-blue-700", ctaGradient: "from-white via-blue-200 to-blue-500" },
        indigo: { bgDark: "bg-indigo-800", cardBg: "bg-[#f3f0fc]", iconBg: "bg-indigo-100", iconText: "text-indigo-600", borderHover: "hover:border-indigo-100", btnBg: "bg-indigo-600 hover:bg-indigo-700", ctaGradient: "from-white via-indigo-200 to-indigo-500" },
        orange: { bgDark: "bg-orange-800", cardBg: "bg-orange-50", iconBg: "bg-orange-100", iconText: "text-orange-600", borderHover: "hover:border-orange-200", btnBg: "bg-orange-600 hover:bg-orange-700", ctaGradient: "from-white via-orange-200 to-orange-400" }
    };"""
home_content = home_content.replace(old_styles, new_styles)

# Update CTA Banner gradient
home_content = home_content.replace('className="bg-gradient-to-r from-white via-blue-200 to-blue-500 \nmt-16', 'className={`bg-gradient-to-r transition-colors duration-700 ${pageStyles[pageTheme].ctaGradient} \nmt-16')

with open(home_path, 'w', encoding='utf-8') as f:
    f.write(home_content)

# 2. Update Footer.jsx to listen to pageThemeChange and use dynamic classes
footer_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Footer.jsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    footer_content = f.read()

if "footerTheme" not in footer_content:
    footer_imports = "import React, { useState, useEffect } from 'react';"
    footer_content = footer_content.replace("import React from 'react';", footer_imports)

    footer_state = """const Footer = () => {
    const [footerTheme, setFooterTheme] = useState('indigo');

    useEffect(() => {
        const handleThemeChange = (e) => {
            setFooterTheme(e.detail.theme || 'indigo');
        };
        window.addEventListener('pageThemeChange', handleThemeChange);
        return () => window.removeEventListener('pageThemeChange', handleThemeChange);
    }, []);

    const footerStyles = {
        blue: {
            bg: "bg-[#f0f4f8]",
            logoBg: "from-green-500/20 to-blue-600/20",
            logoBorder: "border-blue-200",
            textDark: "text-blue-900",
            textLight: "text-blue-900/80",
            textAccent: "text-blue-500",
            iconHover: "hover:bg-blue-600",
            borderAccent: "border-blue-200"
        },
        indigo: {
            bg: "bg-[#f3f0fc]",
            logoBg: "from-purple-500/20 to-indigo-600/20",
            logoBorder: "border-indigo-200",
            textDark: "text-indigo-900",
            textLight: "text-indigo-900/80",
            textAccent: "text-indigo-500",
            iconHover: "hover:bg-indigo-600",
            borderAccent: "border-indigo-200"
        },
        orange: {
            bg: "bg-orange-50/50",
            logoBg: "from-amber-500/20 to-orange-600/20",
            logoBorder: "border-orange-200",
            textDark: "text-orange-900",
            textLight: "text-orange-900/80",
            textAccent: "text-orange-500",
            iconHover: "hover:bg-orange-600",
            borderAccent: "border-orange-200"
        }
    };
"""
    footer_content = footer_content.replace("const Footer = () => {", footer_state)

    # Apply styles to HTML
    footer_content = footer_content.replace('className="bg-[#f3f4f8] py-12 mt-auto border-t border-gray-200"', 'className={`py-12 mt-auto border-t border-gray-200 transition-colors duration-700 ${footerStyles[footerTheme].bg}`}')
    
    # Logo BG
    footer_content = footer_content.replace('className="w-8 h-8 bg-gradient-to-br from-green-500/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3 border border-blue-200"', 'className={`w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center mr-3 border transition-colors duration-500 ${footerStyles[footerTheme].logoBg} ${footerStyles[footerTheme].logoBorder}`}')
    
    # Text colors
    footer_content = footer_content.replace('text-blue-800', '${footerStyles[footerTheme].textDark}')
    footer_content = footer_content.replace('text-blue-900/80', '${footerStyles[footerTheme].textLight}')
    footer_content = footer_content.replace('text-blue-900', '${footerStyles[footerTheme].textDark}')
    footer_content = footer_content.replace('text-blue-500', '${footerStyles[footerTheme].textAccent}')
    footer_content = footer_content.replace('hover:bg-blue-600', '${footerStyles[footerTheme].iconHover}')
    footer_content = footer_content.replace('border-blue-200', '${footerStyles[footerTheme].borderAccent}')

    # We need to wrap strings in backticks where we injected variables
    # (Since I just injected ${...} without changing quotes, I will regex it)
    footer_content = re.sub(r'className="([^"]*\$\{[^}]+\}[^"]*)"', r'className={`\1`}', footer_content)

    with open(footer_path, 'w', encoding='utf-8') as f:
        f.write(footer_content)

