package systemdatabundle

import "time"

//CpuData struct
type SystemData struct {
	TimeSeries [10080]map[time.Time]int `json:"timeSeries"`
}

//Constructor
func NewSystemData(timeSeries [10080]map[time.Time]int) *SystemData {
	return &SystemData{
		TimeSeries: timeSeries,
	}
}
