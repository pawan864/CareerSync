import re

footer_path = r'c:\Users\Pawan\OneDrive\Desktop\Capstone Project\Frontend\src\components\Footer.jsx'
with open(footer_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the static arrow with the animated sliding arrow
old_arrow = '<span className="inline-block transition-transform duration-300 group-hover:translate-x-1 mr-1.5">&rarr;</span>'
new_arrow = '<span className="inline-block transition-all duration-300 opacity-0 -ml-3 w-0 group-hover:w-auto group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1.5">&rarr;</span>'

# Actually, if we use w-0 and overflow-hidden, it slides perfectly without jumping. 
# But just opacity and margin transition works nicely too.
new_arrow = '<span className="inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 mr-0 group-hover:mr-1.5 text-blue-900">&rarr;</span><span className="transition-transform duration-300 group-hover:translate-x-1">'

# Wait, if I inject a span around the text, I need to close the span.
# Let's just use the margin trick on the arrow.
new_arrow2 = '<span className="inline-block transition-all duration-300 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:mr-1 text-blue-900">&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">'

content = re.sub(
    r'<span className="inline-block transition-transform duration-300 group-hover:translate-x-1 mr-1\.5">&rarr;<\/span>([^<]+)',
    r'<span className="inline-block transition-all duration-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 mr-0 group-hover:mr-1.5">&rarr;</span><span className="transition-all duration-300 group-hover:translate-x-1">\1</span>',
    content
)

with open(footer_path, 'w', encoding='utf-8') as f:
    f.write(content)
