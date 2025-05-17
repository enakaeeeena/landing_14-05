-- SQL-скрипт для удаления содержимого всех таблиц

-- Очистка таблиц с внешними ключами в порядке зависимостей
DELETE FROM Forms;
DELETE FROM Blocks;
DELETE FROM Pages;
DELETE FROM Reviews;
DELETE FROM ProfessorsPrograms;
DELETE FROM Likes;
DELETE FROM TagsWorks;
DELETE FROM SkillWorks;
DELETE FROM SkillsUsers;
DELETE FROM Admins;
DELETE FROM Works;
DELETE FROM Professors;
DELETE FROM Programs;
DELETE FROM Users;
DELETE FROM Tags;
DELETE FROM Skills;
DELETE FROM Tokens;

-- Комментарий: Сброс автоинкрементных счетчиков (опционально, для PostgreSQL)
-- ALTER SEQUENCE table_name_id_seq RESTART WITH 1;