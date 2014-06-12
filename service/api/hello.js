var twilio = require('twilio');

exports.get = function (request, response) {
    
    response.set('content-type', 'text/xml');
    var resp = new twilio.TwimlResponse();

    var employeesTable = request.service.tables.getTable('employees');
    var callerid = request.param('From'); 
    
    employeesTable.where({
        phoneNumber: callerid
    }).read({
        success: function(results) {            
            if (results.length > 0) {                

                resp.say('thanks for calling the auto stuff employee schedule hotline');
                
                resp.gather({ method: 'POST' }, function () {
                    resp.say('enter your employee i d');
                });

            } else {
                console.log('Unknown caller id \'%s\'', callerid);
                resp.hangup();
            }
            
            response.send(200, resp.toString());
        },
        error: function (err) {
            console.error(err);
            response.send(404, err);
        }
    });
};

exports.post = function (request, response) {

    response.set('Content-Type', 'text/xml');
    var resp = new twilio.TwimlResponse();

    var employeesTable = request.service.tables.getTable('employees');
    var callerid = request.param('From');
    var digits = request.param('Digits');

    console.log('Digits: %s', digits);

    employeesTable.where({
        employeeid: digits
    }).read({
        success: function (results) {
            if (results.length > 0) {

                resp.say('Your next shift begins on Tuesday June 11 at 8 a m and ends at 5 p m');

            } else {

                resp.say('I\'m sorry.  I could not find that I D');
                resp.hangup();
            }

            response.send(200, resp.toString());
        },
        error: function (err) {
            console.error(err);
            response.send(404, err);
        }
    });
};