var express = require('express');
var router = express.Router();
var helper = require('sendgrid').mail;

router.post('/:action', function(req, res, next) {
	var action = req.params.action

	if (action == 'send'){ // Send an email
		var from_email = new helper.Email('skynet60@outlook.com');
        var to_email = new helper.Email(req.body.recipient);
        var subject = req.body.subject
        var content = new helper.Content('text/html', req.body.content);
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        })

        sg.API(request, function(error, response) {
        	if (error){
        		res.json({
        			confirmation: 'fail',
        			message: error
        		})

        		return
        	}

        	res.json({
        		confirmation: 'success',
        		response: response
        	})  
        })

		return
	}

	res.json({
  	    confirmation: 'fail',
  	    message: 'Invalid Action'
  })
})

router.get('/:action', function(req, res, next) {
	var action = req.params.action

	if (action == 'send'){ // Send an email
		var from_email = new helper.Email('skynet60@outlook.com');
        var to_email = new helper.Email('nickwease@gmail.com');
        var subject = 'TEST';
        var content = new helper.Content('text/html', 'Hello, From Dispatch Email!');
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        })

        sg.API(request, function(error, response) {
        	if (error){
        		res.json({
        			confirmation: 'fail',
        			message: error
        		})

        		return
        	}

        	res.json({
        		confirmation: 'success',
        		response: response
        	})  
        })

		return
	}

	res.json({
  	    confirmation: 'fail',
  	    message: 'Invalid Action'
  })
})

module.exports = router;