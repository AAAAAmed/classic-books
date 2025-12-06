function search(){
    searchContainer = document.getElementById('searchContainer')
    searchContainer.innerHTML = 'Searching...'

    searchText = document.getElementById('searchBox').value 
    const apiUrl = `https://gutendex.com/books?search=${searchText}`

    fetch(apiUrl)
    .then(response => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
        }

        return response.json()
    })
    .then(data => {
        if (data.count == 0){
            searchContainer.innerHTML = 'No results found'
        }else{
            searchContainer.innerHTML = `Found ${data.count} results`
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error)
    })
}