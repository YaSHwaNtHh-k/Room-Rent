if(process.env.NODE_ENV!="productions"){
  require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate=require("ejs-mate")
const ExpressError=require("./utils/ExpressError.js")

//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const DB_URL=process.env.ATLASDB_URL

const listingRouter=require("./routes/listing.js")
const reviewRouter=require("./routes/reviews.js")
const userRouter=require("./routes/user.js")
const categoryRouter=require("./routes/category.js")

// Passport

const session=require("express-session")
const MogoStore=require("connect-mongo")
const flash = require('connect-flash');


const User=require("./models/user.js")
const passport=require("passport")
const LocalStrategy=require("passport-local");
const { error } = require('console');

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(DB_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")))
app.engine("ejs",ejsMate)
app.use(express.json());

const store=MogoStore.create({
  mongoUrl:DB_URL,
  crypto:{
    secret:"mysecratecode"
  },
  touchAfter:24*3600,
});

store.on(error,()=>{
  console.log(error)
})

const sessionOption={
  store,
  secret:"mysecratecode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expire:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
}


app.use(session(sessionOption))
app.use(flash())

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

app.use((req,res,next)=>{
  res.locals.success=req.flash("success")
  res.locals.failure=req.flash("failure")
  res.locals.currUser=req.user
  next();
});


app.use("/",listingRouter)
app.use("/listings",reviewRouter)
app.use("/",userRouter)
app.use("/",categoryRouter)


app.all("*",(req,res,next)=>{
  next(new ExpressError(404,"Page Not Found"))
})

app.use((err,req,res,next)=>{
  let {statusCode=500,message="something Went Wrong"}=err;
  res.status(statusCode).render("error.ejs",{message})
})

app.listen(3000, () => {
  console.log("server is listening to port 3000");
});