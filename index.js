const serp = require("serp");

async function idk() {
	const options = {
		host : "jobs.google.com",
		qs : {
		  q : "developer jobs",
		  filter : 0,
		  pws : 0
		},
		num : 100
	  };
	  
	  const links = await serp.search(options);
	  console.log(links)
}
idk() 