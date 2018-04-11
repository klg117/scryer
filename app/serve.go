package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/scryer/app/bundles/systemdatabundle"
)

func main() {
	var entry string
	var static string
	var port string

	flag.StringVar(&entry, "entry", "./system-monitor/build/static/index.html", "the entrypoint to serve.")
	flag.StringVar(&static, "static", "./system-monitor/build/static", "the directory to serve static files from.")
	flag.StringVar(&port, "port", "5001", "the `port` to listen on.")
	flag.Parse()

	/*r := mux.NewRouter()
	r.HandleFunc("/specific", specificHandler)
	r.PathPrefix("/").Handler(catchAllHandler)*/

	r := mux.NewRouter()

	//r.PathPrefix("/site/").Handler(http.FileServer(http.Dir("./system-monitor/build/")))
	//r.PathPrefix("/site").Handler(http.FileServer(http.Dir("./system-monitor/build/")))

	systemcontroller := &systemdatabundle.SystemDataController{}
	//api := r.PathPrefix("/api/v1/").Subrouter()
	// Routes handling
	r.HandleFunc("/api/v1/diskdata", systemcontroller.RequestDiskData).Methods("GET")
	r.HandleFunc("/api/v1/memorydata", systemcontroller.RequestMemoryData).Methods("GET")
	r.HandleFunc("/api/v1/networkdata", systemcontroller.RequestNetworkData).Methods("GET")
	r.HandleFunc("/api/v1/cpudata", systemcontroller.RequestCPUData).Methods("GET")

	s := http.FileServer(http.Dir("../system-monitor/build/"))
	r.PathPrefix("/").Handler(s)
	//	r.PathPrefix("/site/").Handler(http.StripPrefix("./system-monitor/build/", http.FileServer(http.Dir("./system-monitor/build/"))))

	//r.PathPrefix("/").HandlerFunc(IndexHandler(entry)) //plz work -- dont override

	/*srv := &http.Server{
		Handler:      handlers.LoggingHandler(os.Stdout, r),
		Addr:         "localhost:" + port,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}*/
	//log.Fatal(srv.ListenAndServe(), (r))
	http.Handle("/", r)

	log.Fatal(http.ListenAndServe(":5001", r))
	fmt.Println("now listening at 5001")
}

/*func IndexHandler(entrypoint string) func(w http.ResponseWriter, r *http.Request) {
	fn := func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		http.ServeFile(w, r, entrypoint)
	}

	return http.HandlerFunc(fn)
}*/
