import json
import re

log_path = r'C:\Users\Pawan\.gemini\antigravity\brain\fe84f62f-de7c-4a53-984f-e1d81014d355\.system_generated\logs\transcript_full.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for line in reversed(lines):
    data = json.loads(line)
    if data.get('type') == 'PLANNER_RESPONSE':
        if 'tool_calls' in data:
            for tc in data['tool_calls']:
                # Look for Python scripts that wrote to Register.jsx
                if 'CommandLine' in tc.get('arguments', {}):
                    cmd = tc['arguments']['CommandLine']
                    if 'Register.jsx' in cmd and 'content =' in cmd and 'with open' in cmd:
                        print(f"Found python script at step {data.get('step_index')}")
                        print(cmd)
                        break
