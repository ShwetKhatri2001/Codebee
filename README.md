
![Logo](https://user-images.githubusercontent.com/63184114/123545780-8d802e00-d777-11eb-89c6-1bbf306fab74.png)
    
# CodeBee

* Learn data structures and algorithms through creative visualizations and real-time doubt clearance.

* The New Education policy 2021 has opened up the field of Computer Science to young coders. I realized that beginning with coding is tough for even a college-level beginner. Although there are lot of free materials, but everything that is organized is paid.

* Also, the content is not designed for secondary school students. Therefore I came up with this innovation to provide students with free-of-cost study materials. Kids can learn logic, structure, sequence, and creative expression just as having fun around.  

* Developer Days --> Web Development Track --> Final Challenge Submission
![Developer Days](https://d1fdloi71mui9q.cloudfront.net/niT5FCERQxmUlORNHyGS_dMW63U6raEsPK7BF)![Web Development](https://www.aaravinfotech.com/assets/images/pages/web-design-services-15d6b6127f1242.svg)
## [Developer Days](https://developerdays.tech/)
* Timeline : August 22 - September 26, 2021

## [Web Development Track](https://developerdays.tech/track/0)
* offered by Mozilla Durg

## Checkout - [Codebee](https://code-bee.herokuapp.com/)

## 🚀 Features 
*  Starting with very secure authentication using `jwt-token` , `crypto hashing` , `different social auth providers`. 
*  Showing courses for coding added by one of the best people in tech with all features listed on home page
*  Doubt clearance and live comments using `Socket.io` and "Meet with Mentor" providing video conferencing implemented using `Agoara SDK`
*  Structured courses with topicwise lectures, videos, visulizations and code editor and all will be saved lifetime.
*  So Its a complete package for young and school coders created using `MERN` stack.

## 👀 Preview

### [Live link](https://code-bee.herokuapp.com/). 
Deployed at [Heroku](https://heroku.com).

### Screenshots
![Landing Page](/client/src/assets/img/theme/codebee-1.png)
![Home Page](/client/src/assets/img/theme/codebee-3.jpeg)
![Visualization](/client/src/assets/img/theme/codebee-2.png)
![Code Editor](/client/src/assets/img/theme/codebee-4.jpeg)

### API Testing
![AllCourses](/client/src/assets/img/theme/AllCourses.png)
![CourseDetails](/client/src/assets/img/theme/CourseDetails.png)
![CommentsInCourse](/client/src/assets/img/theme/CommentsInCourse.png)

## Installation

First these commands and follow mentioned steps to get your app ready with installation.

```bash
git clone https://github.com/ShwetKhatri2001/Codebee.git
```

```bash
npm install 
```

```bash
cd client
npm install 
```

After installations, make a `.env` file in root directory and add some env variables there . 
* Add backend port number as `PORT`, client domain as `DOMAIN_NAME`, api url as `API_URL`, mongodb url as `MONGO_URI`
  and `NODE_ENV` having value development / production.
* Then we need `SENDGRID_VERIFIED_MAIL` and `SENDGRID_API_KEY` to get email service from sendgrid.
* Then add some secret strings as `CRYPTO_SECRET` and `JWT_SECRET`.
* At last in this file add Github auth secret key and id as `CLIENT_SECRET` and `CLIENT_ID`. 

Now make a `.env` file in client directory and add similar values given in backend env for `REACT_APP_DOMAIN_NAME` and `REACT_APP_API_URL` and add `REACT_APP_SAWO_API_KEY` for sawo passwordless authentication.

To run you app, use this command.

```bash
npm run dev
```

## Contributing

If you find bugs with this project, pull requests are always welcome. You can [create an issue here](https://github.com/ShwetKhatri2001/Codebee/issues/new).
Your :star: is also greatly appreciated.

[Checkout my GitHub profile and view other projects](https://github.com/ShwetKhatri2001)















