#!/bin/bash

# Параметры подключения к PostgreSQL
PG_HOST="localhost"
PG_PORT="5432"
PG_DATABASE="lending_skills_db"
PG_USER="postgres"
PG_PASSWORD="your_password"

# Имя SQL-скрипта
SQL_FILE="ClearTables.sql"

# Проверка наличия файла
if [ ! -f "$SQL_FILE" ]; then
    echo "Ошибка: Файл $SQL_FILE не найден!"
    exit 1
fi

# Экспорт пароля для psql
export PGPASSWORD="$PG_PASSWORD"

# Выполнение SQL-скрипта
echo "Запуск скрипта $SQL_FILE на базе $PG_DATABASE..."
psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -d "$PG_DATABASE" -f "$SQL_FILE"
if [ $? -ne 0 ]; then
    echo "Ошибка при выполнении скрипта!"
    exit 1
fi

echo "Скрипт успешно выполнен!"
exit 0