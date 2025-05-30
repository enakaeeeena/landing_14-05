-- �������� SQL-������ ��� �������� ��������� ������

-- 1. ������� �����
-- JSON: {
--   "Id": "00000000-0000-0000-0000-000000000001",
--   "FirstName": "�����",
--   "LastName": "�������",
--   "Patronymic": "���������",
--   "Login": "admin_login",
--   "PasswordHash": "hashed_password",
--   "Salt": "salt",
--   "Email": "admin@adminov.ru",
--   "Role": "Admin",
--   "IsAdmin": true,
--   "IsActive": true,
--   "YearOfStudyStart": null
-- }
INSERT INTO Users (Id, FirstName, LastName, Patronymic, Login, PasswordHash, Salt, Email, Role, IsAdmin, IsActive, YearOfStudyStart, Photo, Skills, Description, Social, SocialDescription)
VALUES ('00000000-0000-0000-0000-000000000001', '�����', '�������', '���������', 'admin_login', 'hashed_password', 'salt', 'admin@adminov.ru', 'Admin', 1, 1, NULL, NULL, '', NULL, NULL, NULL);

-- 2. ���������
-- JSON: [
--   {
--     "Id": "00000000-0000-0000-0000-000000000101",
--     "Name": "�������������� ���������� � �������",
--     "Menu": "[]",
--     "IsActive": true
--   },
--   {
--     "Id": "00000000-0000-0000-0000-000000000102",
--     "Name": "���-���������� � ������",
--     "Menu": "[]",
--     "IsActive": true
--   }
-- ]
INSERT INTO Programs (Id, Name, Menu, IsActive)
VALUES 
    ('00000000-0000-0000-0000-000000000101', '�������������� ���������� � �������', '[]', 1),
    ('00000000-0000-0000-0000-000000000102', '���-���������� � ������', '[]', 1);

-- 3. ��������
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000000201", "FirstName": "����", "LastName": "������", "Patronymic": "���������", "Login": "ivan_petrov", "PasswordHash": "hashed_password", "Salt": "salt", "Email": "ivan.petrov@edu.ru", "Role": "Student", "IsAdmin": false, "IsActive": true, "YearOfStudyStart": 2022},
--   {"Id": "00000000-0000-0000-0000-000000000202", "FirstName": "�����", "LastName": "��������", "Patronymic": "����������", "Login": "maria_sidorova", "PasswordHash": "hashed_password", "Salt": "salt", "Email": "maria.sidorova@edu.ru", "Role": "Student", "IsAdmin": false, "IsActive": true, "YearOfStudyStart": 2023},
--   {"Id": "00000000-0000-0000-0000-000000000203", "FirstName": "�������", "LastName": "������", "Patronymic": "����������", "Login": "alexey_ivanov", "PasswordHash": "hashed_password", "Salt": "salt", "Email": "alexey.ivanov@edu.ru", "Role": "Student", "IsAdmin": false, "IsActive": true, "YearOfStudyStart": 2022},
--   {"Id": "00000000-0000-0000-0000-000000000204", "FirstName": "���������", "LastName": "���������", "Patronymic": "������������", "Login": "ekaterina_kuznetsova", "PasswordHash": "hashed_password", "Salt": "salt", "Email": "ekaterina.kuznetsova@edu.ru", "Role": "Student", "IsAdmin": false, "IsActive": true, "YearOfStudyStart": 2023},
--   {"Id": "00000000-0000-0000-0000-000000000205", "FirstName": "�������", "LastName": "�������", "Patronymic": "�������������", "Login": "dmitry_smirnov", "PasswordHash": "hashed_password", "Salt": "salt", "Email": "dmitry.smirnov@edu.ru", "Role": "Student", "IsAdmin": false, "IsActive": true, "YearOfStudyStart": 2022},
--   {"Id": "00000000-0000-0000-0000-000000000206", "FirstName": "����", "LastName": "���������", "Patronymic": "��������", "Login": "anna_vasilieva", "PasswordHash": "hashed_password", "Salt": "salt", "Email": "anna.vasilieva@edu.ru", "Role": "Student", "IsAdmin": false, "IsActive": true, "YearOfStudyStart": 2023}
-- ]
INSERT INTO Users (Id, FirstName, LastName, Patronymic, Login, PasswordHash, Salt, Email, Role, IsAdmin, IsActive, YearOfStudyStart, Photo, Skills, Description, Social, SocialDescription)
VALUES 
    ('00000000-0000-0000-0000-000000000201', '����', '������', '���������', 'ivan_petrov', 'hashed_password', 'salt', 'ivan.petrov@edu.ru', 'Student', 0, 1, 2022, NULL, '', NULL, NULL, NULL),
    ('00000000-0000-0000-0000-000000000202', '�����', '��������', '����������', 'maria_sidorova', 'hashed_password', 'salt', 'maria.sidorova@edu.ru', 'Student', 0, 1, 2023, NULL, '', NULL, NULL, NULL),
    ('00000000-0000-0000-0000-000000000203', '�������', '������', '����������', 'alexey_ivanov', 'hashed_password', 'salt', 'alexey.ivanov@edu.ru', 'Student', 0, 1, 2022, NULL, '', NULL, NULL, NULL),
    ('00000000-0000-0000-0000-000000000204', '���������', '���������', '������������', 'ekaterina_kuznetsova', 'hashed_password', 'salt', 'ekaterina.kuznetsova@edu.ru', 'Student', 0, 1, 2023, NULL, '', NULL, NULL, NULL),
    ('00000000-0000-0000-0000-000000000205', '�������', '�������', '�������������', 'dmitry_smirnov', 'hashed_password', 'salt', 'dmitry.smirnov@edu.ru', 'Student', 0, 1, 2022, NULL, '', NULL, NULL, NULL),
    ('00000000-0000-0000-0000-000000000206', '����', '���������', '��������', 'anna_vasilieva', 'hashed_password', 'salt', 'anna.vasilieva@edu.ru', 'Student', 0, 1, 2023, NULL, '', NULL, NULL, NULL);

