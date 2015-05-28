// ----------------------------------------------------------------------------------------------
// --------------------------------- COMMUNITIES LISTINGS ---------------------------------------
// ----------------------------------------------------------------------------------------------

/* PROVIDES DATA FOR:

	HOMEPAGE: STATE DROP-DOWNS (SELECT FIELDS, NOT THE DHTML POP-UP BUBBLES)
	USER ID: REGISTRATION THANK YOU
	CONTACT US: COMMUNITY/NEIGHBORHOOD INTEREST SELECT MENU
	PRODUCT SEARCH: AUTO-COMPLETE
	SITE MAP
*/
var communities = [];
communities["pulte"] = [
  {stateCode: 'AZ', stateName: 'Arizona', 
	 cities:[{city: "Vail", communities: ["The Legends at Rincon Trails"]
}, {city: "Tucson", communities: ["Sierra Morado"]
}, {city: "Mesa", communities: ["Bella Via Maestro", "Bella Via-Portofino"]
}, {city: "Florence", communities: ["Parkside at Anthem at Merrill Ranch"]
}, {city: "Phoenix", communities: ["Ridgerock at Northgate", "Lone Mountain", "Arroyo Grande at Anthem Parkside", "Stetson Valley", "Fireside at Norterra", "Fireside at Desert Ridge", "Paseo Pointe-Maravilla Series", "Paseo Pointe-Primavera Series"]
}, {city: "Red Rock", communities: ["Red Rock Village"]
}, {city: "Gilbert", communities: ["Lyon's Gate", "Stratland Estates"]
}, {city: "Marana", communities: ["The Preserve at Dove Mountain", "The Estates at Gladden Farms"]
}, {city: "Peoria", communities: ["Tierra Del Rio - Canyon", "Tierra Del Rio"]
}, {city: "Waddell", communities: ["White Tank Foothills"]
}]}, 
  {stateCode: 'CA', stateName: 'California', 
	 cities:[{city: "Campbell", communities: ["Hamilton Square"]
}, {city: "Hayward", communities: ["Veranda Heights at Stonebrae Country Club"]
}, {city: "Eagle Rock", communities: ["Mosaic"]
}, {city: "Oakland", communities: ["Villages at Arcadia Park"]
}, {city: "San Diego", communities: ["Latitude", "The Pines at 4S Ranch", "The Willows at 4S Ranch"]
}, {city: "Carlsbad", communities: ["Amberly at La Costa Oaks"]
}, {city: "Eastvale", communities: ["Everton Grove"]
}, {city: "San Jose", communities: ["Pepper Lane"]
}, {city: "Fremont", communities: ["Tavenna", "Central Park Terraces"]
}]}, 
  {stateCode: 'CO', stateName: 'Colorado', 
	 cities:[{city: "Aurora", communities: ["Hawthorn of Aurora", "Southshore", "Wheatlands"]
}, {city: "Broomfield", communities: ["Anthem Highlands Premier", "Anthem Highlands Classic", "Anthem Highlands Liberty"]
}]}, 
  {stateCode: 'DE', stateName: 'Delaware', 
	 cities:[{city: "Smyrna", communities: ["Wicksfield", "Overlook at Westbury"]
}]}, 
  {stateCode: 'FL', stateName: 'Florida', 
	 cities:[{city: "Estero", communities: ["The Preserve at Corkscrew"]
}, {city: "Lake Worth", communities: ["Oak Haven"]
}, {city: "Ocala", communities: ["Fore Ranch Cimarron"]
}, {city: "Cape Coral", communities: ["Sandoval - Hopefield/Anguilla"]
}, {city: "Ave Maria", communities: ["Emerson Park at Ave Maria", "Hampton Village-Ave Maria"]
}, {city: "Wellington", communities: ["Oakmont Estates"]
}, {city: "Palm Bay", communities: ["Heron Bay at Waterstone"]
}, {city: "Orange Park", communities: ["Forest Hammock at Oakleaf"]
}, {city: "Jacksonville", communities: ["Vizcaya", "Flagler Station", "Bartram Park"]
}, {city: "Brooksville", communities: ["Trillium"]
}, {city: "Parrish", communities: ["Harrison Ranch"]
}, {city: "Lutz", communities: ["Stonebrier Waterbridge"]
}, {city: "Palm City", communities: ["Copperleaf"]
}, {city: "Fort Myers", communities: ["The Plantation"]
}, {city: "Ocoee", communities: ["Meadow Ridge"]
}, {city: "Orlando", communities: ["VillageWalk at Lake Nona"]
}, {city: "Windermere", communities: ["Berkshire Park"]
}, {city: "Naples", communities: ["The Quarry", "Twin Eagles - Covent Garden"]
}]}, 
  {stateCode: 'GA', stateName: 'Georgia', 
	 cities:[{city: "Alpharetta", communities: ["Sterling Brooke"]
}, {city: "Sandy Springs", communities: ["Glenridge Heights"]
}, {city: "Lilburn", communities: ["TerraSol"]
}, {city: "Canton", communities: ["Canton Point", "The Hamlet Gardens", "Glen at Harmony on the Lakes", "Meadows at Harmony on the Lakes"]
}, {city: "Duluth", communities: ["Bentwood Preserve at Sugarloaf"]
}, {city: "Smyrna", communities: ["Wicksfield", "Overlook at Westbury"]
}, {city: "Decatur", communities: ["Brownstones at Decatur"]
}, {city: "Atlanta", communities: ["Brookwood Heights at Ardmore", "Ferncliff at Lenox"]
}, {city: "Sugar Hill", communities: ["Barrington"]
}]}, 
  {stateCode: 'IL', stateName: 'Illinois', 
	 cities:[{city: "O'Fallon", communities: ["Windsor Creek"]
}, {city: "Yorkville", communities: ["Autumn Creek Fields"]
}, {city: "Park Ridge", communities: ["Gateway Estates"]
}, {city: "Oswego", communities: ["Prescott Mill Townes", "Prescott Mill Highlands", "Prescott Mill Crossings", "Prescott Mill Courts"]
}, {city: "Carpentersville", communities: ["The Prairies of Winchester Glen", "The Meadows of Winchester Glen"]
}, {city: "Glenview", communities: ["Regency at the Glen - The Greens", "Regency at the Glen - The Fairways"]
}, {city: "Burr Ridge", communities: ["Villas at the Oaks", "Savoy Club"]
}]}, 
  {stateCode: 'IN', stateName: 'Indiana', 
	 cities:[{city: "Zionsville", communities: ["Cobblestone Lakes-The Gardens", "Cobblestone Lakes-The Pointe", "Cobblestone Lakes-The Springs"]
}, {city: "Indianapolis", communities: ["Breckenridge"]
}, {city: "Brownsburg", communities: ["Summer Ridge-The Springs", "Summer Ridge-The Lakes"]
}, {city: "Westfield", communities: ["Viking Meadows Bluegrass", "Viking Meadows Two Gaits", "Viking Meadows Meadowlands"]
}, {city: "Carmel", communities: ["The Retreat at Carmel - Condominiums", "The Retreat at Carmel - Manors", "Cherry Creek Enclave", "Cherry Creek Estates", "Long Ridge & Bellewood Estates", "West Village at WestClay", "Village of WestClay", "The Woods at Lion's Creek"]
}, {city: "Fishers", communities: ["Avalon-The Springs", "Avalon-The Woods", "Avalon-The Parks", "Avalon-The Townes", "Brooks Park"]
}]}, 
  {stateCode: 'MD', stateName: 'Maryland', 
	 cities:[{city: "Gaithersburg", communities: ["Quince Trace"]
}, {city: "Olney", communities: ["Batchellors Forest", "The Reserve at Fair Hill"]
}, {city: "Hyattsville", communities: ["Arts District Hyattsville"]
}]}, 
  {stateCode: 'MA', stateName: 'Massachusetts', 
	 cities:[{city: "Wrentham", communities: ["Fox Run"]
}, {city: "Northbridge", communities: ["Ridgeway"]
}, {city: "Acton", communities: ["Quail Ridge"]
}, {city: "Hopkinton", communities: ["Legacy Farms"]
}, {city: "Reading", communities: ["Reading Woods"]
}, {city: "Natick", communities: ["South Natick Hills"]
}, {city: "Braintree", communities: ["Jonathans Landing"]
}, {city: "Canton", communities: ["Canton Point", "The Hamlet Gardens", "Glen at Harmony on the Lakes", "Meadows at Harmony on the Lakes"]
}, {city: "Bedford", communities: ["Hartwell Farms"]
}]}, 
  {stateCode: 'MI', stateName: 'Michigan', 
	 cities:[{city: "Grand Blanc", communities: ["Gemstone Valley"]
}, {city: "Lyon Township", communities: ["Pinehurst"]
}, {city: "Northville", communities: ["Arcadia Ridge Villas", "Arcadia Ridge Estates"]
}, {city: "Lake Orion", communities: ["Hills at Indianwood", "The Ravines at Stonegate"]
}, {city: "Macomb", communities: ["Sandstone at the Retreat", "Westminister", "Strathmore"]
}, {city: "Novi", communities: ["The Townes at Liberty Park", "Liberty Park"]
}, {city: "Farmington Hills", communities: ["Walnut Ridge"]
}, {city: "Clarkston", communities: ["Middlesboro at Oakhurst"]
}, {city: "Canton", communities: ["Canton Point", "The Hamlet Gardens", "Glen at Harmony on the Lakes", "Meadows at Harmony on the Lakes"]
}]}, 
  {stateCode: 'MN', stateName: 'Minnesota', 
	 cities:[{city: "Cottage Grove", communities: ["The Preserve at Cottage Grove"]
}, {city: "Minnetrista", communities: ["Palmer Pointe"]
}, {city: "Minnetonka", communities: ["Lone Lake Highlands"]
}, {city: "Bloomington", communities: ["Hidden Bluffs"]
}, {city: "Apple Valley", communities: ["Cobblestone"]
}, {city: "Blaine", communities: ["Crescent Ponds"]
}, {city: "Woodbury", communities: ["Stonemill Farms"]
}, {city: "Arden Hills", communities: ["Fox Ridge"]
}, {city: "Roseville", communities: ["Josephine Woods"]
}, {city: "Chanhassen", communities: ["Hidden Creek Meadows", "Highcrest Meadows", "The Arbors"]
}, {city: "Plymouth", communities: ["Elm Creek Highlands", "The Willows"]
}]}, 
  {stateCode: 'MO', stateName: 'Missouri', 
	 cities:[{city: "Wildwood", communities: ["Arbor Chase", "Breton Woods", "Wycliffe"]
}, {city: "OFallon", communities: ["Tysons Corner"]
}, {city: "Chesterfield", communities: ["The Reserve at Chesterfield Village-The Bluffs", "The Reserve at Chesterfield Village - The Crossings", "The Reserve at Chesterfield Village"]
}]}, 
  {stateCode: 'NV', stateName: 'Nevada', 
	 cities:[{city: "Las Vegas", communities: ["The Gallery Collection at Stallion Mountain", "Terraza Amado at the Mesa", "Tierra Vista", "Ventana Amado at The Mesa", "Villa Trieste"]
}, {city: "Henderson", communities: ["The Club at Madeira Canyon", "Paseo at Madeira Canyon"]
}]}, 
  {stateCode: 'NJ', stateName: 'New Jersey', 
	 cities:[{city: "Point Pleasant", communities: ["Waters Edge at Point Pleasant"]
}, {city: "Morristown", communities: ["Morristown Square"]
}, {city: "Highland Park", communities: ["Overlook at Highland Park-Manor Homes", "Overlook at Highland Park-Townhomes"]
}, {city: "East Windsor", communities: ["Windsor Cove"]
}]}, 
  {stateCode: 'NM', stateName: 'New Mexico', 
	 cities:[{city: "Rio Rancho", communities: ["Loma Colorado"]
}, {city: "Albuquerque", communities: ["The Boulders", "Volterra", "Mesa Del Sol"]
}]}, 
  {stateCode: 'NY', stateName: 'New York', 
	 cities:[{city: "Carmel", communities: ["The Retreat at Carmel - Condominiums", "The Retreat at Carmel - Manors", "Cherry Creek Enclave", "Cherry Creek Estates", "Long Ridge & Bellewood Estates", "West Village at WestClay", "Village of WestClay", "The Woods at Lion's Creek"]
}, {city: "Newburgh", communities: ["Brighton Green"]
}]}, 
  {stateCode: 'NC', stateName: 'North Carolina', 
	 cities:[{city: "Huntersville", communities: ["Centennial"]
}, {city: "Wake Forest", communities: ["Heritage Landing"]
}, {city: "Waxhaw", communities: ["The Chimneys of Marvin-The Estates", "The Chimneys of Marvin-The Reserve", "Millbridge", "Tullamore"]
}, {city: "Morrisville", communities: ["The Townes at Weston", "The Park at Town Hall Commons"]
}, {city: "Matthews", communities: ["Stratford Hall"]
}, {city: "Cary", communities: ["Amberly Village Square", "The Estates at Davis Village", "Highcroft Reserve"]
}, {city: "Charlotte", communities: ["Ballanmoor", "Preserve at Ardrey Kell", "Ardrey Chase", "Park South Station", "Sonora at Stone Creek Ranch", "Sedona at Stone Creek Ranch"]
}, {city: "Southport", communities: ["Rivermist - Harbor Collection", "Rivermist - Seaside Collection"]
}]}, 
  {stateCode: 'OH', stateName: 'Ohio', 
	 cities:[{city: "Hinckley", communities: ["The Reserve at Walden Pond"]
}, {city: "Hudson", communities: ["Middleton Park"]
}, {city: "Bainbridge", communities: ["Canyon Woods"]
}, {city: "Aurora", communities: ["Hawthorn of Aurora", "Southshore", "Wheatlands"]
}, {city: "Strongsville", communities: ["The Woods of Schneider Reserve", "Avery Walden"]
}, {city: "Pepper Pike", communities: ["The Townes of Pepper Pike at Sterling Lakes"]
}, {city: "Copley", communities: ["Montrose Park Townhomes", "Bentley Reserve", "Rotili Lane"]
}]}, 
  {stateCode: 'OR', stateName: 'Oregon', 
	 cities:[{city: "Tigard", communities: ["Summer Creek"]
}]}, 
  {stateCode: 'PA', stateName: 'Pennsylvania', 
	 cities:[{city: "West Chester", communities: ["Preserve at Applebrook"]
}, {city: "Brookhaven", communities: ["Traditions at Ridley Creek"]
}, {city: "Fountainville", communities: ["Bedminster Square Singles"]
}, {city: "Breinigsville", communities: ["Coldwater Crossing Townhomes"]
}, {city: "Downingtown", communities: ["Applecross Country Club"]
}, {city: "North Wales", communities: ["Montgomery Pointe"]
}]}, 
  {stateCode: 'RI', stateName: 'Rhode Island', 
	 cities:[{city: "Wakefield", communities: ["Wakefield Meadows"]
}]}, 
  {stateCode: 'SC', stateName: 'South Carolina', 
	 cities:[{city: "North Charleston", communities: ["Oak Terrace Preserve"]
}, {city: "Murrells Inlet", communities: ["Linksbrook"]
}, {city: "Conway", communities: ["Heritage Preserve - Palmetto Collection", "Heritage Preserve - Seaside and Harbor Collection"]
}, {city: "Ft. Mill/Indian Land area", communities: ["Belair at Carolina Lakes The Court"]
}, {city: "Fort Mill", communities: ["Belair at Carolina Lakes The Reserve", "Audubon Lake"]
}, {city: "Mt Pleasant", communities: ["Scotts Creek"]
}, {city: "Charleston", communities: ["Cypress at Carolina Bay", "Daniel Island", "Essex at Carolina Bay", "Creekside at Carolina Bay"]
}, {city: "Bluffton", communities: ["Parkside at Baynard Park", "Baynard Park"]
}]}, 
  {stateCode: 'TN', stateName: 'Tennessee', 
	 cities:[{city: "Franklin", communities: ["Creekstone"]
}, {city: "Brentwood", communities: ["Whetstone"]
}, {city: "Hendersonville", communities: ["Creekside at Station Camp - The Manor", "Creekside at Station Camp - The Reserve"]
}]}, 
  {stateCode: 'TX', stateName: 'Texas', 
	 cities:[{city: "Missouri City", communities: ["Sienna Plantation-Parkside and Terrace Collections", "Sienna Plantation-Sierra Collection"]
}, {city: "Sugar Land", communities: ["Telfair Patio Homes-The Carriage Collection"]
}, {city: "Montgomery", communities: ["Woodforest"]
}, {city: "Boerne", communities: ["Stonehaven-The Enclave"]
}, {city: "The Woodlands", communities: ["The Village of Creekside Park in The Woodlands-Sierra Series"]
}, {city: "Allen", communities: ["Waterford Parks"]
}, {city: "Plano", communities: ["Preston Villages"]
}, {city: "McKinney", communities: ["Cambridge"]
}, {city: "Leander", communities: ["Cold Springs"]
}, {city: "Pflugerville", communities: ["Avalon"]
}, {city: "Schertz", communities: ["Kramer Farm"]
}, {city: "Irving", communities: ["La Villita"]
}, {city: "Trophy Club", communities: ["Highlands of Trophy Club - 80", "Highlands of Trophy Club - 70"]
}, {city: "Houston", communities: ["Waters Edge - The Shores", "Vintage di Vita", "Waters Edge-The Bay", "Waters Edge-The Preserve & The Bluffs", "Willowbrook-Urban Collection", "Waters Edge-The Sound & The Cove"]
}, {city: "North Richland Hills", communities: ["Graham Ranch"]
}, {city: "League City ", communities: ["The Village at Tuscan Lakes Patio Homes"]
}, {city: "Fort Worth", communities: ["West Fork Ranch"]
}, {city: "Katy", communities: ["King Lakes-Parkside Collection", "Cinco Ranch-Legacy Collection", "King Lakes Sierra and Terrace Collections", "Cinco Ranch-Sierra Collection"]
}, {city: " Austin", communities: ["Preston Village"]
}, {city: "Austin", communities: ["Pearson Place at Avery Ranch", "Hollow at Slaughter Creek"]
}, {city: "Frisco", communities: ["Knolls of Frisco", "Highland Ridge at Lonestar Ranch"]
}, {city: "San Antonio", communities: ["Alamo Ranch-Burnet Series", "Alamo Ranch-McMullen Series", "Alamo Ranch-Williams Grant", "Hillcrest"]
}]}, 
  {stateCode: 'VA', stateName: 'Virginia', 
	 cities:[{city: "Lorton", communities: ["Spring Hill Condos"]
}, {city: "Chantilly", communities: ["East Gate"]
}, {city: "Fairfax", communities: ["MetroWest"]
}, {city: "Ashburn", communities: ["Goose Creek Village", "Goose Creek Village Condominiums", "Emerald Ridge at Brambleton", "Trent Grove", "The Overlook at Brambleton", "Windermere"]
}, {city: "Leesburg", communities: ["The Hamlets at Red Cedar", "Oaklawn"]
}, {city: "Alexandria", communities: ["Potomac Yard"]
}]}, 
  {stateCode: 'WA', stateName: 'Washington', 
	 cities:[{city: "Issaquah", communities: ["Sunset Walk at Issaquah Highlands"]
}, {city: "Redmond", communities: ["Glenshire at English Hill", "Redmond Ridge East"]
}, {city: "Snoqualmie", communities: ["Ridgestone Townhomes - Snoqualmie Ridge", "EaglePointe - Snoqualmie Ridge", "Cascade Ridge - Snoqualmie Ridge"]
}]}
];

