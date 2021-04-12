package com.idstaa.tm.result;

public class AppResult<T> extends BaseAppResult {
	private T results;

	public T getResults() {
		return results;
	}
	public void setResults(T results) {
		this.results = results;
	}
	@Override
	public String toString() {
		return " {results:" + results + "} ";
	}
}
