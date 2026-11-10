# Windows Setup Guide for ElevenLabs Audio Generation

When working in a new terminal or session on a Windows PC where the `ELEVENLABS_API_KEY` is not yet configured, use any of the methods below. **None of these require Administrator privileges.**

---

## Recommended: 1-Line Local File (`.env.local`)

This is the safest and cleanest approach because it isolates your secret to this workspace and is automatically ignored by git.

### Option A: In Windows PowerShell
Run this single command from your project root:
```powershell
Set-Content -Path .env.local -Value "ELEVENLABS_API_KEY=your_api_key_here"
```

### Option B: In Command Prompt (CMD)
```cmd
echo ELEVENLABS_API_KEY=your_api_key_here > .env.local
```

### Option C: In Git Bash
```bash
echo "ELEVENLABS_API_KEY=your_api_key_here" > .env.local
```

Both Node (`node --env-file=.env.local` or our `generate_audio.js` script) and Python will automatically detect and load this file.

---

## Method 2: Current Terminal Session Only (In-Memory)

If you do not want to write the key to disk, set it in your current terminal session:

### In PowerShell:
```powershell
$env:ELEVENLABS_API_KEY = "your_api_key_here"
```

### In Command Prompt (CMD):
```cmd
set ELEVENLABS_API_KEY=your_api_key_here
```

### In Git Bash:
```bash
export ELEVENLABS_API_KEY="your_api_key_here"
```

---

## Method 3: Official ElevenLabs Interactive Onboard

If Node.js / npm is installed:
```powershell
npx -y @elevenlabs/cli@latest onboard init
```
This launches a guided interactive prompt in your terminal that securely creates `.env.local` for you without displaying the key in plain text.

---

## Method 4: Permanent Windows User Environment Variable (Optional)

If you want the API key to persist across all terminal restarts on your Windows PC (for your Windows user account only, no Admin rights needed):

In PowerShell:
```powershell
[System.Environment]::SetEnvironmentVariable('ELEVENLABS_API_KEY', 'your_api_key_here', 'User')
```
*(After running this, open a new terminal window for the change to take effect).*

---

## Verification Command

To verify that your key is recognized:

### In PowerShell:
```powershell
# If using .env.local:
node -e "import fs from 'node:fs'; console.log(fs.existsSync('.env.local') ? '✔ .env.local found' : '❌ .env.local missing')"

# If using session environment:
node -e "console.log(process.env.ELEVENLABS_API_KEY ? '✔ Key recognized' : '❌ Key not found')"
```
