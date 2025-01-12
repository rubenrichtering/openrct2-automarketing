const pluginName: string = "Auto Marketing Campaign";

function main(): void {
  if (typeof ui !== "undefined") {
    ui.registerMenuItem(pluginName, () => {
      showMarketingWindow();
    });
  }

  context.subscribe("interval.day", () => {
    validateCampaigns();
  });

  function validateCampaigns() {
    const campaigns = Object.keys(AdvertisingCampaign)
      .map((x) => Number(x))
      .filter((x) => config.getCampaignEnabled(x));

    if (campaigns.length > 0) {
      const nextGenerationDate = config.getRenewalDate();

      if (
        nextGenerationDate === undefined ||
        isDateEqualOrBefore(nextGenerationDate, date)
      ) {
        config.setRenewalDate(addWeeksToDate(config.getCampaignDuration()));

        campaigns.forEach((x) => startCampaign(x));
      }
    }
  }

  function startCampaign(campaign: AdvertisingCampaign) {
    let rideId: number | undefined;

    function getRandomRideOrStall(
      classification: "stall" | "ride"
    ): number | undefined {
      const validRides = map.rides.filter(
        (ride) =>
          ride.classification === classification && ride.status !== "closed"
      );

      if (validRides.length > 0) {
        const randomRide =
          validRides[Math.floor(Math.random() * validRides.length)];
        return randomRide.id;
      }

      return undefined;
    }

    switch (campaign) {
      case AdvertisingCampaign.ADVERTISING_CAMPAIGN_FOOD_OR_DRINK_FREE:
        rideId = getRandomRideOrStall("stall");
        break;
      case AdvertisingCampaign.ADVERTISING_CAMPAIGN_RIDE_FREE:
      case AdvertisingCampaign.ADVERTISING_CAMPAIGN_RIDE:
        rideId = getRandomRideOrStall("ride");
        break;
      default:
        rideId = -1;
        break;
    }

    if (rideId === undefined) {
      return;
    }

    const args = {
      type: campaign,
      item: rideId,
      duration: config.getCampaignDuration(),
    };

    context.queryAction("parkmarketing", args, (result) => {
      if (park.cash > (result.cost ?? 0)) {
        context.executeAction("parkmarketing", args);
      }
    });
  }
}

registerPlugin({
  name: pluginName,
  version: "1.0.0",
  authors: ["Ruben Richtering"],
  type: "remote",
  licence: "MIT",
  targetApiVersion: 34,
  minApiVersion: 10,
  main,
});
