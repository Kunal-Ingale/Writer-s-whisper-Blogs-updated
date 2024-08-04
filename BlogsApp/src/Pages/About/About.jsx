import './about.css'
import pic from '../../img/own.jpg'

export default function About() {
    return (
        <div className="about">
        <div className="aboutItem">
        <span className="aboutTitle">ABOUT ME
        </span>
        <img src={pic} alt="UserImage"></img>
        <p>
        Hi!, I am Kunal Ingale. I am currently In my Pre-Final year student.
        I have created this blog website where anyone interested can upload a story/blog with a picture.
        </p>
        </div>
        <div className="aboutItem">
       
        </div> 
        <div className="aboutItem">
        <span className="aboutTitle ">Connect with Me</span>
        <div className="aboutSocial"> 
        <a className="aboutIconAnc" target="_blank" href="https://www.linkedin.com/in/kunal-ingale-0500a7253/"><i className = "aboutIcon fab fa-linkedin"/></a>
        <a className="aboutIconAnc" target="_blank" href="https://www.instagram.com/kunal.23._/"> <i className = "aboutIcon fab fa-instagram-square"/></a>
        <a className="aboutIconAnc" target="_blank" href="https://github.com/Kunal-Ingale">
        <i className = "aboutIcon fab fa-github-square"/>
        </a>
         </div>
         </div>   
        </div>
    )
}
