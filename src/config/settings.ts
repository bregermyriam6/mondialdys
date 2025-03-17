export const settings = {

    antiBot: {
      validISPs: {
        "Belgique": ["proximus", "mobistar", "base", "telenet", "lycamobile"], //cc
        "France": ["sfr", "orange", "free", "bouygues telecom", "nrj mobile", "france", "neuf", "n9uf", "ldcom", "france telecom"], // cc
        "Suisse": ["swisscom", "salt", "upc cablecom", "sunrise", "m-budget mobile"], //cc
      },
      crawlerRegex: /bot|crawler|spider|crawling|googlebot/i
    }
  } as const;
  
  export type Settings = typeof settings;
  export type AntiBot = typeof settings.antiBot;