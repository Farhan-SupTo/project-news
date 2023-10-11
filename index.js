const loadNewsCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/news/categories")
    .then(res =>res.json())
    .then((data) => showNewsCategory(data.data))
}
// loadNewsCategory()

const showNewsCategory= (data) =>{
     const categoryContainer =document.getElementById("news-category")
     data.news_category.forEach(singleNews => {
        // console.log(singleNews)
        categoryContainer.innerHTML +=`
         <a class="nav-link" href="#" onclick="fetchAllCategoryNews('${singleNews.category_id}','${singleNews.category_name}')">${singleNews.category_name}</a>
        `
     });
}
// fetch all new that is available in the category

const fetchAllCategoryNews = (category_id,category_name) =>{
 console.log(category_id)
 fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
 .then(res =>res.json())
 .then(data => fetchAllNews(data.data,category_name))
}
const fetchAllNews = (data,category_name)=> {
    // console.log(data,category_name)
    document.getElementById("news-count").innerText =data.length
    document.getElementById("category-name").innerText =category_name
    // for new card section
    const newsContainer =document.getElementById("all-news")
    newsContainer.innerHTML=""
    data.forEach(singleNews =>{
        console.log(singleNews)
        const card =document.createElement("div")
        card.classList.add("card", "mb-3")
        card.innerHTML =`
        <div class="row g-0">
              <div class="col-md-4">
                <img src="${singleNews.image_url}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">${singleNews.title}</h5>
                  <p class="card-text">${singleNews.details.slice(0,200)}...</p>
                  <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>`
            newsContainer.appendChild(card)
    })
}