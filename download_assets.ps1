# Set working directory to the script's location
Set-Location $PSScriptRoot
Write-Host "Working directory set to: $PSScriptRoot" -ForegroundColor Cyan

# Force TLS 1.2
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

# Function to download file safely
function Download-File {
    param ($Url, $Path)
    
    # Ensure directory exists
    $parent = Split-Path $Path -Parent
    if (-not (Test-Path $parent)) {
        New-Item -ItemType Directory -Force -Path $parent | Out-Null
        Write-Host "Created directory: $parent" -ForegroundColor Gray
    }

    Write-Host "Downloading $Url to $Path..."
    try {
        # Try Invoke-WebRequest first
        Invoke-WebRequest -Uri $Url -OutFile $Path -UseBasicParsing -ErrorAction Stop
        Write-Host "Success!" -ForegroundColor Green
    }
    catch {
        Write-Host "Invoke-WebRequest failed, trying WebClient..." -ForegroundColor Yellow
        try {
            # Fallback to WebClient
            $webClient = New-Object System.Net.WebClient
            $webClient.DownloadFile($Url, $Path)
            Write-Host "Success!" -ForegroundColor Green
        }
        catch {
            Write-Host "Error downloading $Url : $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Create directories explicitly
New-Item -ItemType Directory -Force -Path "css" | Out-Null
New-Item -ItemType Directory -Force -Path "fonts" | Out-Null
New-Item -ItemType Directory -Force -Path "js" | Out-Null

# Download Tailwind CSS (Standalone)
Download-File "https://cdn.tailwindcss.com/3.4.1" "$PSScriptRoot/js/tailwindcss.js"

# Download Lucide Icons
Download-File "https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" "$PSScriptRoot/js/lucide.min.js"

# Fonts
$fonts = @(
    "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf",
    "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf",
    "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf",
    "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf",
    "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf",
    "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf"
)

$fontNames = @("Inter-Regular.ttf", "Inter-Medium.ttf", "Inter-SemiBold.ttf", "Inter-Bold.ttf", "Inter-ExtraBold.ttf", "Inter-Black.ttf")

Write-Host "Downloading Fonts..."
for ($i=0; $i -lt $fonts.Length; $i++) {
    Download-File $fonts[$i] "$PSScriptRoot/fonts/$($fontNames[$i])"
}

# Create fonts.css
$cssContent = @"
@font-face { font-family: 'Inter'; font-style: normal; font-weight: 400; font-display: swap; src: url('../fonts/Inter-Regular.ttf') format('truetype'); }
@font-face { font-family: 'Inter'; font-style: normal; font-weight: 500; font-display: swap; src: url('../fonts/Inter-Medium.ttf') format('truetype'); }
@font-face { font-family: 'Inter'; font-style: normal; font-weight: 600; font-display: swap; src: url('../fonts/Inter-SemiBold.ttf') format('truetype'); }
@font-face { font-family: 'Inter'; font-style: normal; font-weight: 700; font-display: swap; src: url('../fonts/Inter-Bold.ttf') format('truetype'); }
@font-face { font-family: 'Inter'; font-style: normal; font-weight: 800; font-display: swap; src: url('../fonts/Inter-ExtraBold.ttf') format('truetype'); }
@font-face { font-family: 'Inter'; font-style: normal; font-weight: 900; font-display: swap; src: url('../fonts/Inter-Black.ttf') format('truetype'); }
"@

Set-Content -Path "$PSScriptRoot/css/fonts.css" -Value $cssContent

Write-Host "Done! Assets should be downloaded to $PSScriptRoot" -ForegroundColor Cyan
Read-Host "Press Enter to exit"
