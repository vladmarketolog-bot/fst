@echo off
mkdir css 2>nul
mkdir fonts 2>nul
mkdir js 2>nul

echo Downloading Tailwind CSS...
curl -L -o js/tailwindcss.js https://cdn.tailwindcss.com/3.4.1

echo Downloading Lucide Icons...
curl -L -o js/lucide.min.js https://unpkg.com/lucide@latest/dist/umd/lucide.min.js

echo Downloading Fonts/Inter...
curl -L -o fonts/Inter-Regular.ttf https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf
curl -L -o fonts/Inter-Medium.ttf https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf
curl -L -o fonts/Inter-SemiBold.ttf https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf
curl -L -o fonts/Inter-Bold.ttf https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZg.ttf
curl -L -o fonts/Inter-ExtraBold.ttf https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZg.ttf
curl -L -o fonts/Inter-Black.ttf https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZg.ttf

echo Creating fonts.css...
(
    echo @font-face { font-family: 'Inter'; font-style: normal; font-weight: 400; font-display: swap; src: url('../fonts/Inter-Regular.ttf') format('truetype'); }
    echo @font-face { font-family: 'Inter'; font-style: normal; font-weight: 500; font-display: swap; src: url('../fonts/Inter-Medium.ttf') format('truetype'); }
    echo @font-face { font-family: 'Inter'; font-style: normal; font-weight: 600; font-display: swap; src: url('../fonts/Inter-SemiBold.ttf') format('truetype'); }
    echo @font-face { font-family: 'Inter'; font-style: normal; font-weight: 700; font-display: swap; src: url('../fonts/Inter-Bold.ttf') format('truetype'); }
    echo @font-face { font-family: 'Inter'; font-style: normal; font-weight: 800; font-display: swap; src: url('../fonts/Inter-ExtraBold.ttf') format('truetype'); }
    echo @font-face { font-family: 'Inter'; font-style: normal; font-weight: 900; font-display: swap; src: url('../fonts/Inter-Black.ttf') format('truetype'); }
) > css/fonts.css

echo Done!
pause
