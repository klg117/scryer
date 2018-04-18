package services

import (
	"fmt"
	"math/rand"
	"time"
)

type NetworkDataService struct {
}

func (networkDataService *NetworkDataService) GetNetworkDataWeekly() [10080]map[time.Time]int {
	var networkTimeSeries [10080]map[time.Time]int
	currentUsageMbps := 0
	var curveUp int
	var curveDown int
	maxSpeed := 60
	networkFlag := false
	now := time.Now()
	lastWeek := now.AddDate(0, 0, -7)
	timeIteration := lastWeek
	for i := 0; i < 10080; i++ {
		curveUp = rand.Intn(12)
		curveDown = rand.Intn(12)
		timeIteration = timeIteration.Add(time.Minute)
		snapShot := make(map[time.Time]int)
		if rand.Intn(10) == 5 {
			networkFlag = !networkFlag
			fmt.Println("flagUp")
		}
		if networkFlag {
			currentUsageMbps += curveUp
			fmt.Println("up")
		} else {
			currentUsageMbps -= curveDown
		}
		if currentUsageMbps > maxSpeed {
			networkFlag = !networkFlag
		}
		if currentUsageMbps > maxSpeed {
			currentUsageMbps = maxSpeed
		}
		if currentUsageMbps < 0 {
			currentUsageMbps = 0
		}
		snapShot[timeIteration] = currentUsageMbps
		networkTimeSeries[i] = snapShot
		fmt.Println(currentUsageMbps)
	}
	return networkTimeSeries
}
