import { api } from '@/api';

export const configurationsCreate = async ({
  amocrmSubdomain,
  amocrmRedirectUri,
  amocrmClientSecret,
  amocrmUtmSourceId,
  personalLinkHost,
  minPayout,
  percentage,
  percentageLevels,
}) => {
  const payload = {
    amocrm_subdomain: amocrmSubdomain,
    amocrm_redirect_uri: amocrmRedirectUri,
    amocrm_client_secret: amocrmClientSecret,
    amocrm_utm_source_id: Number(amocrmUtmSourceId),
    personal_link_host: personalLinkHost,
    min_payout: Number(minPayout),
    percentage: Number(percentage),
    percentage_levels: percentageLevels.map(percentageLevel => ({
      percentage: Number(percentageLevel.percentage),
    })),
  };

  try {
    const response = await api.post('configurations', payload);
    return response;
  } catch (e) {
    return Object.assign({}, e).response;
  }
};
