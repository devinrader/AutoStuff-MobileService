exports.get = function (request, response) {

    var employeesTable = request.service.tables.getTable('employees');

    employeesTable.insert({ employeeid: 23473, phoneNumber: '[REPLACE_WITH_A_VALID_PHONE_NUMBER]' }, {
        success: function (results) {
            response.send(200, "OK");
        },
        error: function (err) {
            console.error(err);
            response.send(500, err);
        }
    });
};