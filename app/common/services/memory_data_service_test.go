package services_test

import (
	"testing"

	"github.com/scryer/app/common/services"
	. "github.com/smartystreets/goconvey/convey"
)

func TestMemoryDataSpec(t *testing.T) {
	Convey("Given a MemoryDataService instance", t, func() {
		memoryDataService := services.MemoryDataService{}

		Convey("when GetMemoryDataWeekly is called", func() {
			memorydata := memoryDataService.GetMemoryDataWeekly()

			Convey("it should return a SystemData object", func() {
				So(memorydata, ShouldHaveLength, 10080)
			})
		})
	})
}
