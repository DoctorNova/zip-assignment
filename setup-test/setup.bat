rmdir /S /Q "C:\Users\paass\AppData\Local\Programs\digipen-assignment-zipper"
robocopy "%~dp0\publish" "C:\Users\paass\AppData\Local\Programs\digipen-assignment-zipper" /E
SetX PATH "C:\Users\paass\AppData\Local\Programs\digipen-assignment-zipper;%PATH%"
pause
