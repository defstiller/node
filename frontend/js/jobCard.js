function jobCard(job) {
	console.log(job.title)
	return `<div class="card">
		<div class="card-header">
			<h3 class="card-title">${job.title}</h3>
		</div>
		<div class="card-body">
			<p class="card-text">${job.description}</p>
		</div>
		<div class="card-footer">
			<a href="${job.redirect_url} class="btn btn-primary">Apply</a>
			<a href="#" class="btn btn-primary">Do not show this again</a>
		</div>
	</div>`;
}
export { jobCard };