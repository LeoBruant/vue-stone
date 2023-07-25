import db from "../model.mjs";

export async function createCards() {
  const cards = [
    {
      id: 1,
      title: "Flametongue Shaman",
      cardType: "minion",
      cost: 1,
      power: 2,
      toughness: 1,
      ability: null,
      image: "",
      description: "",
    },
    {
      id: 2,
      title: "Frostweaver",
      cardType: "minion",
      cost: 2,
      power: 2,
      toughness: 3,
      ability: null,
      image: "",
      description: "",
    },
    {
      id: 3,
      title: "Ironhide Mauler",
      cardType: "minion",
      cost: 1,
      power: 1,
      toughness: 1,
      ability: "battlecry_draw_1",
      image: "",
      description: "",
    },
    {
      id: 4,
      title: "Arcane Trickster",
      cardType: "minion",
      cost: 2,
      power: 3,
      toughness: 2,
      ability: null,
      image: "",
      description: "",
    },
    {
      id: 5,
      title: "Bloodfang Assassin",
      cardType: "minion",
      cost: 3,
      power: 2,
      toughness: 3,
      ability: "battlecry_buff_all_allies_1_1",
      image: "",
      description: "",
    },
    {
      id: 6,
      title: "Stormrider",
      cardType: "minion",
      cost: 3,
      power: 1,
      toughness: 3,
      ability: "haste",
      image: "",
      description: "",
    },
    {
      id: 7,
      title: "Thundering Hooves",
      cardType: "minion",
      cost: 4,
      power: 2,
      toughness: 7,
      ability: null,
      image: "",
      description: "",
    },
    {
      id: 8,
      title: "Crystalweaver",
      cardType: "minion",
      cost: 4,
      power: 3,
      toughness: 5,
      ability: "taunt",
      image: "",
      description: "",
    },
    {
      id: 9,
      title: "Plaguebearer",
      cardType: "minion",
      cost: 5,
      power: 4,
      toughness: 4,
      ability: "battlecry_damage_enemy_hero_3",
      image: "",
      description: "",
    },
    {
      id: 10,
      title: "Solaris Sentinel",
      cardType: "minion",
      cost: 6,
      power: 6,
      toughness: 7,
      ability: null,
      image: "",
      description: "",
    },
    {
      id: 11,
      title: "Venomfang Serpent",
      cardType: "minion",
      cost: 1,
      power: 1,
      toughness: 1,
      ability: "battlecry_damage_any_target_1",
      image: "",
      description: "",
    },
    {
      id: 12,
      title: "Windwhisper Druid",
      cardType: "minion",
      cost: 1,
      power: 1,
      toughness: 3,
      ability: "battlecry_heal_any_ally_2",
      image: "",
      description: "",
    },
    {
      id: 13,
      title: "Emberstorm Phoenix",
      cardType: "minion",
      cost: 1,
      power: 2,
      toughness: 1,
      ability: "battlecry_heal_any_ally_2",
      image: "",
      description: "",
    },
    {
      id: 14,
      title: "Frostbite Yeti",
      cardType: "minion",
      cost: 2,
      power: 2,
      toughness: 2,
      ability: "taunt",
      image: "",
      description: "",
    },
    {
      id: 15,
      title: "Starforged Artificer",
      cardType: "minion",
      cost: 2,
      power: 3,
      toughness: 2,
      ability: "battlecry_buff_any_ally_1_1",
      image: "",
      description: "",
    },
    {
      id: 16,
      title: "Cursed Banshee",
      cardType: "minion",
      cost: 3,
      power: 1,
      toughness: 4,
      ability: "taunt",
      image: "",
      description: "",
    },
    {
      id: 17,
      title: "Thunderclap Brute",
      cardType: "minion",
      cost: 4,
      power: 4,
      toughness: 5,
      ability: null,
      image: "",
      description: "",
    },
    {
      id: 18,
      title: "Astral Diviner",
      cardType: "minion",
      cost: 4,
      power: 2,
      toughness: 8,
      ability: null,
      image: "",
      description: "",
    },
    {
      id: 19,
      title: "Plundering Corsair",
      cardType: "minion",
      cost: 7,
      power: 9,
      toughness: 5,
      ability: null,
      image: "",
      description: "",
    },
    {
      id: 20,
      title: "Lunar Guardian",
      cardType: "minion",
      cost: 1,
      power: 1,
      toughness: 1,
      ability: "haste",
      image: "",
      description: "",
    },
    {
      id: 21,
      title: "Flameheart Djinn",
      cardType: "minion",
      cost: 2,
      power: 0,
      toughness: 3,
      ability: "battlecry_buff_all_allies_2_0",
      image: "",
      description: "",
    },
    {
      id: 22,
      title: "Stormcaller Shaman",
      cardType: "minion",
      cost: 5,
      power: 4,
      toughness: 4,
      ability: "gain_1_1_for_each_ally",
      image: "",
      description: "",
    },
    {
      id: 23,
      title: "Crystaline Construct",
      cardType: "minion",
      cost: 5,
      power: 5,
      toughness: 4,
      ability: "taunt",
      image: "",
      description: "",
    },
    {
      id: 24,
      title: "Venomous Arachnid",
      cardType: "minion",
      cost: 6,
      power: 5,
      toughness: 2,
      ability: "haste",
      image: "",
      description: "",
    },
    {
      id: 25,
      title: "Shadowmancer",
      cardType: "minion",
      cost: 1,
      power: 1,
      toughness: 3,
      ability: "taunt",
      image: "",
      description: "",
    },
    {
      id: 26,
      title: "Whispering Banshee",
      cardType: "minion",
      cost: 1,
      power: 3,
      toughness: 2,
      ability: "battlecry_damage_your_hero_3",
      image: "",
      description: "",
    },
    {
      id: 27,
      title: "Ironbark Colossus",
      cardType: "minion",
      cost: 2,
      power: 4,
      toughness: 3,
      ability: "battlecry_discard_random_1",
      image: "",
      description: "",
    },
    {
      id: 28,
      title: "Timebender Mage",
      cardType: "minion",
      cost: 4,
      power: 5,
      toughness: 5,
      ability: null,
      image: "",
      description: "",
    },
    {
      id: 29,
      title: "Soulstealer Necromancer",
      cardType: "minion",
      cost: 5,
      power: 4,
      toughness: 5,
      ability: "battlecry_heal_all_allies_2",
      image: "",
      description: "",
    },
    {
      id: 30,
      title: "Shimmerwing Faerie",
      cardType: "minion",
      cost: 7,
      power: 7,
      toughness: 7,
      ability: null,
      image: "",
      description: "",
    },
    {
      id: 31,
      title: "Doomblade Assassin",
      cardType: "minion",
      cost: 1,
      power: 1,
      toughness: 2,
      ability: "battlecry_add_minion_to_hand_1_2",
      image: "",
      description: "",
    },
    {
      id: 32,
      title: "Celestial Herald",
      cardType: "minion",
      cost: 2,
      power: 2,
      toughness: 1,
      ability: "rale_draw_1",
      image: "",
      description: "",
    },
    {
      id: 33,
      title: "Thornheart Druid",
      cardType: "minion",
      cost: 2,
      power: 2,
      toughness: 1,
      ability: "battlecry_summon_1_1",
      image: "",
      description: "",
    },
    {
      id: 34,
      title: "Astral Serpent",
      cardType: "minion",
      cost: 2,
      power: 3,
      toughness: 2,
      ability: "battlecry_damage_all_ennemies_1",
      image: "",
      description: "",
    },
    {
      id: 35,
      title: "Frostbite Archer",
      cardType: "minion",
      cost: 1,
      power: 1,
      toughness: 3,
      ability: "battlecry_heal_all_allies_1",
      image: "",
      description: "",
    },
    {
      id: 36,
      title: "Magma Elemental",
      cardType: "minion",
      cost: 1,
      power: 0,
      toughness: 4,
      ability: "taunt",
      image: "",
      description: "",
    },
    {
      id: 37,
      title: "Nightfall Shadowcaster",
      cardType: "minion",
      cost: 2,
      power: 2,
      toughness: 4,
      ability: "taunt",
      image: "",
      description: "",
    },
    {
      id: 38,
      title: "Thunderstorm Titan",
      cardType: "minion",
      cost: 3,
      power: 1,
      toughness: 3,
      ability: "battlecry_summon_1_3",
      image: "",
      description: "",
    },
    {
      id: 39,
      title: "Arcane Illusionist",
      cardType: "minion",
      cost: 3,
      power: 3,
      toughness: 4,
      ability: "battlecry_buff_any_ally_0_3",
      image: "",
      description: "",
    },
    {
      id: 40,
      title: "Bloodmoon Berserker",
      cardType: "minion",
      cost: 4,
      power: 1,
      toughness: 7,
      ability: "taunt",
      image: "",
      description: "",
    },
    {
      id: 41,
      title: "Solarflare Phoenix",
      cardType: "minion",
      cost: 6,
      power: 6,
      toughness: 6,
      ability: "battlecry_buff_any_ally_0_3",
      image: "",
      description: "",
    },
    {
      id: 42,
      title: "Voidwhisper Enchantress",
      cardType: "minion",
      cost: 3,
      power: 2,
      toughness: 3,
      ability: "battlecry_summon_1_1",
      image: "",
      description: "",
    },
    {
      id: 43,
      title: "Whirlwind Tempest",
      cardType: "minion",
      cost: 3,
      power: 1,
      toughness: 1,
      ability: "battlecry_summon_2_3",
      image: "",
      description: "",
    },
    {
      id: 44,
      title: "Runeblade Knight",
      cardType: "minion",
      cost: 4,
      power: 2,
      toughness: 4,
      ability: "battlecry_summon_2_1",
      image: "",
      description: "",
    },
    {
      id: 45,
      title: "Coral Guardian",
      cardType: "minion",
      cost: 4,
      power: 2,
      toughness: 4,
      ability: "battlecry_summon_2_1_1",
      image: "",
      description: "",
    },
    {
      id: 46,
      title: "Emberfury Demon",
      cardType: "minion",
      cost: 6,
      power: 6,
      toughness: 5,
      ability: "battlecry_damage_any_target_4",
      image: "",
      description: "",
    },
    {
      id: 47,
      title: "Timeless Chronomancer",
      cardType: "minion",
      cost: 1,
      power: 3,
      toughness: 3,
      ability: "taunt",
      image: "",
      description: "",
    },
    {
      id: 48,
      title: "Plaguebringer Alchemist",
      cardType: "minion",
      cost: 1,
      power: 1,
      toughness: 2,
      ability: "rale_summon_3_3",
      image: "",
      description: "",
    },
    {
      id: 49,
      title: "Lunar Serenade Siren",
      cardType: "minion",
      cost: 1,
      power: 1,
      toughness: 1,
      ability: "rale_summon_1_1",
      image: "",
      description: "",
    },
    {
      id: 50,
      title: "Stormforge Golem",
      cardType: "minion",
      cost: 2,
      power: 2,
      toughness: 1,
      ability: "rale_summon_2_1",
      image: "",
      description: "",
    },
    {
      id: 51,
      title: "Radiant Arbiter",
      cardType: "minion",
      cost: 2,
      power: 1,
      toughness: 3,
      ability: "rale_summon_4_4",
      image: "",
      description: "",
    },
    {
      id: 52,
      title: "Shadowfire Warlock",
      cardType: "minion",
      cost: 2,
      power: 1,
      toughness: 2,
      ability: "rale_summon_1_1",
      image: "",
      description: "",
    },
    {
      id: 53,
      title: "Crystalwind Sprite",
      cardType: "minion",
      cost: 2,
      power: 4,
      toughness: 3,
      ability: "battlecry_discard_random_1",
      image: "",
      description: "",
    },
    {
      id: 54,
      title: "Thundering Stampede",
      cardType: "minion",
      cost: 3,
      power: 2,
      toughness: 3,
      ability: "rale_summon_2_1",
      image: "",
      description: "",
    },
    {
      id: 55,
      title: "Voodoo Hexer",
      cardType: "minion",
      cost: 3,
      power: 3,
      toughness: 1,
      ability: "rale_summon_2_1_1",
      image: "",
      description: "",
    },
    {
      id: 56,
      title: "Soulbound Guardian",
      cardType: "minion",
      cost: 4,
      power: 3,
      toughness: 2,
      ability: "rale_summon_3_1_1",
      image: "",
      description: "",
    },
    {
      id: 57,
      title: "Feral Stalker",
      cardType: "minion",
      cost: 4,
      power: 2,
      toughness: 3,
      ability: "rale_summon_2_3",
      image: "",
      description: "",
    },
    {
      id: 58,
      title: "Enchanted Harpist",
      cardType: "minion",
      cost: 8,
      power: 5,
      toughness: 7,
      ability: "rale_summon_5_7",
      image: "",
      description: "",
    },
    {
      id: 59,
      title: "Arcane Echoes",
      cardType: "spell",
      cost: 1,
      power: null,
      toughness: null,
      ability: "damage_3_random_ennemies_1",
      image: "",
      description: "",
    },
    {
      id: 60,
      title: "Time Warp",
      cardType: "spell",
      cost: 3,
      power: null,
      toughness: null,
      ability: "draw_2",
      image: "",
      description: "",
    },
    {
      id: 61,
      title: "Nature's Wrath",
      cardType: "spell",
      cost: 2,
      power: null,
      toughness: null,
      ability: "damage_all_ennemies_1",
      image: "",
      description: "",
    },
    {
      id: 62,
      title: "Flameburst",
      cardType: "spell",
      cost: 4,
      power: null,
      toughness: null,
      ability: "damage_any_target_6",
      image: "",
      description: "",
    },
    {
      id: 63,
      title: "Hex of Misfortune",
      cardType: "spell",
      cost: 4,
      power: null,
      toughness: null,
      ability: "transform_any_minion_1_1",
      image: "",
      description: "",
    },
    {
      id: 64,
      title: "Frostbite",
      cardType: "spell",
      cost: 1,
      power: null,
      toughness: null,
      ability: "damage_any_target_2",
      image: "",
      description: "",
    },
    {
      id: 65,
      title: "Nature's Harmony",
      cardType: "spell",
      cost: 1,
      power: null,
      toughness: null,
      ability: "buff_any_target_0_2",
      image: "",
      description: "",
    },
    {
      id: 66,
      title: "Shadowmeld",
      cardType: "spell",
      cost: 2,
      power: null,
      toughness: null,
      ability: "damage_ennemy_hero_5",
      image: "",
      description: "",
    },
    {
      id: 67,
      title: "Lightning Surge",
      cardType: "spell",
      cost: 2,
      power: null,
      toughness: null,
      ability: "destroy_target_minion_3_or_less",
      image: "",
      description: "",
    },
    {
      id: 68,
      title: "Celestial Blessing",
      cardType: "spell",
      cost: 0,
      power: null,
      toughness: null,
      ability: "heal_10_target_minion",
      image: "",
      description: "",
    },
    {
      id: 69,
      title: "Plundering Raid",
      cardType: "spell",
      cost: 1,
      power: null,
      toughness: null,
      ability: "damage_any_target_2",
      image: "",
      description: "",
    },
    {
      id: 70,
      title: "Arcane Insight",
      cardType: "spell",
      cost: 2,
      power: null,
      toughness: null,
      ability: "buff_ally_minion_3_0",
      image: "",
      description: "",
    },
    {
      id: 71,
      title: "Metaporph",
      cardType: "spell",
      cost: 3,
      power: null,
      toughness: null,
      ability: "transform_any_minion_0_1",
      image: "",
      description: "",
    },
    {
      id: 72,
      title: "Astral Projection",
      cardType: "spell",
      cost: 3,
      power: null,
      toughness: null,
      ability: "damage_any_target_2_heal_your_hero_2",
      image: "",
      description: "",
    },
    {
      id: 73,
      title: "Vortex of Shadows",
      cardType: "spell",
      cost: 3,
      power: null,
      toughness: null,
      ability: "damage_all_3",
      image: "",
      description: "",
    },
    {
      id: 74,
      title: "Fury Strike",
      cardType: "spell",
      cost: 3,
      power: null,
      toughness: null,
      ability: "damage_any_minion_4",
      image: "",
      description: "",
    },
    {
      id: 75,
      title: "Mystic Resonance",
      cardType: "spell",
      cost: 2,
      power: null,
      toughness: null,
      ability: "damage_any_target_2_summon_1_2",
      image: "",
      description: "",
    },
    {
      id: 76,
      title: "Arcane Barrier",
      cardType: "spell",
      cost: 2,
      power: null,
      toughness: null,
      ability: "summon_2_0_2_taunt",
      image: "",
      description: "",
    },
    {
      id: 77,
      title: "Inferno Bolt",
      cardType: "spell",
      cost: 2,
      power: null,
      toughness: null,
      ability: "damage_any_target_4",
      image: "",
      description: "",
    },
    {
      id: 78,
      title: "Plague Outbreak",
      cardType: "spell",
      cost: 6,
      power: null,
      toughness: null,
      ability: "damage_all_ennemy_minions_3",
      image: "",
      description: "",
    },
    {
      id: 79,
      title: "Cataclysmic Blast",
      cardType: "spell",
      cost: 7,
      power: null,
      toughness: null,
      ability: "damage_all_ennemy_minions_5",
      image: "",
      description: "",
    },
    {
      id: 80,
      title: "Solar Flare",
      cardType: "spell",
      cost: 10,
      power: null,
      toughness: null,
      ability: "damage_any_target_10",
      image: "",
      description: "",
    },
    {
      id: 81,
      title: "Healing Tide",
      cardType: "spell",
      cost: 0,
      power: null,
      toughness: null,
      ability: "heal_all_4",
      image: "",
      description: "",
    },
    {
      id: 82,
      title: "Void Shift",
      cardType: "spell",
      cost: 1,
      power: null,
      toughness: null,
      ability: "trade_power_toughness_any_minion",
      image: "",
      description: "",
    },
    {
      id: 83,
      title: "Banishing Bolt",
      cardType: "spell",
      cost: 2,
      power: null,
      toughness: null,
      ability: "destroy_target_minion_5_or_more",
      image: "",
      description: "",
    },
    {
      id: 84,
      title: "Eternal Balance",
      cardType: "spell",
      cost: 3,
      power: null,
      toughness: null,
      ability: "damage_all_ennemies_2_heal_all_allies_2",
      image: "",
      description: "",
    },
    {
      id: 85,
      title: "Astral Surge",
      cardType: "spell",
      cost: 4,
      power: null,
      toughness: null,
      ability: "buff_target_minon_2_4",
      image: "",
      description: "",
    },
    {
      id: 86,
      title: "Dark Sacrifice",
      cardType: "spell",
      cost: 1,
      power: null,
      toughness: null,
      ability: "damage_any_target_3_lose_1_life",
      image: "",
      description: "",
    },
    {
      id: 87,
      title: "Ritual of the Guardian",
      cardType: "spell",
      cost: 3,
      power: null,
      toughness: null,
      ability: "summon_2_2_3_taunt_lose_6_life",
      image: "",
      description: "",
    },
    {
      id: 88,
      title: "Elemental Fury",
      cardType: "spell",
      cost: 3,
      power: null,
      toughness: null,
      ability: "damage_all_ennemies_3_lose_4_life",
      image: "",
      description: "",
    },
    {
      id: 89,
      title: "Swarm of Minions",
      cardType: "spell",
      cost: 4,
      power: null,
      toughness: null,
      ability: "summon_4_1_1",
      image: "",
      description: "",
    },
    {
      id: 90,
      title: "Spirit Walk",
      cardType: "spell",
      cost: 6,
      power: null,
      toughness: null,
      ability: "buff_all_allies_3_0",
      image: "",
      description: "",
    },
    {
      id: 91,
      title: "Apocalypse",
      cardType: "spell",
      cost: 8,
      power: null,
      toughness: null,
      ability: "destroy_all_minions",
      image: "",
      description: "",
    },
  ];

  const inserts = cards.map((card) => db.Card.create(card));

  await Promise.all(inserts);
}
