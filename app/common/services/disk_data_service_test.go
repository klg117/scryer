package services_test

import (
	"testing"

	"github.com/scryer/app/common/services"
	. "github.com/smartystreets/goconvey/convey"
)

func TestDiskDataSpec(t *testing.T) {
	Convey("Given a DiskDataService instance", t, func() {
		diskDataService := services.DiskDataService{}

		Convey("when GetDiskDataWeekly is called", func() {
			diskdata := diskDataService.GetDiskDataWeekly()

			Convey("it should return a SystemData object", func() {
				So(diskdata, ShouldHaveLength, 604800)
			})
		})
	})
}