-- 4. ������ ��������
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000000301", "UserId": "00000000-0000-0000-0000-000000000201", "ProgramId": "00000000-0000-0000-0000-000000000101", "Role": "ProgramAdmin"},
--   {"Id": "00000000-0000-0000-0000-000000000302", "UserId": "00000000-0000-0000-0000-000000000204", "ProgramId": "00000000-0000-0000-0000-000000000102", "Role": "ProgramAdmin"}
-- ]
INSERT INTO Admins (Id, UserId, ProgramId, Role)
VALUES 
    ('00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', 'ProgramAdmin'),
    ('00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000204', '00000000-0000-0000-0000-000000000102', 'ProgramAdmin');

-- 5. ������ ���������
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000000401", "Date": "2023-05-15", "Name": "UI-������ ���������� ����������", "WorkDescription": "�������� ���������� ��� ����������", "Skills": "UI/UX, Figma", "MainPhotoUrl": "https://example.com/photo.jpg", "AdditionalPhotoUrls": "", "Favorite": true, "Tags": "UI/UX", "PublishDate": "2023-05-20", "Course": 3, "IsHide": false, "UserId": "00000000-0000-0000-0000-000000000201", "ProgramId": "00000000-0000-0000-0000-000000000101"},
--   {"Id": "00000000-0000-0000-0000-000000000402", "Date": "2023-08-10", "Name": "3D-������ ���������", "WorkDescription": "������ ��� ����", "Skills": "Blender, 3D", "MainPhotoUrl": "https://example.com/photo.jpg", "AdditionalPhotoUrls": "", "Favorite": false, "Tags": "3D-�������������", "PublishDate": "2023-08-15", "Course": 3, "IsHide": true, "UserId": "00000000-0000-0000-0000-000000000201", "ProgramId": "00000000-0000-0000-0000-000000000101"},
--   {"Id": "00000000-0000-0000-0000-000000000403", "Date": "2024-01-20", "Name": "���-���� ���������", "WorkDescription": "������ ����-���������", "Skills": "HTML, CSS, JS", "MainPhotoUrl": "https://example.com/photo.jpg", "AdditionalPhotoUrls": "", "Favorite": true, "Tags": "���-������", "PublishDate": "2024-01-25", "Course": 2, "IsHide": false, "UserId": "00000000-0000-0000-0000-000000000202", "ProgramId": "00000000-0000-0000-0000-000000000101"},
--   {"Id": "00000000-0000-0000-0000-000000000404", "Date": "2023-11-05", "Name": "�������� ��������", "WorkDescription": "�����-������ ��� ������", "Skills": "After Effects", "MainPhotoUrl": "https://example.com/photo.jpg", "AdditionalPhotoUrls": "", "Favorite": false, "Tags": "�����-������", "PublishDate": "2023-11-10", "Course": 2, "IsHide": false, "UserId": "00000000-0000-0000-0000-000000000204", "ProgramId": "00000000-0000-0000-0000-000000000102"},
--   {"Id": "00000000-0000-0000-0000-000000000405", "Date": "2024-03-10", "Name": "������ �������", "WorkDescription": "������ ��� �������", "Skills": "Photoshop", "MainPhotoUrl": "https://example.com/photo.jpg", "AdditionalPhotoUrls": "", "Favorite": true, "Tags": "����������� ������", "PublishDate": "2024-03-15", "Course": 3, "IsHide": true, "UserId": "00000000-0000-0000-0000-000000000205", "ProgramId": "00000000-0000-0000-0000-000000000102"}
-- ]
INSERT INTO Works (Id, Date, Name, WorkDescription, Skills, MainPhotoUrl, AdditionalPhotoUrls, Favorite, Tags, PublishDate, Course, IsHide, UserId, ProgramId)
VALUES 
    ('00000000-0000-0000-0000-000000000401', '2023-05-15', 'UI-������ ���������� ����������', '�������� ���������� ��� ����������', 'UI/UX, Figma', 'https://example.com/photo.jpg', '', 1, 'UI/UX', '2023-05-20', 3, 0, '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101'),
    ('00000000-0000-0000-0000-000000000402', '2023-08-10', '3D-������ ���������', '������ ��� ����', 'Blender, 3D', 'https://example.com/photo.jpg', '', 0, '3D-�������������', '2023-08-15', 3, 1, '00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101'),
    ('00000000-0000-0000-0000-000000000403', '2024-01-20', '���-���� ���������', '������ ����-���������', 'HTML, CSS, JS', 'https://example.com/photo.jpg', '', 1, '���-������', '2024-01-25', 2, 0, '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000101'),
    ('00000000-0000-0000-0000-000000000404', '2023-11-05', '�������� ��������', '�����-������ ��� ������', 'After Effects', 'https://example.com/photo.jpg', '', 0, '�����-������', '2023-11-10', 2, 0, '00000000-0000-0000-0000-000000000204', '00000000-0000-0000-0000-000000000102'),
    ('00000000-0000-0000-0000-000000000405', '2024-03-10', '������ �������', '������ ��� �������', 'Photoshop', 'https://example.com/photo.jpg', '', 1, '����������� ������', '2024-03-15', 3, 1, '00000000-0000-0000-0000-000000000205', '00000000-0000-0000-0000-000000000102');

