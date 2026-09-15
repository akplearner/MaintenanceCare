import type { ServiceArea } from './types';

/**
 * Service area. Drive time is stated honestly on every page, because drive
 * time is the fastest way to destroy margin in this business and a customer
 * who is told up front does not argue about it later.
 */
export const areas: ServiceArea[] = [
  {
    slug: 'elgin',
    city: 'Elgin',
    county: 'Bastrop County',
    state: 'TX',
    driveTimeMinutes: 0,
    zips: ['78621'],
    divisions: ['property-care', 'field-inspections', 'home-repair', 'exterior-care'],
    lat: 30.3496,
    lng: -97.3703,
    local:
      'Elgin is where we are based, so it gets the tightest response times we offer and no drive-time consideration on scheduling. The housing stock here splits sharply: a historic core around Main Street with a lot of pre-1978 construction, and newer subdivisions off Highway 290 built out over the last fifteen years. That changes what we look for. In the older homes we check for lead-safe requirements before any paint or demolition is scheduled, and we spend more time on foundation movement and original wiring observation. The newer builds have their own pattern: builder-grade fixtures, drainage that was never quite finished, and HVAC systems now old enough that staying on top of filters decides whether they reach year fifteen.',
  },
  {
    slug: 'bastrop',
    city: 'Bastrop',
    county: 'Bastrop County',
    state: 'TX',
    driveTimeMinutes: 25,
    zips: ['78602'],
    divisions: ['property-care', 'field-inspections', 'home-repair', 'exterior-care'],
    lat: 30.1105,
    lng: -97.3153,
    local:
      'Bastrop is about twenty-five minutes from our base, and we route it on fixed days rather than ad hoc so the drive is shared across several properties. A lot of what we do here is vacant property watch and post-storm documentation. Because of the wildfire history and the Colorado River floodplain, insurers and lenders ask for proof of condition here more than anywhere else we work. A dated set of photographs is worth far more to them than a phone call saying it looks fine. Tree and brush load on the larger lots also drives real exterior work — clearing around structures is not landscaping here, it is risk reduction.',
    note: 'Routed on fixed service days to keep drive time out of your price.',
  },
  {
    slug: 'manor',
    city: 'Manor',
    county: 'Travis County',
    state: 'TX',
    driveTimeMinutes: 20,
    zips: ['78653'],
    divisions: ['property-care', 'field-inspections', 'home-repair', 'exterior-care'],
    lat: 30.3419,
    lng: -97.5567,
    local:
      'Manor is twenty minutes west and is the most investor-heavy market in our area. Large tracts of near-identical rentals built in the 2010s mean two things: tenants change constantly, and the same faults turn up property after property. That repeatability is an advantage — once we have inspected a dozen units in the same subdivision, we know which builder shortcuts to look for and we find them faster. Most of our Manor work is scheduled around tenant turnover, with condition reports at move-in and move-out.',
  },
  {
    slug: 'taylor',
    city: 'Taylor',
    county: 'Williamson County',
    state: 'TX',
    driveTimeMinutes: 25,
    zips: ['76574'],
    divisions: ['property-care', 'field-inspections', 'home-repair', 'exterior-care'],
    lat: 30.5710,
    lng: -97.4092,
    local:
      'Taylor is twenty-five minutes north, and the market has changed faster than any other town we cover since the semiconductor plant announcement. Older homes near the historic downtown are being bought as rentals by investors who have never seen them in person. That is exactly who Vacant Property Watch and our condition reports are built for. Much of the older housing here was built before 1978, so we always ask the year built before scheduling paint or demolition.',
  },
  {
    slug: 'pflugerville',
    city: 'Pflugerville',
    county: 'Travis County',
    state: 'TX',
    driveTimeMinutes: 30,
    zips: ['78660', '78691'],
    divisions: ['property-care', 'field-inspections', 'home-repair', 'exterior-care'],
    lat: 30.4394,
    lng: -97.6200,
    local:
      'Pflugerville sits at the western edge of our service radius, about thirty minutes out, and we will be straight with you about what that means. We schedule it in blocks rather than one visit at a time, and we will not promise a same-day emergency run here when we can promise one in Elgin. What works well in Pflugerville is recurring plan coverage and scheduled inspection work, where the date is known in advance. In the dense HOA neighborhoods, how the outside looks is not just cosmetic. A neglected lawn or a dirty driveway turns into a letter, and staying ahead of that costs less than answering one.',
    note: 'Western edge of our radius — scheduled work only, blocked by day.',
  },
];

export function getArea(slug: string): ServiceArea | undefined {
  return areas.find((a) => a.slug === slug);
}

export const areaCityNames = areas.map((a) => a.city);
