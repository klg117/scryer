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

	flag.StringVar(&entry, "entry", "./dist/index.html", "the entrypoint to serve.")
	flag.StringVar(&static, "static", "./dist", "the directory to serve static files from.")
	flag.StringVar(&port, "port", "5001", "the `port` to listen on.")
	flag.Parse()

	r := mux.NewRouter()

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

	log.Fatal(srv.ListenAndServe(), handlers.CORS()(r))
}

func IndexHandler(entrypoint string) func(w http.ResponseWriter, r *http.Request) {
	fn := func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, entrypoint)
	}

	return http.HandlerFunc(fn)
}

///home/kyle/go/src/github.com/scryer/system-monitor/public
