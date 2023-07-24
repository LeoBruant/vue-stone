import db from "./model.mjs";

export async function createCards() {
  await db.Card.create({
    title: "Flametongue Shaman",
    cardType: "minion",
    cost: 1,
    power: 2,
    toughness: 1,
    ability: null,
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Frostweaver",
    cardType: "minion",
    cost: 2,
    power: 2,
    toughness: 3,
    ability: null,
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Ironhide Mauler",
    cardType: "minion",
    cost: 1,
    power: 1,
    toughness: 1,
    ability: "battlecry_draw_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Arcane Trickster",
    cardType: "minion",
    cost: 2,
    power: 3,
    toughness: 2,
    ability: null,
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Bloodfang Assassin",
    cardType: "minion",
    cost: 3,
    power: 2,
    toughness: 3,
    ability: "battlecry_buff_all_allies_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Stormrider",
    cardType: "minion",
    cost: 3,
    power: 1,
    toughness: 3,
    ability: "haste",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Thundering Hooves",
    cardType: "minion",
    cost: 4,
    power: 2,
    toughness: 7,
    ability: null,
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Crystalweaver",
    cardType: "minion",
    cost: 4,
    power: 3,
    toughness: 5,
    ability: "taunt",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Plaguebearer",
    cardType: "minion",
    cost: 5,
    power: 4,
    toughness: 4,
    ability: "battlecry_damage_enemy_hero_3",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Solaris Sentinel",
    cardType: "minion",
    cost: 6,
    power: 6,
    toughness: 7,
    ability: null,
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Venomfang Serpent",
    cardType: "minion",
    cost: 1,
    power: 1,
    toughness: 1,
    ability: "battlecry_damage_any_target_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Windwhisper Druid",
    cardType: "minion",
    cost: 1,
    power: 1,
    toughness: 3,
    ability: "battlecry_heal_any_ally_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Emberstorm Phoenix",
    cardType: "minion",
    cost: 1,
    power: 2,
    toughness: 1,
    ability: "battlecry_heal_any_ally_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Frostbite Yeti",
    cardType: "minion",
    cost: 2,
    power: 2,
    toughness: 2,
    ability: "taunt",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Starforged Artificer",
    cardType: "minion",
    cost: 2,
    power: 3,
    toughness: 2,
    ability: "battlecry_buff_any_ally_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Cursed Banshee",
    cardType: "minion",
    cost: 3,
    power: 1,
    toughness: 4,
    ability: "taunt",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Thunderclap Brute",
    cardType: "minion",
    cost: 4,
    power: 4,
    toughness: 5,
    ability: null,
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Astral Diviner",
    cardType: "minion",
    cost: 4,
    power: 2,
    toughness: 8,
    ability: null,
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Plundering Corsair",
    cardType: "minion",
    cost: 7,
    power: 9,
    toughness: 5,
    ability: null,
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Lunar Guardian",
    cardType: "minion",
    cost: 1,
    power: 1,
    toughness: 1,
    ability: "haste",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Flameheart Djinn",
    cardType: "minion",
    cost: 2,
    power: 0,
    toughness: 3,
    ability: "battlecry_buff_all_allies_2_0",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Stormcaller Shaman",
    cardType: "minion",
    cost: 5,
    power: 4,
    toughness: 4,
    ability: "gain_1_1_for_each_ally",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Crystaline Construct",
    cardType: "minion",
    cost: 5,
    power: 5,
    toughness: 4,
    ability: "taunt",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Venomous Arachnid",
    cardType: "minion",
    cost: 6,
    power: 5,
    toughness: 2,
    ability: "haste",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Shadowmancer",
    cardType: "minion",
    cost: 1,
    power: 1,
    toughness: 3,
    ability: "taunt",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Whispering Banshee",
    cardType: "minion",
    cost: 1,
    power: 3,
    toughness: 2,
    ability: "battlecry_damage_your_hero_3",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Ironbark Colossus",
    cardType: "minion",
    cost: 2,
    power: 4,
    toughness: 3,
    ability: "battlecry_discard_random_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Timebender Mage",
    cardType: "minion",
    cost: 4,
    power: 5,
    toughness: 5,
    ability: null,
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Soulstealer Necromancer",
    cardType: "minion",
    cost: 5,
    power: 4,
    toughness: 5,
    ability: "battlecry_heal_all_allies_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Shimmerwing Faerie",
    cardType: "minion",
    cost: 7,
    power: 7,
    toughness: 7,
    ability: null,
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Doomblade Assassin",
    cardType: "minion",
    cost: 1,
    power: 1,
    toughness: 2,
    ability: "battlecry_add_minion_to_hand_1_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Celestial Herald",
    cardType: "minion",
    cost: 2,
    power: 2,
    toughness: 1,
    ability: "rale_draw_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Thornheart Druid",
    cardType: "minion",
    cost: 2,
    power: 2,
    toughness: 1,
    ability: "battlecry_summon_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Astral Serpent",
    cardType: "minion",
    cost: 2,
    power: 3,
    toughness: 2,
    ability: "battlecry_damage_all_ennemies_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Frostbite Archer",
    cardType: "minion",
    cost: 1,
    power: 1,
    toughness: 3,
    ability: "battlecry_heal_all_allies_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Magma Elemental",
    cardType: "minion",
    cost: 1,
    power: 0,
    toughness: 4,
    ability: "taunt",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Nightfall Shadowcaster",
    cardType: "minion",
    cost: 2,
    power: 2,
    toughness: 4,
    ability: "taunt",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Thunderstorm Titan",
    cardType: "minion",
    cost: 3,
    power: 1,
    toughness: 3,
    ability: "battlecry_summon_1_3",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Arcane Illusionist",
    cardType: "minion",
    cost: 3,
    power: 3,
    toughness: 4,
    ability: "battlecry_buff_any_ally_0_3",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Bloodmoon Berserker",
    cardType: "minion",
    cost: 4,
    power: 1,
    toughness: 7,
    ability: "taunt",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Solarflare Phoenix",
    cardType: "minion",
    cost: 6,
    power: 6,
    toughness: 6,
    ability: "battlecry_buff_any_ally_0_3",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Voidwhisper Enchantress",
    cardType: "minion",
    cost: 3,
    power: 2,
    toughness: 3,
    ability: "battlecry_summon_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Whirlwind Tempest",
    cardType: "minion",
    cost: 3,
    power: 1,
    toughness: 1,
    ability: "battlecry_summon_2_3",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Runeblade Knight",
    cardType: "minion",
    cost: 4,
    power: 2,
    toughness: 4,
    ability: "battlecry_summon_2_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Coral Guardian",
    cardType: "minion",
    cost: 4,
    power: 2,
    toughness: 4,
    ability: "battlecry_summon_2_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Emberfury Demon",
    cardType: "minion",
    cost: 6,
    power: 6,
    toughness: 5,
    ability: "battlecry_damage_any_target_4",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Timeless Chronomancer",
    cardType: "minion",
    cost: 1,
    power: 3,
    toughness: 3,
    ability: "taunt",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Plaguebringer Alchemist",
    cardType: "minion",
    cost: 1,
    power: 1,
    toughness: 2,
    ability: "rale_summon_3_3",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Lunar Serenade Siren",
    cardType: "minion",
    cost: 1,
    power: 1,
    toughness: 1,
    ability: "rale_summon_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Stormforge Golem",
    cardType: "minion",
    cost: 2,
    power: 2,
    toughness: 1,
    ability: "rale_summon_2_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Radiant Arbiter",
    cardType: "minion",
    cost: 2,
    power: 1,
    toughness: 3,
    ability: "rale_summon_4_4",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Shadowfire Warlock",
    cardType: "minion",
    cost: 2,
    power: 1,
    toughness: 2,
    ability: "rale_summon_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Crystalwind Sprite",
    cardType: "minion",
    cost: 2,
    power: 4,
    toughness: 3,
    ability: "battlecry_discard_random_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Thundering Stampede",
    cardType: "minion",
    cost: 3,
    power: 2,
    toughness: 3,
    ability: "rale_summon_2_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Voodoo Hexer",
    cardType: "minion",
    cost: 3,
    power: 3,
    toughness: 1,
    ability: "rale_summon_2_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Soulbound Guardian",
    cardType: "minion",
    cost: 4,
    power: 3,
    toughness: 2,
    ability: "rale_summon_3_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Feral Stalker",
    cardType: "minion",
    cost: 4,
    power: 2,
    toughness: 3,
    ability: "rale_summon_2_3",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Enchanted Harpist",
    cardType: "minion",
    cost: 8,
    power: 5,
    toughness: 7,
    ability: "rale_summon_5_7",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Arcane Echoes",
    cardType: "spell",
    cost: 1,
    power: null,
    toughness: null,
    ability: "damage_3_random_ennemies_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Time Warp",
    cardType: "spell",
    cost: 3,
    power: null,
    toughness: null,
    ability: "draw_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Nature's Wrath",
    cardType: "spell",
    cost: 2,
    power: null,
    toughness: null,
    ability: "damage_all_ennemies_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Flameburst",
    cardType: "spell",
    cost: 4,
    power: null,
    toughness: null,
    ability: "damage_any_target_6",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Hex of Misfortune",
    cardType: "spell",
    cost: 4,
    power: null,
    toughness: null,
    ability: "transform_any_minion_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Frostbite",
    cardType: "spell",
    cost: 1,
    power: null,
    toughness: null,
    ability: "damage_any_target_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Nature's Harmony",
    cardType: "spell",
    cost: 1,
    power: null,
    toughness: null,
    ability: "buff_any_target_0_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Shadowmeld",
    cardType: "spell",
    cost: 2,
    power: null,
    toughness: null,
    ability: "damage_ennemy_hero_5",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Lightning Surge",
    cardType: "spell",
    cost: 2,
    power: null,
    toughness: null,
    ability: "destroy_target_minion_3_or_less",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Celestial Blessing",
    cardType: "spell",
    cost: 0,
    power: null,
    toughness: null,
    ability: "heal_10_target_minion",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Plundering Raid",
    cardType: "spell",
    cost: 1,
    power: null,
    toughness: null,
    ability: "damage_any_target_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Arcane Insight",
    cardType: "spell",
    cost: 2,
    power: null,
    toughness: null,
    ability: "buff_ally_minion_3_0",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Metaporph",
    cardType: "spell",
    cost: 3,
    power: null,
    toughness: null,
    ability: "transform_any_minion_0_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Astral Projection",
    cardType: "spell",
    cost: 3,
    power: null,
    toughness: null,
    ability: "damage_any_target_2_heal_your_hero_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Vortex of Shadows",
    cardType: "spell",
    cost: 3,
    power: null,
    toughness: null,
    ability: "damage_all_3",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Fury Strike",
    cardType: "spell",
    cost: 3,
    power: null,
    toughness: null,
    ability: "damage_any_minion_4",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Mystic Resonance",
    cardType: "spell",
    cost: 2,
    power: null,
    toughness: null,
    ability: "damage_any_target_2_summon_1_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Arcane Barrier",
    cardType: "spell",
    cost: 2,
    power: null,
    toughness: null,
    ability: "summon_2_0_2_taunt",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Inferno Bolt",
    cardType: "spell",
    cost: 2,
    power: null,
    toughness: null,
    ability: "damage_any_target_4",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Plague Outbreak",
    cardType: "spell",
    cost: 6,
    power: null,
    toughness: null,
    ability: "damage_all_ennemy_minions_3",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Cataclysmic Blast",
    cardType: "spell",
    cost: 7,
    power: null,
    toughness: null,
    ability: "damage_all_ennemy_minions_5",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Solar Flare",
    cardType: "spell",
    cost: 10,
    power: null,
    toughness: null,
    ability: "damage_any_target_10",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Healing Tide",
    cardType: "spell",
    cost: 0,
    power: null,
    toughness: null,
    ability: "heal_all_4",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Void Shift",
    cardType: "spell",
    cost: 1,
    power: null,
    toughness: null,
    ability: "trade_power_toughness_any_minion",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Banishing Bolt",
    cardType: "spell",
    cost: 2,
    power: null,
    toughness: null,
    ability: "destroy_target_minion_5_or_more",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Eternal Balance",
    cardType: "spell",
    cost: 3,
    power: null,
    toughness: null,
    ability: "damage_all_ennemies_2_heal_all_allies_2",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Astral Surge",
    cardType: "spell",
    cost: 4,
    power: null,
    toughness: null,
    ability: "buff_target_minon_2_4",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Dark Sacrifice",
    cardType: "spell",
    cost: 1,
    power: null,
    toughness: null,
    ability: "damage_any_target_3_lose_1_life",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Ritual of the Guardian",
    cardType: "spell",
    cost: 3,
    power: null,
    toughness: null,
    ability: "summon_2_2_3_taunt_lose_6_life",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Elemental Fury",
    cardType: "spell",
    cost: 3,
    power: null,
    toughness: null,
    ability: "damage_all_ennemies_3_lose_4_life",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Swarm of Minions",
    cardType: "spell",
    cost: 4,
    power: null,
    toughness: null,
    ability: "summon_4_1_1",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Spirit Walk",
    cardType: "spell",
    cost: 6,
    power: null,
    toughness: null,
    ability: "buff_all_allies_3_0",
    image: "",
    description: "",
  });
  await db.Card.create({
    title: "Apocalypse",
    cardType: "spell",
    cost: 8,
    power: null,
    toughness: null,
    ability: "destroy_all_minions",
    image: "",
    description: "",
  });
}