-- 6. ����
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000000501", "Name": "UI/UX"},
--   {"Id": "00000000-0000-0000-0000-000000000502", "Name": "3D-�������������"},
--   {"Id": "00000000-0000-0000-0000-000000000503", "Name": "����������� ������"},
--   {"Id": "00000000-0000-0000-0000-000000000504", "Name": "���-������"},
--   {"Id": "00000000-0000-0000-0000-000000000505", "Name": "�����-������"}
-- ]
INSERT INTO Tags (Id, Name)
VALUES 
    ('00000000-0000-0000-0000-000000000501', 'UI/UX'),
    ('00000000-0000-0000-0000-000000000502', '3D-�������������'),
    ('00000000-0000-0000-0000-000000000503', '����������� ������'),
    ('00000000-0000-0000-0000-000000000504', '���-������'),
    ('00000000-0000-0000-0000-000000000505', '�����-������');

-- ���������� ����� � �������
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000000601", "TagId": "00000000-0000-0000-0000-000000000501", "WorkId": "00000000-0000-0000-0000-000000000401"},
--   {"Id": "00000000-0000-0000-0000-000000000602", "TagId": "00000000-0000-0000-0000-000000000502", "WorkId": "00000000-0000-0000-0000-000000000402"},
--   {"Id": "00000000-0000-0000-0000-000000000603", "TagId": "00000000-0000-0000-0000-000000000504", "WorkId": "00000000-0000-0000-0000-000000000403"},
--   {"Id": "00000000-0000-0000-0000-000000000604", "TagId": "00000000-0000-0000-0000-000000000505", "WorkId": "00000000-0000-0000-0000-000000000404"},
--   {"Id": "00000000-0000-0000-0000-000000000605", "TagId": "00000000-0000-0000-0000-000000000503", "WorkId": "00000000-0000-0000-0000-000000000405"}
-- ]
INSERT INTO TagsWorks (Id, TagId, WorkId)
VALUES 
    ('00000000-0000-0000-0000-000000000601', '00000000-0000-0000-0000-000000000501', '00000000-0000-0000-0000-000000000401'),
    ('00000000-0000-0000-0000-000000000602', '00000000-0000-0000-0000-000000000502', '00000000-0000-0000-0000-000000000402'),
    ('00000000-0000-0000-0000-000000000603', '00000000-0000-0000-0000-000000000504', '00000000-0000-0000-0000-000000000403'),
    ('00000000-0000-0000-0000-000000000604', '00000000-0000-0000-0000-000000000505', '00000000-0000-0000-0000-000000000404'),
    ('00000000-0000-0000-0000-000000000605', '00000000-0000-0000-0000-000000000503', '00000000-0000-0000-0000-000000000405');

