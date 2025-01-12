type CampaignObject =
  | {
      type:
        | AdvertisingCampaign.ADVERTISING_CAMPAIGN_RIDE_FREE
        | AdvertisingCampaign.ADVERTISING_CAMPAIGN_PARK
        | AdvertisingCampaign.ADVERTISING_CAMPAIGN_RIDE;
      itemId: number;
    }
  | {
      type: Exclude<
        AdvertisingCampaign,
        | AdvertisingCampaign.ADVERTISING_CAMPAIGN_RIDE_FREE
        | AdvertisingCampaign.ADVERTISING_CAMPAIGN_PARK
        | AdvertisingCampaign.ADVERTISING_CAMPAIGN_RIDE
      >;
      itemId?: never;
    };
