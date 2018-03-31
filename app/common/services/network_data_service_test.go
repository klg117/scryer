package services_test

import (
	"testing"

	"github.com/scryer/app/common/services"
	. "github.com/smartystreets/goconvey/convey"
)

func TestNetworkDataSpec(t *testing.T) {
	Convey("Given a NetworkDataService instance", t, func() {
		networkDataService := services.NetworkDataService{}

		Convey("when GetNetworkDataWeekly is called", func() {
			networkdata := networkDataService.GetNetworkDataWeekly()

			Convey("it should return a SystemData object", func() {
				So(networkdata, ShouldHaveLength, 604800)
			})
		})
	})
}
