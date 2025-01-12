const namespace = "AutoMarketingCampaign";

const defaults = {
  duration: 4,
};

const config = {
  getCampaignDuration(): number {
    return (
      context.getParkStorage(namespace).get("duration") ?? defaults.duration
    );
  },

  getCampaignEnabled(campaign: AdvertisingCampaign): boolean {
    return (
      context.getParkStorage(namespace).get(`campaign_${campaign}`) ?? false
    );
  },

  getRenewalDate(): { year: number; month: number; day: number } | undefined {
    return context.getParkStorage(namespace).get("renewal_day");
  },

  setCampaignDuration(value: number) {
    if (!(value >= 2 && value <= 12)) {
      value = defaults.duration;
    }

    context.getParkStorage(namespace).set("duration", value);
  },

  setCampaignEnabled(campaign: AdvertisingCampaign, value: boolean) {
    context.getParkStorage(namespace).set(`campaign_${campaign}`, value);
  },

  setRenewalDate(value: { year: number; month: number; day: number }) {
    return context.getParkStorage(namespace).set("renewal_day", value);
  },
};
