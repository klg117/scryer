package systemdatabundle

import "time"

//CpuData struct
type SystemData struct {
	TimeSeries [604800]map[time.Time]int `json:"timeSeries"`
}

//Constructor
func NewSystemData(timeSeries [604800]map[time.Time]int) *SystemData {
	return &SystemData{
		TimeSeries: timeSeries,
	}
}
