
import {jobCard} from './jobCard';
export class JobSearch {
	constructor(
		searchFormSelector,
		resultsContainerSelector,
		loadingElementSelector,
		){
			this.searchForm = document.querySelector(searchFormSelector);
			this.resultsContainer = document.querySelector(resultsContainerSelector);
			this.loadingElement = document.querySelector(loadingElementSelector);
		}
		setCountryCode() {
			fetch("http://ip-api.com/json")
				.then(response => response.json())
				.then(data => this.countryCode = data.countryCode.toLowerCase() )
		}
		setFormListener() {
			this.searchForm.addEventListener('submit', (event) => {
				event.preventDefault();
				this.startLoading();
				this.resultsContainer.innerHTML = '';
				const formData = new FormData(this.searchForm);
				const searchParams = {};
				for (const [key, value] of formData.entries()) {
					searchParams[key] = value;
				}
				console.log(searchParams);
				const {search, location} = searchParams;
				fetch(`http://localhost:3000/?search=${search}&location=${location}&country=${this.countryCode}`)
				  .then(response => response.json())
				  .then(({ results }) => {
					this.stopLoading();
					console.log(results);
					results = results.map(result =>  jobCard(result)).join('');
					this.resultsContainer.innerHTML = results;
				  })
				  .catch((error) => {
					this.stopLoading()
					console.log(error)
				  });
				});
		}
		startLoading() {
			this.loadingElement.style.display = "block";
		  }
		
		stopLoading() {
			this.loadingElement.style.display = "none";
		  }
}