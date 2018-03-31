package services

import (
	"fmt"
	"math/rand"
	"time"
)

//DiskDataService ...
type DiskDataService struct {
}

//GetDiskDataWeekly ...
func (diskDataService *DiskDataService) GetDiskDataWeekly() [604800]map[time.Time]int {
	var diskTimeSeries [604800]map[time.Time]int
	idle := false
	diskSizeInMB := 100000000
	currentDisk := 0
	now := time.Now()
	rand.Seed(now.UnixNano())
	lastWeek := now.AddDate(0, 0, -7)
	timeIteration := lastWeek

	for i := 0; i < 604800; i++ {
		snapShot := make(map[time.Time]int)
		writeSpeedLow := 1
		writeSpeedHigh := 1800
		if i%5 == 0 {
			writeSpeedHigh = writeSpeedHigh / 3
		}
		timeIteration = timeIteration.Add(time.Second)
		if rand.Intn(100) < 90 {
			idle = true
		}
		if rand.Intn(100) > 10 {
			idle = false
		}
		if !idle {
			currentDisk += rand.Intn(writeSpeedHigh-writeSpeedLow) + writeSpeedLow
		}
		if currentDisk > diskSizeInMB {
			currentDisk = diskSizeInMB
		}
		fmt.Println(currentDisk)
		snapShot[timeIteration] = currentDisk
		diskTimeSeries[i] = snapShot
	}
	return diskTimeSeries
}