-- 7. �����
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000000701", "UserId": "00000000-0000-0000-0000-000000000202", "WorkId": "00000000-0000-0000-0000-000000000401"},
--   {"Id": "00000000-0000-0000-0000-000000000702", "UserId": "00000000-0000-0000-0000-000000000203", "WorkId": "00000000-0000-0000-0000-000000000401"},
--   {"Id": "00000000-0000-0000-0000-000000000703", "UserId": "00000000-0000-0000-0000-000000000204", "WorkId": "00000000-0000-0000-0000-000000000403"},
--   {"Id": "00000000-0000-0000-0000-000000000704", "UserId": "00000000-0000-0000-0000-000000000205", "WorkId": "00000000-0000-0000-0000-000000000404"}
-- ]
INSERT INTO Likes (Id, UserId, WorkId)
VALUES 
    ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000401'),
    ('00000000-0000-0000-0000-000000000702', '00000000-0000-0000-0000-000000000203', '00000000-0000-0000-0000-000000000401'),
    ('00000000-0000-0000-0000-000000000703', '00000000-0000-0000-0000-000000000204', '00000000-0000-0000-0000-000000000403'),
    ('00000000-0000-0000-0000-000000000704', '00000000-0000-0000-0000-000000000205', '00000000-0000-0000-0000-000000000404');

-- 8. ����������
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000000801", "FirstName": "������", "LastName": "������", "Patronymic": "����������", "Position": "������ ������� �������", "Photo": "https://example.com/photo.jpg", "Link": "https://example.com/profile/sergey_kovalev"},
--   {"Id": "00000000-0000-0000-0000-000000000802", "FirstName": "�����", "LastName": "���������", "Patronymic": "���������", "Position": "��������� �������������� ����������", "Photo": "https://example.com/photo.jpg", "Link": "https://example.com/profile/elena_mikhailova"},
--   {"Id": "00000000-0000-0000-0000-000000000803", "FirstName": "������", "LastName": "�������", "Patronymic": "��������", "Position": "������� ������������� ���-����������", "Photo": "https://example.com/photo.jpg", "Link": "https://example.com/profile/viktor_sokolov"}
-- ]
INSERT INTO Professors (Id, FirstName, LastName, Patronymic, Position, Photo, Link)
VALUES 
    ('00000000-0000-0000-0000-000000000801', '������', '������', '����������', '������ ������� �������', 'https://example.com/photo.jpg', 'https://example.com/profile/sergey_kovalev'),
    ('00000000-0000-0000-0000-000000000802', '�����', '���������', '���������', '��������� �������������� ����������', 'https://example.com/photo.jpg', 'https://example.com/profile/elena_mikhailova'),
    ('00000000-0000-0000-0000-000000000803', '������', '�������', '��������', '������� ������������� ���-����������', 'https://example.com/photo.jpg', 'https://example.com/profile/viktor_sokolov');

