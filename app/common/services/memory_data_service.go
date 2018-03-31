package services

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/scryer/app/common/adts"
)

//MemoryDataService ...
type MemoryDataService struct {
}

//GetMemoryDataWeekly ...
func (memoryDataService *MemoryDataService) GetMemoryDataWeekly() [604800]map[time.Time]int {
	var memoryTimeSeries [604800]map[time.Time]int
	var memoryStack adts.Stack
	idle := 2
	gaming := 8
	browsing := 2
	coding := 2
	actions := []int{gaming, browsing, coding}
	now := time.Now()
	lastWeek := now.AddDate(0, 0, -7)
	timeIteration := lastWeek

	for i := 0; i < 604800; i++ {
		timeIteration = timeIteration.Add(time.Second)
		snapShot := make(map[time.Time]int)
		if rand.Intn(1000) == 1 {
			memoryStack.Push(actions[rand.Intn(3)])
		}
		if rand.Intn(1000) == 2 {
			memoryStack.Pop()
		}
		snapShot[timeIteration] = sumSlice(memoryStack) + idle
		memoryTimeSeries[i] = snapShot
		fmt.Println(memoryTimeSeries[i])
	}
	return memoryTimeSeries
}

func sumSlice(array []int) int {
	total := 0
	for i := 0; i < len(array); i++ {
		total += array[i]
	}
	return total
}
