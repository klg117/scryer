package main

import (
	"log"
	"net/http"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/scryer/app/bundles/systemdatabundle"
)

func main() {
	// Controllers declaration
	systemcontroller := &systemdatabundle.SystemDataController{}
	r := mux.NewRouter()
	s := r.PathPrefix("/api/v1/").Subrouter()
	// Routes handling
	s.HandleFunc("/diskdata", systemcontroller.RequestDiskData).Methods("GET")
	s.HandleFunc("/memorydata", systemcontroller.RequestMemoryData).Methods("GET")
	s.HandleFunc("/networkdata", systemcontroller.RequestNetworkData).Methods("GET")
	s.HandleFunc("/cpudata", systemcontroller.RequestCPUData).Methods("GET")

	r.PathPrefix("/").Handler(http.FileServer(http.Dir("../system-monitor/build/")))

	http.Handle("/", r)

	//headersOk := handlers.AllowedHeaders([]string{"X-Requested-With"})
	//originsOk := handlers.AllowedOrigins([]string{os.Getenv("ORIGIN_ALLOWED")})
	//methodsOk := handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "OPTIONS"})
	corsObj := handlers.AllowedOrigins([]string{"*"})

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(corsObj)(r)))
}
