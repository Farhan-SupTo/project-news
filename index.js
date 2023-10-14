let fetchData =[];
let fetchTodaysPickDetails =[];
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
 .then(data => {
  fetchData =data.data
  fetchTodaysPickDetails =data.data
  fetchAllNews(data.data,category_name)})
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
              <div class="col-md-8 d-flex  flex-column ">
                <div class="card-body">
                  <h5 class="card-title">${singleNews.title}</h5>
                  <p class="card-text">${singleNews.details.slice(0,200)}...</p>
                  <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
                <div class="card-footer bg-body border-0 d-flex justify-content-between align-items-center">
                <div class="d-flex gap-2">
                <img src="${singleNews.author.img}" class="img-fluid rounded-circle " alt="..." height="40" width="40">
                <div>
                <p class="m-0 p-0">${singleNews.author.name ? singleNews.author.name : "Not available"}</p>
                <p class="m-0 p-0">${new Date(singleNews.author.published_date)}</p>
                </div>
                
                </div>
                <div class="d-flex align-items-center">
                <i class="fa-solid fa-eye"></i>
                <p class="m-0 p-0">${singleNews.total_view ? singleNews.total_view : "Not available"}</p>
                </div>
                <div class=" d-flex align-items-center">
                ${GenerateStars(singleNews.rating.number)}
                <p class="m-0 p-0">${singleNews.rating.number}</p>
                </div>
                <div>
                <i class="fa-solid fa-arrow-right" onclick="fetchNewsDetails('${singleNews._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
                </div>
                </div>
              
              </div>
            </div>`
            newsContainer.appendChild(card)
    })
}
const fetchNewsDetails =news_id=>{
    const URL =`https://openapi.programming-hero.com/api/news/${news_id}`
   fetch(URL)
   .then(res =>res.json())
   .then(data =>showNewsDetails(data.data[0]))
}

const showNewsDetails = newsDetails =>{
// 
document.getElementById("modal-body").innerHTML=`
<div class="card", "mb-3">
<div class="row g-0">
              <div class="col-md-12">
                <img src="${newsDetails.image_url}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-12 d-flex  flex-column ">
                <div class="card-body">
                  <h5 class="card-title">${newsDetails.title} <span class="badge text-bg-warning">${newsDetails.others_info.is_trending  ? "Trending" : "none"}</span></h5>
                  <p class="card-text">${newsDetails.details}</p>
                  <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                </div>
                <div class="card-footer bg-body border-0 d-flex justify-content-between align-items-center">
                <div class="d-flex gap-2">
                <img src="${newsDetails.author.img}" class="img-fluid rounded-circle " alt="..." height="40" width="40">
                <div>
                <p class="m-0 p-0">${newsDetails.author.name ? newsDetails.author.name : "Not available"}</p>
                <p class="m-0 p-0">${new Date(newsDetails.author.published_date)}</p>
                </div>
                
                </div>
                <div class="d-flex align-items-center">
                <i class="fa-solid fa-eye"></i>
                <p class="m-0 p-0 pe-2 ">${newsDetails.total_view}</p>
                </div>
                <div class=" m-0 p-0 ps-2 ">
                <i class="fa-solid fa-star"></i>
                </div>
             
                </div>
              
              </div>
            </div>
</div>`
}

// show trending news
const showTrendingNews =()=>{
     const TrendingNews =fetchData.filter(singleNews=>singleNews.others_info.is_trending === true)
     const category_name =document.getElementById("category-name").innerText
     console.log(TrendingNews)
     fetchAllNews(TrendingNews, category_name)
}

// show todays pick details
const showTodaysPick =()=>{
     const TodaysPickNews =fetchTodaysPickDetails.filter(singleNews=>singleNews.others_info.is_todays_pick === true)
     const category_name =document.getElementById("category-name").innerText
     console.log(TodaysPickNews)
     fetchAllNews(TodaysPickNews, category_name)
}

// generate star ratings

const GenerateStars =(ratings) =>{
  let ratingHTML ="";
  for (let i = 1; i <= Math.floor(ratings); i++) {
    ratingHTML += `<i class="fa-solid fa-star text-warning"></i>`
    
  }
  if(ratings-Math.floor(ratings) > 0){
    ratingHTML +=`<i class="fa-solid fa-star-half text-warning"></i>`
  }
  return ratingHTML

}