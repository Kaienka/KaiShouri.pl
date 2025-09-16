param(
  [Parameter(Mandatory=$true)][string]$InputPath,
  [string]$OutputPath,
  [switch]$Folder
)

# Zahardkodowane id
$Id = 'storytext'

function Process-File {
  param([System.IO.FileInfo]$file)

  try {
    $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
    $text  = [System.Text.Encoding]::UTF8.GetString($bytes)

  } catch {
    Write-Host "Nie mozna odczytac pliku: $($file.FullName)" -ForegroundColor Yellow
    return
  }

  # Regex: case-insensitive, singleline
  $escapedId = [regex]::Escape($Id)
  $pattern = "(?is)<div\b[^>]*\bid\s*=\s*(['""])" + $escapedId + "\1[^>]*>.*?</div>"

  $m = [regex]::Match($text, $pattern)
  if ($m.Success) {
    if ($OutputPath) {
      if (Test-Path $OutputPath -PathType Container) {
        $outFile = Join-Path $OutputPath ($file.BaseName + "_$Id.html")
      } else {
        $outFile = $OutputPath
      }
    } else {
      $outFile = Join-Path $file.DirectoryName ($file.BaseName + "_$Id.html")
    }

    # Zapis do czystego UTF-8 bez BOM
    $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
    [System.IO.File]::WriteAllText($outFile, $m.Value, $utf8NoBom)

    Write-Host "Zapisano: $outFile"
  } else {
    Write-Host "Brak <div id=`"$Id`"> w pliku: $($file.Name)" -ForegroundColor Yellow
  }
}

if ($Folder) {
  if (-not (Test-Path $InputPath -PathType Container)) {
    Write-Host "Podany folder nie istnieje: $InputPath" -ForegroundColor Red
    exit 1
  }
  Get-ChildItem -Path $InputPath -Filter *.html -File | ForEach-Object { Process-File -file $_ }
} else {
  if (-not (Test-Path $InputPath -PathType Leaf)) {
    Write-Host "Plik nie istnieje: $InputPath" -ForegroundColor Red
    exit 1
  }
  $fi = Get-Item -LiteralPath $InputPath
  Process-File -file $fi
}
