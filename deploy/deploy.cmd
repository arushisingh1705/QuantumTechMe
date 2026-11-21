@echo off
rem Runs deploy.sh with Git Bash (not WSL). Usage from PowerShell or CMD:
rem   deploy\deploy.cmd --check
rem   deploy\deploy.cmd
"C:\Program Files\Git\bin\bash.exe" "%~dp0deploy.sh" %*
