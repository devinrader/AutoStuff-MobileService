var twilio = require('twilio');

exports.get = function (request, response) {
    
    //1. Set content header and create TwiMLResponse
    response.set('content-type', 'text/xml');
    var resp = new twilio.TwimlResponse();

    var employeesTable = request.service.tables.getTable('employees');
    var callerid = request.param('From'); 
    
    employeesTable.where({
        phoneNumber: callerid
    }).read({
        success: function(results) {            
            if (results.length > 0) {                

                //2. Say greeting and prompt for input
                resp.say('thanks for calling the Auto Stuff schedule hotline.');
                resp.gather({ method: 'POST' }, function () {
                    resp.say('please enter your employee i d');
                });

            } else {
                console.log('Unknown caller id \'%s\'', callerid);
                //3. Hangup
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

    //1. Set content header and create TwiMLResponse
    response.set('content-type', 'text/xml');
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

                //2. Employee found response
                resp.say('your next shift starts at 8 a m and ends at 5 p m on monday');

            } else {

                //3. Employee NOT found response
                resp.say('sorry.  I do not know that i d');
            }

            response.send(200, resp.toString());
        },
        error: function (err) {
            console.error(err);
            response.send(404, err);
        }
    });
};