function search(){
    searchContainer = document.getElementById('searchContainer')
    searchContainer.innerHTML = 'Searching...'

    searchText = document.getElementById('searchBox').value.replace('/ /g', '%20') 
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
            searchContainer.innerHTML = ''
            addSearchResults(data)
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error)
    })
}

function addSearchResults(data){
    searchContainer = document.getElementById('searchContainer')
    books = []
    bookDivs = []

    data.results.forEach(element => {
        temp = {}
        temp.id = element.id
        temp.title = element.title
        temp.authors = element.authors
        temp.languages = element.languages

        books.push(temp)
    })

    books.forEach(book => {
        newDiv = document.createElement('div')
        newDiv.id = book.id
        newDiv.class = 'searchResult'
        newDiv.style.backgroundColor = '#e3e3e3'
        newDiv.style.borderRadius = '5px'
        newDiv.style.padding = '5px'
        newDiv.style.margin = '10px'

        newH2 = document.createElement('h2')
        newH2.textContent = `${book.title} (${book.languages.join(', ').toUpperCase()})`
        newH2.style.marginTop = '0.2rem'

        newP = document.createElement('p')
        newP.textContent = `Author: ${book.authors[0].name}`

        newA = document.createElement('a')
        newA.textContent = 'Read book'
        newA.href = `/reader.html?book=${book.id}`

        newDiv.append(newH2)
        newDiv.append(newP)
        newDiv.append(newA)
        searchContainer.append(newDiv)
    })
}