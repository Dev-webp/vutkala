import "./Service.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import {
    FiArrowRight,
    FiCheckCircle,
    FiShield,
    FiGlobe,
    FiUsers,
    FiTrendingUp
} from "react-icons/fi";

import technology from "../../assets/homeservices/technology.png";
import workforce from "../../assets/homeservices/workforce.png";
import consulting from "../../assets/homeservices/consulting.png";
import digital from "../../assets/homeservices/digital.png";

const services = [

{
id:1,

badge:"TECHNOLOGY",

title:"Technology Services",

image:technology,

color:"blue",

features:[
"AI Solutions",
"Cloud Engineering",
"Software Development",
"Cyber Security"
]

},

{
id:2,

badge:"WORKFORCE",

title:"Workforce Solutions",

image:workforce,

color:"green",

features:[
"Permanent Hiring",
"Executive Search",
"Contract Staffing",
"Global Recruitment"
]

},

{
id:3,

badge:"CONSULTING",

title:"Consulting Services",

image:consulting,

color:"purple",

features:[
"Business Consulting",
"Technology Consulting",
"Cloud Strategy",

"Process Optimization"
]

},

{
id:4,

badge:"DIGITAL",

title:"Digital Transformation",

image:digital,

color:"orange",

features:[
"Automation",
"Cloud Migration",
"Enterprise Mobility",

"Application Modernization"
]

}

];

function Services(){

return(

<section className="services">

<div className="services-header">

<span className="serviceh2">
OUR SERVICES
</span>

<h2 className="journey-title span">

Comprehensive

<span>

Technology & Workforce Solutions

</span>

</h2>

<p>

VUTKAL Global Technologies delivers end-to-end technology,
workforce, consulting and digital transformation services
that help enterprises innovate, scale and succeed
across USA and India.

</p>

</div>

<Swiper

modules={[Navigation]}

navigation

spaceBetween={30}

slidesPerView={4}

breakpoints={{

320:{
slidesPerView:1
},

768:{
slidesPerView:2
},

1100:{
slidesPerView:3
},

1400:{
slidesPerView:4
}

}}

className="services-slider"

>

{

services.map(service=>(

<SwiperSlide

key={service.id}

>

    <div className={`service-card ${service.color}`}>

    {/* 3D Image */}

    <div className="service-image">

        <img
            src={service.image}
            alt={service.title}
        />

    </div>

    {/* Badge */}

    <span className={`service-badge ${service.color}`}>

        {service.badge}

    </span>

    {/* Title */}

    <h3>

        {service.title}

    </h3>

    {/* Feature List */}

    <ul className="service-features">

        {

            service.features.slice(0,4).map((feature,index)=>(

            <li key={index}>

                <FiCheckCircle />

                <span>

                    {feature}

                </span>

            </li>

            ))

        }

    </ul>

    {/* Button */}

    <button className={`service-btn ${service.color}`}>

        Learn More

        <FiArrowRight />

    </button>

</div>

</SwiperSlide>

))

}

</Swiper>

{/* ========================================

        Bottom Infinite Marquee

========================================= */}

<div className="services-marquee">

    <div className="marquee-track">

        {

        [...services,...services].map((item,index)=>(

        <div
            className="marquee-item"
            key={index}
        >

            <span
                className={`dot ${item.color}`}
            ></span>

            {item.title}

        </div>

        ))

        }

    </div>

</div>

{/* ========================================

            TRUST BAR

========================================= */}

<div className="trust-bar">

<div className="trust-item">

<FiShield />

<div>

<h4>

Trusted by

</h4>

<p>

Global Clients

</p>

</div>

</div>

<div className="trust-item">

<FiUsers />

<div>

<h4>

Expert

</h4>

<p>

Teams

</p>

</div>

</div>

<div className="trust-item">

<FiGlobe />

<div>

<h4>

USA & India

</h4>

<p>

Delivery

</p>

</div>

</div>

<div className="trust-item">

<FiTrendingUp />

<div>

<h4>

Innovation

</h4>

<p>

Driven

</p>

</div>

</div>

<div className="trust-item">

<FiShield />

<div>

<h4>

Secure &

</h4>

<p>

Compliant

</p>

</div>

</div>

</div>

</section>

);

}

export default Services;