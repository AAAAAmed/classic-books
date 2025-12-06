const urlParams = new URLSearchParams(window.location.search)

if (urlParams.get('book') == null){
    window.location.replace('/')
}else{
    bookId = urlParams.get('book')
    window.location.replace(`https://gutenberg.org/files/${bookId}/${bookId}-h/${bookId}-h.htm`)
}