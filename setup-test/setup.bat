SET p=%UserProfile%\AppData\Local\Programs\digipen-assignment-zipper
rmdir /S /Q %p%
robocopy "%~dp0publish" %p% /E
SetX PATH "%p%;%PATH%"
