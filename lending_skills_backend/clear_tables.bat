@echo off
SETLOCAL

:: Параметры подключения к SQL Server
SET SERVER=localhost
SET DATABASE=lending_skills_db
SET USER=sa
SET PASSWORD=YourStrong@Passw0rd

:: Имя SQL-скрипта
SET SQL_FILE=ClearTables.sql

:: Проверка наличия файла
IF NOT EXIST "%SQL_FILE%" (
    echo Ошибка: Файл %SQL_FILE% не найден!
    pause
    exit /b 1
)

:: Выполнение SQL-скрипта
echo Запуск скрипта %SQL_FILE% на сервере %SERVER%...
sqlcmd -S %SERVER% -d %DATABASE% -U %USER% -P %PASSWORD% -i %SQL_FILE% -b
IF %ERRORLEVEL% NEQ 0 (
    echo Ошибка при выполнении скрипта!
    pause
    exit /b 1
)

echo Скрипт успешно выполнен!
pause
ENDLOCAL