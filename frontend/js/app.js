import {JobSearch} from './JobSearch';

const jobSearch = new JobSearch("#search-form", "#results-container", "#loading-element");
jobSearch.setCountryCode();
jobSearch.setFormListener();