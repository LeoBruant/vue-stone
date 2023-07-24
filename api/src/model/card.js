import { DataTypes, Model } from "sequelize";

export default function (connection) {
  class Card extends Model {}

  Card.init(
    {
      title: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      cardType: {
        type: DataTypes.ENUM("spell", "minion"),
        allowNull: false,
      },
      cost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      power: {
        type: DataTypes.INTEGER,
      },
      toughness: {
        type: DataTypes.INTEGER,
      },
      ability: {
        type: DataTypes.ENUM(
            "battlecry_draw_1",
            "buff_other_1_1",
            "haste",
            "taunt",
            "battlecry_damage_enemy_hero_3",
            "battlecry_heal_any_ally_2",
            "battlecry_buff_any_ally_1_1",
            "battlecry_buff_all_allies_2_0",
            "battlecry_gain_1_1_for_each_ally",
            "battlecry_damage_your_hero_3",
            "battlecry_discard_random_1",
            "battlecry_heal_all_allies_2",
            "battlecry_add_minion_to_hand_1_2",
            "battlecry_buff_all_allies_1_1",
            "battlecry_damage_any_target_1",
            "gain_1_1_for_each_ally",
            "rale_draw_1",
            "battlecry_summon_1_1",
            "battlecry_damage_all_ennemies_1",
            "battlecry_heal_all_allies_1",
            "battlecry_summon_1_3",
            "battlecry_buff_any_ally_0_3",
            "battlecry_summon_2_3",
            "battlecry_summon_2_1",
            "battlecry_summon_2_1_1",
            "battlecry_damage_any_target_4",
            "rale_summon_3_3",
            "rale_summon_1_1",
            "rale_summon_2_1",
            "rale_summon_4_4",
            "rale_summon_2_1_1",
            "rale_summon_3_1_1",
            "rale_summon_2_3",
            "rale_summon_5_7",
            "damage_3_random_ennemies_1",
            "draw_2",
            "damage_all_ennemies_1",
            "damage_any_target_6",
            "transform_any_minion_1_1",
            "damage_any_target_2",
            "buff_any_target_0_2",
            "damage_ennemy_hero_5",
            "destroy_target_minion_3_or_less",
            "heal_10_target_minion",
            "buff_ally_minion_3_0",
            "transform_any_minion_0_1",
            "damage_any_target_2_heal_your_hero_2",
            "damage_all_3",
            "damage_any_minion_4",
            "damage_any_target_2_summon_1_2",
            "summon_2_0_2_taunt",
            "damage_any_target_4",
            "damage_all_ennemy_minions_3",
            "damage_all_ennemy_minions_5",
            "damage_any_target_10",
            "heal_all_4",
            "trade_power_toughness_any_minion",
            "destroy_target_minion_5_or_more",
            "damage_all_ennemies_2_heal_all_allies_2",
            "buff_target_minon_2_4",
            "damage_any_target_3_lose_1_life",
            "summon_2_2_3_taunt_lose_6_life",
            "damage_all_ennemies_3_lose_4_life",
            "summon_4_1_1",
            "buff_all_allies_3_0",
            "destroy_all_minions"
  ),
      },
      image: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize: connection,
      tableName: "cards",
    },
  );

  return Card;
}