communities["delwebb"] = [
  {stateCode: 'AZ', stateName: 'Arizona', 
	 cities:[{city: "Florence", communities: ["Sun City Anthem at Merrill Ranch"]
}, {city: "Vail", communities: ["Del Webb at Rancho Del Lago"]
}, {city: "Buckeye", communities: ["Sun City Festival"]
}, {city: "Phoenix", communities: ["Fireside at Desert Ridge"]
}]}, 
  {stateCode: 'CA', stateName: 'California', 
	 cities:[{city: "Hemet", communities: ["Solera Diamond Valley"]
}, {city: "Indio", communities: ["Sun City Shadow Hills"]
}, {city: "Manteca", communities: ["Woodbridge"]
}, {city: "Apple Valley", communities: ["Sun City Apple Valley"]
}, {city: "Roseville", communities: ["The Club"]
}, {city: "Elk Grove", communities: ["Glenbrooke"]
}]}, 
  {stateCode: 'CO', stateName: 'Colorado', 
	 cities:[{city: "Broomfield", communities: ["Anthem Ranch"]
}]}, 
  {stateCode: 'CT', stateName: 'Connecticut', 
	 cities:[{city: "Oxford", communities: ["The Village at Oxford Greens", "The Village at Oxford Greens"]
}]}, 
  {stateCode: 'FL', stateName: 'Florida', 
	 cities:[{city: "Ave Maria", communities: ["Del Webb Naples"]
}, {city: "ChampionsGate", communities: ["BellaTrae at ChampionsGate"]
}, {city: "Davenport", communities: ["Del Webb Orlando"]
}, {city: "Ocala", communities: ["Del Webb Stone Creek"]
}, {city: "Ponte Vedra", communities: ["Del Webb Ponte Vedra"]
}, {city: "Apollo Beach", communities: ["Del Webb Southshore Falls"]
}, {city: "Jacksonville", communities: ["Del Webb Sweetwater"]
}]}, 
  {stateCode: 'GA', stateName: 'Georgia', 
	 cities:[{city: "Hoschton", communities: ["Village at Deaton Creek"]
}, {city: "Griffin", communities: ["Sun City Peachtree"]
}, {city: "Greensboro", communities: ["Del Webb at Lake Oconee"]
}]}, 
  {stateCode: 'IL', stateName: 'Illinois', 
	 cities:[{city: "Shorewood", communities: ["Shorewood Glen"]
}, {city: "Huntley", communities: ["Sun City Huntley"]
}, {city: "Mundelein", communities: ["Grand Dominion"]
}, {city: "Elgin", communities: ["Edgewater"]
}]}, 
  {stateCode: 'IN', stateName: 'Indiana', 
	 cities:[{city: "Fishers", communities: ["Britton Falls"]
}]}, 
  {stateCode: 'MA', stateName: 'Massachusetts', 
	 cities:[{city: "Plymouth", communities: ["Great Island"]
}]}, 
  {stateCode: 'MI', stateName: 'Michigan', 
	 cities:[{city: "Grand Blanc", communities: ["Grand Reserve"]
}, {city: "Brownstown", communities: ["Bridgewater"]
}]}, 
  {stateCode: 'NV', stateName: 'Nevada', 
	 cities:[{city: "Reno", communities: ["Sierra Canyon"]
}, {city: "Las Vegas", communities: ["Solera at Stallion Mountain"]
}, {city: "Mesquite", communities: ["Sun City Mesquite"]
}, {city: "Henderson", communities: ["The Club at Madeira Canyon"]
}]}, 
  {stateCode: 'NJ', stateName: 'New Jersey', 
	 cities:[{city: "Howell Twp", communities: ["Equestra"]
}, {city: "Wanaque", communities: ["Wanaque Reserve"]
}, {city: "Manchester", communities: ["River Pointe"]
}]}, 
  {stateCode: 'NM', stateName: 'New Mexico', 
	 cities:[{city: "Bernalillo", communities: ["Del Webb at Alegria"]
}]}, 
  {stateCode: 'NC', stateName: 'North Carolina', 
	 cities:[{city: "Durham", communities: ["Carolina Arbors by Del Webb"]
}, {city: "Cary", communities: ["Carolina Preserve at Amberly"]
}]}, 
  {stateCode: 'OH', stateName: 'Ohio', 
	 cities:[{city: "North Ridgeville", communities: ["Pioneer Ridge"]
}]}, 
  {stateCode: 'SC', stateName: 'South Carolina', 
	 cities:[{city: "Summerville", communities: ["Del Webb Charleston"]
}, {city: "Bluffton", communities: ["Sun City Hilton Head", "The Haven at New Riverside"]
}, {city: "Ft. Mill/Indian Land", communities: ["Sun City Carolina Lakes"]
}]}, 
  {stateCode: 'TN', stateName: 'Tennessee', 
	 cities:[{city: "Mt. Juliet", communities: ["Lake Providence"]
}]}, 
  {stateCode: 'TX', stateName: 'Texas', 
	 cities:[{city: "Georgetown", communities: ["Sun City Texas"]
}, {city: "San Antonio", communities: ["Hill Country Retreat", "Hill Country Retreat"]
}, {city: "Frisco", communities: ["Frisco Lakes"]
}, {city: "Richmond", communities: ["Del Webb Sweetgrass"]
}]}, 
  {stateCode: 'VA', stateName: 'Virginia', 
	 cities:[{city: "Ashburn", communities: ["Potomac Green Condos"]
}, {city: "Fredericksburg", communities: ["Celebrate"]
}]}
];

communities["divosta"] = [
  {stateCode: 'FL', stateName: 'Florida', 
	 cities:[{city: "Orlando", communities: ["VillageWalk at Lake Nona"]
}, {city: "Vero Beach", communities: ["Waterway Village"]
}, {city: "Wellington", communities: ["Castellina"]
}, {city: "Jupiter", communities: ["Windsor Park at Abacoa", "Mallory Creek"]
}, {city: "Bonita Springs", communities: ["VillageWalk of Bonita Springs"]
}, {city: "Venice", communities: ["IslandWalk at the West Villages"]
}, {city: "Sarasota", communities: ["The Isles on Palmer Ranch"]
}, {city: "Naples", communities: ["VeronaWalk", "VeronaWalk"]
}]}
];

