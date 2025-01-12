const marketingWindowTag = "marketing_campaigns";

function showMarketingWindow(): void {
  const existingWindow = ui.getWindow(marketingWindowTag);
  if (existingWindow) {
    existingWindow.bringToFront();
    return;
  }

  const windowDesc: WindowDesc = {
    classification: marketingWindowTag,
    width: 240,
    height: 220,
    title: "Auto Marketing Campaigns",
    widgets: [
      makeDurationDropdown(20),
      makeCampaignCheckbox(
        40,
        "Free Park Entry",
        AdvertisingCampaign.ADVERTISING_CAMPAIGN_PARK_ENTRY_FREE
      ),
      makeCampaignCheckbox(
        60,
        "Free Ride Entry",
        AdvertisingCampaign.ADVERTISING_CAMPAIGN_RIDE_FREE
      ),
      makeCampaignCheckbox(
        80,
        "Half Price Park Entry",
        AdvertisingCampaign.ADVERTISING_CAMPAIGN_PARK_ENTRY_HALF_PRICE
      ),
      makeCampaignCheckbox(
        100,
        "Free Food/Drink",
        AdvertisingCampaign.ADVERTISING_CAMPAIGN_FOOD_OR_DRINK_FREE
      ),
      makeCampaignCheckbox(
        120,
        "General Park Campaign",
        AdvertisingCampaign.ADVERTISING_CAMPAIGN_PARK
      ),
      makeCampaignCheckbox(
        140,
        "Specific Ride Campaign",
        AdvertisingCampaign.ADVERTISING_CAMPAIGN_RIDE
      ),
    ],
  };
  ui.openWindow(windowDesc);
}

function makeDurationDropdown(y: number): DropdownWidget {
  const options = [2, 4, 6, 8, 10, 12];
  const selectedIndex = options.indexOf(config.getCampaignDuration() ?? defaults.duration) ?? 0;
  return {
    type: "dropdown",
    x: 10,
    y,
    width: 220,
    height: 15,
    items: options.map((x) => `${x} weeks`),
    selectedIndex: selectedIndex,
    tooltip: "Select the duration of the marketing campaigns (2-12 weeks).",
    onChange: (index: number) => {
      const duration = options[index];
      config.setCampaignDuration(duration);
    },
  };
}

function makeCampaignCheckbox(
  y: number,
  label: string,
  campaignType: AdvertisingCampaign
): CheckboxWidget {
  return {
    type: "checkbox",
    x: 10,
    y,
    width: 220,
    height: 15,
    text: label,
    isChecked: config.getCampaignEnabled(campaignType),
    tooltip: `Enable or disable the ${label} campaign.`,
    onChange: (isChecked: boolean) =>
      config.setCampaignEnabled(campaignType, isChecked),
  };
}
