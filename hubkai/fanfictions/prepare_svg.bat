@echo off
setlocal

echo Wklej SVG. Po wklejeniu wcisnij Enter, a potem Ctrl+Z i Enter:
echo.

powershell -Command ^
"$svg = [Console]::In.ReadToEnd(); ^
$svg = $svg -replace '#000000','#f7f9ec';^
$svg = $svg -replace 'width=\"64px\"','width=\"50px\"'; ^
$svg = $svg -replace 'height=\"64px\"','height=\"50px\"'; ^
$svg = $svg -replace '\"','\\\"'; ^
$svg | clip"

pause
