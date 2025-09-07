@echo off

echo Podaj tytul fika (escaped) i opcjonalnie liczbe rozdzialow po spacji:
set /p input=

for /f "tokens=1,2" %%a in ("%input%") do (
    set "ficName=%%a"
    set "numFiles=%%b"
)

if "%ficName%"=="" (
    echo Musisz podac nazwe fika
    exit /b 1
)

if "%numFiles%"=="" (
    set "numFiles=1"
)

mkdir "%~dp0%ficName%"
echo Utworzono folder %ficName%

copy "%~dp0info.json" "%~dp0%ficName%\"
echo Przekopiowano plik info.json

mkdir "%~dp0%ficName%\chapters"
echo Utworzono folder chapters

for /L %%i in (1,1,%numFiles%) do (
    type nul > "%~dp0%ficName%\chapters\%%i.html"
    echo Utworzono plik: %%i.html
)

echo Gotowe!

