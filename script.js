//.....CP:cerrent page , BP: books per page, TP; total page....//


let CP=1;
let BP=10;
let TP=1;

document.getElementById ('searchForm').addEventListener( "submit", function(event){event.preventDefault();

CP=1;
const query=document.getElementById ('searchInput').value;
fetchBook (query,CP);});

document.getElementById ('prevPage').addEventListener( 'click', function() {
if (CP>1 ){
    return CP--;}

    const query=document.getElementById ('searchInput').value;
 fetchBook (query,CP);
});
document.getElementById ('nextPage').addEventListener( 'click', function() {
    if (CP<TP ){ CP++;} 
    const query=document.getElementById ('searchInput').value;
    fetchBook (query,CP);
})



function fetchBook( query, page){
    const startIndex= (page-1)*BP;

    fetch (`https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=${BP}`)
    .then   (response=> response.json()).then( data => {

        displayBook(data.items)
            TP = Math.ceil(data.totalItems / BP);
 })
 .catch(error => console.error('error fetching books',error) )
 
    };        

function displayBook(books)  {
const bookDisplaySection=document.getElementById("bookDisplaySection");
bookDisplaySection.innerHTML= " ";
if (!books || books.length === 0){
    bookDisplaySection.innerHTML= ' <p>no result found</p> ';

return 
}books.forEach(book => {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';

    const bookCover = document.createElement('img');
    bookCover.className = 'book-cover';
    bookCover.src = book.volumeInfo.imageLinks?.thumbnail   || 'default_cover.png';
    bookCover.alt = 'Book Cover';

    const bookDetails = document.createElement('div');
    bookDetails.className = 'book-details';

    const bookTitle = document.createElement('h2');
    bookTitle.className = 'book-title';
    bookTitle.textContent = book.volumeInfo.title;

    const bookDescription = document.createElement('p');
    bookDescription.className = 'book-description';
    bookDescription.textContent = book.volumeInfo.description || 'No description available.';

    bookDetails.appendChild(bookTitle);
    bookDetails.appendChild(bookDescription);
    bookDiv.appendChild(bookCover);
    bookDiv.appendChild(bookDetails);
    bookDisplaySection.appendChild(bookDiv);
});
}
function updatePaginationControls(){
document.getElementById("pageInfo").textContent= `${CP} of ${TP} ` ;

}
   function displayError( message) {
    const bookDisplaySection=document.getElementById("bookDisplaySection");
    bookDisplaySection.innerHTML=  ` <p> ${message }</p> `;
    
   } 
         
