package systemdatabundle

import (
	"net/http"

	"github.com/scryer/app/common"
	"github.com/scryer/app/common/services"
)

//SystemDataController struct
type SystemDataController struct {
	common.Controller
}

//SendJSON request
func (controller *SystemDataController) RequestDiskData(w http.ResponseWriter, r *http.Request) {
	diskDataService := &services.DiskDataService{}
	controller.SendJSON(
		w,
		r,
		[]*SystemData{NewSystemData(diskDataService.GetDiskDataWeekly())},
		http.StatusOK,
	)
}

func (controller *SystemDataController) RequestMemoryData(w http.ResponseWriter, r *http.Request) {
	memoryDataService := &services.MemoryDataService{}
	controller.SendJSON(
		w,
		r,
		[]*SystemData{NewSystemData(memoryDataService.GetMemoryDataWeekly())},
		http.StatusOK,
	)
}

func (controller *SystemDataController) RequestNetworkData(w http.ResponseWriter, r *http.Request) {
	networkDataService := &services.NetworkDataService{}
	controller.SendJSON(
		w,
		r,
		[]*SystemData{NewSystemData(networkDataService.GetNetworkDataWeekly())},
		http.StatusOK,
	)
}

func (controller *SystemDataController) RequestCPUData(w http.ResponseWriter, r *http.Request) {
	cpuDataService := &services.CPUDataService{}
	controller.SendJSON(
		w,
		r,
		[]*SystemData{NewSystemData(cpuDataService.GetCPUDataWeekly())},
		http.StatusOK,
	)
}
