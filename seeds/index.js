const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: "64f468a58651f3759c442eb4",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi distinctio aliquam laborum totam eum ad similique doloremque exercitationem illo earum temporibus, excepturi cupiditate. Quos optio quod dolor ad, deserunt aliquid.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/drsapqw26/image/upload/v1694525538/YelpCamp/mioorulmv2mim7rigocy.jpg',
                    filename: 'YelpCamp/mioorulmv2mim7rigocy'
                },
                {
                    url: 'https://res.cloudinary.com/drsapqw26/image/upload/v1694525547/YelpCamp/lunpourqvalpju37vrgw.jpg',
                    filename: 'YelpCamp/lunpourqvalpju37vrgw'
                },
                {
                    url: 'https://res.cloudinary.com/drsapqw26/image/upload/v1694525557/YelpCamp/jol2fcrq9g6cmveqxdfj.jpg',
                    filename: 'YelpCamp/jol2fcrq9g6cmveqxdfj'
                }
            ]
        });
        await camp.save();
    }

}


seedDB().then(() => {
    mongoose.connection.close();
});