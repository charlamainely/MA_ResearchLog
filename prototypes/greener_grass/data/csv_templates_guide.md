# CSV Templates Guide

These templates are a clean content format for the board and card copy.

Files:
- `space_data_template.csv`
- `life_cards_template.csv`
- `era_cards_template.csv`
- `occupations_template.csv`
- `hobbies_template.csv`

Recommended workflow:
- Keep these five tables as five tabs in one spreadsheet.
- Export each tab to CSV when you are ready.
- Keep Vietnamese and English in separate columns.
- Keep mechanics in machine-readable columns, not in prose.

## 1. Space file

File:
- `space_data_template.csv`

Required columns:
- `space_id`
- `space_type`
- `stage`
- `next_default`
- `title_vi`
- `title_en`
- `question_vi`
- `question_en`
- `desc_war_time_vi`
- `desc_war_time_en`
- `desc_subsidy_vi`
- `desc_subsidy_en`
- `desc_reform_vi`
- `desc_reform_en`
- `desc_digital_native_vi`
- `desc_digital_native_en`
- `effects_common`
- `effects_war_time`
- `effects_subsidy`
- `effects_reform`
- `effects_digital_native`

Checkpoint-only columns:
- `option_1_label_vi`
- `option_1_label_en`
- `option_1_next`
- `option_1_effects`
- `option_2_label_vi`
- `option_2_label_en`
- `option_2_next`
- `option_2_effects`
- `option_3_label_vi`
- `option_3_label_en`
- `option_3_next`
- `option_3_effects`

Optional helper column:
- `notes`

Recommended `space_type` values:
- `start`
- `stat`
- `life_card`
- `era_card`
- `checkpoint`
- `optional_choice`
- `occupation_choice`
- `hobby_choice`
- `transition`
- `finish`

How to use the direction columns:
- `next_default` is for normal linear movement.
- For checkpoints, leave `next_default` blank and use `option_1_next`, `option_2_next`, `option_3_next`.
- If a checkpoint has only 2 options, leave all `option_3_*` cells blank.
- For `occupation_choice` spaces, add an `occupation_pool` helper column later if you want the runtime to filter occupations by pool.
- For `hobby_choice` spaces, add a `hobby_pool` helper column later if you want the runtime to filter hobbies by pool.

## 2. Card files

Files:
- `life_cards_template.csv`
- `era_cards_template.csv`

Required columns:
- `card_id`
- `theme`
- `title_vi`
- `title_en`
- `description_vi`
- `description_en`
- `question_vi`
- `question_en`
- `effects_common`
- `effects_war_time`
- `effects_subsidy`
- `effects_reform`
- `effects_digital_native`

Optional choice columns for life cards:
- `option_1_label_vi`
- `option_1_label_en`
- `option_1_effects`
- `option_2_label_vi`
- `option_2_label_en`
- `option_2_effects`
- `option_3_label_vi`
- `option_3_label_en`
- `option_3_effects`

Optional helper column:
- `notes`

Use the same generation keys everywhere:
- `war_time`
- `subsidy`
- `reform`
- `digital_native`

How to use optional life-card choices:
- Leave `effects_common` blank if the card should not apply anything automatically.
- Fill `option_1_*`, `option_2_*`, and optionally `option_3_*` when the player should choose how to respond.
- Each option only needs a label and effects; life cards do not need `next` columns because they do not route the player to another space.

Example:

```text
title_vi = Nhặt được ngoài đường
title_en = Found a Stray
option_1_label_vi = Mang về nhà
option_1_label_en = Bring them home
option_1_effects = set_children:has_pet;money:-2;happiness:+4
option_2_label_vi = Để người khác lo
option_2_label_en = Let someone else help
option_2_effects =
```

## 3. Occupations file

File:
- `occupations_template.csv`

Required columns:
- `occupation_id`
- `pool`
- `label_vi`
- `label_en`
- `selectable`
- `requirements`
- `recurring_effects`

Optional helper column:
- `notes`

How it works:
- an `occupation_choice` space tells the runtime when a player may choose a new occupation
- the occupation row defines what that occupation does every turn until another occupation is chosen
- `selectable = yes` means it can appear in an occupation picker
- `selectable = no` means it is a system-only state such as `unemployed` or `retired`

Examples:

```text
occupation_id = office_worker
pool = early_career
label_vi = Nhân viên văn phòng
label_en = Office Worker
selectable = yes
requirements = experience>=2
recurring_effects = money:+3
```

```text
occupation_id = freelancer
pool = early_career
label_vi = Làm tự do
label_en = Freelancer
requirements = experience>=1
recurring_effects = money:+1;happiness:+1
```

```text
occupation_id = healthcare_worker
pool = early_career
label_vi = Nhân viên y tế
label_en = Healthcare Worker
requirements = experience>=3
recurring_effects = money:+5;health:-1
```

## 4. Hobbies file

File:
- `hobbies_template.csv`

Required columns:
- `hobby_id`
- `pool`
- `label_vi`
- `label_en`
- `requirements`
- `recurring_effects`

Optional helper column:
- `notes`

How it works:
- a `hobby_choice` space or life card tells the runtime when a player may choose a hobby
- the hobby row defines what that hobby does every turn
- a player keeps a hobby after retirement unless they choose a new one
- a player has only one hobby at a time, so `set_hobby:<id>` overwrites the old hobby

Examples:

```text
hobby_id = gardening
pool = general
label_vi = Làm vườn
label_en = Gardening
recurring_effects = happiness:+1;health:+1;money:-1
```

```text
hobby_id = reading_club
pool = general
label_vi = Đọc sách
label_en = Reading Club
recurring_effects = experience:+1;happiness:+1
```

## 5. Effect syntax

Put mechanics in the `effects_*` columns using semicolon-separated commands.

Examples:

```text
health:+1
happiness:-2
money:+3
experience:+1
money:-2@turns:6
money:+1@until:occupation_choice
set_occupation:office_worker
set_housing:rent;money:-1@per_turn
set_housing:buy;money:-2@per_turn
set_relationship:dating
set_hobby:gardening
move_to:20
move_back:1
draw:life
draw:era
```

Multiple effects in one cell:

```text
money:-4;health:-2
```

Recurring effects:

```text
money:-2@turns:6
money:+1@until:occupation_choice
```

Suggested meaning:
- `effects_common` applies to everyone.
- `effects_war_time` applies only to the war-time generation.
- `effects_subsidy` applies only to the subsidy generation.
- `effects_reform` applies only to the reform generation.
- `effects_digital_native` applies only to the digital-native generation.

So the final effect for a player is:
- `effects_common` plus their generation-specific effect column.

## 6. Copy rules

For each playable text element, use separate Vietnamese and English columns:
- titles
- descriptions
- questions
- checkpoint option labels

Do not combine both languages in one cell.

Good:

```text
title_vi = Ngã rẽ học vấn
title_en = Education Crossroads
```

Bad:

```text
title = Ngã rẽ học vấn / Education Crossroads
```

## 7. Recommendation for later runtime support

When you are ready, the runtime can be updated to read:
- one board CSV
- one life card CSV
- one era card CSV
- one occupations CSV
- one hobbies CSV

That is cleaner than keeping spaces and cards in one file, because:
- the column structure is different
- checkpoints need option columns
- cards do not need path direction columns

Right now these files are templates only. The live loader has not yet been switched to this new schema.
