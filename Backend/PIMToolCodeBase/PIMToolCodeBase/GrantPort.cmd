@echo off

netsh http add urlacl url="http://+:8001/" user=everyone
set /p close=Press any key to close...