@echo off
title Omar Faruk Arif - Data Scientist Portfolio (Next.js)
echo ===================================================
echo Starting Omar Faruk Arif's Data Science Portfolio...
echo ===================================================
if not exist node_modules (
    echo Installing npm packages...
    call npm install
)
echo Launching Next.js development server at http://localhost:3000
start http://localhost:3000
call npm run dev
pause
