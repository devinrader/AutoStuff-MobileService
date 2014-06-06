var twilio = require('twilio');

exports.get = function(request, response) {
    
    response.set('Content-Type', 'text/xml');

    var resp = new twilio.TwimlResponse();
    var employeesTable = request.service.tables.getTable('employees');
    var callerid = request.param('From'); 
    
    employeesTable.where({
        ID: callerid
    }).read({
        success: function(results) {            
    //        if (results.length > 0) {                
                resp.say('Thank you for calling the Auto Stuff employee schedule.');
    //            resp.gather({ timeout:30, action: '' }, function() {
    //                this.say('Please enter your employee ID');
    //            });
    //        } else {
    //            console.log('Unknown caller id \'%s\'', callerid);
    //            resp.say({voice:'woman'}, 'ahoy hoy! Testing Twilio and node.js');
    //        }
            
            response.send(200, resp.toString());
        },
        error: function (err) {
            console.error(err);
            response.send(404, err);
        }
    });

    //response.send(200, "OK");
};

