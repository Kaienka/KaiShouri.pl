@echo off
setlocal

echo Wklej SVG. Po wklejeniu wcisnij Enter, a potem Ctrl+Z i Enter:
echo.

:: Wywołanie PowerShella, który wczytuje cały input ze stdin
powershell -Command ^
"$svg = [Console]::In.ReadToEnd(); ^
$svg = $svg -replace '\"','\\\"'; ^
$svg = $svg -replace 'width=\"64px\" height=\"64px\"','width=\"50px\" height=\"50px\"'; ^
$svg | clip"

pause
