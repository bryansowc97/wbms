@echo off
cd ./service-discovery
start cmd /c startEurekaServiceServer.bat

cd..
cd ./booking
start cmd /c startBookingService.bat

cd..
cd ./workspace
start cmd /c startWorkspaceService.bat
cd..