// Google Apps Script для обработки заявок с сайта
// Этот код нужно разместить в Google Apps Script Editor

function doPost(e) {
    try {
        // Parse incoming data
        const data = JSON.parse(e.postData.contents);

        // Get active spreadsheet
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Add header row if sheet is empty
        if (sheet.getLastRow() === 0) {
            sheet.appendRow(['Дата и время', 'ФИО/Организация', 'Телефон', 'Сообщение', 'Формат взаимодействия', 'Источник']);
            sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
        }

        // Append new row with form data
        sheet.appendRow([
            data.timestamp || new Date().toLocaleString('ru-RU'),
            data.name || '',
            data.phone || '',
            data.message || '',
            data.selectedOption || 'Не выбрано',
            data.source || 'Website'
        ]);

        // Return success response
        return ContentService.createTextOutput(JSON.stringify({
            'status': 'success',
            'message': 'Data saved successfully'
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Return error response
        return ContentService.createTextOutput(JSON.stringify({
            'status': 'error',
            'message': error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// Инструкции по настройке:
// 1. Создайте новую Google Таблицу
// 2. Откройте Extensions > Apps Script
// 3. Вставьте этот код
// 4. Нажмите Deploy > New deployment
// 5. Выберите тип: Web app
// 6. Execute as: Me
// 7. Who has access: Anyone
// 8. Скопируйте URL веб-приложения
// 9. Вставьте URL в переменную SCRIPT_URL в файле form-handler.js
