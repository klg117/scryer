<h1>Scryer: view your system data</h1>

Scryer aims to provide an easy-to use web interface to view your key system data.<br />
<strong>Scryer currently supports viewing:</strong><br />
Memory usage
<br />
CPU usage
<br />
Disk usage
<br />
Network usage
<br />

<strong>To run Scryer locally:</strong>
Build build your JS and static files:<br /> Navigate to the /system-monitor folder then open a shell and run: npm run build.  <br />
This will minify the JS and place all of the needed files into the correct folder to be served by Go
<br /><br />
navigate to the /app folder and run: go run main.go the application should now be running at localhost:8080
<br />
additionally, you can compile first then run the compiled bin:<br />
go build main.go
./main <-- if linux or mac
execute main.exe <-- if windows

<strong>To run the react app separately:</strong><br />
simply navigate to the /system-monitor folder and first run npm install, then npm start. The app should now be running at localhost:3000

<strong>Current bugs</strong>
Display: The chart cards do not size properly when multiple charts are displayed.<br />
Display: The chart cards do not properly centered when displayed.<br />
Display: The charts do not automatically re-render when the hourly/weekly switch is toggled. The user must instead<br/>
click to view the charts again.<br />
Display: Time doesn't properly display :(
