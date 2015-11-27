var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var wrapper = function(){
	var transporter = nodemailer.createTransport(smtpTransport({
	    host: 'send.one.com',
	    port: 465,
	    secure: true,
	    auth: {
	        user: 'admin@que.one',
	        pass: '123456'
	    }
	}));

	var emailoption = {
		emailtype: 'CompanyInvite',
		linkurl: 'http://registration.que.one/',
		subject: '',
		text: '', 
	    html: '' 
	};

	var getOption = function(opts, options){
		var mailOptions = {
		    from: 'Admin ✔ <admin@que.one>', // sender address
		    to: options.to,
		    cc: 'immanuelr@streamlinedmedical.in',
		    subject: options.subject,
		    text: options.text,
		    html: options.html
		};

		return mailOptions;
	}

	var sendEmail = function(opts, options) {
		transporter.sendMail(getOption(opts, options), function(error, info){
		    if(error){
		    	options.state = 'Error';
		    	options.message = error;
		    	options.info = info;
		    	opts.daler.logEmail(options);
		        return console.log(error);
		    }
		    options.state = 'Sucess';
		    options.message = info.response;
		    options.info = info;
		    opts.daler.logEmail(options);
		    console.log('Message sent: ' + info.response);
		});
	}

	var send = function(opts, option) {
		var options =  opts.qutils.extend(emailoption, option, true);
		if (options.action == 'ccreate'){
			options.html = "<div> Que Invite -  Mr. " + options.regis.name + ", Please follow the link <a>" + options.linkurl + options.uniqueid + "</a></div>";
			options.text = 'Please continue with you registration';
			options.subject = 'Invite - Que One';
			options.to = options.regis.email;
			sendEmail(opts, options);
		}
	}

	return {
		send: send
	}

}

module.exports.emailer =  wrapper();