-- �������� ����������� � ���������� (� ��������)
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000000901", "ProfessorId": "00000000-0000-0000-0000-000000000801", "ProgramId": "00000000-0000-0000-0000-000000000101", "NextProfessorId": "00000000-0000-0000-0000-000000000902", "PreviousProfessorId": null},
--   {"Id": "00000000-0000-0000-0000-000000000902", "ProfessorId": "00000000-0000-0000-0000-000000000802", "ProgramId": "00000000-0000-0000-0000-000000000101", "NextProfessorId": null, "PreviousProfessorId": "00000000-0000-0000-0000-000000000901"},
--   {"Id": "00000000-0000-0000-0000-000000000903", "ProfessorId": "00000000-0000-0000-0000-000000000803", "ProgramId": "00000000-0000-0000-0000-000000000102", "NextProfessorId": "00000000-0000-0000-0000-000000000904", "PreviousProfessorId": null},
--   {"Id": "00000000-0000-0000-0000-000000000904", "ProfessorId": "00000000-0000-0000-0000-000000000802", "ProgramId": "00000000-0000-0000-0000-000000000102", "NextProfessorId": null, "PreviousProfessorId": "00000000-0000-0000-0000-000000000903"}
-- ]
INSERT INTO ProfessorsPrograms (Id, ProfessorId, ProgramId, NextProfessorId, PreviousProfessorId)
VALUES 
    ('00000000-0000-0000-0000-000000000901', '00000000-0000-0000-0000-000000000801', '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000902', NULL),
    ('00000000-0000-0000-0000-000000000902', '00000000-0000-0000-0000-000000000802', '00000000-0000-0000-0000-000000000101', NULL, '00000000-0000-0000-0000-000000000901'),
    ('00000000-0000-0000-0000-000000000903', '00000000-0000-0000-0000-000000000803', '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000904', NULL),
    ('00000000-0000-0000-0000-000000000904', '00000000-0000-0000-0000-000000000802', '00000000-0000-0000-0000-000000000102', NULL, '00000000-0000-0000-0000-000000000903');

-- 9. ������
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000001001", "Review": null, "Favorite": true, "Content": "�������� ���������, ����� ��������!", "CreatedDate": "2023-06-01", "IsSelected": false, "ProgramId": "00000000-0000-0000-0000-000000000101", "UserId": "00000000-0000-0000-0000-000000000201"},
--   {"Id": "00000000-0000-0000-0000-000000001002", "Review": null, "Favorite": false, "Content": "������� �������������, �� ���� ������.", "CreatedDate": "2023-09-15", "IsSelected": false, "ProgramId": "00000000-0000-0000-0000-000000000101", "UserId": "00000000-0000-0000-0000-000000000202"},
--   {"Id": "00000000-0000-0000-0000-000000001003", "Review": null, "Favorite": true, "Content": "��������� ������� ������� ���-������!", "CreatedDate": "2024-02-10", "IsSelected": true, "ProgramId": "00000000-0000-0000-0000-000000000102", "UserId": "00000000-0000-0000-0000-000000000204"},
--   {"Id": "00000000-0000-0000-0000-000000001004", "Review": null, "Favorite": false, "Content": "���������� �������, ����������!", "CreatedDate": "2024-04-01", "IsSelected": false, "ProgramId": "00000000-0000-0000-0000-000000000102", "UserId": "00000000-0000-0000-0000-000000000205"}
-- ]
INSERT INTO Reviews (Id, Review, Favorite, Content, CreatedDate, IsSelected, ProgramId, UserId)
VALUES 
    ('00000000-0000-0000-0000-000000001001', NULL, 1, '�������� ���������, ����� ��������!', '2023-06-01', 0, '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000201'),
    ('00000000-0000-0000-0000-000000001002', NULL, 0, '������� �������������, �� ���� ������.', '2023-09-15', 0, '00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000202'),
    ('00000000-0000-0000-0000-000000001003', NULL, 1, '��������� ������� ������� ���-������!', '2024-02-10', 1, '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000204'),
    ('00000000-0000-0000-0000-000000001004', NULL, 0, '���������� �������, ����������!', '2024-04-01', 0, '00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000205');

-- 10. ��������
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000001101", "ProgramId": "00000000-0000-0000-0000-000000000101"},
--   {"Id": "00000000-0000-0000-0000-000000001102", "ProgramId": "00000000-0000-0000-0000-000000000102"}
-- ]
INSERT INTO Pages (Id, ProgramId)
VALUES 
    ('00000000-0000-0000-0000-000000001101', '00000000-0000-0000-0000-000000000101'),
    ('00000000-0000-0000-0000-000000001102', '00000000-0000-0000-0000-000000000102');

