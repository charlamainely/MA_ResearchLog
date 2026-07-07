-- Import generated from submitted_stories.xlsx
-- 50 stories, marked approved, with prompts shown publicly by default.
-- Re-runnable: existing imported rows are updated by id.

insert into public.stories (
  id,
  story_text,
  prompt_text,
  show_prompt,
  narrative_focuses,
  tone,
  family_closeness,
  display_name,
  language,
  status,
  created_at
) values
('imported-story-001', 'Biryani
1 Toss the space
2 Pressure cook rice, spices, and meat
3 Ta-da!', 'What food was popular in your family and what''s the recipe?', true, array['what', 'how'], 'neutral', 'distant', 'Anonymous', 'English', 'approved', '2026-07-07T00:01:00Z'),
('imported-story-002', 'I wasn''t allowed to show that I was smarter than my parents', 'What was something you''re not allowed to say openly when you were younger?', true, array['what', 'why'], 'negative', 'distant', 'Anonymous', 'English', 'approved', '2026-07-07T00:02:00Z'),
('imported-story-003', 'Sotong Hitam
Recipe: made with love', 'What food was popular in your family and what''s the recipe?', true, array['what', 'how'], 'neutral', 'distant', 'Anonymous', 'English', 'approved', '2026-07-07T00:03:00Z'),
('imported-story-004', 'Satay - family secret :)', 'What food was popular in your family and what''s the recipe?', true, array['what', 'how'], 'neutral', 'distant', 'Anonymous', 'English', 'approved', '2026-07-07T00:04:00Z'),
('imported-story-005', 'I don''t really wan to ask them. I wish I knew but I don''t want to go through the emotional effort of trying', 'What game or activity did love most when you were young?', true, array['what', 'when'], 'negative', 'distant', 'Anonymous', 'English', 'approved', '2026-07-07T00:05:00Z'),
('imported-story-006', 'Shredded potato: Potato + Pepperoni + Chilli', 'What food was popular in your family and what''s the recipe?', true, array['what', 'how'], 'neutral', 'distant', 'Anonymous', 'English', 'approved', '2026-07-07T00:06:00Z'),
('imported-story-007', 'Tam Kỳ City', 'What place do you remember leaving behind most clearly', true, array['where'], 'neutral', 'distant', 'Anonymous', 'English', 'approved', '2026-07-07T00:07:00Z'),
('imported-story-008', 'This is the story of my sister and her husband. They had to fight real hard to get where they are today.', 'Can you tell a love story from someone in the family?', true, array['who'], 'positive', 'distant', 'Anonymous', 'English', 'approved', '2026-07-07T00:08:00Z'),
('imported-story-009', 'Grandma (during Japanese occupation) was stuck on the mainland, and needed to go home to Pulau Tekong during a lockdown. The military policeman said he''ll take her across if she agrees to marry him.', 'Can you tell a love story from someone in the family?', true, array['who'], 'neutral', 'not-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:09:00Z'),
('imported-story-010', 'Bún cá ngừ 
Recipe: Cá ngừ, Bún
Cách nấu: Rửa cá, cắt cá thành khúc nhỏ. Thêm gia vị (hành, tỏi, ớt). Kho lửa nhỏ cho đến khi nếm thử vừa ăn. Cho bún vào tô, ăn với rau sống, thêm cá với nước dùng vào. Shiok!', 'What food was popular in your family and what''s the recipe?', true, array['what', 'how'], 'neutral', 'not-close', 'Anonymous', 'Vietnamese', 'approved', '2026-07-07T00:10:00Z'),
('imported-story-011', 'The multiple home that I had to move out from. And was told it was for the better, but I felt miserable each time.', 'What place do you remember leaving behind most clearly', true, array['where'], 'negative', 'not-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:11:00Z'),
('imported-story-012', 'Pickled cabbage stew with pork ribs! It''s basically a dish every Northern East Chinese family has during the winter!', 'What food was popular in your family and what''s the recipe?', true, array['what', 'when'], 'neutral', 'not-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:12:00Z'),
('imported-story-013', 'Then it''s my father, but I am currently not living at home. I''ll ask him when I get back!!! HA', 'What is the biggest life decision that you have made and how do you feel about it now?', true, array['what', 'why'], 'neutral', 'not-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:13:00Z'),
('imported-story-014', 'For my father. We moved to Tahiland when I was 12, and that decision has shaped who I am as a person now as I have spent many years of my life, as a Singaporean, in other cultures. I am very grateful for that experience.', 'What is the biggest life decision that you have made and how do you feel about it now?', true, array['where', 'when', 'why'], 'positive', 'not-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:14:00Z'),
('imported-story-015', 'For big occasions or even the days we need a mood lifter, we make Karah Parshad, which is offered in the Gurudwara (Sikh Temple)/ It''s made with lots of sugar, ghee, flour, water & love. The recipe is passed down generations & is our comfort food.', 'What food was popular in your family and what''s the recipe?', true, array['how', 'why', 'when'], 'positive', 'not-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:15:00Z'),
('imported-story-016', 'My parents met each other backstage :)', 'Can you tell a love story from someone in the family?', true, array['how'], 'positive', 'not-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:16:00Z'),
('imported-story-017', 'Adopting my aunt. And NOT telling her she''s adopted to this day. (She''s like 55 now).', 'What is the biggest life decision that you have made and how do you feel about it now?', true, array['who', 'what'], 'neutral', 'not-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:17:00Z'),
('imported-story-018', 'My parents. Dad will protect Mom at all costs under any circumstances.', 'Can you tell a love story from someone in the family?', true, array['who', 'how'], 'positive', 'complicated', 'Anonymous', 'English', 'approved', '2026-07-07T00:18:00Z'),
('imported-story-019', 'How I feel if I cry - I am a cry baby so ya!', 'What was something you''re not allowed to say openly when you were younger?', true, array['how'], 'negative', 'complicated', 'Anonymous', 'English', 'approved', '2026-07-07T00:19:00Z'),
('imported-story-020', 'Playing Lego', 'What game or activity did love most when you were young?', true, array['what'], 'neutral', 'complicated', 'Anonymous', 'English', 'approved', '2026-07-07T00:20:00Z'),
('imported-story-021', 'My secondary school. I was so energetic, care-free & fearless then. Oh maybe I miss my old self.', 'What place do you remember leaving behind most clearly', true, array['when', 'how'], 'neutral', 'complicated', 'Anonymous', 'English', 'approved', '2026-07-07T00:21:00Z'),
('imported-story-022', 'Went exchange for my FYP -> Step out of comfort zone. Not my comfort zone by my family''s', 'What is the biggest life decision that you have made and how do you feel about it now?', true, array['when', 'how'], 'neutral', 'complicated', 'Anonymous', 'English', 'approved', '2026-07-07T00:22:00Z'),
('imported-story-023', 'You cannot go against your parents, so anything they say you need to follow :(', 'What was something you''re not allowed to say openly when you were younger?', true, array['who', 'how', 'why'], 'negative', 'complicated', 'Anonymous', 'English', 'approved', '2026-07-07T00:23:00Z'),
('imported-story-024', 'Something called "tomato pachadi" means tomato curry. But I can''t tell the recipe as it is a secret! Shhh', 'What food was popular in your family and what''s the recipe?', true, array['what', 'how'], 'neutral', 'complicated', 'Anonymous', 'English', 'approved', '2026-07-07T00:24:00Z'),
('imported-story-025', 'My parents were in school together', 'Can you tell a love story from someone in the family?', true, array['who', 'where'], 'neutral', 'complicated', 'Anonymous', 'English', 'approved', '2026-07-07T00:25:00Z'),
('imported-story-026', 'Quite a many of my cousings got to know their partners at their work and its amazing to see them ger married.', 'Can you tell a love story from someone in the family?', true, array['who', 'how'], 'positive', 'complicated', 'Anonymous', 'English', 'approved', '2026-07-07T00:26:00Z'),
('imported-story-027', 'My dad loves to go diving in the river. It makes him feel free and refreshing.', 'What game or activity did love most when you were young?', true, array['who', 'why', 'what'], 'neutral', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:27:00Z'),
('imported-story-028', 'My mom''s childhood house where she can explore nature and climbed tree. She told me this house gave lots of fun memories when she was kids and explored lots of adventurous stuffs.', 'What place do you remember leaving behind most clearly', true, array['who', 'where', 'when'], 'positive', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:28:00Z'),
('imported-story-029', 'My dad was an intern who pursued his boss - my mom. A yaer later, he threatened my mom that he would bang his head against the wall is she refused to marry him.', 'Can you tell a love story from someone in the family?', true, array['who', 'why', 'what'], 'neutral', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:29:00Z'),
('imported-story-030', '-Moving to a new country
-Living independently
-I feel liberated', 'What is the biggest life decision that you have made and how do you feel about it now?', true, array['what', 'how', 'why'], 'positive', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:30:00Z'),
('imported-story-031', 'Hakka Abacus seed', 'What food was popular in your family and what''s the recipe?', true, array['what'], 'neutral', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:31:00Z'),
('imported-story-032', 'I wasn''t allowed to say or sit during serious conversations. They said I was too young to understand. But they forgot that being the youngest means I oversee everything.', 'What was something you''re not allowed to say openly when you were younger?', true, array['what', 'why'], 'negative', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:32:00Z'),
('imported-story-033', 'My years in Kashmir (Jak) still fresh in my mond. It wsa my first two years of my UG. 1988 - 89', 'What place do you remember leaving behind most clearly', true, array['where', 'when', 'why'], 'neutral', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:33:00Z'),
('imported-story-034', 'KICK SCOOTER BICYCLE. I wish my dad or mum would bring me outdoors more often.', 'What game or activity did love most when you were young?', true, array['what'], 'neutral', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:34:00Z'),
('imported-story-035', 'My parents met at the park and they went out on their first date to the company sports day.', 'Can you tell a love story from someone in the family?', true, array['who', 'how', 'when'], 'positive', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:35:00Z'),
('imported-story-036', 'Grandpa & Grandma met through a mutual friend. Grandpa fell in love at first sight. Ever since, they were together for 60+ years till Grandpa passed on, Their favourite dessert us Napolitan ice cream', 'Can you tell a love story from someone in the family?', true, array['who', 'how', 'when'], 'positive', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:36:00Z'),
('imported-story-037', 'Going to temple and eating good food :)', 'What game or activity did love most when you were young?', true, array['where', 'what'], 'positive', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:37:00Z'),
('imported-story-038', 'As a Cantonese, we always have soup at home. I guess I should learn the art of making soup!', 'What food was popular in your family and what''s the recipe?', true, array['what', 'where'], 'neutral', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:38:00Z'),
('imported-story-039', 'That is my second house which my family rented to live in. We were there as long as I could remember. Everyone share one single room. Crowded but filled with love and care for each other :) Good old time tho :P', 'What place do you remember leaving behind most clearly', true, array['where', 'what', 'how'], 'positive', 'somewhat-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:39:00Z'),
('imported-story-040', 'A small mountain/countryside I lived in my 30s', 'What place do you remember leaving behind most clearly', true, array['where'], 'neutral', 'close', 'Anonymous', 'English', 'approved', '2026-07-07T00:40:00Z'),
('imported-story-041', 'Chơi xì dách vào dịp Tết', 'What game or activity did love most when you were young?', true, array['what'], 'positive', 'close', 'Anonymous', 'Vietnamese', 'approved', '2026-07-07T00:41:00Z'),
('imported-story-042', 'My dad loved League of Legends :P', 'What game or activity did love most when you were young?', true, array['what'], 'neutral', 'close', 'Anonymous', 'English', 'approved', '2026-07-07T00:42:00Z'),
('imported-story-043', 'To work hard for my family', 'What is the biggest life decision that you have made and how do you feel about it now?', true, array['how'], 'neutral', 'close', 'Anonymous', 'English', 'approved', '2026-07-07T00:43:00Z'),
('imported-story-044', 'Trốn tìm, đá bóng', 'What game or activity did love most when you were young?', true, array['what'], 'neutral', 'close', 'Anonymous', 'Vietnamese', 'approved', '2026-07-07T00:44:00Z'),
('imported-story-045', 'A Chinese man had an eye candy for my Malay grandmother. Upon hearing she was already married, he left her a jade charm.', 'Can you tell a love story from someone in the family?', true, array['who', 'what', 'why'], 'neutral', 'very-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:45:00Z'),
('imported-story-046', 'Getting married -> Best decision ever!', 'What is the biggest life decision that you have made and how do you feel about it now?', true, array['why'], 'positive', 'very-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:46:00Z'),
('imported-story-047', 'My grandma''s pancakes are super popular. She uses 2 eggs, 2 spoons of flour, 2 spoons of milk, 1 tea spoon of sugar. Most importantly, she seperates the egg white first to whisk it, making the pancake more fluffy.', 'What food was popular in your family and what''s the recipe?', true, array['what', 'how'], 'neutral', 'very-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:47:00Z'),
('imported-story-048', 'My hometown in Kuala Belait that the outgrown', 'What place do you remember leaving behind most clearly', true, array['where'], 'neutral', 'very-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:48:00Z'),
('imported-story-049', 'Going against family wishes and hopes for education and a career', 'What is the biggest life decision that you have made and how do you feel about it now?', true, array['what'], 'neutral', 'very-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:49:00Z'),
('imported-story-050', 'HOT HIDEOUT: Tomato collagen soup - 3 crabsticks, 2 pink sausages, 1 octopus, 1 potato, cheese tofu, wintermelon, chicken, pork, quail egg, spam, egg, romaine lettuce', 'What food was popular in your family and what''s the recipe?', true, array['how'], 'neutral', 'very-close', 'Anonymous', 'English', 'approved', '2026-07-07T00:50:00Z')
on conflict (id) do update set
  story_text = excluded.story_text,
  prompt_text = excluded.prompt_text,
  show_prompt = excluded.show_prompt,
  narrative_focuses = excluded.narrative_focuses,
  tone = excluded.tone,
  family_closeness = excluded.family_closeness,
  display_name = excluded.display_name,
  language = excluded.language,
  status = excluded.status,
  created_at = excluded.created_at;

-- Normalization notes:
-- Row 3: inferred Narrative focus from prompt
-- Row 4: inferred Narrative focus from prompt
-- Row 5: corrected Distance "Disant" -> "distant"
-- Row 5: inferred Narrative focus from prompt
-- Row 6: corrected Distance "Disant" -> "distant"
-- Row 6: inferred Narrative focus from prompt
-- Row 7: corrected Distance "Disant" -> "distant"
-- Row 7: inferred Narrative focus from prompt
-- Row 8: corrected Distance "Disant" -> "distant"
-- Row 8: inferred Narrative focus from prompt
-- Row 9: corrected Distance "Disant" -> "distant"
-- Row 9: inferred Narrative focus from prompt
-- Row 10: inferred Narrative focus from prompt
-- Row 12: inferred Narrative focus from prompt
