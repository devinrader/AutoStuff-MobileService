var twilio = require('twilio');

exports.post = function (request, response) {

    response.set('Content-Type', 'text/xml');

    var resp = new twilio.TwimlResponse();
    var employeesTable = request.service.tables.getTable('employees');
    var callerid = request.param('From');
    var digits = request.param('Digits');

    employeesTable.where({
        ID: digits
    }).read({
        success: function (results) {
            if (results.length > 0) {
                this.say('Your next shift begins on %s and ends %s');
            } else {
                console.log('I\'m sorry.  I could not find that I D', digits);
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

exports.get = function (request, response) {
    
    response.set('Content-Type', 'text/xml');

    var resp = new twilio.TwimlResponse();
    var employeesTable = request.service.tables.getTable('employees');
    var callerid = request.param('From'); 
    
    console.log(callerid);

    employeesTable.where({
        phoneNumber: callerid
    }).read({
        success: function(results) {            
            if (results.length > 0) {                
                resp.say('Thank you for calling the Auto Stuff employee schedule.');
                resp.gather({ timeout:30, method: 'POST' }, function() {
                    this.say('Please enter your employee ID');
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