-- �����
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000001201", "Date": "2023-07-01", "IsExample": "false", "Type": 1, "NextBlockId": "00000000-0000-0000-0000-000000001202", "PreviousBlockId": null, "PageId": "00000000-0000-0000-0000-000000001101"},
--   {"Id": "00000000-0000-0000-0000-000000001202", "Date": "2023-07-02", "IsExample": "true", "Type": 2, "NextBlockId": "00000000-0000-0000-0000-000000001203", "PreviousBlockId": "00000000-0000-0000-0000-000000001201", "PageId": "00000000-0000-0000-0000-000000001101"},
--   {"Id": "00000000-0000-0000-0000-000000001203", "Date": "2023-07-03", "IsExample": "false", "Type": 3, "NextBlockId": null, "PreviousBlockId": "00000000-0000-0000-0000-000000001202", "PageId": "00000000-0000-0000-0000-000000001101"},
--   {"Id": "00000000-0000-0000-0000-000000001204", "Date": "2023-08-01", "IsExample": "true", "Type": 1, "NextBlockId": "00000000-0000-0000-0000-000000001205", "PreviousBlockId": null, "PageId": "00000000-0000-0000-0000-000000001102"},
--   {"Id": "00000000-0000-0000-0000-000000001205", "Date": "2023-08-02", "IsExample": "false", "Type": 2, "NextBlockId": null, "PreviousBlockId": "00000000-0000-0000-0000-000000001204", "PageId": "00000000-0000-0000-0000-000000001102"}
-- ]
INSERT INTO Blocks (Id, Date, IsExample, Type, NextBlockId, PreviousBlockId, PageId)
VALUES 
    ('00000000-0000-0000-0000-000000001201', '2023-07-01', 'false', 1, '00000000-0000-0000-0000-000000001202', NULL, '00000000-0000-0000-0000-000000001101'),
    ('00000000-0000-0000-0000-000000001202', '2023-07-02', 'true', 2, '00000000-0000-0000-0000-000000001203', '00000000-0000-0000-0000-000000001201', '00000000-0000-0000-0000-000000001101'),
    ('00000000-0000-0000-0000-000000001203', '2023-07-03', 'false', 3, NULL, '00000000-0000-0000-0000-000000001202', '00000000-0000-0000-0000-000000001101'),
    ('00000000-0000-0000-0000-000000001204', '2023-08-01', 'true', 1, '00000000-0000-0000-0000-000000001205', NULL, '00000000-0000-0000-0000-000000001102'),
    ('00000000-0000-0000-0000-000000001205', '2023-08-02', 'false', 2, NULL, '00000000-0000-0000-0000-000000001204', '00000000-0000-0000-0000-000000001102');

-- �����
-- JSON: [
--   {"Id": "00000000-0000-0000-0000-000000001301", "Data": "{\"content\": \"�������� ���������\"}", "Date": "2023-07-01", "IsHidden": false, "BlockId": "00000000-0000-0000-0000-000000001201"},
--   {"Id": "00000000-0000-0000-0000-000000001302", "Data": "{\"content\": \"������� �����\"}", "Date": "2023-07-02", "IsHidden": false, "BlockId": "00000000-0000-0000-0000-000000001202"},
--   {"Id": "00000000-0000-0000-0000-000000001303", "Data": "{\"content\": \"��������\"}", "Date": "2023-07-03", "IsHidden": true, "BlockId": "00000000-0000-0000-0000-000000001203"},
--   {"Id": "00000000-0000-0000-0000-000000001304", "Data": "{\"content\": \"� ���-����������\"}", "Date": "2023-08-01", "IsHidden": false, "BlockId": "00000000-0000-0000-0000-000000001204"},
--   {"Id": "00000000-0000-0000-0000-000000001305", "Data": "{\"content\": \"������� ��������\"}", "Date": "2023-08-02", "IsHidden": false, "BlockId": "00000000-0000-0000-0000-000000001205"}
-- ]
INSERT INTO Forms (Id, Data, Date, IsHidden, BlockId)
VALUES 
    ('00000000-0000-0000-0000-000000001301', '{"content": "�������� ���������"}', '2023-07-01', 0, '00000000-0000-0000-0000-000000001201'),
    ('00000000-0000-0000-0000-000000001302', '{"content": "������� �����"}', '2023-07-02', 0, '00000000-0000-0000-0000-000000001202'),
    ('00000000-0000-0000-0000-000000001303', '{"content": "��������"}', '2023-07-03', 1, '00000000-0000-0000-0000-000000001203'),
    ('00000000-0000-0000-0000-000000001304', '{"content": "� ���-����������"}', '2023-08-01', 0, '00000000-0000-0000-0000-000000001204'),
    ('00000000-0000-0000-0000-000000001305', '{"content": "������� ��������"}', '2023-08-02', 0, '00000000-0000-0000-0000-000000001205');