package main

import (
	"flag"
	"net/http"
	"os"
	"time"

	"log"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/scryer/app/bundles/systemdatabundle"
)

func main() {
	var entry string
	var static string
	var port string

	flag.StringVar(&entry, "entry", "./system-monitor/build/index.html", "the entrypoint to serve.")
	flag.StringVar(&static, "static", "./system-monitor/build/", "the directory to serve static files from.")
	flag.StringVar(&port, "port", "3000", "the `port` to listen on.")
	flag.Parse()

	r := mux.NewRouter()

	// Note: In a larger application, we'd likely extract our route-building logic into our handlers
	// package, given the coupling between them.

	// It's important that this is before your catch-all route ("/")
	// Controllers declaration
	systemcontroller := &systemdatabundle.SystemDataController{}
	api := r.PathPrefix("/api/v1/").Subrouter()
	// Routes handling
	api.HandleFunc("/diskdata", systemcontroller.RequestDiskData).Methods("GET")
	api.HandleFunc("/memorydata", systemcontroller.RequestMemoryData).Methods("GET")
	api.HandleFunc("/networkdata", systemcontroller.RequestNetworkData).Methods("GET")
	api.HandleFunc("/cpudata", systemcontroller.RequestCPUData).Methods("GET")

	// Serve static assets directly.
	r.PathPrefix("/dist").Handler(http.FileServer(http.Dir(static)))

	// Catch-all: Serve our JavaScript application's entry-point (index.html).
	r.PathPrefix("/").HandlerFunc(IndexHandler(entry))

	srv := &http.Server{
		Handler: handlers.LoggingHandler(os.Stdout, r),
		Addr:    "127.0.0.1:" + port,
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func IndexHandler(entrypoint string) func(w http.ResponseWriter, r *http.Request) {
	fn := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, entrypoint)
	}

	return http.HandlerFunc(fn)
}

///home/kyle/go/src/github.com/scryer/system-monitor/public
