import { Cards } from "../mongodb.js";

export const cards = [
  {
    ability: null,
    attacks: 1,
    cost: 1,
    description: "",
    id: 1,
    power: 2,
    rarity: "common",
    spell: null,
    title: "Flametongue Shaman",
    toughness: 1,
  },
  {
    id: 2,
    title: "Frostweaver",
    cost: 2,
    power: 2,
    toughness: 3,
    ability: null,
    description: "",
  },
  {
    id: 3,
    title: "Ironhide Mauler",
    cost: 1,
    power: 1,
    toughness: 1,
    ability: "battlecry_draw_1",
    description: "",
  },
  {
    id: 4,
    title: "Arcane Trickster",
    cost: 2,
    power: 3,
    toughness: 2,
    ability: null,
    description: "",
  },
  {
    id: 5,
    title: "Bloodfang Assassin",
    cost: 3,
    power: 2,
    toughness: 3,
    ability: {
      destroyMinion: false,
      drawnCards: false,
      minionPower: null,
      minionToughness: null,
      powerAdded: 1,
      randomMinionsNumber: null,
      summonNumber: null,
      switchStats: false,
      toughnessAdded: 1,
      trigger: "appear",
      type: "targetAllAllyMinions",
    },
    description: "",
  },
  {
    id: 6,
    title: "Stormrider",
    cost: 3,
    power: 1,
    toughness: 3,
    ability: "haste",
    description: "",
  },
  {
    id: 7,
    title: "Thundering Hooves",
    cost: 4,
    power: 2,
    toughness: 7,
    ability: null,
    description: "",
  },
  {
    id: 8,
    title: "Crystalweaver",
    cost: 4,
    power: 3,
    toughness: 5,
    ability: "taunt",
    description: "",
  },
  {
    id: 9,
    title: "Plaguebearer",
    cost: 5,
    power: 4,
    toughness: 4,
    ability: "battlecry_damage_enemy_hero_3",
    description: "",
  },
  {
    id: 10,
    title: "Solaris Sentinel",
    cost: 6,
    power: 6,
    toughness: 7,
    ability: null,
    description: "",
  },
  {
    id: 11,
    title: "Venomfang Serpent",
    cost: 1,
    power: 1,
    toughness: 1,
    ability: "battlecry_damage_any_target_1",
    description: "",
  },
  {
    id: 12,
    title: "Windwhisper Druid",
    cost: 1,
    power: 1,
    toughness: 3,
    ability: "battlecry_heal_any_ally_2",
    description: "",
  },
  {
    id: 13,
    title: "Emberstorm Phoenix",
    cost: 1,
    power: 2,
    toughness: 1,
    ability: "battlecry_heal_any_ally_2",
    description: "",
  },
  {
    id: 14,
    title: "Frostbite Yeti",
    cost: 2,
    power: 2,
    toughness: 2,
    ability: "taunt",
    description: "",
  },
  {
    id: 15,
    title: "Starforged Artificer",
    cost: 2,
    power: 3,
    toughness: 2,
    ability: "battlecry_buff_any_ally_1_1",
    description: "",
  },
  {
    id: 16,
    title: "Cursed Banshee",
    cost: 3,
    power: 1,
    toughness: 4,
    ability: "taunt",
    description: "",
  },
  {
    id: 17,
    title: "Thunderclap Brute",
    cost: 4,
    power: 4,
    toughness: 5,
    ability: null,
    description: "",
  },
  {
    id: 18,
    title: "Astral Diviner",
    cost: 4,
    power: 2,
    toughness: 8,
    ability: null,
    description: "",
  },
  {
    id: 19,
    title: "Plundering Corsair",
    cost: 7,
    power: 9,
    toughness: 5,
    ability: null,
    description: "",
  },
  {
    id: 20,
    title: "Lunar Guardian",
    cost: 1,
    power: 1,
    toughness: 1,
    ability: "haste",
    description: "",
  },
  {
    id: 21,
    title: "Flameheart Djinn",
    cost: 2,
    power: 0,
    toughness: 3,
    ability: "battlecry_buff_all_allies_2_0",
    description: "",
  },
  {
    id: 22,
    title: "Stormcaller Shaman",
    cost: 5,
    power: 4,
    toughness: 4,
    ability: "gain_1_1_for_each_ally",
    description: "",
  },
  {
    id: 23,
    title: "Crystaline Construct",
    cost: 5,
    power: 5,
    toughness: 4,
    ability: "taunt",
    description: "",
  },
  {
    id: 24,
    title: "Venomous Arachnid",
    cost: 6,
    power: 5,
    toughness: 2,
    ability: "haste",
    description: "",
  },
  {
    id: 25,
    title: "Shadowmancer",
    cost: 1,
    power: 1,
    toughness: 3,
    ability: "taunt",
    description: "",
  },
  {
    id: 26,
    title: "Whispering Banshee",
    cost: 1,
    power: 3,
    toughness: 2,
    ability: "battlecry_damage_your_hero_3",
    description: "",
  },
  {
    id: 27,
    title: "Ironbark Colossus",
    cost: 2,
    power: 4,
    toughness: 3,
    ability: "battlecry_discard_random_1",
    description: "",
  },
  {
    id: 28,
    title: "Timebender Mage",
    cost: 4,
    power: 5,
    toughness: 5,
    ability: null,
    description: "",
  },
  {
    id: 29,
    title: "Soulstealer Necromancer",
    cost: 5,
    power: 4,
    toughness: 5,
    ability: "battlecry_heal_all_allies_2",
    description: "",
  },
  {
    id: 30,
    title: "Shimmerwing Faerie",
    cost: 7,
    power: 7,
    toughness: 7,
    ability: null,
    description: "",
  },
  {
    id: 31,
    title: "Doomblade Assassin",
    cost: 1,
    power: 1,
    toughness: 2,
    ability: "battlecry_add_minion_to_hand_1_2",
    description: "",
  },
  {
    id: 32,
    title: "Celestial Herald",
    cost: 2,
    power: 2,
    toughness: 1,
    ability: "rale_draw_1",
    description: "",
  },
  {
    id: 33,
    title: "Thornheart Druid",
    cost: 2,
    power: 2,
    toughness: 1,
    ability: "battlecry_summon_1_1",
    description: "",
  },
  {
    id: 34,
    title: "Astral Serpent",
    cost: 2,
    power: 3,
    toughness: 2,
    ability: "battlecry_damage_all_ennemies_1",
    description: "",
  },
  {
    id: 35,
    title: "Frostbite Archer",
    cost: 1,
    power: 1,
    toughness: 3,
    ability: "battlecry_heal_all_allies_1",
    description: "",
  },
  {
    id: 36,
    title: "Magma Elemental",
    cost: 1,
    power: 0,
    toughness: 4,
    ability: "taunt",
    description: "",
  },
  {
    id: 37,
    title: "Nightfall Shadowcaster",
    cost: 2,
    power: 2,
    toughness: 4,
    ability: "taunt",
    description: "",
  },
  {
    id: 38,
    title: "Thunderstorm Titan",
    cost: 3,
    power: 1,
    toughness: 3,
    ability: "battlecry_summon_1_3",
    description: "",
  },
  {
    id: 39,
    title: "Arcane Illusionist",
    cost: 3,
    power: 3,
    toughness: 4,
    ability: "battlecry_buff_any_ally_0_3",
    description: "",
  },
  {
    id: 40,
    title: "Bloodmoon Berserker",
    cost: 4,
    power: 1,
    toughness: 7,
    ability: "taunt",
    description: "",
  },
  {
    id: 41,
    title: "Solarflare Phoenix",
    cost: 6,
    power: 6,
    toughness: 6,
    ability: "battlecry_buff_any_ally_0_3",
    description: "",
  },
  {
    id: 42,
    title: "Voidwhisper Enchantress",
    cost: 3,
    power: 2,
    toughness: 3,
    ability: "battlecry_summon_1_1",
    description: "",
  },
  {
    id: 43,
    title: "Whirlwind Tempest",
    cost: 3,
    power: 1,
    toughness: 1,
    ability: "battlecry_summon_2_3",
    description: "",
  },
  {
    id: 44,
    title: "Runeblade Knight",
    cost: 4,
    power: 2,
    toughness: 4,
    ability: "battlecry_summon_2_1",
    description: "",
  },
  {
    id: 45,
    title: "Coral Guardian",
    cost: 4,
    power: 2,
    toughness: 4,
    ability: "battlecry_summon_2_1_1",
    description: "",
  },
  {
    id: 46,
    title: "Emberfury Demon",
    cost: 6,
    power: 6,
    toughness: 5,
    ability: "battlecry_damage_any_target_4",
    description: "",
  },
  {
    id: 47,
    title: "Timeless Chronomancer",
    cost: 1,
    power: 3,
    toughness: 3,
    ability: "taunt",
    description: "",
  },
  {
    id: 48,
    title: "Plaguebringer Alchemist",
    cost: 1,
    power: 1,
    toughness: 2,
    ability: "rale_summon_3_3",
    description: "",
  },
  {
    id: 49,
    title: "Lunar Serenade Siren",
    cost: 1,
    power: 1,
    toughness: 1,
    ability: "rale_summon_1_1",
    description: "",
  },
  {
    id: 50,
    title: "Stormforge Golem",
    cost: 2,
    power: 2,
    toughness: 1,
    ability: "rale_summon_2_1",
    description: "",
  },
  {
    id: 51,
    title: "Radiant Arbiter",
    cost: 2,
    power: 1,
    toughness: 3,
    ability: "rale_summon_4_4",
    description: "",
  },
  {
    id: 52,
    title: "Shadowfire Warlock",
    cost: 2,
    power: 1,
    toughness: 2,
    ability: "rale_summon_1_1",
    description: "",
  },
  {
    id: 53,
    title: "Crystalwind Sprite",
    cost: 2,
    power: 4,
    toughness: 3,
    ability: "battlecry_discard_random_1",
    description: "",
  },
  {
    id: 54,
    title: "Thundering Stampede",
    cost: 3,
    power: 2,
    toughness: 3,
    ability: "rale_summon_2_1",
    description: "",
  },
  {
    id: 55,
    title: "Voodoo Hexer",
    cost: 3,
    power: 3,
    toughness: 1,
    ability: "rale_summon_2_1_1",
    description: "",
  },
  {
    id: 56,
    title: "Soulbound Guardian",
    cost: 4,
    power: 3,
    toughness: 2,
    ability: "rale_summon_3_1_1",
    description: "",
  },
  {
    id: 57,
    title: "Feral Stalker",
    cost: 4,
    power: 2,
    toughness: 3,
    ability: "rale_summon_2_3",
    description: "",
  },
  {
    id: 58,
    title: "Enchanted Harpist",
    cost: 8,
    power: 5,
    toughness: 7,
    ability: "rale_summon_5_7",
    description: "",
  },
  {
    id: 59,
    title: "Arcane Echoes",
    cost: 1,
    power: null,
    toughness: null,
    ability: null,
    description: "",
    spell: [
      {
        destroyMinion: false,
        drawnCards: null,
        powerAdded: null,
        randomMinionsNumber: 3,
        toughnessAdded: -1,
        type: "targetRandomOpponentMinions",
      },
    ],
  },
  {
    id: 60,
    title: "Time Warp",
    cost: 3,
    power: null,
    toughness: null,
    ability: "draw_2",
    description: "",
  },
  {
    id: 61,
    title: "Nature's Wrath",
    cost: 2,
    power: null,
    toughness: null,
    ability: "damage_all_ennemies_1",
    description: "",
  },
  {
    id: 62,
    title: "Flameburst",
    cost: 4,
    power: null,
    toughness: null,
    ability: "damage_any_target_6",
    description: "",
  },
  {
    id: 63,
    title: "Hex of Misfortune",
    cost: 4,
    power: null,
    toughness: null,
    ability: "transform_any_minion_1_1",
    description: "",
  },
  {
    id: 64,
    title: "Frostbite",
    cost: 1,
    power: null,
    toughness: null,
    ability: "damage_any_target_2",
    description: "",
  },
  {
    id: 65,
    title: "Nature's Harmony",
    cost: 1,
    power: null,
    toughness: null,
    ability: "buff_any_target_0_2",
    description: "",
  },
  {
    id: 66,
    title: "Shadowmeld",
    cost: 2,
    power: null,
    toughness: null,
    ability: "damage_ennemy_hero_5",
    description: "",
  },
  {
    id: 67,
    title: "Lightning Surge",
    cost: 2,
    power: null,
    toughness: null,
    ability: "destroy_target_minion_3_or_less",
    description: "",
  },
  {
    id: 68,
    title: "Celestial Blessing",
    cost: 0,
    power: null,
    toughness: null,
    ability: "heal_10_target_minion",
    description: "",
  },
  {
    id: 69,
    title: "Plundering Raid",
    cost: 1,
    power: null,
    toughness: null,
    ability: "damage_any_target_2",
    description: "",
  },
  {
    id: 70,
    title: "Arcane Insight",
    cost: 2,
    power: null,
    toughness: null,
    ability: "buff_ally_minion_3_0",
    description: "",
  },
  {
    id: 71,
    title: "Metaporph",
    cost: 3,
    power: null,
    toughness: null,
    ability: "transform_any_minion_0_1",
    description: "",
  },
  {
    id: 72,
    title: "Astral Projection",
    cost: 3,
    power: null,
    toughness: null,
    ability: "damage_any_target_2_heal_your_hero_2",
    description: "",
  },
  {
    id: 73,
    title: "Vortex of Shadows",
    cost: 3,
    power: null,
    toughness: null,
    ability: "damage_all_3",
    description: "",
  },
  {
    id: 74,
    title: "Fury Strike",
    cost: 3,
    power: null,
    toughness: null,
    ability: "damage_any_minion_4",
    description: "",
  },
  {
    id: 75,
    title: "Mystic Resonance",
    cost: 2,
    power: null,
    toughness: null,
    ability: "damage_any_target_2_summon_1_2",
    description: "",
  },
  {
    id: 76,
    title: "Arcane Barrier",
    cost: 2,
    power: null,
    toughness: null,
    ability: "summon_2_0_2_taunt",
    description: "",
  },
  {
    id: 77,
    title: "Inferno Bolt",
    cost: 2,
    power: null,
    toughness: null,
    ability: "damage_any_target_4",
    description: "",
  },
  {
    id: 78,
    title: "Plague Outbreak",
    cost: 6,
    power: null,
    toughness: null,
    ability: "damage_all_ennemy_minions_3",
    description: "",
  },
  {
    id: 79,
    title: "Cataclysmic Blast",
    cost: 7,
    power: null,
    toughness: null,
    ability: "damage_all_ennemy_minions_5",
    description: "",
  },
  {
    id: 80,
    title: "Solar Flare",
    cost: 10,
    power: null,
    toughness: null,
    ability: "damage_any_target_10",
    description: "",
  },
  {
    id: 81,
    title: "Healing Tide",
    cost: 0,
    power: null,
    toughness: null,
    ability: "heal_all_4",
    description: "",
  },
  {
    id: 82,
    title: "Void Shift",
    cost: 1,
    power: null,
    toughness: null,
    ability: "trade_power_toughness_any_minion",
    description: "",
  },
  {
    id: 83,
    title: "Banishing Bolt",
    cost: 2,
    power: null,
    toughness: null,
    ability: "destroy_target_minion_5_or_more",
    description: "",
  },
  {
    id: 84,
    title: "Eternal Balance",
    cost: 3,
    power: null,
    toughness: null,
    ability: "damage_all_ennemies_2_heal_all_allies_2",
    description: "",
  },
  {
    id: 85,
    title: "Astral Surge",
    cost: 4,
    power: null,
    toughness: null,
    ability: "buff_target_minon_2_4",
    description: "",
  },
  {
    id: 86,
    title: "Dark Sacrifice",
    cost: 1,
    power: null,
    toughness: null,
    ability: "damage_any_target_3_lose_1_life",
    description: "",
  },
  {
    id: 87,
    title: "Ritual of the Guardian",
    cost: 3,
    power: null,
    toughness: null,
    ability: "summon_2_2_3_taunt_lose_6_life",
    description: "",
  },
  {
    id: 88,
    title: "Elemental Fury",
    cost: 3,
    power: null,
    toughness: null,
    ability: "damage_all_ennemies_3_lose_4_life",
    description: "",
  },
  {
    id: 89,
    title: "Swarm of Minions",
    cost: 4,
    power: null,
    toughness: null,
    ability: "summon_4_1_1",
    description: "",
  },
  {
    id: 90,
    title: "Spirit Walk",
    cost: 6,
    power: null,
    toughness: null,
    ability: "buff_all_allies_3_0",
    description: "",
  },
  {
    ability: "destroy_all_minions",
    cost: 8,
    description: "",
    id: 91,
    power: null,
    title: "Apocalypse",
    toughness: null,
  },
];

export async function createCards() {
  const inserts = cards.map((card) => {
    const document = new Cards(card);
    return document.save();
  });

  await Promise.all(inserts);
}