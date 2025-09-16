@echo off
rem usage: extract_div.bat <inputFileOrFolder> [outputPath]

if "%~1"=="" (
  echo Uzycie:
  echo   extract_div.bat ^"C:\sciezka\plik.html^" ^"C:\sciezka\wyjscie.html^"
  echo   lub dla folderu:
  echo   extract_div.bat ^"C:\sciezka\folder^" ^"C:\sciezka\wyjscieFolder^"
  goto :eof
)

set "INPUT=%~1"
set "OUT=%~2"

rem sprawdz czy to katalog
if exist "%INPUT%\" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0\extract_div.ps1" -InputPath "%INPUT%" -OutputPath "%OUT%" -Folder
  goto :eof
)

rem sprawdz czy to plik
if exist "%INPUT%" (
  powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0\extract_div.ps1" -InputPath "%INPUT%" -OutputPath "%OUT%"
  goto :eof
)

echo Nie znaleziono pliku ani folderu: %INPUT%
