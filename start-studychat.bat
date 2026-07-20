@echo off
cd /d "%~dp0"
echo Using public npm registry...
npm config set registry https://registry.npmjs.org/
if not exist "server\node_modules" call npm install --prefix server --registry=https://registry.npmjs.org/
if errorlevel 1 goto :error
if not exist "client\node_modules" call npm install --prefix client --registry=https://registry.npmjs.org/
if errorlevel 1 goto :error
if not exist "node_modules" call npm install --registry=https://registry.npmjs.org/
if errorlevel 1 goto :error
call npm run dev
goto :end
:error
echo.
echo Installation failed. Check internet connection, then run this file again.
pause
:end
