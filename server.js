const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`; 

	console.log(log);
	fs.appendFile('server.log', log+'\n',(err) =>{
		if(err){
		console.log('Unable to connec to server');
		}
	});
	next();
});

// app.use((req,res,next) => {
// 	res.render('maintenance.hbs',{
// 		pageTitle: 'Website will soon be updated. Please revisit after some time.'
// 	});
// });

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	//res.send('Hello Express!');

	// res.send({
	// 	name: 'Mahesh',
	// 	likes: [
	// 	'Biking',
	// 	'Cricketing'
	// 	]
	// });

	res.render('welcome.hbs',{
		welcomeTitle: 'Hello, Welcome!',
		pageTitle: 'Welcome Page',
	});
});

app.get('/about',(req, res) =>{
	res.render('about.hbs',{
		pageTitle: 'About Page',
	});
});

app.get('/bad',(req, res) =>{
	res.send({
		errmsg: 'Unable to connect '
	});
});


app.listen(port,() => {
	console.log(`Server listening on port ${port}`);
});




