//include express
const express = require ('express')
const expHandlebars = require ('express-handlebars')
const app = express ()
const restaurants = require ('./restaurant.json')

//define server related variables
const port = 3000

app.engine ('handlebars', expHandlebars({
    defaultLayout: 'main'
}))

app.set ('view engine', 'handlebars')//set view engine

app.use (express.static('public'))

app.get ('/', (req , res)=>{
    res.render ('index',{restaurant:restaurants.results})
})

app.get ('/restaurant/:restaurant_id',(req , res)=>{
    const currentRestaurant = restaurants.results.find(restaurants => restaurants.id === Number(req.params.restaurant_id))
    res.render ('show',{restaurant:currentRestaurant})
})

app.get ('/search',(req , res)=>{
    const keyword = req.query.keyword.trim().toLowerCase()
    const searchedRestaurant = restaurants.results.filter(ele => {
        return ele.name.toLowerCase().includes(keyword) || ele.category.toLowerCase().includes(keyword)
    })
    res.render ('index', {restaurant: searchedRestaurant, keywords: keyword})
})

app.listen (port , () =>{
    console.log('Express is running on http://localhost:' + 'port')
})
