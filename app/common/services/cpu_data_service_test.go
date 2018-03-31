package services_test

import (
	"testing"

	"github.com/scryer/app/common/services"
	. "github.com/smartystreets/goconvey/convey"
)

func TestCPUDataSpec(t *testing.T) {
	Convey("Given a CPUDataService instance", t, func() {
		cpuDataService := services.CPUDataService{}

		Convey("when GetCPUDataWeekly is called", func() {
			cpudata := cpuDataService.GetCPUDataWeekly()

			Convey("it should return a SystemData object", func() {
				So(cpudata, ShouldHaveLength, 604800)
			})
		})
	})
}
