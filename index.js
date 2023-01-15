const express = require('express')
const app = express()


const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require("express-fileupload");
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(fileUpload()); // middlware which will handle file upload incase any image comes up and give that to us in res.files



let courses = [
    {
      id: "11",
      name: "Learn Reactjs",
      price: 299,
    },
    {
      id: "22",
      name: "Learn Angular",
      price: 399,
    },
    {
      id: "33",
      name: "Learn Django",
      price: 499,
    },
  ];

  app.get("/",(req , res)=>{
    res.send("<h1> HomePage </h1>")
})
  
  
  
  app.get("/api/v1/lco", (req, res) => {
    res.send("hello from lco docs");
  });

  app.get("/api/v1/lcoobject", (req, res) => {
    res.send({ id: "55", name: "Learn Backend", price: 999 });
  });
  
  app.get("/api/v1/courses", (req, res) => {
    res.send(courses);
  });

  app.get("/api/v1/mycourse/:courseId", (req, res) => {
    const myCourse = courses.find((course) => course.id === req.params.courseId);
    res.send(myCourse);
  });
  
  app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
  });

  app.get("/api/v1/coursequery", (req, res) => {
    let location = req.query.location;
    let device = req.query.device;
  
    res.send({ location, device });
  });
  
  app.post("/api/v1/courseupload", (req, res) => {
    console.log(req.headers);
    const file = req.files.file;
    console.log(file);
    let path = __dirname + "/images/" + Date.now() + ".jpg"; // this is the path name that we have created and __dirname gives path of the project
  
    file.mv(path, (err) => { // moving file to the given path parameter
      res.send(true);
    });
  });

app.listen(4000 , ()=>{
    console.log("Server is running at port 4000...")
})