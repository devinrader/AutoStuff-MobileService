exports.get = function (request, response) {

    var employeesTable = request.service.tables.getTable('employees');

    employeesTable.insert({employeeid: 23473, phoneNumber: '+19102369959'}, {
        success: function (results) {
            response.send(200, "OK");
        },
        error: function (err) {
            console.error(err);
            response.send(500, err);
        }
    });
};